<script setup>
// import { RouterLink } from 'vue-router';

import { watch ,  ref } from 'vue';

const searchKey = ref('');
const searchResults = ref({});

watch(searchKey, async (q) => {
  q = q.replace(/ /g, '+');

console.log(q);

  let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&fields=items(id,volumeInfo(title,authors,publisher,categories))&maxResults=10`);
  let json = await response.json();
  // console.log('Objecto: ' + JSON.stringify(json.items[0]));
  // console.log('Id: ' + json.items[0].id);
  // console.log('Titulo: ' + json.items[0].volumeInfo.title);
  // console.log('Fecha: ' + json.items[0].volumeInfo.publishedDate);
  // console.log(json);
let results = json.items;
console.log(results);
  searchResults.value = results;
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
    <div v-if="searchResults"></div>
    <table class="table table-bordered table-striped">
      <thead>
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
          <router-link to="/">
            <td>{{ result.volumeInfo.title }}</td>
          </router-link>
          <!-- authors -->
          <td class="row" v-if="result.volumeInfo.authors">
            <a v-for="(author,index) in result.volumeInfo.authors" :key="index">{{ author }}</a>
          </td>
          <td v-else>
            unknown
          </td>
          <!-- publisher -->
          <td v-if="result.volumeInfo.publisher">
            <a>{{ result.volumeInfo.publisher }}</a>
          </td>
          <td v-else>
            unknown
          </td>
          <!-- categories -->
          <td v-if="result.volumeInfo.categories">
            <a v-for="(categorie,index) in result.volumeInfo.categories" :key="index">{{ categorie }}</a>
          </td>
          <td v-else>
            unknown
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
