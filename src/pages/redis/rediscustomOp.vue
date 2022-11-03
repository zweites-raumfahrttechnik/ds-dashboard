<script lang="ts" setup>
import {
    Card,
    Divider,
    Space,
    Button
} from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';
import { ref } from 'vue';
import RedisOpJson from './components/RedisOpJson.vue';
import CustomForm from './components/RedisOpCustomForm.vue';
import CustomSuccess from './components/RedisOpCustomSuccess.vue';
//RedisConnect.vue传递过来的参数
let route = useRoute();
const router = useRouter();
const uuid = route.query.uuid as string;
const ip = route.query.ip as string;
const username = route.query.username as string;
//接收RedisOpCustomForm.vue子组件传递过来的判断操作请求是否成功的数据
const right=ref<boolean>();
const getCustomright = (num: boolean) => {
    right.value = num;
};
//接收RedisOpCustomForm.vue子组件传递过来的响应数据data
const data = ref();
const getCustomJson = (num: Object) => {
    data.value = num;
};
////接收RedisOpForm.vue和RedisOpSuccess.vue子组件传递过来的表单提交成功信息的数据
const customStep = ref(0);
const changeCustomStep = (idx: number) => {
    customStep.value = idx;
};
</script>

<template>
    <PageContainer>
        <div>
            <Card class="general-card" :bordered="false">
                <template #title>redis自定义操作</template>
                <template #extra v-if="customStep===0">
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
                        <CustomForm v-if="customStep === 0" :uuid="uuid" :ip="ip" :username="username"
                            @change-step="changeCustomStep" @getChildren="getCustomJson" @isright="getCustomright"/>
                        <CustomSuccess v-else-if="customStep === 1" @change-step="changeCustomStep"
                            @get-children="getCustomJson" :right="right"/>
                    </KeepAlive>
                </div>
            </Card>
            <Divider direction="horizontal" type="dashed" margin="10px" />
            <Card class="general-card" :bordered="false" :style="{ height: '285px' }">
                <template #title>redis自定义操作结果</template>
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
