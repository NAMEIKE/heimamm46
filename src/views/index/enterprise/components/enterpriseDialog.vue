<template>
  <el-dialog
    class="enterprise-edit"
    center
    :title="(isEdit ? '编辑' : '新增') + '企业'"
    :visible.sync="dialogFormVisible"
    width="600px"
  >
    <el-form :model="form" ref="enterpriseDialog" :rules="rules">
      <el-form-item prop="eid" label="企业编号" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        prop="short_name"
        label="企业简称"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="企业简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        prop="remark"
        label="企业备注"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('enterpriseDialog')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { enterpriseEdit, enterpriseAdd } from "@/api/enterprise.js";
export default {
  name: "enterpriseDialog",
  data() {
    return {
      isEdit: false,
      dialogFormVisible: false,
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      // 定义规则
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "企业简介不能为空", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    // 显示对话框
    show(data) {
      this.dialogFormVisible = true;
      if (data == undefined) {
        this.$nextTick(() => {
          this.isEdit = false;
          // 避免编辑之后新增出问题
          // 直接设置一个新对象
          this.form = {
            eid: "",
            name: "",
            short_name: "",
            intro: "",
            remark: ""
          };
          this.$refs.enterpriseDialog.resetFields();
        });
      } else {
        this.$nextTick(() => {
          this.isEdit = true;
          this.form = data;
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit == true) {
            enterpriseEdit(this.form).then(res => {
              if (res.code == 200) {
                this.dialogFormVisible = false;
                // 清空对话框
                this.$refs[formName].resetFields();
                // 重新获取数据 渲染列表
                this.$parent.getData();
                this.$message.success("修改成功");
              } else if (res.code == 201) {
                this.$message.warning("企业编号不能重复,请检查");
              }
            });
          } else {
            enterpriseAdd(this.form).then(res => {
              if (res.code == 201) {
                this.$message.error("企业编号不能重复");
              } else if (res.code == 200) {
                this.$message.success("数据新增成功");
                // 关闭对话框
                this.dialogFormVisible = false;
                // 清空表单
                this.$refs[formName].resetFields();
                this.$parent.getData();
              }
            });
          }
        } else {
          this.$message.error("数据校验失败,请检查");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less"></style>
