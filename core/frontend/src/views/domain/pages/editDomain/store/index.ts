import { defineStore, storeToRefs } from 'pinia'

const editDomainStore = defineStore('editDomainStore', () => {
	const hasGotDomainConfiguration = ref(false)
	const domainTit = ref('')
	const hostname = ref('')
	const quota = ref('0')
	const unit = ref('B')
	const mailboxes = ref(0)
	const catch_email = ref('')

	return {
		hasGotDomainConfiguration,
		domainTit,
		hostname,
		quota,
		unit,
		mailboxes,
		catch_email,
	}
})

export function getEditDomainStoreData() {
	const store = editDomainStore()
	return {
		...storeToRefs(store),
	}
}
