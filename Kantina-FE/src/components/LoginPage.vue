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
  <div class="login-page ">
    <div class="login-form w-[25%] rounded-md bg-green-300">
      <h1>La Kantina</h1>
      <form class=" flex flex-col text-[#002926]">
        <label for="email" class="m-2 font-semibold">E-mail</label>
        <input class="p-1 rounded-xl bg-white text-[#002926]"
          type="email"
          id="email"
          v-model="emailref"
          placeholder="Enter Email"
        />
        <label for="password" class="m-2 font-semibold">Password</label>
        <input class="p-1 rounded-xl bg-white text-[#002926]"
          type="password"
          id="password"
          v-model="passwordref"
          placeholder="Enter Password"
        />
      
        <p v-if="axiosstatus.value == 'failed'">Invalid Credentials</p>
      </form>
      <button class=" w-auto h-auto justify-center items-center bg-[#8ee1cc] text-[#002926] mt-10 pl-3 pr-3 font-semibold"
          type="submit"
          @click.prevent="postLogin(emailref, passwordref)"
        >
          Login
        </button>
    </div>
  </div>
</template>

<style scoped>
.login-page{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
}

.login-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #d4eef4;
  padding: 2rem;
  border-radius: 10px;

}
</style>