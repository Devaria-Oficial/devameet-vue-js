<script lang="ts">
import Footer from '@/components/general/Footer.vue';
import RoomLink from '@/components/room/RoomLink.vue';

import { defineComponent } from 'vue';
import Header from '../components/general/Header.vue';
import router from '../router';

export default defineComponent({
    setup(){
        return {
            mobile: window.innerWidth <= 992
        }
    },
    beforeCreate(){
        if(!this.mobile){
            router.push({name: "home"});
        }
    },
    components: { Header, Footer, RoomLink }
});
</script>

<template>
    <Header />
    <RoomLink />
    <Footer />
</template>