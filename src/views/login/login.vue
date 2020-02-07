<template>
  <div class="login-contaniner">
    <div class="left-box">
      <div class="title">
        <img src="../../assets/矢量智能对象 拷贝 9.png" alt="" />
        <span class="item">黑马面面</span>
        <span class="line"></span>
        <span class="item">用户登录</span>
      </div>
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input
            v-model="form.name1"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
          ></el-input>
          <el-input
            v-model="form.name2"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
            class="pass"
          ></el-input>
          <el-input
            v-model="form.name3"
            prefix-icon="el-icon-key"
            placeholder="请输入验证码"
            class="verify"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-checkbox-group v-model="form.type"> -->
          <el-checkbox name="type" class="middle"></el-checkbox>
          <!-- <el-link type="info" :underline="false">我已阅读并同意</el-link> -->
          <span class="text-color">我已阅读并同意</span>
          <el-link type="primary" :underline="false">用户协议</el-link>
          <span class="text-color">和</span>
          <!-- <el-link type="info" :underline="false">和</el-link> -->
          <el-link type="primary" :underline="false">隐私条款</el-link>
          <!-- </el-checkbox-group> -->
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary">登录1</el-button>
          <br />
          <el-button class="btn" type="primary">注册1</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/login_banner_ele.png" alt="" />
  </div>
</template>

<script>
export default {
  // 组件的名字
  name: "login",
  data() {
    return {
      form: {
        name1: "",
        name2: "",
        name3: "",
        // region: "",
        // date1: "",
        // date2: "",
        // delivery: false,
        type: []
        // resource: "",
        // desc: ""
      }
    };
  }
};
</script>

<style lang="less">
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
  padding: 50px 48px;
  .title {
    margin-bottom: 32px;
    img {
      margin-right: 12px;
    }
    .item {
      font-size: 22px;
    }
    .line {
      border: 1px solid #c7c7c7;
      height: 28px;
      margin: 0 12px;
    }
  }
  .pass {
    margin: 26px 0;
  }
  .verify {
    width: 284px;
  }
  .middle {
    vertical-align: middle;
    margin-right: 4px;
  }
  .text-color {
    color: #999;
    vertical-align: middle;
  }
  .btn {
    width: 100%;
    margin-bottom: 26px;
  }
}
</style>
