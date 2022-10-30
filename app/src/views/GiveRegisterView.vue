<template>
  <div class="my-4">
    <div v-if="page == 'form'">
      <h1 class="text-2xl font-medium text-center mb-1">
        Register to give food
      </h1>
      <p class="text-center">
        Already have an account? Click
        <router-link to="/login" class="mouse-pointer text-blue-800"
          >here</router-link
        >
        to login.
      </p>
      <p class="mx-2 text-center" @click="() => (showInfo = !showInfo)">
        or {{ showInfo ? "Hide" : "Show" }} Registration Instructions
      </p>
      <p class="mx-2" v-if="showInfo">
        <span class="font-medium text-lg">Step 1: </span> <br />
        Ensure that you have a valid food service license. <br />
        <span class="font-medium text-lg">Step 2: </span> <br />
        Fill out the form below to register and await verification.
      </p>
      <div class="ml-5 display-flex">
        <div class="mt-3">
          <label>Name</label>
          <input
            type="text"
            placeholder="Your Full Name"
            class="border-2 rounded-xl p-2 w-11/12"
            v-model="user.name"
          />
        </div>
        <div class="mt-3">
          <label>Email</label>
          <input
            type="email"
            placeholder="Your Email"
            class="border-2 rounded-xl p-2 w-11/12"
            v-model="user.email"
          />
        </div>
        <div class="mt-3">
          <label>Phone Number</label>
          <input
            type="email"
            placeholder="Your Phone Number"
            class="border-2 rounded-xl p-2 w-11/12"
            v-model="user.phone_number"
          />
        </div>
        <div class="mt-3">
          <label>Business Name</label>
          <input
            type="text"
            placeholder="Business Name"
            class="border-2 rounded-xl p-2 w-11/12"
            v-model="user.business_name"
          />
        </div>
        <div class="mt-3">
          <label>Business Address</label>
          <input
            type="text"
            placeholder="Business Address"
            class="border-2 rounded-xl p-2 w-11/12"
            v-model="user.business_address"
          />
        </div>
        <div class="mt-3">
          <label>Food Service Document</label>
          <input type="file" class="border-2 rounded-xl p-2 w-11/12" />
        </div>
        <div class="mt-3">
          <label>Create Password</label>
          <input
            type="password"
            placeholder="Create Password"
            class="border-2 rounded-xl p-2 w-11/12"
            v-model="user.password"
          />
        </div>
        <button
          class="px-3 py-2 mt-5 text-white rounded bg-red-800 w-11/12"
          @click="onRegister"
        >
          Register
        </button>
      </div>
    </div>
    <div v-else-if="page == 'await_verify'">
      <h1 class="text-2xl font-medium text-center mb-1">
        Thank you for registering
      </h1>
      <p class="mx-2">
        Your registration is currently being verified. You will be emailed once
        you are verified. Click
        <a class="mouse-pointer text-blue-800" href="/profile">here</a> to
        refresh verification status.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GiveRegisterView",
  data: () => ({
    showInfo: false,
    page: "form",
    user: {
      name: "",
      email: "",
      password: "",
      phone_number: "",
      business_name: "",
      business_address: "",
    },
  }),
  methods: {
    async onRegister() {
      const { data } = await axios.post("http://localhost:8000/give_register", {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        phone_number: this.user.phone_number,
        business_name: this.user.business_name,
        business_address: this.user.business_address,
      });
      localStorage.setItem("user_id", data._id);
      localStorage.setItem("account_type", data.type);
      this.page = "await_verify";
      console.log(data);
    },
  },
};
</script>
