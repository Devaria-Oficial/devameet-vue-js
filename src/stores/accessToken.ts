import {defineStore} from 'pinia';

export const useAccessTokenStore = defineStore({
    id: 'accessToken',
    state: () => ({
        token: localStorage.getItem('token')
    }),
    getters: {
        isAuthenticated: (state: any) => state.token !== null
            && state.token !== undefined 
            && state.token !== ''
    },
    actions: {
        setToken(t: string){
            this.token = t;
        }
    }
});