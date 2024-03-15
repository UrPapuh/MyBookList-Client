<script setup>
import { ref } from "vue";
import { RouterLink } from 'vue-router';

const name = ref('');
const email = ref('');
const password1 = ref('');
const password2 = ref('');
const errors = ref({});
const termsServices = ref(false);

const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

function checkForm(e) {
  e.preventDefault();
  
  errors.value = {};
  
  if (!name.value) errors.value.name = 'Nombre no valido';
  if (!validEmail.test(email.value)) errors.value.email = 'Email no valido';
  if (!password1.value || password1.value != password2.value) errors.value.password = 'Contraseña no valida';
  if (!termsServices.value) errors.value.termsServices = 'Tienes que aceptar las condiciones de uso';
  
  if (!errors.value) register();
}

async function register() {
    const data = {
      "name": name.value,
      "email": email.value,
      "password": password1.value,
    };

    let response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

console.log(response.status);

let json = await response.json();
//
console.log(json);
//

    if (response.status == 200) {
      // feedback valid notification
    } else {
      // feedback invalid notification
    }
}
</script>

<template>
<main class="w-100 p-4 d-flex justify-content-center">
    <form>
      <div class="form-outline mb-4">
        <label class="form-label" for="nameInput">Name</label>
        <input
          type="text"
          id="nameInput"
          v-model="name"
          class="form-control"
          :class="{
            'is-invalid': errors.name,
          }"
          required
        />
        <div v-show="errors.name" class="invalid-feedback">
          {{ errors.name }}
        </div>
      </div>

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
        <label class="form-label" for="passwordInput1">Password</label>
        <input
          type="password"
          id="passwordInput1"
          v-model="password1"
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

      <div class="form-outline mb-4">
        <label class="form-label" for="password2Input">Confirm Password</label>
        <input
          type="password"
          id="password2Input"
          v-model="password2"
          class="form-control"
          :class="{
            'is-invalid': errors.password,
          }"
          required
        />
      </div>

      <div class="form-check d-flex justify-content-center mb-5">
        <input
          id="terms"
          type="checkbox"
          v-model="termsServices"
          class="form-check-input me-2"
          :class="{
            'is-invalid': errors.termsServices,
            'is-valid': termsServices,
          }"
        />
        <label class="form-check-label" for="terms">
          I agree all statements in
          <router-link :to="{name: 'legal-conditions'}" class="text-body">
            <u>Terms of service</u>
          </router-link>
        </label>
      </div>

      <div class="row">
        <button type="submit" class="btn btn-primary" @click="checkForm">Sign Up</button>
      </div>

      <p class="text-center text-muted mt-5 mb-0">
        Have already an account?
        <router-link :to="{name: 'login'}" class="fw-bold text-body">
          <u>Login here</u>
        </router-link>
      </p>
    </form>
  </main>
</template>