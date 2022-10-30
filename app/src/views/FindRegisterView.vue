<template>
  <div class="my-4">
    <div v-if="page == 'form'">
      <h1 class="text-2xl font-medium text-center mb-1">
        Register to find food
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
        Ensure that you are eligible to register. Your household must be less
        than or equal to the following: <img src="income_chart.png" />
        <span class="font-medium text-lg">Step 2: </span> <br />
        Prepare a valid verification document (W-2, IRS 1040, 1099 tax form, or
        bank statement) for all applicable family members to verify your
        household income. <br />
        <span class="font-medium text-lg">Step 3: </span> <br />
        Fill out the form below to register and await verification.
      </p>
      <div class="ml-5 display-flex">
        <div class="mt-3">
          <label>Name</label>
          <input
            type="text"
            placeholder="Full Name"
            class="border-2 rounded-xl p-2 w-11/12"
            v-model="user.name"
          />
        </div>
        <div class="mt-3">
          <label>Birthday</label>
          <input type="date" class="border-2 rounded-xl p-2 w-11/12" />
        </div>
        <div class="mt-3">
          <label>Gender</label>
          <select class="border-2 rounded-xl p-2 w-11/12">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other/Prefer not to say</option>
          </select>
        </div>
        <div class="mt-3">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            class="border-2 rounded-xl p-2 w-11/12"
            v-model="user.email"
          />
        </div>
        <div class="mt-3">
          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            class="border-2 rounded-xl p-2 w-11/12"
          />
        </div>
        <div class="mt-3">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            class="border-2 rounded-xl p-2 w-11/12"
            v-model="user.phone_number"
          />
        </div>
        <div class="mt-3">
          <label>Verification Document(s)</label>
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
        <a class="mouse-pointer text-blue-800" href="/profile_user">here</a> to
        refresh verification status.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FindRegisterView",
  data: () => ({
    showInfo: false,
    page: "form",
    user: {
      name: "",
      email: "",
      password: "",
      phone_number: "",
    },
  }),
  methods: {
    async onRegister() {
      const { data } = await axios.post("http://localhost:8000/find_register", {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        phone_number: this.user.phone_number,
      });
      localStorage.setItem("user_id", data._id);
      localStorage.setItem("account_type", data.type);
      this.page = "await_verify";
      console.log(data);
    },
  },
};
</script>
