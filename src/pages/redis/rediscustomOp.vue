<script lang="ts" setup>
import {
    Card,
    Divider,
    Space,
    Button
} from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';
import { ref, watch } from 'vue';
import RedisOpJson from './components/redisOpJson.vue';
import CustomForm from './components/redisOpCustomForm.vue';
import CustomSuccess from './components/redisOpCustomSuccess.vue';
let route = useRoute();
const router = useRouter();
const uuid = route.query.uuid as string;
const ip = route.query.ip as string;
const username = route.query.username as string;
//console.log(uuid);
const customJson1 = ref();
const getCustomJson = (num: Object) => {
    customJson1.value = num;
};
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
                <template #extra>
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
                            @change-step="changeCustomStep" @getChildren="getCustomJson" />
                        <CustomSuccess v-else-if="customStep === 1" @change-step="changeCustomStep"
                            @get-children="getCustomJson" />
                    </KeepAlive>
                </div>
            </Card>
            <Divider direction="horizontal" type="dashed" margin="10px" />
            <Card class="general-card" :bordered="false" :style="{ height: '280px' }">
                <template #title>redis自定义操作结果</template>
                <RedisOpJson :data="customJson1" />
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
