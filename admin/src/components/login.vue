<template>
  <div class="login-content">
      <h3 align="center" class="login-title">Bob管理后台</h3>

<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="账号" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <!-- <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item> -->
  <!-- <el-form-item label="年龄" prop="age">
    <el-input v-model.number="ruleForm.age"></el-input>
  </el-form-item> -->
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }

    return {
      ruleForm: {
        name: '',
        password: ''

      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'} // blur的意思是失去焦点的时候验证
        ],
        pass: [
          {required: true, message: '请输入密码', validator: validatePass, trigger: 'blur'}
        ]

      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        var ts = this
        if (valid) {
          this.axios({
            method: 'post',
            url: 'http://144.34.249.110:28000/api/admin/login',
            data: ts.ruleForm,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          }).then(function (res) {
              if (res.data.code != 0) {
                  ts.loginMsg = res.data.msg
                } else {
                  //todo:在local保存信息
                  window.localStorage.setItem('userinfo', JSON.stringify(res.data.data.admin))
                  ts.is_login = true
                  ts.username = res.data.data.admin.name
                //  ts.level = res.data.data.detail.vip_level
                  //ts.imgcode = res.data.data.image
                  alert(123)
                        ts.$router.push('/home')
                }
            // if (res.data.code != 0) {
            //   ts.$message(res.data.msg)
            // } else {
            //   console.log(res)
            //   window.sessionStorage.setItem('token', res.data.access_token)
            //   ts.$router.push('/home')
            // }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
    .login-content{
        height: 300px;
        width: 500px;
        border: 1px solid #DCDFE6;
        border-radius: 10px;
        margin: 250px auto;
        padding: 20px 50px 20px 30px;
        box-shadow: 0px 0px 10px #DCDFE6;
    }
    .login-title{
        padding-bottom: 20px;
    }
</style>
