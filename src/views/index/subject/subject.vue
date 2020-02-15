<template>
  <div class="subject-container">
    <!-- 顶部盒子 -->
    <el-card class="top-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formInline.rid" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="formInline.name" class="w150"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formInline.username" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="formInline.status"
            placeholder="请选择状态"
            class="w150"
          >
            <el-option label="所有" value="2"></el-option>
            <el-option label="启动" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="search" @click="searchSubject">查询</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="$refs.subjectAdd.dialogFormVisible=true"
            >新增学科</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部盒子 -->
    <el-card class="bottom-card">
      <!-- 表格 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" :index="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="180"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handleNotAllow(scope.$index, scope.row)">
              {{scope.row.status===1 ? '禁用':'启动'}}
            </el-button>
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
    <subjectAdd ref="subjectAdd"></subjectAdd>
  </div>
</template>

<script>
import {subjectList,subjectStatus} from '@/api/subject.js'
import subjectAdd from './components/subjectAdd'
export default {
  name: "subject",
  components:{
    subjectAdd
  },
  data() {
    return {
      // 顶部表单
      formInline: {
        // 学科编号
        rid: '',
        // 学科名称
        name: '',
        // 创建者
        user: '',
        // 状态
        status: ''
      },
      // 表格数据
      tableData: [],
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
       subjectStatus({
         id: row.id
       }).then(res=>{
         if (res.code === 200) {
           this.$message.success('状态修改成功')
           this.getData()
         }
       })
    },
    handleDelete(index, row) {
      window.console.log(index, row);
    },
    // 分页
    // 页容量改变
    sizeChange(val) {
      // window.console.log(`每页 ${val} 条`);
      // 返回第一页
      this.index = 1
      // 设置新的页容量
      this.size = val
      this.getData()
    },
    // 页码改变
    currentChange(val) {
      // window.console.log(`当前页: ${val}`);
      // 保存页容量
      this.index = val
      this.getData()
    },
    // 学科搜索
    searchSubject() {
      // 跳回第一页
      this.index = 1;
      // 调用getData
      this.getData()
    },
    // 清除
    clearSearch() {
      // 清除表单
      this.$refs.formInline.resetFields();
      this.index = 1;
      this.getData()
    },
    getData() {
      subjectList({
      // 页码
      page: this.index,
      // 页容量
      limit: this.size,
      // 合并筛选条件
      ...this.formInline
      }).then(res=>{
      // window.console.log(res);
      this.tableData = res.data.items
      // 总条数保存起来
      this.total = res.data.pagination.total;
    })
    }
  },
  created() {
    this.getData()
  },
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
      margin-left: 8px;
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
