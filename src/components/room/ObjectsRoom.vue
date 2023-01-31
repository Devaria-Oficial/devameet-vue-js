<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup(){
        return {
            mobile: window.innerWidth <= 992
        }
    },
    props: {
        objects: Array,
        connectedUsers: Array,
        me: null as any
    },
    data(){
        return {
            objectsWithWidth : [] as any
        }
    },
    mounted() {

    },
    methods: {
        getImageFromObject(object: any, isAvatar: boolean) {
            if (object?.name?.trim().length > 0) {
                const path = `../../assets/objects/${isAvatar? 'avatar' : object?.type}/${isAvatar? object.avatar : object.name}${object.orientation ? '_' + object.orientation : ''}.png`;
                const imageUrl = new URL(path, import.meta.url);

                if(this.mobile){
                    let img = new Image();
                    img.onload = () => {
                        const exist = this.objectsWithWidth.find((o : any) => o.name == object.name);
                        if(!exist){
                            this.objectsWithWidth.push({ name: object.name, width: img.width});
                        }
                    }
                    img.src = imageUrl.href;
                }

                return imageUrl.href;
            }
        },
        getObjectStyle(object: any) {
            const style = {} as any;

            if (object.zindex) {
                style.zIndex = object.zindex;
            }

            if(this.mobile){
                const obj = this.objectsWithWidth.find((o : any) => o.name == object.name);

                if(obj){
                    const width = obj.width * 0.5;
                    style.width = width + 'px';
                }
            }

            return style
        },
        getObjectClass(object: any) {
            let cl = '';

            if (object.flexStart || object.type === 'wall' || object.type === 'floor') {
                cl += ' column-start';

                if (object.type === 'wall') {
                    cl += ' row-start';
                } else {
                    cl += ' floor-start';
                }

                return cl;
            }

            switch (object.x) {
                case 0:
                    cl += ' column-zero';
                    break;
                case 1:
                    cl += ' column-one';
                    break;
                case 2:
                    cl += ' column-two';
                    break;
                case 3:
                    cl += ' column-three';
                    break;
                case 4:
                    cl += ' column-four';
                    break;
                case 5:
                    cl += ' column-five';
                    break;
                case 6:
                    cl += ' column-six';
                    break;
                case 7:
                    cl += ' column-seven';
                    break;
                default: break;
            }

            switch (object.y) {
                case 0:
                    cl += ' row-zero';
                    break;
                case 1:
                    cl += ' row-one';
                    break;
                case 2:
                    cl += ' row-two';
                    break;
                case 3:
                    cl += ' row-three';
                    break;
                case 4:
                    cl += ' row-four';
                    break;
                case 5:
                    cl += ' row-five';
                    break;
                case 6:
                    cl += ' row-six';
                    break;
                case 7:
                    cl += ' row-seven';
                    break;
                default: break;
            }

            return cl;
        },
        getName(user: any){
            if(user?.name){
                return user.name.split(' ')[0];
            }
            return '';
        },
        getMutedClass(user: any){
            if(user?.muted){
                return 'muted';
            }

            return '';
        }
    }
});
</script>

<template>
    <div class="container-objects">
        <div class="grid">
            <img v-for="object in objects" :src="getImageFromObject(object, false)" :style="getObjectStyle(object)"
                :class="getObjectClass(object)" @click="$emit('selectedObject', object)" />
            <div class="user-avatar" v-for="user in connectedUsers" :class="getObjectClass(user)">
                <div :class="getMutedClass(user)"><span :class="getMutedClass(user)">{{ getName(user) }}</span></div>
                <img :src="getImageFromObject(user, true)" :style="getObjectStyle(user)"/>
            </div>
            <img class="audio" src="../../assets/images/audio_on.svg" v-if="me && !me.muted" @click="$emit('togglMute')"/>
            <img class="audio" src="../../assets/images/audio_off.svg" v-if="me && me.muted" @click="$emit('togglMute')"/>
            <div class="preview" v-if="!connectedUsers || connectedUsers.length === 0">
                <img src="../../assets/images/preview.svg" alt="entrar na sala" />
                <button @click="$emit('enterRoom')">Entrar na sala</button>
            </div>
        </div>
    </div>
</template>

















<style src="@/assets/styles/objects.scss" lang="scss"/>