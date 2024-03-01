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
      colorPrimary: variables.colorPrimary,
      colorError: variables.colorError,
      colorInfo: variables.colorInfo,
    }
  }">
    <div class="container">
      <Header />
      <div class="content">
        <NuxtPage />
      </div>
    </div>
  </a-config-provider>
</template>
