<template>
  <div class="border-b-4 fixed top-0 bg-red-50 w-full">
    <div
      class="text-center text-2xl font-bold flex flex-row justify-center align-center"
    >
      <img src="logo3.png" class="h-20" />
    </div>
    <nav class="m-nav font-semibold text-xl" v-if="getAuthType() == 'user'">
      <router-link to="/home" tag="p">Home</router-link>
      <router-link to="/find" tag="p">Find Food</router-link>
      <router-link to="/profile_user" tag="p">Profile</router-link>
      <p @click="logout()">Logout</p>
    </nav>
    <nav
      class="m-nav font-semibold text-xl"
      v-else-if="getAuthType() == 'restaurant'"
    >
      <router-link to="/home" tag="p">Home</router-link>
      <router-link to="/give" tag="p">Give Food</router-link>
      <router-link to="/profile" tag="p">Profile</router-link>
      <p @click="logout()">Logout</p>
    </nav>
    <nav class="m-nav font-semibold text-xl" v-else>
      <router-link to="/home" tag="p">Home</router-link>
      <router-link to="/find_register" tag="p">Find Food</router-link>
      <router-link to="/give_register" tag="p">Give Food</router-link>
      <router-link to="/login" tag="p">Login</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  methods: {
    getAuthType() {
      return localStorage.getItem("account_type");
    },
    logout() {
      localStorage.clear();
      window.location.href = "/login";
    },
  },
};
</script>

<style>
.m-nav {
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-evenly;
  space-between: 10px;
}
.router-link-active {
  color: #dc2626;
}
</style>
