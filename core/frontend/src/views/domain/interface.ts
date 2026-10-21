export interface MailDomainParams {
	page: number
	page_size: number
	keyword: string
}

export interface MailDomain {
	domain: string
	a_record: string
	mailboxes: number
	mailbox_quota: number
	quota: number
	rate_limit: number
	create_time: number
	active: number
	default: number
	email: string
	hasbrandinfo: number
	current_usage: number
	black_check_log: string
	urls: string[]
	dns_records: DomainDnsRecords
	cert_info: DomainCertInfo
	black_check_result: DomainBlackCheckResult
}

export interface DomainBlackCheckResult {
	time: number
	results: string
	ip: string
	tested: number
	passed: number
	invalid: number
	blacklisted: number
	black_list: Array<{
		blacklist: string
		response: string
		time: number
	}>
}

export type DomainDnsRecords = {
	[key: string]: {
		type: string
		host: string
		value: string
		valid: boolean
	}
}

export type DomainCertInfo = {
	subject: string
	issuer: string
	not_before: string
	not_after: string
	dns: string[]
	endtime: number
	key_pem: string
	cert_pem: string
}
