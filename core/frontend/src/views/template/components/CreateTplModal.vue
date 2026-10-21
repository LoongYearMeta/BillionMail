<template>
	<n-modal
		v-model:show="show"
		preset="card"
		draggable
		:close-on-esc="false"
		:mask-closable="false"
		segmented
		class="w-110"
		title="">
		<div class="wrapper">
			<div class="creation-methods">
				<div
					v-for="(item, index) in methodsList"
					:key="index"
					:class="['choose-item', { active: choosedMethod == item }]"
					@click="choosedMethod = item">
					<span class="item-label">{{ item }}</span>
				</div>
			</div>
		</div>

		<template #footer>
			<div class="flex justify-end">
				<n-button type="primary" @click="createTemplate">{{
					$t('template.createTpl.create')
				}}</n-button>
			</div>
		</template>
	</n-modal>
</template>

<script setup lang="ts">
const methodsList = ['Drag', 'HTML']
const choosedMethod = ref('Drag')
const show = ref(false)
const emits = defineEmits(['confirmType'])

/**
 * @description open modal
 */
function open() {
	show.value = true
}

/**
 * @description close modal
 */
function close() {
	show.value = false
}

/**
 * @description Create with the chosen editor
 */
function createTemplate() {
	emits('confirmType', choosedMethod.value)
	close()
}

defineExpose({
	open,
	close,
})
</script>

<style scoped lang="scss">
@use '@/styles/index' as base;

.wrapper {
	@include base.col-flex-center;
	height: 153px;
	gap: 20px;

	.creation-methods {
		@include base.row-flex-center;
		border-bottom: 1px solid var(--color-border-1);
		width: 90%;
		gap: 25px;

		.choose-item {
			@include base.row-flex-start;
			gap: 5px;
			padding: 6px 15px;
			align-items: center;
			cursor: pointer;
			color: var(--color-text-2);
			transition: 0.1s all ease-in-out;
			box-sizing: border-box;

			.item-label {
				font-size: 16px;
				transition: 0.2s all ease-in-out;
			}

			&:hover {
				color: var(--color-primary-1);
				// transform: scale(1.3) translate(0, -5px);
			}

			&.active {
				color: var(--color-primary-1);
				transform: scale(1.3) translate(0, -5px);
				font-weight: bold;
				border-bottom: 2px solid var(--color-primary-1);
			}
		}
	}
}
</style>
