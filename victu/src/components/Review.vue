<template>
  <div class="review__card">
    <div class="white d-flex pa-4 justify-space-between align-center">
      <div>
        <h4 class="font-weight-bold text-h5 text-sm-h4 mb-2">
          {{ review.rating }}/5
        </h4>
        <h5>{{ review.reviewer }}</h5>
      </div>
      <div class="review__time">
        <p class="mb-0">{{ review.date }}</p>
        <p class="mb-0">{{ review.time }}</p>
      </div>
    </div>
    <div class="review__content">
      <p>{{ review.review }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["review"]
};
</script>

<style>
.review__card {
  border-radius: 10px;
  overflow: hidden;
}

.review__content {
  background-color: rgba(252, 229, 170, 0.47);
  padding: 12px;
  font-family: Nunito;
  font-weight: normal;
  font-size: 14px;
  text-align: justify;
  color: #28190e;
  height: 100px;
}
</style>
