<template>
  <el-dialog
    class="register"
    title="用户注册"
    width="603px"
    center
    :visible.sync="dialogFormVisible"
  >
    <el-form status-icon  :model="form" :rules="rules" ref="registerForm">
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
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1" class="register-box">
            <img
              class="register-code"
              src="../../../assets/mmexport1581169312185.jpg"
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
            <el-button>点击获取验证码</el-button>
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
      form: {
        username: "",
        password: "",
        // 手机号
        phone: "",
        // 邮箱
        email: ""
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
  }
};
</script>

<style lang="less">
.register {
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
