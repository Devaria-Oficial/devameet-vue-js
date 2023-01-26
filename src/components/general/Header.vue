<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from './Navigation.vue';

export default defineComponent({
    components:{Navigation},
    props: {
        hide: Boolean
    }
});
</script>

<template>
    <div class="container-header" :class="{hide: hide}">
        <img src="../../assets/images/logo.svg" alt="Logo Devameet" class="logo"/>
        <Navigation />
    </div>
</template>

<style src="@/assets/styles/header.scss" lang="scss"/>