<template>
  <el-dialog
    class="register"
    title="用户注册"
    width="603px"
    center
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form">
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
             <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" class="register-box">
            <img class="register-code" src="../../../assets/mmexport1581169312185.jpg" alt="">
          </el-col>
        </el-row>
      </el-form-item>
       <el-form-item label="图形码" :label-width="formLabelWidth">
         <el-row>
          <el-col :span="17">
             <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7">
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
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: ""
      },
      formLabelWidth: "62px"
    };
  }
};
</script>

<style lang='less'>
  .register {
    .el-dialog__header {
      background: linear-gradient(to right,#01C5FB,#1197F9);
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
