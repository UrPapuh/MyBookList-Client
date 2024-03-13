<script setup>
// import { RouterLink } from 'vue-router';

import { watch , computed, ref } from 'vue';

const searchKey = ref('');
const searchResults = ref({});
const filters = ref('');

const searchFilters = computed (() => {
  return searchKey.value + filters.value;
});

watch(searchFilters, async (q) => {
  // FALTA METERLE LOS FILTROS
  if (q) {
    q = q.replace(/ /g, '+');

    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&fields=items(id,volumeInfo(title,authors,publisher,categories))&maxResults=10&printType=books`);
    let json = await response.json();
    // console.log(response.status);

    // console.log('Objecto: ' + JSON.stringify(json.items[0]));
    // console.log('Id: ' + json.items[0].id);
    // console.log('Titulo: ' + json.items[0].volumeInfo.title);
    // console.log('Fecha: ' + json.items[0].volumeInfo.publishedDate);
    // console.log(json);

  // let results = json.items;
  // console.log(results);

    searchResults.value = json.items;
  }
});
</script>

<template>
  <div class="container">
    <h2>Busqueda avanzada</h2>
    <input
      type="text"
      placeholder="Search..."
      class="form-control mb-4"
      v-model="searchKey"
    >
    <input type="text" v-model="filters" class="form-control" disabled>
    <div class="table-responsive" v-if="searchKey && searchResults">
      <table class="table table-bordered text-center">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Authors</th>
            <th scope="col">Publisher</th>
            <th scope="col">Categories</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in searchResults" :key="index">
            <!-- title with selfLink -->
            <td scope="row">
              <router-link to="/" class="text-decoration-none text-reset">
              {{ result.volumeInfo.title }}
              </router-link>
            </td>
            <!-- authors -->
            <td v-if="result.volumeInfo.authors">
              <a v-for="(author,index) in result.volumeInfo.authors" :key="index">{{ author }}</a>
            </td>
            <td v-else class="text-muted">unknown</td>
            <!-- publisher -->
            <td v-if="result.volumeInfo.publisher">
              <a>{{ result.volumeInfo.publisher }}</a>
            </td>
            <td v-else class="text-muted">unknown</td>
            <!-- categories -->
            <td v-if="result.volumeInfo.categories">
              <a v-for="(categorie,index) in result.volumeInfo.categories" :key="index">{{ categorie }}</a>
            </td>
            <td v-else class="text-muted">unknown</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="container-fluid">
      <span>No hay resultados</span>
    </div>
  </div>
</template>
