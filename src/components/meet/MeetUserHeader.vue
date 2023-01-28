<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';


export default defineComponent({
    setup() {
        return {
            name: localStorage.getItem('name') as string
        }
    },
    methods: {
        navigateToAdd() {
            router.push({ name: 'add' });
        }
    }
});
</script>

<template>
    <div class="container-meet-user-header">
        <div>
            <span>Minhas reuniões</span>
            <p>Olá, {{ name }}</p>
        </div>
        <img src="../../assets/images/add.svg" alt="Adicionar reunião" class="add" @click="navigateToAdd" />
    </div>
</template>

<style src="@/assets/styles/meetUserHeader.scss" lang="scss"/>