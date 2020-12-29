<template>
  <div class="login">
    <div class="title">
        <div class="center">
           <h3>登录</h3>
         </div>
      <div class="put">
        <el-input placeholder="请输入内容" v-model="user.name" clearable></el-input>
      </div>
      <div class="put">
        <el-input placeholder="请输入密码" v-model="user.password" clearable show-password></el-input>
      </div>
      <div class="center">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        password: ""
      }
    };
  },
  methods:{
    //登录
    login(){
      this.$router.push("/")
    }
  }
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
}
.title {
  width: 400px;
  background: #fff;
  border-radius: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}
.put {
  margin: 20px;
}
.center {
  text-align: center;
}
</style>