<script lang="ts">
import { GDialog } from 'gitart-vue-dialog';
import { defineComponent } from 'vue';
import AvatarIcon from '../../assets/images/avatar.svg';

export default defineComponent({
    props: {
        image: String,
        alt: String
    },
    data() {
        return {
            showModal: false,
            selected: null as string | null,
            avatars: [
                { value: 'avatar_01' },
                { value: 'avatar_02' },
                { value: 'avatar_03' },
                { value: 'avatar_04' },
                { value: 'avatar_05' },
                { value: 'avatar_06' },
                { value: 'avatar_07' },
                { value: 'avatar_08' },
                { value: 'avatar_09' },
            ]
        };
    },
    methods: {
        isSelected(avatar: any) {
            return avatar.value === this.selected ? 'selected' : '';
        },
        getAvatarUrl(avatar: string) {
            const path = `../../assets/objects/avatar/${avatar}_front.png`;
            const imageUrl = new URL(path, import.meta.url);
            return imageUrl.href;
        },
        submitAvatar() {
            if (this.selected) {
                this.$emit('setImage', this.selected);
            }
            this.showModal = false;
        }
    },
    computed: {
        avatarImage() {
            if (this.image && this.image.trim().length > 0) {
                const path = `../../assets/objects/avatar/${this.image}_front.png`;
                const imageUrl = new URL(path, import.meta.url);
                return imageUrl.href;
            }
            return AvatarIcon;
        }
    },
    components: { GDialog }
});
</script>

<template>
    <div class="container-upload-image" @click="showModal = true">
        <div class="avatar">
            <img :src="avatarImage" :alt="alt" />
        </div>
        <span>Alterar avatar</span>
        <GDialog v-model="showModal">
            <div class="wrapper">
                <div class="content">
                    <p>Avatar</p>
                    <span>Selecione seu avatar</span>
                    <div class="line" />
                    <div class="avatars">
                        <div class="container-avatar" v-for="avatar in avatars" :class="isSelected(avatar)"
                            :key="avatar.value" @click="selected = avatar.value">
                            <img :src="getAvatarUrl(avatar.value)" />
                        </div>
                    </div>
                    <div class="actions">
                        <span @click="showModal = false">Voltar</span>
                        <button type="button" @click="submitAvatar">Salvar</button>
                    </div>
                </div>
            </div>
        </GDialog>
    </div>
</template>



<style lang="scss" src="@/assets/styles/inputUpload.scss"/>