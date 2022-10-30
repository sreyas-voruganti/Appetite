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
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProfileUserView",
  data: () => ({
    user: null,
  }),
  methods: {
    fetchData() {
      axios
        .post("http://localhost:8000/profile", {
          user_id: localStorage.getItem("user_id"),
        })
        .then((res) => {
          this.user = res.data.user;
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
