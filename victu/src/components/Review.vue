<template>
    <slide class="mr-3">
        <div class="white d-flex pa-3 justify-space-between align-center">
            <div>
                <h4 class="font-weight-bold text-h5 text-sm-h4 mb-2">{{review.rating}}/5</h4>
                <h5>{{review.reviewer}}</h5>
            </div>
            <div class="review__content">
                <p class="mb-0">{{review.date}}</p>
                <p class="mb-0">{{review.time}}</p>
            </div>
        </div>
        <div>
            <p>{{review.review}}</p>
        </div>
    </slide>
</template>

<script>
import { Slide } from "vue-carousel";
export default {
  props: ["review"],
  components: {
    Slide
  }
};
</script>

<style>
.review__content {
    background-color: #FCE5AA;
}
</style>