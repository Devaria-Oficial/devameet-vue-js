<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
});
</script>

<template>
    <div class="container-meet-user-header">
        <div>
            <span>Nova reunião</span>
            <input type="text" placeholder="Digite o nome de sua reunião"/>
        </div>
        <div class="color-select">
            <div class="circle" />
            <img src="../../assets/images/arrow_down.svg" alt="Selecionar cor"/>    
        </div>
    </div>
</template>

<style src="@/assets/styles/meetUserHeader.scss" lang="scss"/>