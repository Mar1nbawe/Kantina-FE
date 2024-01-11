import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import LoginPageVue from './components/LoginPage.vue';

const app = createApp(App)

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: LoginPageVue
        }
    ]
})



app.use(createPinia())
app.use(router)

app.mount('#app')

