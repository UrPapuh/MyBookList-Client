<script setup>
import { ref } from "vue";
import { RouterLink } from 'vue-router';

const email = ref('');
const password = ref('');
const remember = ref(false);
const errors = ref({});

const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
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
            'is-valid': email && !errors.email
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
            'is-valid': password && !errors.password
          }"
          required
        />
        <div v-show="errors.password" class="invalid-feedback">
          {{ errors.password }}
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