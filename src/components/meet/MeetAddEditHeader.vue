<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        name: String,
        color: String,
    },
    emits: {
        setName: null,
        setColor: null,
    },
    data() {
        return {
            showColors: false,
            colors: [
                '#25CBD3',
                '#3BD32D',
                '#F0F5FF',
                '#A7FAE9',
                '#D44231',
                '#DADADA'
            ],
            selected: null as String | null
        }
    },
    computed: {
        model: {
            get() {
                return this.name;
            },
            set(v: any) {
                this.$emit('setName', v);
            }
        }
    },
    methods:{
        selectColor(){
            if(this.selected){
                this.$emit('setColor', this.selected)
            }
            this.showColors = false;
        }
    }
});
</script>

<template>
    <div class="container-meet-user-header">
        <div>
            <span>Nova reunião</span>
            <input v-model="model" type="text" placeholder="Digite o nome de sua reunião" />
        </div>
        <div class="color-select" @click="showColors = true">
            <div class="circle" :style="{ backgroundColor: color }" />
            <img src="../../assets/images/arrow_down.svg" alt="Selecionar cor" />
        </div>
    </div>
    <GDialog v-model="showColors">
        <div class="wrapper">
            <div class="content">
                <div class="container">
                    <span>Selecione a cor da reunião:</span>
                    <div>
                        <div v-for="color in colors" 
                            class="color" 
                            :style="{ backgroundColor: color }"
                            :class="color === selected ? 'selected' : ''"
                            @click="selected = color" />
                    </div>
                </div>
                <div class="actions">
                    <span @click="showColors = false">Cancelar</span>
                    <button @click="selectColor">Confirmar</button>
                </div>
            </div>
        </div>
    </GDialog>
</template>







<style src="@/assets/styles/meetUserHeader.scss" lang="scss"/>