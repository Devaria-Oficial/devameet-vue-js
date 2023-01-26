<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';

export default defineComponent({
    methods:{
        goBack(){
            router.back();
        }
    }
});
</script>

<template>
    <div class="container-action-header">
        <span @click="goBack">Cancelar</span>
        <strong>Editar Perfil</strong>
        <span class="principal" @click="$emit('actionCallback')">Concluir</span>
    </div>
</template>

<style src="@/assets/styles/actionHeader.scss" lang="scss"/>