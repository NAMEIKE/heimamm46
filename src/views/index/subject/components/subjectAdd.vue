<template>
  <el-dialog class="subject-add" center title="新增学科" :visible.sync="dialogFormVisible" width="600px">
    <el-form :model="form">
      <el-form-item label="学科编号" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
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
  name: "subjectAdd",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name
      },
      formLabelWidth: '120px'
    };
  }
};
</script>
<style lang="less">
  .subject-add {
    .el-dialog__header{
      background: linear-gradient(to right,#00c6f9,#1495fb);
    }
    .el-dialog__title{
      color: white;
    }
    .el-dialog__close{
      color: white;
    }
  }
</style>
