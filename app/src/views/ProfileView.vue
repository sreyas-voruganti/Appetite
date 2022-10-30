<template>
  <div class="mt-3">
    <h1 class="text-2xl font-medium text-center">
      <i class="fa-solid fa-user fa-sm"></i> Your Profile
    </h1>
    <div v-if="user" class="mx-5 mt-2 text-xl">
      <p><span class="font-semibold">Name:</span> {{ user.name }}</p>
      <p><span class="font-semibold">Email:</span> {{ user.email }}</p>
      <p>
        <span class="font-semibold">Phone Number:</span> {{ user.phone_number }}
      </p>
      <p>
        <span class="font-semibold">Business Name:</span>
        {{ user.business_name }}
      </p>
      <p>
        <span class="font-semibold">Business Address:</span>
        {{ user.business_address }}
      </p>
      <p>
        <span class="font-semibold">Lifetime Contributions:</span>
        {{ getCompletedServings() }} Servings
      </p>
      <div class="mt-3">
        <p>
          <span
            class="font-semibold text-lg"
            @click="() => (showOpen = !showOpen)"
          >
            {{ showOpen ? "Hide" : "Show" }} Open Donations ({{
              getOpen().length
            }}):</span
          >
        </p>
        <div v-if="showOpen">
          <Post
            v-for="post in getOpen()"
            :key="post.id"
            :post="post"
            @status_change="statusChange"
          />
        </div>
        <p>
          <span
            class="font-semibold text-lg"
            @click="() => (showCompleted = !showCompleted)"
          >
            {{ showCompleted ? "Hide" : "Show" }} Completed Donations ({{
              getCompleted().length
            }}):</span
          >
        </p>
        <div v-if="showCompleted">
          <Post
            v-for="post in getCompleted()"
            :key="post.id"
            :post="post"
            @status_change="statusChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Post from "@/components/Post.vue";
export default {
  name: "ProfileView",
  components: {
    Post,
  },
  data: () => ({
    user: null,
    posts: [],
    showOpen: false,
    showCompleted: false,
  }),
  methods: {
    getOpen() {
      return this.posts.filter((post) => post.status === "pending");
    },
    getCompleted() {
      return this.posts.filter((post) => post.status === "completed");
    },
    getCompletedServings() {
      let servings = 0;
      for (const post of this.getCompleted()) {
        servings += post.servings;
      }
      return servings;
    },
    statusChange(post_id) {
      axios.post("http://localhost:8000/post_status", { post_id }).then(() => {
        this.fetchData();
      });
    },
    fetchData() {
      axios
        .post("http://localhost:8000/profile", {
          user_id: localStorage.getItem("user_id"),
        })
        .then((res) => {
          this.user = res.data.user;
          this.posts = res.data.posts;
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
