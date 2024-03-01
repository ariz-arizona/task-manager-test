<script setup lang="ts">
import type { MenuProps, ItemType } from 'ant-design-vue';
const items = ref<MenuProps['items']>([
    {
        key: '/test',
        label: 'Тестовая страница',
    },
    {
        key: '/technical',
        label: 'Техническое задание',
    }
])
const route = useRoute()

const handleMenuClick: MenuProps['onClick'] = (e: ItemType) => {
    if (e && e.key && e.key !== route.path) {
        navigateTo(e.key.toString())
    }
}
</script>
<template>
    <a-row class="header" align="middle">
        <a-col span="4">
            <NuxtLink to="/">
                <Icon name="ri:todo-fill" class="header-logo" />
            </NuxtLink>
        </a-col>
        <a-col span="20">
            <a-menu :items="items" mode="horizontal" :selected-keys="[route.path]" @click="handleMenuClick" />
        </a-col>
    </a-row>
</template>