<script lang="ts" setup>
import {
    Card,
    Divider,
    Space,
    Button
} from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';
import { ref, watch } from 'vue';
import Form from './components/redisOpForm.vue';
import Success from './components/redisOpSuccess.vue';
import RedisOpJson from './components/redisOpJson.vue';
let route = useRoute();
const router = useRouter();
const uuid = route.query.uuid as string;

const json1 = ref();
const getJson = (num: Object) => {
    json1.value = num;
};
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
                <template #extra>
                    <Space :size="18">
                        <Button type="text" size="medium" @click="()=>{router.go(-1)}">
                            <template #icon>
                                <icon-backward />
                            </template>
                            <template #default>返回上一级</template>
                        </Button>
                    </Space>
                </template>
                <div class="wrap">
                    <KeepAlive>
                        <Form v-if="step === 0" :uuid="uuid" @change-step="changeStep" @getChildren="getJson" />
                        <Success v-else-if="step === 1" @change-step="changeStep" @get-children="getJson" />
                    </KeepAlive>
                </div>
            </Card>
            <Divider direction="horizontal" type="dashed" margin="10px" />
            <Card class="general-card" :bordered="false">
                <template #title>redis基本操作结果</template>
                <RedisOpJson :data="json1" />
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
