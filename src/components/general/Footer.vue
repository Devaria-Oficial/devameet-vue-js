<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from './Navigation.vue';

export default defineComponent({
    components:{Navigation}
});
</script>

<template>
    <div class="container-footer">
        <Navigation />
    </div>
</template>

<style src="@/assets/styles/footer.scss" lang="scss"/>