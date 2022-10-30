<template>
  <div class="my-4">
    <h1 class="text-2xl font-medium text-center mb-1">Give Food</h1>
    <p class="mx-2 text-center" @click="() => (showInfo = !showInfo)">
      {{ showInfo ? "Hide" : "Show" }} Instructions
    </p>
    <p class="mx-2" v-if="showInfo">
      <span class="font-medium text-lg">Step 1: </span> <br />
      Fill out the form below detailing your food donation. <br />
      <span class="font-medium text-lg">Step 2: </span> <br />
      Wait for someone to contact you about receiving your donation. <br />
      <span class="font-medium text-lg">Step 3: </span> <br />
      Meet the recipient and update your donation status to complete.
    </p>
    <div class="ml-5 display-flex">
      <div class="mt-3">
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          class="border-2 rounded-xl p-2 w-11/12"
          v-model="post.title"
        />
      </div>
      <div class="mt-3">
        <label>Description</label>
        <textarea
          type="text"
          placeholder="Description"
          class="border-2 rounded-xl p-2 w-11/12"
          v-model="post.description"
        />
      </div>
      <div class="mt-3">
        <label>Number of Servings</label>
        <input
          type="number"
          placeholder="Number of Servings"
          class="border-2 rounded-xl p-2 w-11/12"
          v-model="post.servings"
        />
      </div>
      <div class="mt-3">
        <label>Picture</label>
        <input
          type="file"
          accept="image/*"
          class="border-2 rounded-xl p-2 w-11/12"
          ref="image_upload"
        />
      </div>
      <button
        class="px-3 py-2 mt-5 text-white rounded bg-red-800 w-11/12"
        @click="onDonation"
      >
        Post Donation
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GiveView",
  data: () => ({
    showInfo: false,
    post: {
      title: "",
      description: "",
      servings: 1,
    },
  }),
  methods: {
    async onDonation() {
      const fd = new FormData();
      fd.append("user_id", localStorage.getItem("user_id"));
      fd.append("title", this.post.title);
      fd.append("description", this.post.description);
      fd.append("servings", this.post.servings);
      fd.append("image", this.$refs.image_upload.files[0]);
      const { data } = await axios.post(
        "http://localhost:8000/post_create",
        fd
      );
      console.log(data);
      this.$router.push("/profile");
    },
  },
};
</script>
