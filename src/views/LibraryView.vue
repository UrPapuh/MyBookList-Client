<script setup>
import { ref } from 'vue';

const searchKey = ref('');
</script>

<template>
  <div class="container">
    <h2>Busqueda avanzada</h2>
    <input
      type="text"
      placeholder="Search..."
      class="form-control"
      v-model="searchKey"
    >
    <br>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Authors</th>
          <th>Publisher</th>
          <th>Subjects</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>title</td>
          <td>authors</td>
          <td>publisher</td>
          <td>categories</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
