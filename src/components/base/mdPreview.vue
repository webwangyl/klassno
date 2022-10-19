<template>
    <v-md-editor v-if="text" v-model="text" mode="preview"></v-md-editor>
</template>

<script lang="ts" setup>
defineProps<{
    text: string,
}>()
</script>
