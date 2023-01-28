<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';

export default defineComponent({
    setup(){
        return {
            mobile: window.innerWidth <= 992
        }
    },
    props: {
        meet: null as any,
        selectedId: String
    },
    methods: {
        getSelectedClass(id:string){
            if(id === this.selectedId){
                return 'selected';
            }
            return '';
        },
        selectMeet(){
            if(!this.mobile){
                this.$emit('selectItem', this.meet?.id);
            }
        },
        goToRoom(){
            router.push('room/'+this.meet?.link);
        },
        goToEdit(){
            router.push('edit/'+this.meet?.id);
        },
        copyLink(){
            navigator?.clipboard?.writeText(window?.location?.href + 'room/' +this.meet?.link)
        }
    }
});
</script>

<template>
    <div class="container-meet-list-item">
        <div class="meet" @click="selectMeet">
            <div class="color" :style="{ backgroundColor: meet?.color}"/>
            <span :class="getSelectedClass(meet?.id)">{{ meet?.name  }}</span>
        </div>
        <div class="actions">
            <img src="../../assets/images/link_list.svg" v-if="mobile" @click="goToRoom"/>
            <img src="../../assets/images/copy.svg" @click="copyLink"/>
            <img src="../../assets/images/edit.svg" v-if="!mobile" @click="goToEdit"/>
            <img src="../../assets/images/thrash.svg" @click="$emit('selectToRemove', meet?.id)"/>
        </div>
    </div>
</template>

<style src="@/assets/styles/meetListItem.scss" lang="scss"/>