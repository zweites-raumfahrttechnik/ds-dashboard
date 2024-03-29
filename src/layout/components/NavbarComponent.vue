<script lang="ts" setup>
import {
  Space,
  TypographyTitle,
  Tooltip,
  Button,
  Dropdown,
  Avatar,
  Doption,
} from '@arco-design/web-vue';
import {
  IconMenuFold,
  IconMoonFill,
  IconSunFill,
  IconFullscreen,
  IconFullscreenExit,
  IconSettings,
  IconExport,
} from '@arco-design/web-vue/es/icon';
import Logo from '@/assets/login/logo.svg';
import AvatarImg from '@/assets/avatar.jpg';
import { useAppModel, useUserModel } from '@/model';

const router = useRouter();

const { state, toggleTheme: appToggleTheme, toggleSettingVisible } = useAppModel();
const { clearUser } = useUserModel();

const toggleDrawerMenu = inject('toggleDrawerMenu') as () => void;

const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged: (dark: boolean) => {
    appToggleTheme(dark);
  },
});

const toggleTheme = useToggle(isDark);
const handleToggleTheme = () => {
  toggleTheme();
};

const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();

const handleLogout = () => {
  clearUser();
  router.replace({ name: 'Login' });
};
</script>

<template>
  <div class="navbar">
    <div class="left-side">
      <Space>
        <img alt="logo" :src="Logo" />
        <TypographyTitle :style="{ margin: 0, fontSize: '18px' }" :heading="5">
          {{ state.title }}
        </TypographyTitle>
        <IconMenuFold
          v-if="state.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </Space>
    </div>

    <ul class="right-side">
      <li>
        <Tooltip :content="state.theme === 'dark' ? '点击切换到亮色模式' : '点击切换到暗色模式'">
          <Button class="nav-btn" type="outline" :shape="'circle'" @click="handleToggleTheme">
            <template #icon>
              <IconMoonFill v-if="state.theme === 'dark'" />
              <IconSunFill v-else />
            </template>
          </Button>
        </Tooltip>
      </li>

      <li>
        <Tooltip :content="isFullscreen ? '点击退出全屏模式' : '点击切换全屏模式'">
          <Button class="nav-btn" type="outline" :shape="'circle'" @click="toggleFullScreen">
            <template #icon>
              <IconFullscreenExit v-if="isFullscreen" />
              <IconFullscreen v-else />
            </template>
          </Button>
        </Tooltip>
      </li>

      <li>
        <Tooltip :content="'页面设置'">
          <Button class="nav-btn" type="outline" :shape="'circle'" @click="toggleSettingVisible">
            <template #icon>
              <IconSettings />
            </template>
          </Button>
        </Tooltip>
      </li>

      <li>
        <Dropdown trigger="click">
          <Avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer' }">
            <img alt="avatar" :src="AvatarImg" />
          </Avatar>
          <template #content>
            <!-- <Doption>
              <Space>
                <IconUser />
                <span>用户中心</span>
              </Space>
            </Doption>

            <Doption>
              <Space>
                <IconSettings />
                <span>用户设置</span>
              </Space>
            </Doption> -->

            <Doption @click="handleLogout">
              <Space>
                <IconExport />
                <span>退出登录</span>
              </Space>
            </Doption>
          </template>
        </Dropdown>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }
}
</style>
