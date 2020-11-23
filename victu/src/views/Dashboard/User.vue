<template>
  <v-container>
    <Welcome :user="data_user" />
    <div class="mb-7">
      <SectionHeader header="What do you want to do?" />
      <div
        style="overflow-x: auto; justify-content: space-between"
        class="d-flex features-row mb-3"
      >
        <Feature
          v-for="(feature, i) in features"
          v-on:click.native="featureClick(feature, i)"
          :key="i"
          :feature="feature"
        />
      </div>
    </div>

    <div class="mb-16">
      <SectionHeader header="Food Recommendation" />
      <carousel
        :perPageCustom="[
          [330, 1.2],
          [560, 2],
          [768, 3]
        ]"
        :paginationEnabled="false"
      >
        <slide class="mr-5" v-for="(food, i) in foodRecommendations" :key="i">
          <RecommendedFood :food="food" />
        </slide>
      </carousel>
    </div>
  </v-container>
</template>

<script>
import SectionHeader from "../../components/SectionHeader";
import Feature from "../../components/Feature";
import RecommendedFood from "../../components/RecommendedFood";
import Welcome from "../../components/Welcome";
import { Carousel, Slide } from "vue-carousel";
import store from "../../store";
import firebase from "../../firebase";

export default {
  components: {
    SectionHeader,
    Feature,
    RecommendedFood,
    Welcome,
    Carousel,
    Slide
  },
  async created() {
    let randomIndex = [];
    while (randomIndex.length < 5) {
      let random = Math.floor(Math.random() * 15 + 1);
      if (!randomIndex.includes(random)) {
        randomIndex.push(random);
      }
    }
    for (let i = 0; i < randomIndex.length; i++) {
      try {
        let doc = await firebase.db
          .collection("rekomendasi")
          .doc(randomIndex[i].toString())
          .get();
        let data = doc.data();
        this.foodRecommendations.push(data);
      } catch (error) {
        console.error(error);
      }
    }
  },
  data() {
    return {
      features: [
        {
          feature: "Check Calorie",
          src: "feature1.png"
        },
        {
          feature: "Healthy Contents",
          src: "feature3.png"
        },
        {
          feature: "1-on-1 Consultation",
          src: "feature4.png"
        },
        {
          feature: "Plot Daily Calorie",
          src: "feature2.png"
        }
      ],
      foodRecommendations: [],
      data_user: store.state.userProfile
    };
  },
  methods: {
    featureClick(event, index) {
      if (event.feature == "Check Calorie") {
        this.$router.push("/calorie");
      } else if (event.feature == "Healthy Contents") {
        this.$router.push("/search-content");
      } else if (event.feature == "1-on-1 Consultation") {
        this.$router.push("/chat");
      } else if (event.feature == "Plot Daily Calorie") {
        this.$router.push("");
      }
    }
  }
};
</script>

<style scoped>
.user {
  min-height: 100vh;
  margin: 0;
}

.logo {
  margin-bottom: 40px;
}

.logo img {
  width: 150px;
}

.profile {
  background: #f9edee;
}

.profile-title {
  font-family: Roboto;
  font-size: 14px;
  color: #28190e;
  padding: 0 8px;
  margin-bottom: 3px;
}

.profile-right-title {
  font-family: Roboto;
  font-size: 14px;
  color: #b5adad;
  padding: 0 8px;
}

.profile-right-content {
  font-family: Roboto;
  font-size: 14px;
  color: #28190e;
  padding: 0 8px;
  margin-bottom: 3px;
}

.card-title {
  font-family: Roboto;
  font-size: 14px;
  color: #28190e;
  padding: 0 8px;
  margin-bottom: 3px;
  margin-top: 3px;
}

.card-subtitle {
  font-family: Roboto;
  font-size: 12px;
  color: #28190e;
  padding: 0 8px;
  margin-bottom: 3px;
  margin-top: 3px;
}
</style>
