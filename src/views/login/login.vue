<template>
  <div class="login-contaniner">
    <div class="left-box">
      <div class="title">
        <img src="../../assets/矢量智能对象 拷贝 9.png" alt="" />
        <span class="item">黑马面面</span>
        <span class="line"></span>
        <span class="item">用户登录</span>
      </div>
        <!-- 表单 -->
      <el-form ref="loginForm" :rules="rules" :model="loginForm">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="loginCode">
           <el-row>
          <el-col :span="17">
          <el-input v-model="loginForm.loginCode" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="7" style="height:40px">
            <img @click="changeCode" class="login-code" :src="codeURL" alt="">
          </el-col>
        </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox name="type" class="middle"></el-checkbox>
          <span class="text-color">我已阅读并同意</span>
          <el-link type="primary" :underline="false">用户协议</el-link>
          <span class="text-color">和</span>
          <el-link type="primary" :underline="false">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="showRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img src="../../assets/login_banner_ele.png" alt="" />
    <register ref='register'></register>
  </div>
</template>

<script>
// 导入注册组件
import register from './components/register'
import {checkPhone} from '@/utils/validator.js'
import {login} from '@/api/login.js';

export default {
  // 组件的名字
  name: "login",
  components: {
    register
  },
  data() {
    return {
      loginForm: {
        phone: "",
        password: "",
        loginCode: "",
        type: []
      },
      // 校验规则
      rules: {
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 6, max: 12, message: '密码的长度为6-12位', trigger: 'blur'},
        ],
        loginCode: [
          {required: true, message: '验证码不能为空', trigger: 'blur'},
          {min: 4, max: 4, message: '验证码的长度为4位', trigger: 'blur'},
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          // trigger 触发是执行 validator设置的函数
          { validator: checkPhone, trigger: "blur" }
        ],
      },
      // 验证码地址
      codeURL: process.env.VUE_APP_URL + "/captcha?type=login",
    };
  },
  methods: {
    // 刷新验证码
    changeCode(){
      this.codeURL = process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now()
    },
    // 提交表单
    submitForm(formName){
      this.$refs[formName].validate(valid => {
        // 成功
        if (valid) {
          // 验证是否勾选
          if (this.loginForm.isChecked != true) {
            return this.$message.warning('请勾选用户协议')
          }
          // 验证通过
          login({
            phone: this.loginForm.phone,
            password: this.loginForm.password,
            code: this.loginForm.loginCode
          }).then(res => {
            if (res.data.code===200) {
              this.$message.success('登录成功啦')
              // 服务器返回了token
              // token 保存到 哪里 localStorage（一直都在）  SessionStorage(刷新消失)
              window.localStorage.setItem('heimammToken',res.data.data.token)
              // 跳转到首页
              this.$router.push('/index')
            }else if (res.data.code===202) {
              this.$message.error(res.data.message)
            }
          })
          // 失败
        } else {
          this.$message.error('验证失败');
          return false;
        }
      })
    },
    // 显示注册对话框
    showRegister(){
      this.$refs.register. dialogFormVisible = true;
    }
  },
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
  .middle {
    vertical-align: middle;
    margin-right: 4px;
  }
  .login-code {
    width: 100%;
    height: 40px;
  }
  .text-color {
    color: #999;
    vertical-align: middle;
  }
  .btn {
    width: 100%;
  }
}
</style>
