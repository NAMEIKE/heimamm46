<template>
  <div>
    <el-button type="success" @click="login">成功按钮</el-button>
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  methods: {
    login(){
      this.$router.push("/login");
    }
  },
};
</script>
<style></style>
