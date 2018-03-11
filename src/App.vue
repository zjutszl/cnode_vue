<template>

<div v-cloak>
  <top-nav></top-nav>
  <router-view></router-view>
  <bottom-nav></bottom-nav>
</div>

</template>

<script>
import bottomNav from "./components/bottomNav";
import topNav from "./components/topNav";

export default {
  name: "App",
  components: { bottomNav, topNav }
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>


