<script setup lang="ts">
import type { MenuProps, ItemType } from 'ant-design-vue';

const todos = useTodoStore()
const route = useRoute()
const error = useError()

const items = computed(() => {
    const menu = <MenuProps['items']>[
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
                    label: 'Ошибка получения данных',
                },
            ],
        },
        {
            key: '/test',
            label: 'Тестовая страница (проверка 404)',
        },
        {
            key: '/technical',
            label: 'Техническое задание',
            icon: false
        }
    ]
    return menu
})

const handleMenuClick: MenuProps['onClick'] = (e: ItemType) => {
    if (e && e.key) {
        navigateTo(e.key.toString())
    }
}
</script>

<template>
    <div>
        <ClientOnly>
            <a-menu v-bind:items="items" mode="inline" :selected-keys="error?.message ? [] : [route.fullPath]"
                :open-keys="[route.path]" @click="handleMenuClick" :force-sub-menu-render="true">
            </a-menu>
        </ClientOnly>
    </div>
</template>