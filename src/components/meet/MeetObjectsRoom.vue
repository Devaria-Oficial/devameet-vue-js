<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        objects: Array,
        selected: null as any
    },
    mounted() {
        document.addEventListener('keyup', this.moveSelected);
    },
    methods: {
        moveSelected(event: any) {
            if (this.selected?._id) {
                let to = '';

                switch (event.key) {
                    case 'ArrowUp':
                        to = 'up'
                        break;
                    case 'ArrowDown':
                        to = 'down'
                        break;
                    case 'ArrowLeft':
                        to = 'left'
                        break;
                    case 'ArrowRight':
                        to = 'right'
                        break;
                    default: break;
                }

                if(to){
                    this.$emit('moveObject', {to, selected: this.selected});
                }
            }
        },
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

            if (this.selected?._id && object?._id && this.selected?._id === object?._id) {
                cl += ' selected';
            }

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
            <div class="line row one" />
            <div class="line row two" />
            <div class="line row three" />
            <div class="line row four" />
            <div class="line row five" />
            <div class="line row six" />
            <div class="line row seven" />
            <div class="line column one" />
            <div class="line column two" />
            <div class="line column three" />
            <div class="line column four" />
            <div class="line column five" />
            <div class="line column six" />
            <div class="line column seven" />
            <img v-for="object in objects" :src="getImageFromObject(object)" :style="getObjectStyle(object)"
                :class="getObjectClass(object)" @click="$emit('selectedObject', object)" />
        </div>
        <div class="actions">
            <div :class="selected?._id ? 'active' : ''" @click="$emit('deleteObject', selected)">
                <img src="../../assets/images/thrash_white.svg" alt="Deletar objeto" />
            </div>
            <div :class="selected?._id && (selected?.type === 'chair' || selected?.type === 'couch') ? 'active' : ''"
                @click="$emit('rotateObject', { selected, to: 'right' })">
                <img src="../../assets/images/rotate_right.svg" alt="Girar a Direita" />
            </div>
            <div :class="selected?._id && (selected?.type === 'chair' || selected?.type === 'couch') ? 'active' : ''"
                @click="$emit('rotateObject', { selected, to: 'left' })">
                <img src="../../assets/images/rotate_left.svg" alt="Girar a Esquerda" />
            </div>
        </div>
    </div>
</template>















<style src="@/assets/styles/objects.scss" lang="scss"/>