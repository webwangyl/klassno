<template>
    <v-md-preview v-if="text" :text="text"></v-md-preview>
</template>

<script lang="ts" setup>
defineProps<{
    text: string,
}>()

</script>
