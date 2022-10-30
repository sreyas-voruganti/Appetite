<template>
  <div class="border-2 m-2 rounded-xl p-3">
    <p class="text-xl font-medium">
      {{ post.title }}
      <span
        v-if="post.status === 'pending'"
        class="text-sm ml-2 bg-yellow-300 px-2 py-1 rounded-md text-yellow-900"
        ><i class="fa-solid fa-circle-info"></i> Open</span
      >
      <span
        v-else
        class="text-sm ml-2 bg-green-300 px-2 py-1 rounded-md text-green-900"
        ><i class="fa-solid fa-check"></i> Completed</span
      >
    </p>
    <img
      :src="`http://localhost:8000/uploads/${post.image}`"
      class="rounded-xl mt-2 w-full"
    />
    <p class="font-medium text-gray-800 mt-2 text-sm" v-if="isUser">
      <span
        >Posted
        <span class="font-semibold"
          ><i class="fa-solid fa-clock"></i>
          {{ formatTime(post.createdAt) }}</span
        >
        by
        <span class="font-semibold"
          ><i class="fa-solid fa-user"></i> {{ post.user.name }}</span
        >
        from
        <span class="font-semibold"
          ><i class="fa-solid fa-utensils"></i>
          {{ post.user.business_name }}</span
        ></span
      >
    </p>
    <p class="font-medium text-gray-800 mt-2 text-sm" v-else>
      <span
        >Posted
        <span class="font-semibold"
          ><i class="fa-solid fa-clock"></i>
          {{ formatTime(post.createdAt) }}</span
        ></span
      >
    </p>
    <p class="text-sm mt-1">
      <i class="fa-solid fa-bowl-food"></i> {{ post.servings }} Servings <br />
      <i class="fa-solid fa-align-left"></i> {{ post.description }} <br />
      <span v-if="isUser">
        <i class="fa-solid fa-phone"></i> {{ post.user.phone_number }}
      </span>
    </p>
    <p
      class="font-medium text-base text-blue-900"
      @click="$emit('status_change', post._id)"
      v-if="!isUser"
    >
      Mark as {{ post.status === "pending" ? "Completed" : "Open" }}
    </p>
  </div>
</template>

<script>
import moment from "moment";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  props: ["post", "isUser"],
  methods: {
    formatTime(time) {
      return moment(time).fromNow();
    },
  },
};
</script>
