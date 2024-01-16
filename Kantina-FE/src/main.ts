
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './index.css'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import LoginPageVue from '@/views/LoginPage.vue';
import  MapView  from '@/views/HomeView.vue'
const app = createApp(App)

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
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

