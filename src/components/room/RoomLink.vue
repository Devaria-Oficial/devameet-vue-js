<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';
import CustomInput from '../general/CustomInput.vue';
import MeetUserHeader from '../meet/MeetUserHeader.vue';
import chainIcon from '../../assets/images/chain.svg';

export default defineComponent({
    setup(){
        return {
            chainIcon
        }
    },
    components: { MeetUserHeader, CustomInput },
    data() {
        return {
            link: '',
            error: ''
        }
    },
    methods:{
        setLink(v:string){
            this.link = v;
        },
        navigateToRoom(){
            if(this.link && this.link.length > 8){
                return router.push('room/'+this.link);
            }
            return this.error = 'Link inválido, por favor verifique!';
        }
    }
});
</script>

<template>
    <div class="container-principal">
        <div class="container-meet">
            <MeetUserHeader />
            <p class="error" v-if="error && error.length > 0">{{ error }}</p>
            <CustomInput :icon="chainIcon" alt="Link" name="Link"
                placeholder="Informe o link da reunião para entrar"
                :model-value="link" @setInput="setLink" />
            <button @click="navigateToRoom">Entrar</button>
        </div>
    </div>
</template>

<style src="@/assets/styles/principal.scss" lang="scss"/>