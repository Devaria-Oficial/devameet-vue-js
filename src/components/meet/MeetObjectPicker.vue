<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    props: {
        image: String,
        alt: String,
        label: String,
        asset: Object
    },
    data() {
        return {
            show: false,
            selected: null  as any
        }
    },
    methods: {
        getImageFromObject(object: any) {
            if (object && object.trim().length > 0) {
                const path = `../../assets/objects/${this.asset?.path}/${object}${this.asset?.canRotate ? '_front' : ''}.png`;
                const imageUrl = new URL(path, import.meta.url);
                return imageUrl.href;
            }
        },
        selectObject(object: any) {
            this.selected = object;

            const objectFinal = {
                name: object,
                x: this.asset?.defaultXPosition,
                y: this.asset?.defaultYPosition,
                zindex: this.asset?.defaultZIndex,
                orientation: this.asset?.canRotate ? 'front': '',
                type: this.asset?.path,
                flexStart:  this.asset?.flexStart,
                selectMultiple:  this.asset?.selectMultiple,
            }

            this.$emit('setObject', objectFinal);
        }
    }
});
</script>

<template>
    <div class="container-object-picker">
        <div class="action" @click="show = !show">
            <img :src="image" :alt="alt" />
            <span>{{ label }}</span>
            <img src="../../assets/images/arrow_object_right.svg" alt="Mostrar objetos" v-if="!show" />
            <img src="../../assets/images/arrow_object_.svg" alt="Esconder objetos" v-else />
        </div>
        <div class="objects" v-if="show">
            <div v-for="object in asset?.objects" @click="selectObject(object)"
                :class="!asset?.selectMultiple && object === selected ? 'selected' : ''">
                <img class="object" :src="getImageFromObject(object)" :class="asset?.path === 'couch' || asset?.path === 'wall' ? 'large' : ''" />
                <img class="add" src="../../assets/images/edit_add.svg" v-if="asset?.selectMultiple" />
            </div>
        </div>
    </div>
</template>



<style src="@/assets/styles/objectPicker.scss" lang="scss"/>