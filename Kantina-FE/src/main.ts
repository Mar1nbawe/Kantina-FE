import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import LoginPageVue from './views/LoginPage.vue';
import HomeViewVue from './views/HomeView.vue';

const app = createApp(App)

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            component: LoginPageVue
        },
        {
            path: "/",
            component: HomeViewVue
        }
    ]
})



app.use(createPinia())
app.use(router)

app.mount('#app')

