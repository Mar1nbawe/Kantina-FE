<script setup lang="ts">
/* 


import { useUserStore } from "../scripts/userStore"; */
import { router } from "../main";
import {api} from "../services/api/index"
import { ref } from "vue";
let emailref: string = "";

let passwordref: string = "";

const axiosstatus = ref("");
/* const {setUserData} = useUserStore(); */

function postLogin(email: string, password: string) {
  const path = "/login";

  api
    .post(path, { email: email, password: password, })
    .then((response) => {
      if (response.data["status"] == "success") {
        const data = {
          id: response.data['id'],
          firstname: response.data['firstname'],
          lastname: response.data['lastname'],
          type: response.data['type']
        };
      /*   setUserData(data); */
        document.cookie += `user_data=${JSON.stringify(data)}`
        router.push("/timecards");
      } else {
        axiosstatus.value = response.data["status"];
      }
    })
    .catch((error) => console.log(error));
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
        <p v-if="axiosstatus.value == 'failed'">Invalid Credentials</p>
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