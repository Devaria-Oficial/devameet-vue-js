<script lang="ts">
import CustomInput from '@/components/general/CustomInput.vue';
import AvatarInput from '@/components/general/AvatarInput.vue';
import { defineComponent } from 'vue';
import userIcon from '../assets/images/user.svg';
import loginIcon from '../assets/images/mail.svg';
import passwordIcon from '../assets/images/key.svg';
import { RegisterServices } from '@/services/RegisterServices';
import router from '@/router';

const registerServices = new RegisterServices();

export default defineComponent({
    components: { CustomInput, AvatarInput },
    setup() {
        return {
            userIcon,
            loginIcon,
            passwordIcon
        }
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirm: '',
            image: '',
            error: '',
            loading: false
        }
    },
    computed: {
        buttonText() {
            return this.loading ? '...Carregando' : 'Salvar'
        }
    },
    methods: {
        setName(v: string) {
            this.name = v;
        },
        setMail(v: string) {
            this.email = v;
        },
        setPassword(v: string) {
            this.password = v;
        },
        setConfirm(v: string) {
            this.confirm = v;
        },
        setImage(v: string) {
            this.image = v;
        },
        async doRegister() {
            const { email, password, confirm, image, name } = this;

            try {
                if (!email || !email.trim()
                    || !password || !password.trim()
                    || !confirm || !confirm.trim()
                    || !name || !name.trim()
                    || !image || !image.trim()
                ) {
                    return this.error = 'Favor preencher todos os dados';
                }

                if (password !== confirm) {
                    return this.error = 'Senha e confirmação precisam ser iguais';
                }

                this.loading = true;

                const body = {
                    name,
                    email,
                    password,
                    avatar: image
                }

                await registerServices.register(body);
                this.loading = false;
                return router.push({name: 'login', query: {success: 'true'}});
            } catch (e: any) {
                console.log('Erro ao cadastrar usuario:', e)

                if (e?.response?.data?.message) {
                    this.error = e?.response?.data?.message;
                } else {
                    this.error = 'Não foi possível cadastrar o usuario, tente novamente!';
                }
            }

            this.loading = false;
        }
    }
});
</script>

<template>
    <div class="container-public register">
        <img src="../assets/images/logo.svg" alt="Logo Devameet" class="logo" />
        <form>
            <AvatarInput :image="image" @setImage="setImage" />
            <p v-if="error" class="error">{{ error }}</p>
            <CustomInput :icon="userIcon" alt="Nome" name="Nome" placeholder="Nome" type="text" :model-value="name"
                @setInput="setName" />
            <CustomInput :icon="loginIcon" alt="Login" name="Login" placeholder="Login" type="text" :model-value="email"
                @setInput="setMail" />
            <CustomInput :icon="passwordIcon" alt="Senha" name="Senha" placeholder="Senha" type="password"
                :model-value="password" @setInput="setPassword" />
            <CustomInput :icon="passwordIcon" alt="Confirme" name="Confirme" placeholder="Confirme a senha"
                type="password" :model-value="confirm" @setInput="setConfirm" />

            <button type="button" @click="doRegister">{{ buttonText }}</button>
            <div class="link">
                <p>Já possui uma conta?</p>
                <router-link to="/">Faça seu login agora!</router-link>
            </div>
        </form>
    </div>
</template>









<style src="@/assets/styles/public.scss" lang="scss"/>