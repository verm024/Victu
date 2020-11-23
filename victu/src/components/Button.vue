<template>
  <div class="button">
    <button>{{ text }}</button>
  </div>
</template>

<script>
export default {
  props: ["text", "className"]
};
</script>

<style scoped>
.button button {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  background: red;
  background: #f7b516;
  box-shadow: 2px 4px 30px rgba(244, 204, 143, 0.25);
  border-radius: 10px;
  color: white;
  padding: 10px 32px;
}
</style>
