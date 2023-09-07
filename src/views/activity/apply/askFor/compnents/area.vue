<template>
  <div>
    <v-card flat style="padding: 50px 3% 0 3%; margin: 0 4%">
      <v-container>
        <h4>一、承办组织</h4>
        <v-col cols="12">
          <v-text-field v-model="locationForm.contractor" :rules="[rules.required]" label="承办方"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="locationForm.personInCharge" :rules="[rules.required]" label="负责人"></v-text-field>
        </v-col>
        <h4>二、活动信息</h4>
        <v-col cols="12">
          <v-text-field v-model="locationForm.activityName" :rules="[rules.required]" label="活动名称"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="locationForm.activityTime" :rules="[rules.dataRule]" label="活动时间"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="locationForm.activityAddress" :rules="[rules.required]" label="活动地点、点位"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="locationForm.activityParticipantsNumber" :rules="[rules.required,rules.counter]" label="参加活动人数"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="locationForm.phone" :rules="[rules.phoneRule]" label="现场负责人、联系电话"></v-text-field>
        </v-col>
        <h4>三、活动内容</h4>
        <v-col cols="12">
          <v-text-field v-model="locationForm.activityContent" :rules="[rules.required]" label="活动具体内容"></v-text-field>
        </v-col>

      </v-container>
      <v-col>
        <v-btn color="primary" @click="postActivityLocation" style="margin: 20px 0 60px 0">
          下一步
        </v-btn>
        <v-btn color="warning" @click="$emit('next')" style="margin: 20px 0 60px 60px" v-if="value.activityCategoryId != 3">
          跳过
        </v-btn>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import { postActivityLocation, getactivityTable } from '../../../../../api/allVolunteer/public'
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
      locationForm: {
        activityId: '',
      },
    }
  },
  mounted() {
    this.hasInfo()
  },
  methods: {
    async postActivityLocation() {
      // console.log(this.locationForm)
      delete this.locationForm['deleted']
      delete this.locationForm['addressPic']
      var obj = this.locationForm
      for (var i in obj) {
        if (!obj[i]) {
          this.$notify({
            title: i + '未填写，请填写后提交',
            type: 'warning',
          })
          return
        }
      }
      await postActivityLocation(this.locationForm)
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
    hasInfo() {
      var map = {
        activityId: this.value.activityId,
        tableId: 5,
      }
      getactivityTable(map)
        .then((res) => {
          if (res.code == 10000) {
            // 无数据
            // console.log(res)
            this.locationForm = this.value
          } else if (res.code == 0) {
            this.locationForm = res.data
          }
          this.locationForm.activityId = this.value.activityId
        })
        .catch((err) => {
          this.$notify.error({
            title: '获取失败',
            message: err.msg,
          })
        })
    },
  },
}
</script>

<style>
</style>