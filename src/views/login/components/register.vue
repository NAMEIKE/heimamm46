<template>
  <el-dialog
    class="register"
    title="用户注册"
    width="603px"
    center
    :visible.sync="dialogFormVisible"
  >
    <el-form status-icon :model="form" :rules="rules" ref="registerForm">
      <el-form-item label="头像">
        <!-- 用户头像 -->
        <el-upload
          class="avatar-uploader"
          :action="upUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input
          v-model="form.password"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1" class="register-box">
            <img
              @click="changeCode"
              class="register-code"
              :src="codeURL"
              alt=""
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button @click="getSMS" :disabled="delay != 0">
              {{ delay == 0 ? "点击获取验证码" : `还有${delay}秒可以获取` }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
// import axios from "axios";
import {sendsms} from '@/api/register.js';
// 验证手机号的 函数
const checkPhone = (rule, value, callback) => {
  // 接收参数 value
  // 定义正则表达式
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  // 使用正则校验格式是否满足
  if (reg.test(value) == true) {
    // 对
    callback();
  } else {
    // 错
    callback(new Error("手机号格式不对哦，请检查"));
  }
};

// 验证 邮箱的 函数
// rule 校验规则，一般不用
// value 校验的数据  表单元素中的数据
// callback 回调函数 ，通过执行这个函数 告诉 element-ui 成功或者失败
const checkEmail = (rule, value, callback) => {
  // 获取数据 value
  // 定义正则表达式 定义了一个正则对象
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  // 校验方法 test 方法 是正则对象
  // 对 返回的是 true
  // 错 返回的是 false
  // console.log(reg.test(value))
  if (reg.test(value) == true) {
    callback();
  } else {
    callback(new Error("邮箱的格式不对哦"));
  }
};
export default {
  data() {
    return {
      dialogFormVisible: false,
      codeURL: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 倒计时时间
      delay: 0,
      // 本地图片预览地址
      imageUrl: "",
      // 头像上传的接口地址
      upUrl: process.env.VUE_APP_URL + "/uploads",
      form: {
        username: "",
        password: "",
        // 手机号
        phone: "",
        // 邮箱
        email: "",
        code: "",
        name: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 6,
            message: "用户名的长度为2-6位",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "密码的长度为6-12位", trigger: "change" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          // trigger 触发是执行 validator设置的函数
          { validator: checkPhone, trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ]
      },
      formLabelWidth: "62px"
    };
  },
  methods: {
    // 点击改变验证码
    changeCode() {
      this.codeURL =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 获取短信验证码
    getSMS() {
      // 手机号校验
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(this.form.phone) != true) {
        this.$message.error('手机号格式不对,请重新输入');
        return;
      }
      // 图片验证码校验
      if (this.form.code.length != 4) {
        // 这样return也可以
        return this.$message.error('验证码的长度不对,请重检查');
      }
      // 获取短信倒计时
      if (this.delay == 0) {
        this.delay = 60;
        const timeID = setInterval(() => {
          this.delay--;
          if (this.delay == 0) {
            clearInterval(timeID);
          }
        }, 1000);
      }
      // 调用接口
      // axios({
      //   url: process.env.VUE_APP_URL + "/sendsms",
      //   method: "post",
      //   data: {
      //     code: this.form.code,
      //     phone: this.form.phone
      //   },
      //   withCredentials: true
      // })
      sendsms({
        code: this.form.code,
        phone: this.form.phone
      }).then(res => {
        //成功回调
        // window.console.log(res)
        if (res.data.code == 200) {
          this.$message.success("验证码获取成功" + res.data.data.captcha);
        } else if (res.data.code == 0) {
          this.$message.error(res.data.message);
        }
      });
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      window.console.log(res)
      // URL.createObjectURL 生成的是本地的临时路径,刷新就没用了
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 上传之前的效验函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "imgage/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.register {
  // 头像代码
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  //上面是头像
  .el-dialog__header {
    background: linear-gradient(to right, #01c5fb, #1197f9);
  }
  .el-dialog__title {
    color: white;
  }
  .register-box {
    height: 40px;
  }
  .register-code {
    width: 100%;
    height: 40px;
  }
}
</style>
