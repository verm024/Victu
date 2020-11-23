<template>
  <div
    class="d-flex justify-space-between align-center white pa-5 rounded-xl mt-5 mb-15"
  >
    <div>
      <h3 class="text-h4 text-sm-h3 mb-2">Welcome, <strong>{{ user.nama }}</strong></h3>
      <p class="gray--text">{{ user.kalori_ideal }} calories today</p>
    </div>
    <img src="@/assets/images/user.png" alt="" />
  </div>
</template>

<script>
export default {
  props: ["user"]
};
</script>