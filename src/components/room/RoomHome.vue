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
    setup() {
        return {
            wsServices,
            userId: localStorage.getItem('id') as string,
            mobile: window.innerWidth < 992
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
            me: null as any,
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

            if (document.getElementById('localVideoRef')) {
                const videoRef: any = document.getElementById('localVideoRef');
                videoRef.srcObject = this.userMediaStream;
            }

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
                this.wsServices.onCallMade();
                this.wsServices.onUpdateUsersList(async (users: any) => {
                    if (users) {
                        this.connectedUsers = users;
                        const me = users.find((u: any) => u.user === this.userId);
                        if (me) {
                            this.me = me;
                        }

                        const usersWithoutMe = users.filter((u: any) => u.user !== this.userId)
                        for (const user of usersWithoutMe) {
                            this.wsServices.addPeerConnection(user.clientId, this.userMediaStream, (_stream: any) => {
                                if (document.getElementById(user.clientId)) {
                                    const element = document.getElementById(user.clientId) as any;
                                    element.srcObject = _stream;
                                }
                            });
                        }
                    }
                });

                this.wsServices.onRemoveUser((socketId: any) => {
                    this.connectedUsers = this.connectedUsers.filter((u: any) => u.clientId !== socketId);
                    this.wsServices.removerPeerConnection(socketId);
                });

                this.wsServices.onAddUser((user: any) => {
                    console.log('onAddUser', user);
                    this.wsServices.addPeerConnection(user, this.userMediaStream, (_stream: any) => {
                        if (document.getElementById(user)) {
                            const element = document.getElementById(user) as any;
                            element.srcObject = _stream;
                        }
                    });

                    this.wsServices.callUser(user);
                });

                this.wsServices.onAnswerMade((socket: any) => this.wsServices.callUser(socket));

                document.addEventListener('keyup', this.doMovement);
            } else {
                this.showModal = true;
            }
        },
        doMovement(event: any) {
            const user = this.me;
            if (event && user) {
                const payload = {
                    userId: this.userId,
                    link: this.link
                } as any

                switch (event.key) {
                    case 'ArrowUp':
                        payload.x = user.x;
                        payload.orientation = 'back';
                        if (user.orientation === 'back') {
                            payload.y = user.y > 1 ? user.y - 1 : 1;
                        } else {
                            payload.y = user.y
                        }
                        break;
                    case 'ArrowDown':
                        payload.x = user.x;
                        payload.orientation = 'front';
                        if (user.orientation === 'front') {
                            payload.y = user.y < 7 ? user.y + 1 : 7;
                        } else {
                            payload.y = user.y
                        }
                        break;
                    case 'ArrowLeft':
                        payload.y = user.y;
                        payload.orientation = 'left';
                        if (user.orientation === 'left') {
                            payload.x = user.x > 0 ? user.x - 1 : 0;
                        } else {
                            payload.x = user.x
                        }
                        break;
                    case 'ArrowRight':
                        payload.y = user.y;
                        payload.orientation = 'right';
                        if (user.orientation === 'right') {
                            payload.x = user.x < 7 ? user.x + 1 : 7;
                        } else {
                            payload.x = user.x
                        }
                        break;
                    default: break;
                }

                if (payload.x >= 0 && payload.y >= 0 && payload.orientation) {
                    this.wsServices.updateUserMovement(payload);
                }
            }
        },
        togglMute() {
            const payload = {
                userId: this.userId,
                link: this.link,
                muted: !this.me.muted
            }

            this.wsServices.updateUserMuted(payload);
        }
    },
    computed: {
        usersWithoutMe() {
            return this.connectedUsers.filter((u: any) => u.user !== this.userId)
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
                <audio id="localVideoRef" autoplay playsinline muted />
                <audio v-for="user in usersWithoutMe" autoplay playsinline :id="user?.clientId" :muted="user?.muted" />
            </div>
            <ObjectsRoom :objects="objects" :connectedUsers="connectedUsers" :me="me"
                v-if="objects && objects.length > 0" @enterRoom="joinRoom" @togglMute="togglMute" />
            <div class="empty" v-else>
                <img src="../../assets/images/empty.svg" />
                <p>Reunião não encontrada</p>
            </div>
            <div class="movement" v-if="mobile && me && me.user">
                <div class="button" @click="doMovement({ key: 'ArrowUp' })">
                    <img src="../../assets/images/key_up.svg" alt="Andar para cima" />
                </div>
                <div class="line">
                    <div class="button" @click="doMovement({ key: 'ArrowLeft' })">
                        <img src="../../assets/images/key_left.svg" alt="Andar para esquerda" />
                    </div>
                    <div class="button" @click="doMovement({ key: 'ArrowDown' })">
                        <img src="../../assets/images/key_down.svg" alt="Andar para baixo" />
                    </div>
                    <div class="button" @click="doMovement({ key: 'ArrowRight' })">
                        <img src="../../assets/images/key_right.svg" alt="Andar para direita" />
                    </div>
                </div>
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