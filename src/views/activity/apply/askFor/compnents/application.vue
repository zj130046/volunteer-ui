<template>
  <div>
    <v-card flat style="padding: 50px 3% 0 3%; margin: 0 4%">
      <v-container>
        <h4>一、项目信息</h4>
        <v-col cols="12">
          <v-text-field v-model="applicationList.contractor" :rules="[rules.required]" label="组织单位"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="applicationList.activityName" :rules="[rules.required]" label="项目名称"></v-text-field>
        </v-col>
        <h4>二、负责人信息</h4>
        <v-col cols="12">
          <v-text-field v-model="applicationList.personInCharge" :rules="[rules.required]" label="项目负责人"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="applicationList.phone" :rules="[rules.required,rules.phoneRule]" label="项目负责人联系方式"></v-text-field>
        </v-col>
        <h4>三、时间地点</h4>
        <v-col cols="12">
          <v-text-field v-model="applicationList.activityDuration" :rules="[rules.required]" label="活动时间" placeholder="注意加上活动时长"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="applicationList.activityAddress" :rules="[rules.required]" label="活动地点"></v-text-field>
        </v-col>
        <h4>四、项目内容</h4>
        <v-col cols="12">
          <v-textarea v-model="applicationList.activityContent" :rules="[rules.required]" label="项目内容"></v-textarea>
        </v-col>
      </v-container>
      <v-btn color="primary" @click="addActivity" style="margin: 20px 0 60px 0">
        下一步
      </v-btn>
    </v-card>
  </div>
</template>
<script>
import { postApplication, getactivityTable } from '../../../../../api/allVolunteer/public'
export default {
  props: ['value'],
  data() {
    return {
      rules: {
        required: (value) => !!value || '禁止为空，请输入',
        dataRule: (value) =>
          /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(value) ||
          '日期格式->0000-00-00',
        counter: (value) => /^\d*$/.test(value) || '仅输入数字',
        phoneRule: (value) => /^[1][3,4,5,7,8][0-9]{9}$/.test(value) || '输入正确的联系方式',
        money: (value) => /^\d*(?:\.\d{0,2})?$/.test(value) || '金额格式错误，最多两位小数',
      },
      applicationList: {
        activityId: '',
      },
    }
  },
  mounted() {
    this.hasInfo()
  },
  methods: {
    hasInfo() {
      var map = {
        activityId: this.value.activityId,
        tableId: 2,
      }
      getactivityTable(map)
        .then((res) => {
          if (res.code == 10000) {
            // 无数据
            this.applicationList = this.value
          } else if (res.code == 0) {
            this.applicationList = res.data
          }
          this.applicationList.activityId = this.value.activityId
        })
        .catch((err) => {
          this.$notify.error({
            title: '获取失败',
            message: err.msg,
          })
        })
    },
    async addActivity() {
      delete this.applicationList['deleted']
      delete this.applicationList['addressPic']
      console.log(this.applicationList)
      var obj = this.applicationList

      for (var i in obj) {
        if (!obj[i]) {
          this.$notify({
            title: i + '未填写，请填写后提交',
            type: 'warning',
          })
          return
        }
      }
      postApplication(this.applicationList)
        .then((res) => {
          this.$notify({
            title: '提交成功',
            type: 'success',
          })
          this.$emit('next')
        })
        .catch((err) => {
          this.$notify.error({
            title: '提交失败',
            message: err.msg,
          })
        })
    },
  },
}
</script>