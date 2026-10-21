package consts

import (
	"reflect"
	"sync"
)

var (
	LOGTYPE = struct {
		Domain       string
		Mailboxes    string
		SMTP         string
		Settings     string
		Service      string
		BCC          string
		MailForward  string
		DockerApi    string
		Language     string
		Login        string
		PostfixQueue string
	}{
		Domain:       "Domain",
		Mailboxes:    "Mailboxes",
		SMTP:         "SMTP Relay",
		Settings:     "Settings-Common",
		Service:      "Settings-Service",
		BCC:          "Settings-BCC",
		MailForward:  "Settings-Mail Forward",
		DockerApi:    "Docker Api",
		Language:     "Language",
		Login:        "Login",
		PostfixQueue: "Postfix Queue",
	}
)
var (
	logTypeMapOnce sync.Once
	logTypeMap     map[string]string
)

func GetLogTypeMap() map[string]string {
	logTypeMapOnce.Do(func() {
		logTypeMap = make(map[string]string)
		val := reflect.ValueOf(LOGTYPE)
		typ := val.Type()

		for i := 0; i < typ.NumField(); i++ {
			field := typ.Field(i)
			value := val.Field(i).String()
			logTypeMap[field.Name] = value
		}
	})
	return logTypeMap
}
