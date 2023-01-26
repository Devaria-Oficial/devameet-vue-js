<script lang="ts">
import AvatarInput from '@/components/general/AvatarInput.vue';
import Footer from '@/components/general/Footer.vue';
import { defineComponent } from 'vue';
import Header from '../components/general/Header.vue';
import ActionHeader from '../components/profile/ActionHeader.vue';

export default defineComponent({
    components: { Header, Footer, AvatarInput, ActionHeader }
});
</script>

<template>
    <Header :hide="true" />
    <div class="container-profile">
        <ActionHeader />
        <AvatarInput />
        <div class="input">
            <span>Nome</span>
            <input type="text" placeholder="Informe seu nome"/>
            <img src="../assets/images/clear.svg" alt="limpar"/>
        </div>
        <div class="logout">
            <div>
                <img src="../assets/images/logout.svg" alt="sair"/>
                <span>Sair</span>
            </div>
        </div>
    </div>
    <Footer />
</template>

<style src="@/assets/styles/profile.scss"  lang="scss"/>