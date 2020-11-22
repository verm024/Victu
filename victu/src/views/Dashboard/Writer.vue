<template>
  <div class="writer">
    Dashboard Writer
    <br />
    <router-link to="/add-content">Buat konten baru</router-link>
    <br />
    <br />
    Daftar Konten Menunggu proofreading
    <div v-for="item in filterProofreading" :key="item.id">
      <router-link :to="'/content/' + item.id">
        Judul: {{ item.judul }}, Isi: {{ item.isi }}
      </router-link>
    </div>
    <div v-if="filterProofreading.length == 0">
      Belum ada
    </div>
    <br />
    <br />
    Daftar Konten Sudah Diposting/disetujui
    <div v-for="item in filterPosted" :key="item.id">
      <router-link :to="'/content/' + item.id">
        Judul: {{ item.judul }}, Isi: {{ item.isi }}
      </router-link>
    </div>
    <div v-if="filterPosted.length == 0">
      Belum ada
    </div>
    <br />
    <br />
    Daftar Konten Sudah Dihapus
    <div v-for="item in filterDeleted" :key="item.id">
      <router-link :to="'/content/' + item.id">
        Judul: {{ item.judul }}, Isi: {{ item.isi }}
      </router-link>
    </div>
    <div v-if="filterDeleted.length == 0">
      Belum ada
    </div>
  </div>
</template>

<script>
import firebase from "../../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_konten: ""
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
            .where(
              "writer",
              "==",
              firebase.db.collection("users").doc(this.currentUser.uid)
            )
            .orderBy("tanggal_diposting", "desc")
        );
      }
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"]),
    filterProofreading() {
      return this.daftar_konten.filter(element => {
        return element.status == "proofreading";
      });
    },
    filterPosted() {
      return this.daftar_konten.filter(element => {
        return element.status == "posted";
      });
    },
    filterDeleted() {
      return this.daftar_konten.filter(element => {
        return element.status == "deleted";
      });
    }
  }
};
</script>

<style></style>
