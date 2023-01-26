<script lang="ts">
import Footer from '@/components/general/Footer.vue';
import { defineComponent } from 'vue';
import Header from '../components/general/Header.vue';
import MeetHome from '../components/meet/MeetHome.vue';

export default defineComponent({
    components: { Header, Footer, MeetHome }
});
</script>

<template>
    <Header />
    <MeetHome />
    <Footer />
</template>

<style  lang="scss"/>