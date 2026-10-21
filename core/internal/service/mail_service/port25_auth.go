package mail_service

import (
	"billionmail-core/internal/consts"
	docker "billionmail-core/internal/service/dockerapi"
	"billionmail-core/internal/service/public"
	"context"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/gogf/gf/v2/frame/g"
)

// Port 25 is for other mail servers; mail clients submit on 465/587. Nearly all
// SMTP password guessing hits port 25, so it offers AUTH only to the docker
// network, where core and the webmail submit mail. Other clients do not see
// AUTH and Postfix rejects the command if they send it anyway.

const port25NoAuthMap = "smtpd_no_auth.cidr"

var smtpInetLine = regexp.MustCompile(`^smtp\s+inet\s`)

// port25NoAuthCIDR keeps AUTH for the docker network and drops it for everyone else.
func port25NoAuthCIDR(dockerSubnet string) string {
	return fmt.Sprintf(`# Managed by BillionMail core: port 25 offers AUTH only to the docker network
%s	silent-discard
0.0.0.0/0	silent-discard, auth
::/0	silent-discard, auth
`, dockerSubnet)
}

// addPort25NoAuthOption adds the EHLO discard map to the port 25 smtpd service in master.cf.
func addPort25NoAuthOption(masterCf string) (string, bool) {
	option := "  -o smtpd_discard_ehlo_keyword_address_maps=cidr:/etc/postfix/conf/" + port25NoAuthMap

	lines := strings.Split(masterCf, "\n")
	for i, line := range lines {
		if !smtpInetLine.MatchString(line) {
			continue
		}
		// The service's options are the indented lines that follow it.
		for j := i + 1; j < len(lines) && strings.HasPrefix(lines[j], " "); j++ {
			if strings.Contains(lines[j], "smtpd_discard_ehlo_keyword_address_maps") {
				return masterCf, false
			}
		}
		lines = append(lines[:i+1], append([]string{option}, lines[i+1:]...)...)
		return strings.Join(lines, "\n"), true
	}
	return masterCf, false
}

// RestrictPort25Auth makes port 25 offer AUTH only inside the docker network.
func RestrictPort25Auth(ctx context.Context) {
	subnet := public.MustGetDockerEnv("IPV4_NETWORK", "10.66.66") + ".0/24"

	mapPath := public.AbsPath(filepath.Join(consts.POSTFIX_CONF_PATH, port25NoAuthMap))
	mapContent := port25NoAuthCIDR(subnet)
	current, _ := readFileIfExists(mapPath)
	mapChanged := current != mapContent
	if mapChanged {
		if err := os.WriteFile(mapPath, []byte(mapContent), 0644); err != nil {
			g.Log().Warning(ctx, "RestrictPort25Auth: failed to write", mapPath, err)
			return
		}
	}

	masterPath := public.AbsPath(consts.POSTFIX_MASTER_CONF)
	masterCf, err := readFileIfExists(masterPath)
	if err != nil {
		g.Log().Warning(ctx, "RestrictPort25Auth: failed to read master.cf:", err)
		return
	}
	newMasterCf, masterChanged := addPort25NoAuthOption(masterCf)
	if masterChanged {
		if err = os.WriteFile(masterPath, []byte(newMasterCf), 0644); err != nil {
			g.Log().Warning(ctx, "RestrictPort25Auth: failed to write master.cf:", err)
			return
		}
	}

	if !mapChanged && !masterChanged {
		return
	}

	dk, err := docker.NewDockerAPI()
	if err != nil {
		g.Log().Warning(ctx, "RestrictPort25Auth: failed to connect to Docker:", err)
		return
	}
	defer dk.Close()

	if _, err = dk.ExecCommandByName(ctx, consts.SERVICES.Postfix, []string{"postfix", "reload"}, "root"); err != nil {
		g.Log().Warning(ctx, "RestrictPort25Auth: postfix reload failed:", err)
		return
	}
	g.Log().Info(ctx, "RestrictPort25Auth: port 25 offers AUTH only to", subnet)
}
