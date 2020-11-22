<template>
  <div class="proofreading container">
    <div
      class="card-proofreading"
      v-for="(item, index) in daftar_konten"
      :key="index"
      @click="$router.push('/content/' + item.id)"
    >
      <div class="image-wrapper">
        <div class="image">
          
          <v-img :src="item.foto"><v-overlay absolute></v-overlay></v-img>
        </div>
      </div>
      <div class="content d-flex align-center">
        <div class="judul">{{ item.judul }}</div>
      </div>
    </div>
    <div v-if="daftar_konten.length == 0" class="empty">
      No content yet
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_konten: []
    };
  },
  watch: {
    get_daftar_konten: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_konten",
          firebase.db
            .collection("contents")
            .where("status", "==", "proofreading")
            .orderBy("tanggal_diposting", "desc")
        );
      }
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  }
};
</script>

<style scoped>
.proofreading {
  margin-top: 20px;
}

.card-proofreading {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #f1f4f2;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 2px 4px 30px rgba(247, 181, 22, 0.1);
  margin-bottom: 20px;
}

.content {
  margin-left: 20px;
  width: 100%;
}

.image {
  display: flex;
  width: 50px;
  height: 50px;
  background: #f7b516;
  border-radius: 100px;
  justify-content: center;
  overflow: hidden;
}

.judul {
  color: #28190e;
  font-weight: 600;
  font-size: 18px;
}

.empty {
  text-align: center;
}

.empty a span {
  font-size: 16px;
  color: #28190e;
  opacity: 0.8;
}

.empty a u {
  font-size: 16px;
  color: #f7b516;
  font-weight: 500 !important;
}
</style>

<style>
  .v-overlay__scrim {
    background-color: #f7b516 !important;
    opacity: .2 !important;
  }
</style>