import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import HomeView from '../views/HomeView.vue';
import { useAccessTokenStore } from '@/stores/accessToken';
import ProfileView from '@/views/ProfileView.vue';
import MeetAddView from '@/views/MeetAddView.vue';
import MeetEditView from '@/views/MeetEditView.vue';
import RoomLinkView from '@/views/RoomLinkView.vue';
import RoomView from '@/views/RoomView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { rotaPrivada: true }
    },
    {
      path: '/',
      name: 'login',
      component: LoginView,
      props: true
    }, {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/user',
      name: 'user',
      component: ProfileView,
      meta: { rotaPrivada: true }
    },
    {
      path: '/add',
      name: 'add',
      component: MeetAddView,
      meta: { rotaPrivada: true }
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: MeetEditView,
      meta: { rotaPrivada: true }
    },
    {
      path: '/link',
      name: 'link',
      component: RoomLinkView,
      meta: { rotaPrivada: true }
    },
    {
      path: '/room/:link',
      name: 'room',
      component: RoomView,
      meta: { rotaPrivada: true }
    },
  ]
});

router.beforeEach((to, from) => {
  const store = useAccessTokenStore();

  if (to.name !== 'login' && to.meta.rotaPrivada && !store.isAuthenticated) {
    return { name: 'login' }
  } else if (to.name === 'register' && store.isAuthenticated) {
    return { name: 'home' }
  }
});

export default router
