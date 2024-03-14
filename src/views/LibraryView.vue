<script setup>
// import { RouterLink } from 'vue-router';

import { watch , computed, ref } from 'vue';

const keyFilter = ref('');
const authorFilter = ref('');
const publisherFilter = ref('');
const categoryFilter = ref('');

const searchResults = ref({});

const searchFilters = computed (() => {
  let filters = keyFilter.value;
  if (authorFilter.value) filters += ` inauthor:${authorFilter.value}`;
  if (publisherFilter.value) filters += ` inpublisher:${publisherFilter.value}`;
  if (categoryFilter.value) filters += ` subject:${categoryFilter.value}`;
// console.log(filters);
  return filters;
});

watch(searchFilters, async (q) => {
  // FALTA METERLE LOS FILTROS
  if (q) {
    q = q.trim().replace(/ /g, '+');

    let url = `https://www.googleapis.com/books/v1/volumes?q=${q}&fields=items(id,volumeInfo(title,authors,publisher,categories))&maxResults=10&printType=books`;
// console.log(url);

    let response = await fetch(url);
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
      v-model="keyFilter"
    >
    <!-- <div id="accordion">
      <div class="card">
        <div class="card-header" id="heading1">
          <h5 class="mb-0">
            <button class="btn collapsed" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">Author</button>
          </h5>
        </div>
        <div id="collapse1" class="collapse show" aria-labelledby="heading1" data-parent="#accordion">
          <div class="card-body">
            <input
              type="text"
              placeholder="Search..."
              class="form-control"
              v-model="authorFilter"
            >
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header" id="heading2">
          <h5 class="mb-0">
            <button class="btn collapsed" data-toggle="collapse" data-target="#collapse2" aria-expanded="true" aria-controls="collapse2">Publisher</button>
          </h5>
        </div>
        <div id="collapse2" class="collapse show" aria-labelledby="heading2" data-parent="#accordion">
          <div class="card-body">
            <input
              type="text"
              placeholder="Search..."
              class="form-control"
              v-model="publisherFilter"
            >
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header" id="heading3">
          <h5 class="mb-0">
            <button class="btn collapsed" data-toggle="collapse" data-target="#collapse3" aria-expanded="true" aria-controls="collapse3">Category</button>
          </h5>
        </div>
        <div id="collapse3" class="collapse show" aria-labelledby="heading3" data-parent="#accordion">
          <div class="card-body">
            <input
              type="text"
              placeholder="Search..."
              class="form-control"
              v-model="categoryFilter"
            >
          </div>
        </div>
      </div>
    </div> -->
    <!-- content -->
    <div class="table-responsive" v-if="searchFilters && searchResults">
      <table class="table table-bordered">
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
    <div v-else class="container-fluid p-4">
      <span>No hay resultados</span>
    </div>
  </div>
</template>
