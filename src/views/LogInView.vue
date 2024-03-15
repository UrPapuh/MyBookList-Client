<script setup>
import { ref } from "vue";
import { RouterLink } from 'vue-router';

const email = ref('');
const password = ref('');
const remember = ref(false);
const errors = ref({});

const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

function checkForm(e) {
  e.preventDefault();
  
  errors.value = {};

  if (!validEmail.test(email.value)) errors.value.email = 'Email no valido';
  if (!password.value) errors.value.password = 'Contraseña no valida';

  if (!errors.value) login();
}

async function login() {
  const data = {
    "email": email.value,
    "password": password.value, // hash (?)
    "remember": remember.value
  };

  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) 
  }

  let response = await fetch("", options);
  let json = await response.json();


  // save rememberToken and redirect to a home page with user data
  console.log(json);
}
</script>

<template>
  <main class="w-100 p-4 d-flex justify-content-center">
    <form>
      <div class="form-outline mb-4">
        <label class="form-label" for="emailInput">Email address</label>
        <input
          type="email"
          id="emailInput"
          v-model="email"
          class="form-control"
          :class="{
            'is-invalid': errors.email,
          }"
          required
        />
        <div v-show="errors.email" class="invalid-feedback">
          {{ errors.email }}
        </div>
      </div>


      <div class="form-outline mb-4">
        <label class="form-label" for="passwordInput">Password</label>
        <input
          type="password"
          id="passwordInput"
          v-model="password"
          class="form-control"
          :class="{
            'is-invalid': errors.password,
          }"
          required
        />
        <div v-show="errors.password" class="invalid-feedback">
          {{ errors.password }}
        </div>
      </div>

      <div class="row mb-4">
        <div class="col d-flex justify-content-center">
          <div class="form-check">
            <input
              type="checkbox"
              id="rememberInput"
              v-model="remember"
              class="form-check-input"
              checked
            />
            <label class="form-check-label" for="rememberInput">Remember me</label>
          </div>
        </div>
        <div class="col">
          <router-link to="/forgot-password">Forgot password?</router-link>
        </div>
      </div>

      <div class="row">
        <button type="submit" class="btn btn-primary" @click="checkForm">Sign in</button>
      </div>

      <div class="row text-center text-muted mt-5 mb-0">
        <p>
          Not a member?
          <router-link to="/register">Sign Up</router-link>
        </p>
      </div>
    </form>
  </main>
</template>