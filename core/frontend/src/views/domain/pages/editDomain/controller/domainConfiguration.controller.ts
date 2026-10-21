import { instance } from '@/api'
import { getEditDomainStoreData } from '../store'
import { getByteUnit, isObject } from '@/utils'
import { MailDomain } from '@/views/domain/interface'

const instanceOptions = {
	fetchOptions: {
		loading: 'Loading... Please wait.',
		successMessage: true,
	},
}

/**
 * @description Get domain detail
 */
export async function getDomainDetail(domain: string) {
	const {
		domainTit,
		hostname,
		quota,
		unit,
		mailboxes,
		catch_email,
		hasGotDomainConfiguration,
	} = getEditDomainStoreData()
	if (hasGotDomainConfiguration.value) return
	try {
		const res = await instance.get('/domains/list', {
			params: { keyword: domain, page: 1, page_size: 1 },
		})
		if (isObject<{ list: MailDomain[] }>(res)) {
			const { list } = res
			const quotaAndUnit = getByteUnit(list[0].quota, true, 2).split(' ')
			domainTit.value = list[0].domain
			hostname.value = list[0].a_record
			quota.value = quotaAndUnit[0]
			unit.value = quotaAndUnit[1]
			mailboxes.value = list[0].mailboxes
			catch_email.value = list[0].email
			hasGotDomainConfiguration.value = true
		}
	} catch (error) {
		console.warn(error)
	}
}

/**
 * @description Update domain
 */
export async function updateDomain() {
	const { domainTit, hostname, quota, unit, mailboxes, catch_email } = getEditDomainStoreData()
	const quotaParam = calcBaseUnits(Number(quota.value), unit.value)

	try {
		await instance.post(
			'/domains/update',
			{
				domain: domainTit.value,
				mailboxes: mailboxes.value,
				mailboxQuota: quotaParam,
				quota: quotaParam,
				rateLimit: 1,
				active: 1,
				email: catch_email.value,
				hostname: hostname.value,
			},
			instanceOptions
		)
	} catch (error) {
		console.warn(error)
	}
}

/**
 * @description Calculate based on units
 */
function calcBaseUnits(quota: number, unit: string) {
	switch (unit) {
		case 'KB':
			return quota * 1024
		case 'MB':
			return quota * 1024 * 1024
		case 'GB':
			return quota * 1024 * 1024 * 1024
		case 'TB':
			return quota * 1024 * 1024 * 1024 * 1024
		default:
			return quota
	}
}

/**
 * @description Reset api status when router leave
 */
export function resetAllApiStatus() {
	const { hasGotDomainConfiguration } = getEditDomainStoreData()
	hasGotDomainConfiguration.value = false
}
