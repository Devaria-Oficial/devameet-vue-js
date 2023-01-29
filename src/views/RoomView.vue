<script lang="ts">
import Footer from '@/components/general/Footer.vue';
import RoomHome from '@/components/room/RoomHome.vue';
import { defineComponent } from 'vue';
import Header from '../components/general/Header.vue';

export default defineComponent({
    components: { Header, Footer, RoomHome }
});
</script>

<template>
    <Header />
    <RoomHome />
    <Footer />
</template>