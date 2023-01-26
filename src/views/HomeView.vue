<script lang="ts">
import Footer from '@/components/general/Footer.vue';
import { defineComponent } from 'vue';
import Header from '../components/general/Header.vue';

export default defineComponent({
    components: { Header, Footer }
});
</script>

<template>
    <Header />
    <Footer />
</template>

<style  lang="scss"/>