<template>
  <h4 class="text-h5 text-sm-h4 mb-5 section-header">{{ header }}</h4>
</template>

<script>
export default {
  props: ["header"]
};
</script>

<style scoped>
.section-header {
  color: #28190e;
  font-family: Roboto;
  font-weight: bold;
}
</style>
