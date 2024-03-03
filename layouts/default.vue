<script setup lang="ts">
import 'assets/main.scss'
import variables from 'assets/variables.module.scss'
import { theme } from 'ant-design-vue';
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
                    <a-col span="6">
                        <Menu />
                    </a-col>
                    <a-col span="18">
                        <div class="content">
                            <slot />
                        </div>
                    </a-col>
                </a-row>
            </div>
        </a-config-provider>
    </div>
</template>
