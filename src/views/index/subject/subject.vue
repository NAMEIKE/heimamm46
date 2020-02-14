<template>
  <div class="subject-container">
    <!-- 顶部盒子 -->
    <el-card class="top-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.user" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.user" class="w150"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="formInline.region"
            placeholder="请选择状态"
            class="w150"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="search">搜索</el-button>
          <el-button @click="onSubmit">清除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="onSubmit"
            >新增学科</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部盒子 -->
    <el-card class="bottom-card">
      <!-- 表格 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
        <el-table-column prop="date" label="学科编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="学科名称" width="180">
        </el-table-column>
        <el-table-column prop="address" label="简称"></el-table-column>
        <el-table-column prop="address" label="创建者"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handleNotAllow(scope.$index, scope.row)">禁用</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      class="my-pagination"
      background 
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="index"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "subject",
  data() {
    return {
      // 顶部表单
      formInline: {
        user: "",
        region: ""
      },
      // 表格数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      // 分页数据
      // 页码
      index: 1,
      // 页容量
      size: 5,
      // 总条数
      total: 20
    };
  },
  methods: {
    // 三个按钮绑定的方法
    handleEdit(index, row) {
      window.console.log(index, row);
    },
    handleNotAllow(index, row) {
       window.console.log(index, row);
    },
    handleDelete(index, row) {
      window.console.log(index, row);
    },
    // 分页
    sizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    currentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less">
.subject-container {
  // 顶部盒子
  .top-card {
    .w100 {
      width: 100px;
    }
    .w150 {
      width: 150px;
    }
    .search {
      margin-left: 25px;
    }
  }
  // 底部盒子
  .bottom-card {
    margin-top: 19px;
    .my-pagination {
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>
