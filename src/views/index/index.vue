<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left">
        <i class="el-icon-s-fold"></i>
        <img src="../../assets/矢量智能对象 拷贝 9.png" alt="" />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="userIcon" alt="" />
        <span class="name">{{ username }},您好</span>
        <el-button type="primary" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入接口
import {info,logout} from '@/api/index.js';
import {removeToken} from '@/utils/token.js';
export default {
  name: 'index',
  data() {
    return {
      // 用户名
      username: '',
      // 用户头像
      userIcon: ''
    }
  },
  methods: {
    logout() {
        this.$confirm('你真的要狠心离开吗?', '提示', {
          confirmButtonText: '狠心离开',
          cancelButtonText: '继续看看',
          type: 'success'
        }).then(() => {
          // 点击确定
          logout().then(res => {
            if (res.data.code===200) {
              // 移除token
              removeToken()
              // 去登录页
              this.$router.push('./login')
            }
          })
        }).catch(() => {
          // 点击取消
        });
      }
  },
  created() {
    info().then(res => {
      this.username = res.data.data.username;
      // 服务器返回的头像地址不完整，需要进行拼接
      this.userIcon = process.env.VUE_APP_URL+"/"+res.data.data.avatar
    })
  },
};
</script>
<style lang="less">
.my-container {
  height: 100%;
  .my-header {
    display: flex;
    // 左右均分
    justify-content: space-between;
    // 上下居中
    align-items: center;
    height: 60px;
  }
  .left {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      height: 20px;
      margin-right: 22px;
    }
    img {
      margin-right: 11px;
      width: 33px;
      height: 28px;
    }
    span {
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #49A1FF;
    }
  }
  .right {
    display: flex;
    align-items: center;
    img {
      width: 43px;
      height: 43px;
      border-radius: 50%;
      margin-right: 9px;
    }
    span.name {
      margin-right: 38px;
      font-size: 14px;
    }
  }
  .my-aside {
    background: yellowgreen;
  }
  .my-main {
    background: #0094ff;
  }
}
</style>
