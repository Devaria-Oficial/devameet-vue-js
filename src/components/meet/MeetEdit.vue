<script lang="ts">
import router from '@/router';
import { MeetServices } from '@/services/MeetServices';
import { defineComponent } from 'vue';
import MeetAddEditHeader from './MeetAddEditHeader.vue';
import MeetList from './MeetList.vue';
import MeetObjectPicker from './MeetObjectPicker.vue';
import MeetUserHeader from './MeetUserHeader.vue';
import wallIcon from '../../assets/images/wall.svg';
import floorIcon from '../../assets/images/floor.svg';
import rugIcon from '../../assets/images/rug.svg';
import chairIcon from '../../assets/images/chair.svg';
import couchIcon from '../../assets/images/couch.svg';
import tableIcon from '../../assets/images/table.svg';
import decorIcon from '../../assets/images/decor.svg';
import plantsIcon from '../../assets/images/plants.svg';

import objectAssetsJson from '../../assets/objects/objects.json';
import MeetObjectsRoom from './MeetObjectsRoom.vue';

const meetServices = new MeetServices();

export default defineComponent({
    setup(){
        return {
            wallIcon,
            floorIcon,
            rugIcon,
            chairIcon,
            couchIcon,
            tableIcon,
            decorIcon,
            plantsIcon,
            objectAssetsJson
        }
    },
    components: { MeetUserHeader, MeetList, MeetAddEditHeader, MeetObjectPicker, MeetObjectsRoom },
    data() {
        return {
            index: 0,
            id: '' as any,
            meet: {} as any,
            objects: [] as any,
            selected: null as any
        }
    },
    async mounted() {
        try {
            if(!this.$route.params?.id){
                return router.push({name: 'home'});
            }

            this.id = this.$route.params.id;
            const result = await meetServices.getMeetById(this.id);

            if(!result?.data){
                return router.push({name: 'home'});
            }

            this.meet = result.data;

            const objects = await meetServices.getObjectsById(this.id);
            if(objects?.data){
                this.objects = objects.data.map((e :any) =>{
                    return {...e, type: e?.name?.split('_')[0]}
                })
            }

        } catch (e: any) {
            console.log('Erro ao obter dados da reunião:', e)
        }
    },
    methods: {
        setName(n: string) {
            this.meet.name = n;
        },
        setColor(c: string) {
            this.meet.color = c;
        },
        goBack() {
            router.back();
        },
        async updateMeet() {
            try {
                // if (!this.name || !this.name.trim() ||
                //     !this.color || !this.color.trim()) {
                //     return;
                // }

                // await meetServices.addMeet({
                //     name: this.name,
                //     color: this.color
                // });
                // return router.push('/');
            } catch (e: any) {
                console.log('Erro ao atualizar reunião:', e)
            }
        },
        setObject(object : any){
            object._id =  this.index++;
            if(object.selectMultiple){
                this.objects.push(object);
            }else{
                const filtered = this.objects.filter((o: any) => o.type !== object.type);
                filtered.push(object);
                this.objects = filtered
            }

            this.selected = object
        }
    },
    computed: {
        isFormValid() {
            return this.meet.color && this.meet.color.trim().length > 0
                && this.meet.name && this.meet.name.trim().length > 0
        },
        getFormValidClass() {
            if (!this.meet.color || this.meet.color.trim().length < 4
                || !this.meet.name || this.meet.name.trim().length < 2) {
                return 'disabled'
            }

            return ''
        },
    }
});
</script>

<template>
    <div class="container-principal">
        <div class="container-meet">
            <MeetAddEditHeader :color="meet.color" :name="meet.name" @setColor="setColor" @setName="setName" />
            <div class="scroll">
                <MeetObjectPicker label="Paredes" :image="wallIcon" alt="Paredes" :asset="objectAssetsJson.wall" @setObject="setObject"/>
                <MeetObjectPicker label="Pisos" :image="floorIcon" alt="Pisos" :asset="objectAssetsJson.floor" @setObject="setObject"/>
                <MeetObjectPicker label="Tapetes" :image="rugIcon" alt="Tapetes" :asset="objectAssetsJson.rug" @setObject="setObject"/>
                <MeetObjectPicker label="Mesas" :image="tableIcon" alt="Mesas" :asset="objectAssetsJson.table" @setObject="setObject"/>
                <MeetObjectPicker label="Cadeiras" :image="chairIcon" alt="Cadeiras" :asset="objectAssetsJson.chair" @setObject="setObject"/>
                <MeetObjectPicker label="Sofás" :image="couchIcon" alt="Sofás" :asset="objectAssetsJson.couch" @setObject="setObject"/>
                <MeetObjectPicker label="Decorações" :image="decorIcon" alt="Decorações" :asset="objectAssetsJson.decor" @setObject="setObject"/>
                <MeetObjectPicker label="Plantas" :image="plantsIcon" alt="Plantas" :asset="objectAssetsJson.nature" @setObject="setObject"/>
            </div>
            <div class="actions">
                <span @click="goBack">Voltar</span>
                <button @click="updateMeet" :class="getFormValidClass" :disabled="!isFormValid">Salvar</button>
            </div>
        </div>
        <MeetObjectsRoom :objects="objects" :selected="selected" />
    </div>
</template>







<style src="@/assets/styles/principal.scss" lang="scss"/>