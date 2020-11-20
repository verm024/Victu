<template>
  <div class="user d-flex align-center flex-column">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="Victu" />
    </div>

    <v-container class="profile d-flex" fluid>
      <v-row>
        <v-col class="col-6 col-md-6 offset-md-3">
          <div class="profile-title">
            Profile Information
          </div>
          <div class="d-flex align-center mb-6">
            <v-avatar size="116" tile class="pl-2">
              <v-img
                src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                alt="profile image"
              />
            </v-avatar>
            <div class="ml-2">
              <h4>Adam Jones</h4>
              <h4>25 Years old</h4>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-6 col-md-6 offset-md-3">
          <div class="profile-right-title">
            Today's Date
          </div>
          <div class="profile-right-content">
            18 November 2020
          </div>
          <div class="profile-right-title">
            Today's Calorie Total
          </div>
          <div class="profile-right-content">
            2300 calories
          </div>
          <div class="profile-right-title">
            Last Calorie Intake
          </div>
          <div class="profile-right-content">
            700 calories at 15:40
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <div class="profile-title">
        LATEST RECOMMENDATION
      </div>

      <carousel class="my-12" :perPageCustom="[[480, 2], [768, 3]]">
        <RecommendedFood v-for="(food, i) in recommendedFoods" :key="i" :food="food" />
      </carousel>

    </v-container>

    <router-link to="/search-content">
      Lihat konten kesehatan
    </router-link>
  </div>
</template>

<script>
import { Carousel } from 'vue-carousel';
import RecommendedFood from '../../components/RecommendedFood';

export default {
  data() {
    return {
      recommendedFoods: [
        {
          name: 'Ayam Goren Rempah',
          calorie: '500 cals',
          src: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
        },
        {
          name: 'Ayam Goren Rempah',
          calorie: '500 cals',
          src: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
        },
        {
          name: 'Ayam Goren Rempah',
          calorie: '500 cals',
          src: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
        }
      ]
    }
  },
  components: {
    Carousel,
    Slide
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
