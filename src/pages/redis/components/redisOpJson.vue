<!--json字符串美化组件-->
<script lang="ts" setup>
import {
    CollapseItem,
} from '@arco-design/web-vue';
import { json } from 'stream/consumers';

const props = defineProps({
    data: Object
})
// function syntaxHighlight(json: string | Record<string, any> | undefined) {
//     if (typeof json != 'string') {
//         json = JSON.stringify(json, undefined, 2);
//     }
//     json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
//     return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match: string) {
//         var cls = 'number';
//         if (/^"/.test(match)) {
//             if (/:$/.test(match)) {
//                 cls = 'key';
//             } else {
//                 cls = 'string';
//             }
//         } else if (/true|false/.test(match)) {
//             cls = 'boolean';
//         } else if (/null/.test(match)) {
//             cls = 'null';
//         }
//         return '<span class="' + cls + '">' + match + '</span>';
//     });
// }
// var formattedJSON='';
// onMounted(()=>{
//     formattedJSON = syntaxHighlight(props.data)
// })
</script>

<template>
    <div style="position:relative;">
        <span>
            <pre>{{ JSON.stringify(props.data, null, 4)  }}</pre>
        </span>
    </div>
</template>

