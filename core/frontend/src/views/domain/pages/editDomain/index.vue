<template>
	<div class="wrapper">
		<n-breadcrumb class="mb-20px">
			<n-breadcrumb-item>
				<router-link to="/domain">{{ $t('domain.edit.breadcrumb.domain') }}</router-link>
			</n-breadcrumb-item>
			<n-breadcrumb-item>{{ domain }}</n-breadcrumb-item>
			<n-breadcrumb-item>{{ $t('domain.edit.breadcrumb.editDomain') }}</n-breadcrumb-item>
		</n-breadcrumb>

		<div class="dynamic-content">
			<n-scrollbar style="height: 100%">
				<DomainConfiguration />
			</n-scrollbar>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'
import { resetAllApiStatus } from './controller/domainConfiguration.controller'
import DomainConfiguration from './components/DomainConfiguration.vue'

const route = useRoute()
const domain = route.params.domain as string

/**
 * Reset api status when router leave
 */
onBeforeRouteLeave(resetAllApiStatus)
</script>

<style scoped lang="scss">
.wrapper {
	display: grid;
	grid-template-rows: 40px 1fr;
	height: calc(100% - 48px);
	box-sizing: border-box;
	padding: 24px;
}

// Dynamic content
.dynamic-content {
	height: calc(100vh - 160px);
	box-sizing: border-box;
	padding: 20px;
}
</style>
