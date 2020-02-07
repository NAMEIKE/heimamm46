<template>
  <div class="login-contaniner">
    <div class="left-box"></div>
    <img src="../../assets/login_banner_ele.png" alt="" />
  </div>
</template>

<script>
export default {
  // 组件的名字
  name: "login"
};
</script>

<style>
.login-contaniner {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 左右均分 */
  justify-content: space-around;
}
.login-contaniner .left-box {
  width: 478px;
  height: 550px;
  background: rgba(245, 245, 245, 1);
}
</style>
