<script setup>
import TableView from '../components/TableView.vue';
import CardView from '../components/CardView.vue';

import { watch , computed, ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
// import { router } from '../router/index.js';

const q = {
  key: ref(''),
  author: ref(''),
  publisher: ref(''),
  category: ref('')
};

onMounted(() => {
  let query = useRoute().query;

  if (query.q) q.key.value = query.q;
  if (query.author) q.author.value = query.author;
  if (query.publisher) q.publisher.value = query.publisher;
  if (query.category) q.category.value = query.category;

  search();
});

const viewMode = computed (() => { return useRoute().query.mode });

const searchResults = ref({});
const maxResults = 12; //Default = 10
const startIndex = ref(0); //Default = 0

watch(startIndex, () => {
  search();
});

watch([q.key, q.author, q.publisher, q.category], () => {
  startIndex.value = 0;
});

const searchFilters = computed (() => {
  let filters = `q=${q.key.value}`;
  if (q.author.value) filters += ` inauthor:${q.author.value}`;
  if (q.publisher.value) filters += ` inpublisher:${q.publisher.value}`;
  if (q.category.value) filters += ` subject:${q.category.value}`;
  filters = filters.trim().replace(/ /g, '+');
  filters += `&printType=books&fields=totalItems,items(id,volumeInfo(title,authors,publisher,categories,imageLinks/smallThumbnail))&startIndex=${startIndex.value}&maxResults=${maxResults}`;

console.log(filters);

  return filters;
});


async function search() {
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?${searchFilters.value}`);
    let json = await response.json();

    if (json.items) searchResults.value = json;
};
</script>

<template>
  <div class="container">
    <h2>Busqueda avanzada</h2>
    <div class="input-group mb-4">
      <input
        type="text"
        placeholder="Search..."
        class="form-control"
        v-model="q.key.value"
      >
      <div class="input-group-append">
        <button 
          type="button"
          class="btn" 
          @click="search()"
          :class="{
            disabled: !(q.key.value || q.author.value || q.publisher.value || q.category.value)
          }"
        >
          <img src="../assets/icons/search-icon.svg" alt="Search">
        </button>
      </div>
    </div>

    <div class="accordion accordion-flush" id="extraFilters">
      <div class="accordion-item">
        <h2 class="accordion-header" id="extraFilters-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#extraFilters-body"
            aria-expanded="true"
            aria-controls="extraFilters-body"
          >
            Filters
          </button>
        </h2>
        <div id="extraFilters-body" class="accordion-collapse collapse show" aria-labelledby="extraFilters-header" data-bs-parent="#extraFilters">
          <div class="accordion-body">
            <div class="form-group">
              <label for="authorFilter">Author</label>
              <input
                type="text"
                id="authorFilter"
                placeholder="Search..."
                class="form-control"
                v-model="q.author.value"
              >
            </div>
            <div class="form-group">
              <label for="publisherFilter">Publisher</label>
              <input
                type="text"
                id="publisherFilter"
                placeholder="Search..."
                class="form-control"
                v-model="q.publisher.value"
              >
            </div>
            <div class="form-group">
              <label for="categoryFilter">Category</label>
              <input
                type="text"
                id="categoryFilter"
                placeholder="Search..."
                class="form-control"
                v-model="q.category.value"
              >
            </div>
          </div>
        </div>
      </div>
    </div>



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
              v-model="q.author.value"
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
              v-model="q.publisher.value"
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
              v-model="q.category.value"
            >
          </div>
        </div>
      </div> -->
    <!-- </div> -->
    <!-- Results Options -->
    <div v-if="searchFilters && searchResults.items">
      <div class="row my-3 align-items-center">
        <div class="col-auto d-none d-md-block">{{ searchResults.totalItems }} resultados</div>
        <div class="col-auto ms-auto">
          <div>
            <router-link
              :to="{name: 'library', query: {...$route.query, mode: 'list'}}"
              role="button"
              class="btn btn-primary btn-sm ms-1"
              :class="{disabled: !viewMode || viewMode == 'list'}"
            >
              <img href="../assets/icons/table-icon.svg" class="fonticon-table" />
              <span class="d-none d-md-inline">&nbsp;Ver lista</span>
            </router-link>
            <router-link
              :to="{name: 'library', query: {...$route.query, mode: 'card'}}"
              role="button"
              class="btn btn-primary btn-sm ms-1"
              :class="{disabled: viewMode == 'card'}"
            >
              <img href="../assets/icons/grid-icon.svg" class="fonticon-table" />
              <span class="d-none d-md-inline">&nbsp;Ver cuadricula</span>
            </router-link>
          </div>
        </div>
      </div>
      <!-- searchResults Views -->
      <div
        v-if="viewMode == 'card'"
        class="row"
      >
        <CardView :data="searchResults.items" />
      </div>
      <div
        v-else
        class="row"
      >
        <TableView :data="searchResults.items" />
      </div>
      <!-- Pagination -->
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li
          class="page-item"
          :class="{disabled: startIndex == 0}"
          >
            <a
              class="page-link"
              @click="startIndex >= maxResults ? startIndex = (startIndex - maxResults):0"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              @click="startIndex += maxResults"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div v-else class="container-fluid p-4">
      <span>No hay resultados</span>
    </div>
  </div>
</template>
