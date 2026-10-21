package timers

import (
	"billionmail-core/internal/service/domains"
	"billionmail-core/internal/service/fail2ban"
	"billionmail-core/internal/service/log_maintenance"
	"billionmail-core/internal/service/mail_boxes"
	"billionmail-core/internal/service/mail_service"
	"billionmail-core/internal/service/maillog_stat"
	"billionmail-core/internal/service/relay"
	"context"
	"time"

	"github.com/gogf/gf/os/gtimer"
	"github.com/gogf/gf/v2/frame/g"
)

// Start Start initializes and starts all the necessary timers for the service.
func Start(ctx context.Context) (err error) {
	g.Log().Debug(ctx, "Starting timers...")

	// Normalize mailboxes to lowercase
	gtimer.AddOnce(500*time.Millisecond, func() {
		g.Log().Debug(ctx, "Mailboxes normalization started")

		err = mail_boxes.NormalizeMailboxes()

		if err != nil {
			g.Log().Warning(ctx, "NormalizeMailboxes failed: ", err)
			err = nil // Ignore the error to allow the service to continue
		} else {
			g.Log().Debug(ctx, "Mailboxes normalized successfully")
		}
	})

	// Start DNS Records checking
	// Ensure the DNS records are fresh on startup
	gtimer.AddOnce(500*time.Millisecond, func() {
		// repair DKIM signing config
		err = domains.RepairDKIMSigningConfig(ctx)

		if err != nil {
			g.Log().Warning(ctx, "RepairDKIMSigningConfig failed: ", err)
			err = nil
		}

		domains.FreshRecords(ctx)
		domains.EnsureWebmailCert(ctx)
	})
	// Check DNS Records every 5 minutes, then issue the webmail certificate once its DNS is ready
	gtimer.Add(5*time.Minute, func() {
		domains.FreshRecords(ctx)
		domains.EnsureWebmailCert(ctx)
	})

	// Start maillog analysis
	gtimer.AddOnce(time.Second, func() {
		me := maillog_stat.NewMallogEventHandler("", 1*time.Second)
		me.Start()
	})

	// Start maillog aggregation
	gtimer.AddOnce(time.Second, func() {
		maillog_stat.AggregateMaillogsTask(1 * time.Minute)
	})

	// Start console panel baseurl update timer
	gtimer.AddOnce(100*time.Millisecond, func() {
		domains.UpdateBaseURL(ctx)
	})
	gtimer.Add(5*time.Minute, func() {
		domains.UpdateBaseURL(ctx)
	})

	g.Log().Debug(ctx, "Start timers complete")

	// Fix Postfix main configuration and Rspamd DKIM signing config
	gtimer.AddOnce(5*time.Second, func() {
		mail_service.FixPostfixMainConfig(ctx)
		mail_service.FixRspamdDKIMSigningConfig(ctx)
		mail_service.FixDovecotSSLConfig(ctx)
	})

	// Test the smtp relay configuration connection status
	gtimer.AddOnce(5*time.Second, func() {
		relay.UpdateRelayStatus(ctx)
	})

	gtimer.Add(5*time.Minute, func() {
		relay.UpdateRelayStatus(ctx)
	})
	// 续签证书 首次启动先运行一次
	gtimer.AddOnce(1*time.Second, func() {
		domains.AutoRenewSSL(ctx)
	})

	gtimer.Add(24*time.Hour, func() {
		domains.AutoRenewSSL(ctx)
	})

	// fail2ban access logs detection
	gtimer.AddOnce(800*time.Millisecond, fail2ban.NewAccessLogDetection().Start)

	// First sync of SMTP relay configurations to Postfix after refactoring
	gtimer.AddOnce(3*time.Second, func() {
		relay.CheckRelayFirstSync(ctx)
	})

	// Updated: Used space in the mailbox
	gtimer.AddOnce(20*time.Second, func() {
		mail_boxes.UpdateMailboxesUsedSpace()
	})

	gtimer.Add(60*time.Minute, func() {
		mail_boxes.UpdateMailboxesUsedSpace()
	})

	// Check the email quota and the alert for exceeding the quota
	gtimer.AddOnce(1*time.Minute, func() {
		mail_boxes.CheckMailboxesQuotaAlerts(ctx)
	})

	gtimer.Add(60*time.Minute, func() {
		mail_boxes.CheckMailboxesQuotaAlerts(ctx)
	})

	// Initialize the quota plugin and update the quota usage status of the domain name and email
	gtimer.AddOnce(1*time.Second, func() {
		err := mail_boxes.InitQuotaPluginAndUpdateUsedSpace(ctx)
		if err != nil {
			g.Log().Warning(ctx, "Initialize the quota plugin and update the quota usage status of the domain name and email,  failed: ", err)
			err = nil
		}
	})

	gtimer.AddOnce(1*time.Minute, func() {
		relay.EnsurePostfixConfExists(ctx)
	})

	// Check the domain name blacklist
	gtimer.Add(24*time.Hour, func() {
		domains.CheckDomainsBlacklist(ctx)
	})

	gtimer.Add(24*time.Hour, func() {
		log_maintenance.CompressAndCleanupLogs(ctx)
	})

	g.Log().Debug(ctx, "All timers started successfully")
	return nil
}
