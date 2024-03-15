<script setup>
import { RouterLink, RouterView } from 'vue-router';
// import SearchBox from './components/SearchBox.vue';

</script>

<template>
  <header class="sticky-top mb-4">
    <nav class="navbar navbar-expand-md">
      <div class="container-fluid">
        <router-link :to="{name: 'home'}" class="navbar-brand">
          <img src="/favicon.ico" alt="Logo" />
          <span id="brand-name" class="ps-2">MyBookList</span>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
          aria-controls="offcanvas"
          aria-label="Navbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabindex="-1"
          id="offcanvas"
          aria-labelledby="offcanvasLabel"
        >
          <div class="offcanvas-header">
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body d-flex flex-column flex-md-row justify-content-md-end">

            <!-- sign buttons or profile dropdown -->



                <div class="order-0 order-md-1 d-flex flex-column flex-md-row align-items-center">

                    <div class="">
                      <router-link
                        :to="{name: 'login'}"
                        class="btn btn-primary">
                        Sign In
                      </router-link>
                    </div>

                    <div class="">
                      <router-link
                        :to="{name: 'register'}"
                        class="btn btn-primary">
                        Sign Up
                      </router-link>
                    </div>

                </div>

                <div class="order-1 order-md-0 me-auto">
                  <ul class="navbar-nav nav-underline flex-grow-1">
                    <li class="nav-item">
                      <router-link :to="{name: 'library', query: {mode: 'list'}}" class="nav-link">Library</router-link>
                    </li>
                  </ul>
                </div>
              </div>


        </div>
      </div>
    </nav>
    <!-- <SearchBox /> -->
  </header>

  <main class="container-fluid p-5">
    <router-view/>
  </main>

  <footer class="container-fluid p-5 mt-auto">
    <div class="row">
      <div class="col-6 col-md-2 mb-3">
        <h5>Contact Us</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2">
            <a href="mailto:mybooklist@gmail.com" class="nav-link p-0 text-reset">
              mybooklist@gmail.com
            </a>
          </li>
          <li class="nav-item mb-2">
            <a href="tel:+34 999 999 99" class="nav-link p-0 text-reset"> +34 999 999 99 </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="row text-center d-flex justify-content-center pt-5">
      <div class="col-md-2">
        <h6 class="text-uppercase font-weight-bold">
          <router-link :to="{name:'about'}" class="text-reset text-decoration-none">About Us</router-link>
        </h6>
      </div>
      <div class="col-md-2">
        <h6 class="text-uppercase font-weight-bold">
          <router-link :to="{name:'legal-conditions'}" class="text-reset text-decoration-none">Legal Conditions</router-link>
        </h6>
      </div>
      <div class="col-md-2">
        <h6 class="text-uppercase font-weight-bold">
          <router-link :to="{name:'privacy-policy'}" class="text-reset text-decoration-none">Privacy Policy</router-link>
        </h6>
      </div>
      <div class="col-md-2">
        <h6 class="text-uppercase font-weight-bold">
          <router-link :to="{name:'help'}" class="text-reset text-decoration-none">Help</router-link>
        </h6>
      </div>
    </div>

    <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top border-dark">
      <p>&copy; 2022 Company, Inc. All rights reserved.</p>
      <ul class="list-unstyled d-flex">
        <li class="ms-3">
          <a class="link-dark" href="#">
            <img class="media-icon" src="@/assets/icons/twitter-icon.svg" alt="Twitter" />
          </a>
        </li>
        <li class="ms-3">
          <a class="link-dark" href="#">
            <img class="media-icon" src="@/assets/icons/instagram-icon.svg" alt="Instagram" />
          </a>
        </li>
        <li class="ms-3">
          <a class="link-dark" href="#">
            <img class="media-icon" src="@/assets/icons/facebook-icon.svg" alt="Facebook" />
          </a>
        </li>
        <li class="ms-3">
          <a class="link-dark" href="#">
            <img class="media-icon" src="@/assets/icons/tiktok-icon.svg" alt="Tiktok" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
