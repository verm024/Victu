<template>
  <!-- <div class="user d-flex align-center flex-column">
    
  </div> -->
  <v-container>
    <Welcome />

    <div class="mb-15">
      <SectionHeader header="What do you want to do?" />
      <v-row class="features-row mb-3">
        <Feature v-for="(feature, i) in features" :key="i" :feature="feature" />
      </v-row>
    </div>

    <div class="mb-15">
      <SectionHeader header="Food Recommendation" />
      <carousel :perPageCustom="[[330, 1], [560, 2], [768, 3]]">
        <RecommendedFood v-for="(food, i) in foodRecommendations" :key="i" :food="food" />
      </carousel>
    </div>

  </v-container>
</template>

<script>
import SectionHeader from '../../components/SectionHeader'
import Feature from '../../components/Feature'
import RecommendedFood from '../../components/RecommendedFood'
import Welcome from '../../components/Welcome'
import { Carousel } from 'vue-carousel';

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
          feature: 'Check Calorie',
          src: 'feature1.png'
        },
        {
          feature: 'Healthy Contents',
          src: 'feature3.png'
        },
        {
          feature: '1-on-1 Consultation',
          src: 'feature4.png'
        },
        {
          feature: 'Plot Daily Calorie',
          src: 'feature2.png'
        }
      ],
      foodRecommendations: [
        {
          name: 'Fried Chicken',
          calories: '700 calories',
          src: 'food.png'
        },
        {
          name: 'Fried Chicken',
          calories: '700 calories',
          src: 'food.png'
        },
        {
          name: 'Fried Chicken',
          calories: '700 calories',
          src: 'food.png'
        }
      ]
    }
  }
}
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
