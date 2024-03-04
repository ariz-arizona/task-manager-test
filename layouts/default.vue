<script setup lang="ts">
import 'assets/main.scss'
import variables from 'assets/variables.module.scss'
import { theme } from 'ant-design-vue';

const todos = useTodoStore()
const route = useRoute()

onMounted(() => { todos.fetch(!!route.query.page_error) })
</script>

<template>
    <div>
        <a-config-provider :theme="{
            algorithm: theme.defaultAlgorithm,
            token: {
                fontFamily: variables.font,
                colorPrimary: variables.colorPrimary,
                colorError: variables.colorError,
                colorInfo: variables.colorInfo,
            },
            components: {
                Menu: {
                    colorItemBgSelected: 'rgba(0, 0, 0, 0.06)'
                }
            }
        }">
            <div class="container">
                <a-row :gutter="24">
                    <a-col span="24">
                        <Header />
                    </a-col>
                    <a-col :xs="24" :md="8" :lg="6">
                        <Menu />
                    </a-col>
                    <a-col :xs="24" :md="16" :lg="18">
                        <div class="content">
                            <slot />
                        </div>
                    </a-col>
                </a-row>
            </div>
        </a-config-provider>
    </div>
</template>
