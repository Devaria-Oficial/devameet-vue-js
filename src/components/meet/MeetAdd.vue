<script lang="ts">
import router from '@/router';
import { MeetServices } from '@/services/MeetServices';
import { defineComponent } from 'vue';
import MeetAddEditHeader from './MeetAddEditHeader.vue';
import MeetList from './MeetList.vue';
import MeetUserHeader from './MeetUserHeader.vue';

const meetServices = new MeetServices();

export default defineComponent({
    components: { MeetUserHeader, MeetList, MeetAddEditHeader },
    data() {
        return {
            color: '',
            name: ''
        }
    },
    methods: {
        setName(n: string) {
            this.name = n;
        },
        setColor(c: string) {
            this.color = c;
        },
        goBack() {
            router.back();
        },
        async createMeet(){
            try{
                if(!this.name || !this.name.trim() ||
                    !this.color || !this.color.trim()){
                        return;
                    }

                    await meetServices.addMeet({
                        name: this.name,
                        color: this.color
                    });
                    return router.push('/');
            }catch(e : any){
                console.log('Erro ao cadastrar reunião:', e)
            }
        }
    },
    computed: {
        isFormValid() {
            return this.color && this.color.trim().length > 0
                && this.name && this.name.trim().length > 0
        },
        getFormValidClass() {
            if (!this.color || this.color.trim().length < 4
                || !this.name || this.name.trim().length < 2) {
                    return 'disabled'
            }

            return ''
        },
    }
});
</script>

<template>
    <div class="container-principal">
        <div class="container-meet">
            <MeetAddEditHeader :color="color" :name="name" @setColor="setColor" @setName="setName" />
            <div class="actions">
                <span @click="goBack">Voltar</span>
                <button @click="createMeet" :class="getFormValidClass" :disabled="!isFormValid">Salvar</button>
            </div>
        </div>
        <div class="container-grid-add">
            <div class="grid">
                <div class="line row one"/>
                <div class="line row two"/>
                <div class="line row three"/>
                <div class="line row four"/>
                <div class="line row five"/>
                <div class="line row six"/>
                <div class="line row seven"/>
                <div class="line column one"/>
                <div class="line column two"/>
                <div class="line column three"/>
                <div class="line column four"/>
                <div class="line column five"/>
                <div class="line column six"/>
                <div class="line column seven"/>
            </div>
            <div class="actions">
                <div>
                    <img src="../../assets/images/thrash_white.svg" alt="Deletar objeto"/>
                </div>
                <div>
                    <img src="../../assets/images/rotate_right.svg" alt="Girar a Direita"/>
                </div>
                <div>
                    <img src="../../assets/images/rotate_left.svg" alt="Girar a Esquerda"/>
                </div>
            </div>
        </div>
    </div>
</template>





<style src="@/assets/styles/principal.scss" lang="scss"/>