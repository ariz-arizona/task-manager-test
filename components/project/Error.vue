<script setup>
const props = defineProps({
    msg: {
        type: String
    }
});
const { msg } = props;
</script>

<template>
    <a-row>
        <a-col span="24">
            <a-alert type="error" :message="msg" />
        </a-col>
    </a-row>
</template>