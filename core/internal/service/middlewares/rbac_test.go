package middlewares

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPathToRouteInfo(t *testing.T) {
	tests := []struct {
		name         string
		path         string
		wantModule   string
		wantAction   string
		wantResource string
	}{
		// Standard CRUD operations
		{"domains list", "/api/domains/list", "domains", "read", "domains"},
		{"domains detail", "/api/domains/detail/1", "domains", "read", "domains"},
		{"domains create", "/api/domains/create", "domains", "create", "domains"},
		{"domains update", "/api/domains/update", "domains", "update", "domains"},
		{"domains delete", "/api/domains/delete", "domains", "delete", "domains"},

		// All modules
		{"account", "/api/account/list", "account", "read", "account"},
		{"role", "/api/role/list", "role", "read", "role"},
		{"permission", "/api/permission/list", "permission", "read", "permission"},
		{"mail_boxes", "/api/mail_boxes/list", "mail_boxes", "read", "mail_boxes"},
		{"overview", "/api/overview/list", "overview", "read", "overview"},
		{"dockerapi", "/api/dockerapi/list", "dockerapi", "read", "dockerapi"},
		{"files", "/api/files/list", "files", "read", "files"},
		{"languages", "/api/languages/list", "languages", "read", "languages"},
		{"mail_services", "/api/mail_services/list", "mail_services", "read", "mail_services"},
		{"relay", "/api/relay/list", "relay", "read", "relay"},
		{"settings", "/api/settings/list", "settings", "read", "settings"},
		{"operation_log", "/api/operation_log/list", "operation_log", "read", "operation_log"},

		// Non-standard actions pass through
		{"custom action", "/api/domains/sync", "domains", "sync", "domains"},
		{"custom action 2", "/api/relay/test", "relay", "test", "relay"},

		// Edge cases
		{"empty path", "", "", "", ""},
		{"root only", "/", "", "", ""},
		{"no module match", "/api/unknown/list", "", "read", "unknown"},
		{"module as suffix", "/api/domains", "domains", "", ""},
		{"nested path", "/api/mail_boxes/something/extra", "mail_boxes", "something", "mail_boxes"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			module, action, resource := PathToRouteInfo(tt.path)
			assert.Equal(t, tt.wantModule, module, "module")
			assert.Equal(t, tt.wantAction, action, "action")
			assert.Equal(t, tt.wantResource, resource, "resource")
		})
	}
}
