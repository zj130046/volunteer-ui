<template>
  <v-form v-model="valid">
    <v-card class="mx-auto middle" max-width="95%" outlined>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="oldpassword" :rules="rules.orule" label="旧密码" required type="password"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="firstpassword" :rules="rules.frule" label="新密码" required type="password"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="lastpassword" :rules="rules.lrule" label="再次输入" required type="password"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-btn v-if="isbtn()" class="ma-2" outlined color="indigo" @click="change">
        修改
      </v-btn>
    </v-card>

  </v-form>
</template>
<script>
import { changepassword } from '../../api/enterPage'
export default {
  data: () => ({
    valid: false,
    firstpassword: '',
    lastpassword: '',
    oldpassword: '',
    rules: {
      orule: [(v) => !!v || '输入旧密码'],
      frule: [(v) => !!v || '输入新密码'],
      lrule: [(v) => !!v || '再次输入'],
    },
  }),
  methods: {
    isbtn() {
      if (this.firstpassword == '' || this.lastpassword == '') {
        return false
      } else if (this.firstpassword == this.lastpassword) {
        return true
      } else {
        return false
      }
    },
    change() {
      let data = new FormData()
      data.append('oldPassword', this.oldpassword)
      data.append('newPassword', this.lastpassword)
      changepassword(data)
        .then((res) => {
          this.$notify({
            title: '已修改 请重新登录',
            message: res.msg,
          })
          this.$router.push({ path: '/login' })
        })
        .catch((err) => {
          this.$notify({
            title: '修改失败',
            message: err,
          })
        })
    },
  },
}
</script>
<style scoped>
.middle {
  padding: 50px;
  margin-top: 250px;
}
</style>