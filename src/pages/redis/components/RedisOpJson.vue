<script lang="ts" setup>
const props = defineProps<{
  data: Record<string, unknown>;
}>();
</script>

<template>
  <div style="position: relative">
    <span>
      <pre>{{ JSON.stringify(props.data, null, 4) }}</pre>
    </span>
  </div>
</template>
