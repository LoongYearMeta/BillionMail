export type MailOverview = {
	dashboard: MailDashboard
	mail_providers: MailProvider[]
	send_mail_chart: SendMail
	bounce_rate_chart: MailRateChart<BounceRateData>
}

export type MailDashboard = {
	bounce_rate: number
	bounced: number
	delivered: number
	delivery_rate: number
	sends: number
	delayed_queue: number
}

export type MailProvider = {
	bounce_rate: number
	bounced: number
	delivered: number
	delivery_rate: number
	mail_provider: string
	sends: number
}

export type SendMail = {
	column_type: string
	dashboard: {
		delivered: number
		delivery_rate: number
		failed: number
		failure_rate: number
		sends: number
	}
	data: SendMailData[]
}

export type SendMailData = {
	delivered: number
	failed: number
	sends: number
	x: number
}

export type MailRateChart<T> = {
	column_type: string
	data: T[]
}

export type BounceRateData = {
	bounce_rate: number
	x: number
}

// 定义rate类型
interface RateItem {
	label: string
	value: number
	unit: string
}

// 定义rate数据
export type RateData = Record<string, RateItem>

export type Failed = {
	postfix_message_id: string
	sender: string
	recipient: string
	status: string
	dsn: string
	relay: string
	description: string
	delay: string
	delays: string
	log_time: string
	tooltip: boolean
}
