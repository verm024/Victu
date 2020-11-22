<template>
  <button :class="['button white--text rounded-lg', className]">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: ["text", "className"]
};
</script>

<style scoped>
.button {
  font-weight: bold;
  background-color: #f7b516;
}
</style>
