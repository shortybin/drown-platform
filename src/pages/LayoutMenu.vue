<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <router-link to="/" class="layout-header__logo">
        <h1 class="title">{{ PROJECT_NAME }}</h1>
      </router-link>
      <el-dropdown class="layout-header__dropdown" trigger="click">
        <div class="flex items-center">
          <span class="user-name">{{ username }}</span>
          <el-icon><CaretBottom /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item @click="changePassWord"
              >修改密码</el-dropdown-item
            > -->
            <el-dropdown-item divided @click="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>

    <el-container style="overflow: hidden">
      <div class="aside-scrollbar">
        <el-scrollbar class="aside-scrollbar">
          <el-menu
            :collapse="collapse"
            :active-text-color="activeTextColor"
            :background-color="backgroundColor"
            :text-color="textColor"
            :default-active="activeMenu"
            router
            mode="vertical"
            class="aside-menu"
          >
            <template v-for="r in menus" :key="r.path">
              <template v-if="!r.hidden">
                <template
                  v-if="
                    !r.children ||
                    !r.children.length ||
                    r.children.filter((v) => !v.hidden).length === 0
                  "
                >
                  <el-menu-item :index="r.redirect || r.path">
                    <el-icon v-if="r.meta && r.meta.icon">
                      <component :is="r.meta.icon"></component>
                    </el-icon>
                    <template #title> {{ resolveRouteTitle(r) }}</template>
                  </el-menu-item>
                </template>
                <template v-else>
                  <el-sub-menu :index="r.path">
                    <template #title>
                      <el-icon v-if="r.meta && r.meta.icon">
                        <component :is="r.meta.icon"></component>
                      </el-icon>
                      <span>{{ resolveRouteTitle(r) }}</span>
                    </template>
                    <template v-for="child in r.children" :key="child.path">
                      <!-- 重复 -->
                      <template v-if="!child.hidden">
                        <el-menu-item :index="resolvePath(child.path, r.path)">
                          <el-icon v-if="child.meta && child.meta.icon">
                            <component :is="child.meta.icon"></component>
                          </el-icon>
                          <span>{{ resolveRouteTitle(child) }}</span>
                        </el-menu-item>
                      </template>
                    </template>
                  </el-sub-menu>
                </template>
              </template>
            </template>
          </el-menu>
        </el-scrollbar>
        <div class="el-menu-item menu-expand" @click="collapse = !collapse">
          <el-icon v-show="collapse"><Expand /></el-icon>
          <el-icon v-show="!collapse"><Fold /></el-icon>
        </div>
      </div>

      <div class="main-container">
        <el-breadcrumb class="app-breadcrumb" separator="/">
          <transition-group name="breadcrumb">
            <el-breadcrumb-item
              v-for="(item, index) in levelList"
              :key="index"
              :to="{ path: item.path }"
            >
              {{ item.meta.title }}
            </el-breadcrumb-item>
          </transition-group>
        </el-breadcrumb>
        <el-scrollbar id="main-scrollbar">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component
                :is="Component"
                v-if="$route.meta.keepAlive"
                :key="$route.path"
              />
            </keep-alive>
            <component :is="Component" v-if="!$route.meta.keepAlive" />
          </router-view>
        </el-scrollbar>
      </div>
    </el-container>
  </el-container>
</template>

<script setup>
import { PROJECT_NAME } from '@constants/index';
import { useUserStore } from '@store/user';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 用户信息
const userStore = useUserStore();
const username = computed(() => userStore.username),
  logout = userStore.logout;

// 路由菜单
const router = useRouter(),
  route = useRoute();

function isMobileDevice() {
  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  return screenWidth < 768; // 根据需要自定义移动设备的屏幕宽度阈值
}
const collapse = ref(isMobileDevice()),
  backgroundColor = '#4a5568',
  activeTextColor = '#409EFF',
  textColor = '#FFF';

const menus = computed(
  () => router.options.routes.find((v) => v.path === '/').children
);
const activeMenu = computed(() => route.path);

function resolveRouteTitle(route) {
  return route.meta?.title;
}
function resolvePath(path, parentPath = '') {
  if (path.startsWith('/')) return path;
  return `${parentPath}/${path}`.replace(/\/+/g, '/');
}

// 修改密码
// eslint-disable-next-line no-unused-vars
function changePassWord() {
  router.push('/password');
}

// 面包屑
const levelList = ref([]);
watch(
  () => router.currentRoute.value,
  () => getBreadcrumb(),
  { immediate: true }
);
function getBreadcrumb() {
  levelList.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
}
</script>

<style scoped>
#main-scrollbar {
  height: calc(100% - 45px);
}
.app-breadcrumb {
  padding: 15px 20px;
  /* height: 45px; */
  box-sizing: border-box;
}
.layout-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.layout-container .aside-menu {
  border-right: none;
}

.layout-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--el-border-color);
}
.layout-header__logo {
  display: flex;
  vertical-align: bottom;
  align-items: center;
}
.title-img {
  height: 28px;
  margin-right: 8px;
}
.title {
  font-weight: 900;
  font-size: 20px;
}
.layout-header__dropdown {
  display: flex;
  align-items: center;
}
.user-img {
  height: 2rem;
  display: inline-block;
}
.user-name {
  margin: 6px;
}
.main-container {
  width: 100%;
  background-color: #f5f7fa;
  overflow: hidden;
}
:deep(.el-scrollbar__view) {
  height: 100%;
}
.aside-scrollbar {
  background-color: #4a5568;
  color: #fff;
  flex-shrink: 0;
  position: relative;
  padding-bottom: 40px;
}
.menu-expand {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  color: #fff;
  justify-content: flex-end;
  flex-shrink: 0;
  background-color: #4a5568;
}
.menu-expand:hover {
  background: #3b4453;
}
.aside-menu:not(.el-menu--collapse) {
  min-width: 180px;
  width: 280px;
  max-width: 280px;
  min-height: 400px;
}

.app-breadcrumb :deep(.el-breadcrumb__inner) {
  /* font-size: 24px; */
  font-weight: 400;
}

.app-breadcrumb :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  font-weight: bold;
  color: #303133;
}

.app-breadcrumb :deep(.el-breadcrumb__separator) {
  margin: 0 1px;
}
</style>
