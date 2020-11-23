<template>
  <div
    class="d-flex justify-space-between align-center white pa-5 rounded-xl mt-15 mb-8"
  >
    <div>
      <h3 class="text-h5 text-sm-h3 mb-2">
        Welcome, <strong>{{ userProfile.nama.split(" ")[0] }}</strong>
      </h3>
      <!-- <p class="gray--text">{{ user.kalori_ideal }} calories today</p> -->
    </div>
    <img src="@/assets/images/user.png" alt="" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["user"],
  computed: {
    ...mapState(["userProfile"])
  }
};
</script>
