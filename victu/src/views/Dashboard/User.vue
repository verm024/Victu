<template>
  <v-container>
    <Welcome :user="data_user" />
    <div class="mb-7">
      <SectionHeader header="What do you want to do?" />
      <div style="overflow-x: auto;" class="d-flex features-row mb-3">
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
          [330, 1],
          [560, 2],
          [768, 3]
        ]"
        :navigationEnabled="true"
      >
        <RecommendedFood
          v-for="(food, i) in foodRecommendations"
          :key="i"
          :food="food"
        />
      </carousel>
    </div>
  </v-container>
</template>

<script>
import SectionHeader from "../../components/SectionHeader";
import Feature from "../../components/Feature";
import RecommendedFood from "../../components/RecommendedFood";
import Welcome from "../../components/Welcome";
import { Carousel } from "vue-carousel";
import store from "../../store";

export default {
  components: {
    SectionHeader,
    Feature,
    RecommendedFood,
    Welcome,
    Carousel
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
      foodRecommendations: [
        {
          name: "Fried Chicken",
          calories: "700 calories",
          src: "food.png"
        },
        {
          name: "Fried Chicken",
          calories: "700 calories",
          src: "food.png"
        },
        {
          name: "Fried Chicken",
          calories: "700 calories",
          src: "food.png"
        }
      ],
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
