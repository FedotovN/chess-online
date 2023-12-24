<script setup lang="ts">
const textarea: Ref<HTMLTextAreaElement | null> = ref(null);
const initialHeight = ref('');
onMounted(() => {
  if (!textarea.value) return;
  initialHeight.value = textarea.value.style.height;
})
defineExpose({ checkHeight });
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update', value: string): void
  (e: 'enter'): void
}>();
const props = withDefaults(defineProps<{
  modelValue?: string,
  value?: string,
  maxHeight?: number,
}>(), { maxHeight: 200 });
const localValue = computed({
  get() {
    return props.modelValue || props.value || ''
  },
  set(v) {
    update(v);
  }
});
function checkHeight() {
  if (!textarea.value) return;
  const roundHeight = (h: number) => { return h > props.maxHeight ? props.maxHeight : h }
  textarea.value.style.height = initialHeight.value;
  const { scrollHeight } = textarea.value;
  textarea.value.style.height = roundHeight(scrollHeight) + 'px'
}
function update(v: string) {
  emit('update:modelValue', v);
  emit('update', v);
  nextTick(() => checkHeight());
}
function onEnter(e: KeyboardEvent) {
  e.preventDefault();
  if (e.shiftKey) update(localValue.value + '\n');
  else emit('enter');
  nextTick(() => checkHeight());
}
</script>
<template>
  <div class="w-full">
    <textarea ref="textarea" v-model="localValue"
      class="w-full resize-none appearance-none border border-neutral-600 rounded overflow-hidden outline-none bg-neutral-700 text-gray-300 h-[30px] px-2"
      @keydown.enter="onEnter" />
  </div>
</template>