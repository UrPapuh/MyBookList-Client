<script setup>
import { ref } from "vue";
import { RouterLink } from 'vue-router';

const name = ref('');
const email = ref('');
const password1 = ref('');
const password2 = ref('');
const errors = ref({});

// const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

function checkForm(e) {
  e.eventPreventDefault();
  register();
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

  let json = await response.json();

  console.log(json);
  
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
            'is-valid': name && !errors.name
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
            'is-valid': email && !errors.email
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
            'is-invalid': errors.password1,
            'is-valid': password1 && !errors.password1
          }"
          required
        />
        <div v-show="errors.password1" class="invalid-feedback">
          {{ errors.password1 }}
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
            'is-invalid': errors.password2,
            'is-valid': password2 && !errors.password2
          }"
          required
        />
        <div v-show="errors.password2" class="invalid-feedback">
          {{ errors.password2 }}
        </div>
      </div>

      <div class="form-check d-flex justify-content-center mb-5">
        <input class="form-check-input me-2" type="checkbox" value="" id="terms" />
        <label class="form-check-label" for="terms">
          I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
        </label>
      </div>

      <div class="row">
        <button type="submit" class="btn btn-primary" @click="checkForm">Sign Up</button>
      </div>

      <p class="text-center text-muted mt-5 mb-0">
        Have already an account?
        <router-link to="/login" class="fw-bold text-body">
          <u>Login here</u>
        </router-link>
      </p>
    </form>
  </main>
</template>