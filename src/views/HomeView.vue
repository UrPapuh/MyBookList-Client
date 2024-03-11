<script setup>

</script>

<template>
  <main>
    <div class="container">
      <!-- Carousel -->
      <div id="carousel1" class="carousel slide text-center carousel-dark" data-mdb-ride="carousel1">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <!-- portada -->
            <img class="rounded-circle shadow-1-strong mb-4"
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar"
              style="width: 150px;" />
            <!-- info -->
            <div class="row d-flex justify-content-center">
              <div class="col-lg-8">
                <h5 class="mb-3">Maria Kate</h5>
                <p>Photographer</p>
                <p class="text-muted">
                  <i class="fas fa-quote-left pe-2"></i>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti
                  nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia
                  fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit
                  doloremque.
                </p>
              </div>
            </div>
            <!-- puntuacion -->
            <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
              <li><i class="fas fa-star fa-sm"></i></li>
              <li><i class="fas fa-star fa-sm"></i></li>
              <li><i class="fas fa-star fa-sm"></i></li>
              <li><i class="fas fa-star fa-sm"></i></li>
              <li><i class="far fa-star fa-sm"></i></li>
            </ul>
          </div>
          <div class="carousel-item active">
            <!-- portada -->
            <img class="rounded-circle shadow-1-strong mb-4"
              src="" alt="avatar"
              style="width: 150px;" />
            <!-- info -->
            <div class="row d-flex justify-content-center">
              <div class="col-lg-8">
                <h5 class="mb-3">Maria Kate</h5>
                <p>Photographer</p>
                <p class="text-muted">
                  <i class="fas fa-quote-left pe-2"></i>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti
                  nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia
                  fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit
                  doloremque.
                </p>
              </div>
            </div>
            <!-- puntuacion -->
            <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
              <li><i class="fas fa-star fa-sm"></i></li>
              <li><i class="fas fa-star fa-sm"></i></li>
              <li><i class="fas fa-star fa-sm"></i></li>
              <li><i class="fas fa-star fa-sm"></i></li>
              <li><i class="far fa-star fa-sm"></i></li>
            </ul>
          </div>
        </div>
        <!-- control buttons -->
        <button class="carousel-control-prev" type="button" data-mdb-target="#carousel1" data-mdb-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control-next" type="button" data-mdb-target="#carousel1" data-mdb-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
      <!-- Carousel -->
    </div>
  </main>
</template>
