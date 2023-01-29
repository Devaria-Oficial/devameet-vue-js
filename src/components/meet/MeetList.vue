<script lang="ts">
import { MeetServices } from '@/services/MeetServices';
import { GDialog } from 'gitart-vue-dialog';
import { defineComponent } from 'vue';
import MeetListItem from './MeetListItem.vue';

const meetServices = new MeetServices();

export default defineComponent({
    data() {
        return {
            meets: [] as any,
            selectedId: null as string | null,
            showModal: false,
        };
    },
    components: { MeetListItem, GDialog },
    mounted() {
        this.getMeets();
    },
    methods: {
        async getMeets() {
            try {
                const result = await meetServices.getMeets();
                if (result?.data) {
                    this.meets = result.data;
                }
            } catch (e) {
                console.log('Ocorreu erro ao listar reuniões:', e);
            }
        },
        selectItem(id: string) {
            this.selectedId = id;
            this.$emit('selectItem', id);
        },
        selectToRemove(id: string) {
            this.selectedId = id;
            this.showModal = true;
        },
        async deleteMeet(){
            try {
                if(!this.selectedId){
                    return;
                }

                await meetServices.deleteMeet(this.selectedId);
                await this.getMeets();
                this.showModal =false;
                this.selectedId = null;
            } catch (e) {
                console.log('Ocorreu erro ao deletar reunião:', e);
            }
        }
    }
});
</script>

<template>
    <div class="container-meet-list">
        <div class="empty" v-if="meets.length === 0">
            <img src="../../assets/images/empty.svg" />
            <p>Você ainda não possui reuniões criadas :(</p>
        </div>
        <MeetListItem v-else v-for="meet in meets" :meet="meet" :selectedId="selectedId || ''" @selectItem="selectItem"
            @selectToRemove="selectToRemove" />
    </div>
    <GDialog v-model="showModal">
        <div class="wrapper">
            <div class="content">
                <div class="container">
                    <span>Deletar reunião</span>
                    <p>Deseja deletar a reunião?</p>
                    <p>Essa ação não poderá ser desfeita.</p>
                </div>
                <div class="actions">
                    <span @click="showModal = false">Cancelar</span>
                    <button @click="deleteMeet">Confirmar</button>
                </div>
            </div>
        </div>
    </GDialog>
</template>





<style src="@/assets/styles/meetList.scss" lang="scss"/>