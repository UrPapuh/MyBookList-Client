<script setup>
import { RouterView } from 'vue-router';

import HeaderLayout from './components/HeaderLayout.vue';
import FooterLayout from './components/FooterLayout.vue';
</script>

<template>
  <HeaderLayout />

  <main class="container-fluid p-5">
    <router-view/>
  </main>

  <FooterLayout />
</template>
