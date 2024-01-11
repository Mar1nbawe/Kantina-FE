<script setup lang="ts">
import { useMeStore } from "@/stores/MeStore";
import { router } from "../main";
import {api} from "../services/api/index"
import { ref } from "vue";

const emailref = ref<string>("");
const passwordref = ref<string>("");
const {setId} = useMeStore();

const axiosstatus = ref("");

const postLogin = async (email: string, password: string) => {
  const path = "/login";

  const response = await api.post(path, {email: email, password: password});
  if (response.status === 200) {
      setId(response.data['user_id']);
      router.push("/");
  }
  else {
    axiosstatus.value = response.status;
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-form">
      <h1>Login</h1>
      <form class=" flex flex-col">
        <label for="email" class="m-2">Email</label>
        <input
          type="email"
          id="email"
          v-model="emailref"
          placeholder="Enter Email"
        />
        <label for="password" class="m-2">Password</label>
        <input
          type="password"
          id="password"
          v-model="passwordref"
          placeholder="Enter Password"
        />
        <button
          type="submit"
          @click.prevent="postLogin(emailref, passwordref)"
        >
          Login
        </button>
        <p v-if="axiosstatus == 'failed'">Invalid Credentials</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.login-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
</style>