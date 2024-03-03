<script setup lang="ts">
import type { MenuProps, ItemType } from 'ant-design-vue';

const items = <MenuProps['items']>[
    {
        key: '/',
        label: 'Главная',
        children: [
            {
                key: '/',
                label: 'Главная с данными',
            },
            {
                key: '/?page_error=1',
                label: 'Главная с ошибкой получения страниц',
            },
        ],
    },
    {
        key: '/test',
        label: 'Тестовая страница',
    },
    {
        key: '/technical',
        label: 'Техническое задание',
    }
]
const route = useRoute()
const error = useError()

const handleMenuClick: MenuProps['onClick'] = (e: ItemType) => {
    if (e && e.key && e.key !== route.fullPath) {
        navigateTo(e.key.toString())
    }
}
</script>

<template>
    <div>
        <a-menu v-bind:items="items" mode="inline" :selected-keys="error?.message ? [] : [route.fullPath]"
            :open-keys="[route.path]" @click="handleMenuClick" :force-sub-menu-render="true">
        </a-menu>
    </div>
</template>