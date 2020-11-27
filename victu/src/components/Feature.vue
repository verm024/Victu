<template>
  <div
    class="feature white rounded-xl d-flex justify-center flex-column text-center px-7 py-5 mr-5"
  >
    <div class="">
      <img
        class="feature__image"
        :src="require(`@/assets/images/${feature.src}`)"
        alt=""
      />
    </div>
    <div class="features-title mx-auto">
      {{ feature.feature }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["feature"]
};
</script>

<style scoped>
.feature {
  min-width: 150px;
  cursor: pointer;
}

.feature__image {
  height: 30px;
}

.features-title {
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #28190e;
  max-width: 100px;
  line-height: 20px;
  margin-top: 5px;
}
</style>
