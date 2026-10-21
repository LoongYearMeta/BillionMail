<template>
	<div class="content-wrapper">
		<div>
			<n-card>
				<div class="page-tit mb-5">
					<div class="left-tit">
						<div class="back-tool">
							<i class="i-cuida:mail-outline text-28px"></i>
						</div>
						<span class="tit-content">{{ $t('domain.edit.domainConfiguration.title') }}</span>
					</div>
				</div>
				<!-- form data -->
				<n-form>
					<n-form-item :label="$t('domain.edit.domainConfiguration.domain')">
						<n-input v-model:value="domainTit" :disabled="true"></n-input>
					</n-form-item>
					<n-form-item label="Hostname">
						<n-input v-model:value="hostname"></n-input>
					</n-form-item>
					<n-form-item :label="$t('domain.edit.domainConfiguration.catchAll')">
						<div class="flex-1">
							<div class="mb-12px text-desc">
								* {{ $t('domain.edit.domainConfiguration.catchAllDesc') }}
							</div>
							<n-input v-model:value="catch_email"></n-input>
						</div>
					</n-form-item>
					<n-form-item :label="$t('domain.edit.domainConfiguration.domainQuota')">
						<div class="flex-1">
							<div class="mb-12px text-desc">
								* {{ $t('domain.edit.domainConfiguration.domainQuotaDesc') }}
							</div>
							<div class="flex gap-16px">
								<div class="flex-1">
									<n-input v-model:value="quota"></n-input>
								</div>
								<div class="w-80px">
									<n-select v-model:value="unit" :options="uintOptions"></n-select>
								</div>
							</div>
						</div>
					</n-form-item>
					<n-form-item :label="$t('domain.edit.domainConfiguration.mailboxCount')">
						<div class="flex-1">
							<div class="mb-12px text-desc">
								* {{ $t('domain.edit.domainConfiguration.mailboxCountDesc') }}
							</div>
							<n-input-number v-model:value="mailboxes" class="w-full" :show-button="false">
							</n-input-number>
						</div>
					</n-form-item>
				</n-form>
			</n-card>

			<n-button type="primary" class="w-100% mt-5" @click="updateDomain">
				<template #icon>
					<i class="i-mingcute:save-2-line text-5"></i>
				</template>
				{{ $t('domain.edit.save') }}
			</n-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { getDomainDetail, updateDomain } from '../controller/domainConfiguration.controller'
import { getEditDomainStoreData } from '../store'

const { domainTit, hostname, quota, unit, mailboxes, catch_email } = getEditDomainStoreData()

const route = useRoute()

const domain = route.params.domain as any

const uintOptions = ref([
	{
		label: 'B',
		value: 'B',
	},
	{
		label: 'KB',
		value: 'KB',
	},
	{
		label: 'MB',
		value: 'MB',
	},
	{
		label: 'GB',
		value: 'GB',
	},
	{
		label: 'TB',
		value: 'TB',
	},
])

getDomainDetail(domain)
</script>

<style scoped lang="scss">
@use './mixin.scss' as mixin;

.content-wrapper {
	@include mixin.content-wrapper;
	padding-bottom: 32px;

	// title
	.page-tit {
		@include mixin.page-tit;
	}

	.form-label {
		@include mixin.form-label;
	}
}
</style>
