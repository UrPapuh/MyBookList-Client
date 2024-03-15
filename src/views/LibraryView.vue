<script setup>
import { RouterLink } from 'vue-router';
import TableView from '../components/TableView.vue';
import CardView from '../components/CardView.vue';

import { watch , computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
// import { router } from '../router/index.js';

const keyFilter = ref('');
const authorFilter = ref('');
const publisherFilter = ref('');
const categoryFilter = ref('');


const query = computed (() => { return useRoute().query });

const viewMode = computed (() => { return useRoute().query.mode });

const searchResults = ref({});
const maxResults = 12; //Default = 10
const startIndex = ref(0); //Default = 0

onMounted(() => {
  if (query.value.q) keyFilter.value = query.value.q;
  if (query.value.author) authorFilter.value = query.value.author;
  if (query.value.publisher) publisherFilter.value = query.value.publisher;
  if (query.value.category) categoryFilter.value = query.value.category;
});

watch([keyFilter, authorFilter, publisherFilter, categoryFilter], () => {
  startIndex.value = 0;
  // router.replace({
  //   name: 'library', // Keep the current path
  //   query: query.value // Update the query parameter
  // });
  // console.log(router);
});

const searchFilters = computed (() => {
  let filters = `q=${keyFilter.value}`;
  if (authorFilter.value) filters += ` inauthor:${authorFilter.value}`;
  if (publisherFilter.value) filters += ` inpublisher:${publisherFilter.value}`;
  if (categoryFilter.value) filters += ` subject:${categoryFilter.value}`;
  filters = filters.trim().replace(/ /g, '+');
  filters += `&printType=books&fields=totalItems,items(id,volumeInfo(title,authors,publisher,categories,imageLinks/smallThumbnail))&startIndex=${startIndex.value}&maxResults=${maxResults}`;

console.log(filters);

  return filters;
});

watch(searchFilters, async (params) => {
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?${params}`);
    let json = await response.json();

// console.log(response.status);
// console.log(json);
//
    if (json.items) searchResults.value = json;
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
    <div id="accordion">
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
    </div>
    <!-- Results Options -->
    <div v-if="searchFilters && searchResults.items">
      <div class="row my-3 align-items-center">
        <div class="col-auto d-none d-md-block">{{ searchResults.totalItems }} resultados</div>
        <div class="col-auto ms-auto">
          <div>
            <router-link
              :to="{name: 'library', query: {mode: 'list'}}"
              role="button"
              class="btn btn-primary btn-sm ms-1"
              :class="{disabled: !viewMode || viewMode == 'list'}"
            >
              <img href="../assets/icons/table-icon.svg" class="fonticon-table" />
              <span class="d-none d-md-inline">&nbsp;Ver lista</span>
            </router-link>
            <router-link
              :to="{name: 'library', query: {mode: 'card'}}"
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
