<template>
  <div class="search-nutritionist">
    Daftar nutritionist
    <div v-for="(item, index) in daftar_nutritionist" :key="index">
      <router-link :to="'/nutritionist/' + item.id">
        {{ item.email }}
        {{ item.id }}
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_nutritionist: []
    };
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  watch: {
    get_daftar_nutritionist: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_nutritionist",
          firebase.db.collection("users").where("role", "==", "nutritionist")
        );
      }
    }
  }
};
</script>

<style></style>
