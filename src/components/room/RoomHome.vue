<script lang="ts">
import router from '@/router';
import { RoomServices } from '@/services/RoomServices';
import { createPeerConnectionContext } from '@/services/WebSocketServices';
import { defineComponent } from 'vue';
import ObjectsRoom from './ObjectsRoom.vue';

const roomServices = new RoomServices();
const wsServices = createPeerConnectionContext();

export default defineComponent({
    components: { ObjectsRoom },
    setup(){
        return {
            wsServices,
            userId : localStorage.getItem('id') as string
        }
    },
    data() {
        return {
            color: '',
            name: '',
            link: '',
            objects: [] as any,
            userMediaStream: null as any,
            connectedUsers: [] as any,
            me: {} as any,
            showModal: false,
        }
    },
    async mounted() {
        try {
            if (!this.$route.params?.link) {
                router.push({ name: 'home' });
            }

            this.link = this.$route.params?.link as string;

            const result = await roomServices.getRoomByLink(this.link);

            if (!result || !result.data) {
                return
            }

            const { link, color, name, objects } = result.data;
            this.name = name;
            this.color = color;
            this.link = link;

            this.objects = objects.map((e: any) => {
                return { ...e, type: e?.name?.split('_')[0] }
            })

            this.userMediaStream = await navigator?.mediaDevices?.getUserMedia({
                video: {
                    width: { min: 640, ideal: 1280 },
                    height: { min: 400, ideal: 1080 },
                    aspectRatio: { ideal: 1.7777777778 }
                },
                audio: true
            });

        } catch (e) {
            console.log('erro ao obter dados da reunião:', e);
        }
    },
    methods: {
        copylink() {
            navigator.clipboard.writeText(window.location.href);
        },
        joinRoom() {
            if (this.userMediaStream) {
                this.wsServices.joinRoom(this.link, this.userId);
                this.wsServices.onUpdateUsersList(async (users: any) => {
                    if(users){
                        this.connectedUsers = users;
                        const me = users.find((u: any) => u.user = this.userId);
                        if(me){
                            this.me = me;
                        }

                        console.log(users);
                    }
                });
                this.wsServices.onRemoveUser((socketId: any) => {
                    this.connectedUsers = this.connectedUsers.filter((u: any) => u.clientId !== socketId);
                })
            }else{
                this.showModal = true;
            }
        }
    }
});
</script>

<template>
    <div class="container-principal">
        <div class="container-room">
            <div class="resume" v-if="objects && objects.length > 0">
                <div @click="copylink">
                    <span><strong>Reunião</strong> {{ link }}</span>
                    <img src="../../assets/images/copy.svg" />
                </div>
                <p :style="{ color }">{{ name }}</p>
            </div>
            <ObjectsRoom :objects="objects" :connectedUsers="connectedUsers"
                v-if="objects && objects.length > 0" @enterRoom="joinRoom" />
            <div class="empty" v-else>
                <img src="../../assets/images/empty.svg" />
                <p>Reunião não encontrada</p>
            </div>
        </div>
    </div>
    <GDialog v-model="showModal">
        <div class="wrapper">
            <div class="content">
                <p>Aviso!</p>
                <span>Habilite a câmera para entrar na sala</span>
                <div class="actions">
                    <span @click="showModal = false">Voltar</span>
                </div>
            </div>
        </div>
    </GDialog>
</template>















<style src="@/assets/styles/principal.scss" lang="scss"/>