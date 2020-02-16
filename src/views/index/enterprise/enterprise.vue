<template>
  <div class="enterprise-container">
    <!-- 顶部盒子 -->
    <el-card class="top-card">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        ref="formInline"
      >
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="formInline.eid" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
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
            <el-option label="所有" value=""></el-option>
            <el-option label="启动" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="search" @click="searchEnterprise"
            >查询</el-button
          >
          <el-button @click="clearSearch">清除</el-button>
          <el-button
            icon="el-icon-plus"
            type="primary"
            @click="$refs.enterpriseAdd.dialogFormVisible = true"
            >新增企业</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部盒子 -->
    <el-card class="bottom-card">
      <!-- 表格 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          type="index"
          :index="index"
          label="序号"
          width="50px"
        ></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{scope.row.create_time | formatTime}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="handleNotAllow(scope.$index, scope.row)"
            >
              {{ scope.row.status == 1 ? "禁用" : "启动" }}
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
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
        :total="total"
      >
      </el-pagination>
    </el-card>
    <enterpriseAdd ref="enterpriseAdd"></enterpriseAdd>
  </div>
</template>
<script>
import {enterpriseList,enterpriseRemove} from '@/api/enterprise.js'
import enterpriseAdd from './components/enterpriseAdd.vue'
export default {
  name: "enterprise",
  components: {
    enterpriseAdd
  },
  data() {
    return {
      // 顶部表单
      formInline: {
        // 学科编号
        eid: "",
        // 学科名称
        name: "",
        // 创建者
        user: "",
        // 状态
        status: ""
      },
      // 表格数据
      tableData: [
    
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
    // 页容量改变
    sizeChange(newSize) {
      this.size = newSize;
      this.index = 1;
      this.getData()
    },
    // 页码改变
    currentChange(newIndex) {
      this.index = newIndex;
      this.getData()
    },
    // 企业查询
    searchEnterprise() {
       // 跳回第一页
      this.index = 1;
      this.getData();
    },
    // 清除
    clearSearch() {
      // 清除表单
      this.$refs.formInline.resetFields();
      this.index = 1;
      this.getData();
    },
    // 删除数据
    handleDelete(index,row) {
      let id = row.id;
       this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          enterpriseRemove({
            id
          }).then(res => {
            if (res.code == 200) {
              this.$message.success("删除成功");
              // 页码异常处理
              if (this.tableData.length == 1) {
                // 判断页码
                if (this.index > 1) {
                  this.index--;
                }
              }
              this.getData();
            }
          }) 
        }).catch(() => {});
    },
    // 获取数据
    getData() {
      enterpriseList({
        // 页码
        page: this.index,
        // 页容量
        limit: this.size,
        // 将筛选条件合并
        ...this.formInline
      }).then(res => {
      this.tableData = res.data.items;
      // 总条数保存起来
      this.total = res.data.pagination.total;
    })
    }
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less">
.enterprise-container {
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
