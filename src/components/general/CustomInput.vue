<script lang="ts">
    import {defineComponent} from 'vue';

    export default defineComponent({
        props:{
            icon: String,
            alt: String,
            name: String,
            type: String,
            placeholder: String,
            modelValue: String,
        },
        data(){
            return {
                inputFocus: false
            }
        },
        methods:{
            setFocus(v: boolean){
                this.inputFocus = v;
            }
        },
        computed:{
            model:{
                get(){
                    return this.modelValue;
                },
                set(v:any){
                    this.$emit('setInput', v);
                }
            }
        }
    });
</script>

<template>
    <div class="input" :class="{ focus: inputFocus }">
        <img :src="icon" :alt="alt" />
        <input :type="type" :name="name" :placeholder="placeholder"
            v-model="model" 
            @focus="setFocus(true)"
            @blur="setFocus(false)"/>
    </div>
</template>