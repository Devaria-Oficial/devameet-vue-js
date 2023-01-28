<script lang="ts">
import { defineComponent } from 'vue';
import MeetUserHeader from './MeetUserHeader.vue';

export default defineComponent({
    components: { MeetUserHeader }
});
</script>

<template>
    <div class="container-principal">
        <div class="container-meet">
            <MeetUserHeader />
        </div>
    </div>
</template>

<style src="@/assets/styles/principal.scss" lang="scss"/>