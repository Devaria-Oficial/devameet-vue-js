<script lang="ts">
import AvatarInput from '@/components/general/AvatarInput.vue';
import Footer from '@/components/general/Footer.vue';
import router from '@/router';
import { LoginServices } from '@/services/LoginServices';
import { UserServices } from '@/services/UserServices';
import { defineComponent } from 'vue';
import Header from '../components/general/Header.vue';
import ActionHeader from '../components/profile/ActionHeader.vue';

const loginServices = new LoginServices();
const userServices = new UserServices();

export default defineComponent({
    components: { Header, Footer, AvatarInput, ActionHeader },
    data() {
        return {
            name: localStorage.getItem('name'),
            avatar: localStorage.getItem('avatar') as string,
            image: ''
        }
    },
    methods: {
        async finishUpdate() {
            try {
                if (!this.name) {
                    return;
                }

                const body = {} as any;

                if(this.name){
                    body.name = this.name;
                }

                if(this.image){
                    body.avatar = this.image;
                }else{
                    body.avatar = this.avatar;
                }

                await userServices.update(body);

                if(this.name){
                    localStorage.setItem('name', this.name);
                }

                if(this.image){
                    localStorage.setItem('avatar', this.image);
                }

                return router.back();
            } catch (e: any) {
                if (e?.response?.data?.message) {
                    console.log('Erro ao efetuar atualizar usuário:', e?.response?.data?.message)
                } else {
                    console.log('Erro ao efetuar atualizar usuário:', e)
                }
            }
        },
        setImage(s: string) {
            this.image = s;
        },
        clearName() {
            this.name = '';
        },
        logout() {
            loginServices.logout();
        }
    },
    computed: {
        getImagem() {
            return this.image && this.image.length > 0 ? this.image : this.avatar;
        }
    }
});
</script>

<template>
    <Header :hide="true" />
    <div class="container-profile">
        <ActionHeader @actionCallback="finishUpdate" />
        <AvatarInput :image="getImagem" @setImage="setImage" />
        <div class="input">
            <span>Nome</span>
            <input v-model="name" type="text" placeholder="Informe seu nome" />
            <img src="../assets/images/clear.svg" alt="limpar" @click="clearName" />
        </div>
        <div class="logout">
            <div @click="logout">
                <img src="../assets/images/logout.svg" alt="sair" />
                <span>Sair</span>
            </div>
        </div>
    </div>
    <Footer />
</template>

<style src="@/assets/styles/profile.scss"  lang="scss"/>