
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './index.css'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import LoginPageVue from './components/LoginPage.vue';
import  MapView  from '@/components/map/Map.vue'
const app = createApp(App)

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: LoginPageVue
        },
        {
            path: '/map',
            component : MapView
        }
    ]
})



app.use(createPinia())
app.use(router)

app.mount('#app')

