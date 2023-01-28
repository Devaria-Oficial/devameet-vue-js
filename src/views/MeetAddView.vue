<script lang="ts">
import Footer from '@/components/general/Footer.vue';
import MeetAdd from '@/components/meet/MeetAdd.vue';
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
        if(this.mobile){
            router.push({name: "home"});
        }
    },
    components: { Header, Footer, MeetAdd }
});
</script>

<template>
    <Header />
    <MeetAdd />
    <Footer />
</template>