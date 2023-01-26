<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import linkIcon from '../../assets/images/link.svg';
import linkActiveIcon from '../../assets/images/link_active.svg';
import homeIcon from '../../assets/images/home.svg';
import homeActiveIcon from '../../assets/images/home_active.svg';
import avatarIcon from '../../assets/images/avatar.svg';

export default defineComponent({
    setup() {
        return {
            linkIcon,
            linkActiveIcon,
            homeIcon,
            homeActiveIcon,
            avatarIcon,
            mobile: window.innerWidth <= 992
        }
    },
    methods: {
        executeNavigation(name: string) {
            router.push({ name });
        },
        getIcon(name: string) {
            switch (name) {
                case 'home':
                    if (router.currentRoute.value.name === 'home' ||
                        router.currentRoute.value.path === '/') {
                        return homeActiveIcon
                    }
                    return homeIcon;
                case 'room':
                    if (router.currentRoute.value.name === 'room' ||
                        router.currentRoute.value.path === '/room') {
                        return linkActiveIcon
                    }
                    return linkIcon;
                default:
                    return '';
            }
        }
    },
    computed: {
        avatarImage() {
            const avatar = localStorage.getItem('avatar');
            if (avatar) {
                const path = `../../assets/objects/avatar/${avatar}_front.png`;
                const imageUrl = new URL(path, import.meta.url);
                return imageUrl.href;
            }

            return avatarIcon;
        },
        getClassAvatarSelected() {
            if (router.currentRoute.value.name === 'user') {
                return 'selected';
            }
            return '';
        }
    }
});
</script>

<template>
    <nav class="container-navigation">
        <ul>
            <li @click="executeNavigation('home')">
                <img :src="getIcon('home')" alt="Minhas reuniões" class="iconNav" />
            </li>
            <li @click="executeNavigation('link')" v-if="mobile">
                <img :src="getIcon('room')" alt="Entrar na reunião" class="iconNav" />
            </li>
            <li class="disabled" v-else>
                <img :src="getIcon('room')" alt="Entrar na reunião" class="iconNav" />
            </li>
            <li @click="executeNavigation('user')">
                <div class="avatar mini" :class="getClassAvatarSelected">
                    <img :src="avatarImage" alt="Editar usuário" />
                </div>
            </li>
        </ul>
    </nav>
</template>









<style src="@/assets/styles/navigation.scss" lang="scss"/>