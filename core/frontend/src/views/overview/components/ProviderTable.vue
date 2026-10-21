<template>
	<div class="provider-table">
		<n-data-table :columns="columns" :data="tableData" :max-height="320"> </n-data-table>
	</div>
</template>

<script setup lang="ts">
import { DataTableColumns, NDataTable } from 'naive-ui'
import { MailProvider } from '../types'

const { t } = useI18n()

const tableData = defineModel<MailProvider[]>('value')

const getRate = (val: number) => {
	return val >= 0 ? `${val}%` : '--'
}

const columns = ref<DataTableColumns<MailProvider>>([
	{
		key: 'mail_provider',
		title: t('overview.provider.mailProvider'),
		ellipsis: {
			tooltip: true,
		},
	},
	{
		key: 'delivery_rate',
		title: t('overview.provider.delivered'),
		render: row => {
			return getRate(row.delivery_rate)
		},
	},
	{
		key: 'bounce_rate',
		title: t('overview.provider.bounce'),
		render: row => {
			return getRate(row.bounce_rate)
		},
	},
])
</script>
