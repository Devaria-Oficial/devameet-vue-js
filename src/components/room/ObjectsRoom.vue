<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        objects: Array
    },
    mounted() {

    },
    methods: {
        getImageFromObject(object: any) {
            if (object?.name?.trim().length > 0) {
                const path = `../../assets/objects/${object?.type}/${object.name}${object.orientation ? '_' + object.orientation : ''}.png`;
                const imageUrl = new URL(path, import.meta.url);
                return imageUrl.href;
            }
        },
        getObjectStyle(object: any) {
            const style = {} as any;

            if (object.zindex) {
                style.zIndex = object.zindex;
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
        }
    }
});
</script>

<template>
    <div class="container-objects">
        <div class="grid">
            <img v-for="object in objects" :src="getImageFromObject(object)" :style="getObjectStyle(object)"
                :class="getObjectClass(object)" @click="$emit('selectedObject', object)" />

            <div class="preview">
                <img src="../../assets/images/preview.svg" alt="entrar na sala" />
                <button @click="$emit('enterRoom')">Entrar na sala</button>
            </div>
        </div>
    </div>
</template>

















<style src="@/assets/styles/objects.scss" lang="scss"/>