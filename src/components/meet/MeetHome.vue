<script lang="ts">
import router from '@/router';
import { MeetServices } from '@/services/MeetServices';
import { defineComponent } from 'vue';
import ObjectsRoom from '../room/ObjectsRoom.vue';
import MeetList from './MeetList.vue';
import MeetUserHeader from './MeetUserHeader.vue';

const meetServices = new MeetServices();

export default defineComponent({
    components: { MeetUserHeader, MeetList, ObjectsRoom },
    data() {
        return {
            link: '',
            objects: [] as any
        }
    },
    methods: {
        async getObjectsById(id: string) {
            if (id) {
                const meetResult = await meetServices.getMeetById(id);
                if(!meetResult?.data){
                    return;
                }

                this.link = meetResult.data.link;

                const objects = await meetServices.getObjectsById(id);
                if (objects?.data) {
                    this.objects = objects.data.map((e: any) => {
                        return { ...e, type: e?.name?.split('_')[0] }
                    })
                }
            }
        },
        navigateToRoom(){
            router.push('room/'+this.link);
        }
    }
});
</script>

<template>
    <div class="container-principal">
        <div class="container-meet">
            <MeetUserHeader />
            <MeetList @selectItem="getObjectsById" />
        </div>
        <ObjectsRoom :objects="objects" v-if="objects && objects.length > 0"
            @enterRoom="navigateToRoom" />
    </div>
</template>



<style src="@/assets/styles/principal.scss" lang="scss"/>