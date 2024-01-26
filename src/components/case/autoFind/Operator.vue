<template>
    <el-form :model="form" inline label-width="60px" class="operator">
        <el-form-item label="row">
            <el-input v-model="form.row" />
        </el-form-item>
        <el-form-item label="col">
            <el-input v-model="form.col" />
        </el-form-item>
        <el-form-item label="start x">
            <el-input v-model="form.startx" />
        </el-form-item>
        <el-form-item label="start y">
            <el-input v-model="form.starty" />
        </el-form-item>
        <el-form-item label="end x">
            <el-input v-model="form.endx" />
        </el-form-item>
        <el-form-item label="end y">
            <el-input v-model="form.endy" />
        </el-form-item>
        <el-form-item label="seed">
            <el-input placeholder="empty use random seed" v-model="form.seed" />
        </el-form-item>
        <el-form-item label="type">
            <el-radio-group v-model="form.dataType">
                <el-radio label="DFS" />
                <el-radio label="BFS" />
                <el-radio label="AStar" />
            </el-radio-group>
        </el-form-item>
        <el-form-item label="visual">
            <el-switch v-model="form.visual" />
        </el-form-item>
        <el-form-item>
            <el-button :disabled="searching" @click="reset">set map</el-button>
            <el-button :disabled="searching" @click="search">search path</el-button>
            <el-button :disabled="searching" @click="clear">clear path</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { IOperator } from './type'

const props = defineProps<{
    searching: boolean
}>()
const emit = defineEmits(["reset", "search", "clear"]);


const form = reactive<IOperator>({
    row: '30',
    col: '30',
    startx: '0',
    starty: '0',
    endx: '29',
    endy: '29',
    dataType: 'DFS',
    visual: true,
    seed: '',
});

const reset = () => {
    emit("reset", form);
};

const search = () => {
    emit("search", form);
}

const clear = () => {
    emit("clear", form);
}

onMounted(() => {
    emit("reset", form);
});
</script>

