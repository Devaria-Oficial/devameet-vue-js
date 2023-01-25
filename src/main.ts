import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router';
import {GDialog} from 'gitart-vue-dialog';

import 'gitart-vue-dialog/dist/style.css';
import './assets/styles/global.scss';

const app = createApp(App)

app.component('GDialog',GDialog);
app.use(createPinia())
app.use(router)

app.mount('#app')
