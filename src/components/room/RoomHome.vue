<script lang="ts">
import router from '@/router';
import { RoomServices } from '@/services/RoomServices';
import { defineComponent } from 'vue';
import ObjectsRoom from './ObjectsRoom.vue';

const roomServices = new RoomServices();

export default defineComponent({
    components: { ObjectsRoom },
    data() {
        return {
            color: '',
            name: '',
            link: '',
            objects: [] as any
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
        } catch (e) {
            console.log('erro ao obter dados da reunião:', e);
        }
    },
    methods: {
        copylink(){
            navigator.clipboard.writeText(window.location.href);
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
                    <img src="../../assets/images/copy.svg"/>
                </div>
                <p :style="{ color }">{{ name }}</p>
            </div>
            <ObjectsRoom :objects="objects" v-if="objects && objects.length > 0" />
            <div class="empty" v-else>
                <img src="../../assets/images/empty.svg" />
                <p>Reunião não encontrada</p>
            </div>
        </div>
    </div>
</template>











<style src="@/assets/styles/principal.scss" lang="scss"/>