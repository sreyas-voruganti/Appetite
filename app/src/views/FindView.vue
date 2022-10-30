<template>
  <div>
    <h1 class="text-2xl font-medium text-center">
      <i class="fa-solid fa-utensils"></i> Open Donations
    </h1>
    <div class="mt-3 mx-3">
      <Post v-for="post in posts" :post="post" :key="post.id" :isUser="true" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Post from "@/components/Post.vue";
export default {
  name: "FindView",
  components: {
    Post,
  },
  data: () => ({
    posts: [],
  }),
  created() {
    axios.get("http://localhost:8000/find").then((res) => {
      this.posts = res.data;
    });
  },
};
</script>
