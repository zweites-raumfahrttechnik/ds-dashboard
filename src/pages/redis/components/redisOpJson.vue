<!--json字符串美化组件,可完善-->
<script lang="ts" setup>
const props = defineProps({
    data: Object
})
</script>

<template>
    <div style="position:relative;">
        <span>
            <pre>{{ JSON.stringify(props.data, null, 4)  }}</pre>
        </span>
    </div>
</template>

