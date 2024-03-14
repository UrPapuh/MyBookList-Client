<script setup>
import TableView from '../components/TableView.vue';
import CardView from '../components/CardView.vue';

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
  if (q) {
    q = q.trim().replace(/ /g, '+');

    // let url = `https://www.googleapis.com/books/v1/volumes?q=${q}&fields=totalItems,items(id,volumeInfo(title,authors,publisher,categories,imageLinks/thumbnail))&maxResults=10&printType=books`;
// console.log(url);

    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&fields=totalItems,items(id,volumeInfo(title,authors,publisher,categories,imageLinks/thumbnail))&maxResults=10&printType=books`);
    let json = await response.json();

// console.log(response.status);

console.log(json);

    searchResults.value = json;
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
    <!-- results -->
    <div v-if="searchFilters && searchResults.items">
      <div class="row my-3 align-items-center">
        <div class="col-auto d-none d-md-block">{{ searchResults.totalItems }} resultados</div>
        <div class="col-auto ms-auto">
          <div>
            <a href="" role="button" class="btn btn-primary btn-sm ms-1">
              <img href="../assets/icons/table-icon.svg" class="fonticon-table" />
              <span class="d-none d-md-inline">&nbsp;Ver lista</span>
            </a>
            <a href="" role="button" class="btn btn-primary btn-sm ms-1 disabled">
              <img href="../assets/icons/grid-icon.svg" class="fonticon-table" />
              <span class="d-none d-md-inline">&nbsp;Ver cuadricula</span>
            </a>
          </div>
        </div>
      </div>
      <!-- content -->
      <div class="row">
        <TableView :data="searchResults.items"></TableView>
      </div>
      <div class="row">
        <CardView :data="searchResults.items"></CardView>
      </div>
      <!-- paginacion -->
    </div>
    <div v-else class="container-fluid p-4">
      <span>No hay resultados</span>
    </div>
  </div>
</template>
