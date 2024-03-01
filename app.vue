<script setup lang="ts">
import('assets/main.scss')
import variables from 'assets/variables.module.scss'
import { theme } from 'ant-design-vue';
</script>
<template>
  <a-config-provider :theme="{
    algorithm: theme.defaultAlgorithm,
    token: {
      fontFamily: variables.font,
      colorBgBase: variables.colorBgBase,
      colorError: variables.colorError,
      colorInfo: variables.colorInfo,
      colorPrimary: variables.colorPrimary,
    }
  }">
    <div class="container">
      <a-row class="header" align="middle">
        <a-col span="4">
          <Icon name="ri:todo-fill" class="header-logo"  />
        </a-col>
        <a-col span="20">MENU</a-col>
      </a-row>
      <div class="content">
        <NuxtPage />
      </div>
    </div>
  </a-config-provider>
</template>
