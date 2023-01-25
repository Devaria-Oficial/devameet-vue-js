<script lang="ts">
import CustomInput from '@/components/general/CustomInput.vue';
import { defineComponent } from 'vue';
import loginIcon from '../assets/images/mail.svg';
import passwordIcon from '../assets/images/key.svg';

export default defineComponent({
    components: { CustomInput },
    setup() {
        return {
            loginIcon,
            passwordIcon
        }
    },
    data() {
        return {
            login: '',
            password: '',
            error: '',
            loading: false
        }
    },
    computed:{
        buttonText(){
            return this.loading ? '...Carregando' : 'Login'
        }
    }
});
</script>

<template>
    <div class="container-public">
        <img src="../assets/images/logo.svg" alt="Logo Devameet" class="logo" />
        <form>
            <p v-if="error" class="error">{{ error }}</p>
            <CustomInput :icon="loginIcon" alt="Login" name="Login" placeholder="Login" type="text"
                :model-value="login" />
            <CustomInput :icon="passwordIcon" alt="Senha" name="Senha" placeholder="Senha" type="text"
                :model-value="password" />

            <button>{{ buttonText }}</button>
            <div class="link">
                <p>Não possui uma conta?</p>
                <router-link to="/register">Faça seu cadastro agora</router-link>
            </div>
        </form>
    </div>
</template>



<style src="@/assets/styles/public.scss" lang="scss"/>