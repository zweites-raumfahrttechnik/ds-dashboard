<script lang="ts" setup>
import {
    Card,
    Divider,
    Space,
    Button,
} from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';
import { ref } from 'vue';
import Form from './components/RedisOpBasicForm.vue';
import Success from './components/RedisOpBasicSuccess.vue';
import RedisOpJson from './components/RedisOpJson.vue';
//RedisConnect.vue传递过来的参数
let route = useRoute();
const router = useRouter();
const uuid = route.query.uuid as string;
const ip = route.query.ip as string;
const username = route.query.username as string;
//接收RedisOpForm.vue子组件传递过来的判断操作请求是否成功的数据
const right = ref<boolean>();
const getBasicRight = (num: boolean) => {
    right.value = num;
};
//接收RedisOpForm.vue子组件传递过来的响应数据data
const data = ref();
const getJson = (num: Object) => {
    data.value = num;
};
//接收RedisOpForm.vue和RedisOpSuccess.vue子组件传递过来的表单提交成功信息的数据
const step = ref(0);
const changeStep = (idx: number) => {
    step.value = idx;
};
</script>

<template>
    <PageContainer>
        <div>
            <Card class="general-card" :bordered="false">
                <template #title>redis基本操作</template>
                <template #extra v-if="step===0">
                    <Space :size="18">
                        <Button status="success" @click="() => { router.go(-1) }" style="width: 185px;">
                            <template #icon>
                                <icon-backward />
                            </template>
                            <template #default> 返回上一级 </template>
                        </Button>
                    </Space>
                </template>
                <div class="wrap">
                    <KeepAlive>
                        <Form v-if="step === 0" :uuid="uuid" :ip="ip" :username="username" @change-step="changeStep"
                            @isright="getBasicRight"
                            @getChildren="getJson" />
                        <Success v-else-if="step === 1" @change-step="changeStep" @get-children="getJson" :right="right"/>
                    </KeepAlive>
                </div>
            </Card>
            <Divider direction="horizontal" type="dashed" margin="10px" />
            <Card class="general-card" :bordered="false" :style="{ height: '285px' }" :headStyle="{ color: '#0785fd' }"
                :bodyStyle="{ padding: '0' }">
                <template #title>redis基本操作结果</template>
                <RedisOpJson :data="data" />
            </Card>
        </div>
    </PageContainer>
</template>

<style lang="less" scoped>
.wrap {
    display: center;
    justify-content: left;
    align-items: center;
    padding-top: 24px;
}
</style>
