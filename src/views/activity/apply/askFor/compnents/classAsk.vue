<template>
  <div>
    <v-card flat style="padding: 50px 3% 0 3%; margin: 0 4%">
      <v-container>
        <v-col cols="12">
          <v-select v-model="classForm.level" :items="levelList" label="请选择届别" item-text="level" item-value="level" dense @change="getClassList"></v-select>
        </v-col>
        <v-col class="d-flex" cols="12">
          <v-select v-model="classForm.collegeId" :items="collegeList" label="请选择学院" item-text="collegeName" item-value="collegeId" dense @change="getClassList"></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" v-if="classForm.level && classForm.collegeId">
          <v-select v-model="classForm.classId" :items="classList" label="请选择班级" item-text="className" item-value="classId" dense></v-select>
        </v-col>
        <h4>班级活动信息</h4>
        <v-col cols="12">
          <v-text-field v-model="classForm.activityName" :rules="[rules.required]" label="活动名称"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="classForm.activityStartTime" :rules="[rules.required,rules.dataRule]" label="活动开始时间"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="classForm.activityEndTime" :rules="[rules.required,rules.dataRule,rules.dateNum]" label="活动结束时间"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="classForm.activityAddress" :rules="[rules.required]" label="活动地点"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="classForm.activityParticipantsNumber" :rules="[rules.required,rules.counter]" label="活动人数"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="classForm.activityDuration" :rules="[rules.required]" label="活动时长"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-radio-group v-model="classForm.activityTermTag" row>
            <span style="font-weight: 300; font-size: 17px; padding-right: 20px">是否长期</span>
            <v-radio label="长期" value="0"></v-radio>
            <v-radio label="短期" value="1"></v-radio>
          </v-radio-group>
        </v-col>
        <h4>活动内容</h4>
        <v-col cols="12">
          <v-text-field v-model="classForm.activityContent" :rules="[rules.required]" label="活动内容"></v-text-field>
        </v-col>
      </v-container>
      <v-col>
        <v-btn color="primary" @click="postActivityClass" style="margin: 20px 0 60px 0">
          下一步
        </v-btn>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import { postActivityClass, getactivityTable } from '../../../../../api/allVolunteer/public'
import { getAllLevel, getClassList, getAllCollege } from '../../../../../api/common'
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
        dateNum: (value) =>
          this.checkDateNum(this.classForm.activityStartTime, value) ||
          '开始时间应小于等于结束时间',
      },
      classForm: {
        activityId: '',
      },
      levelList: [],
      classList: [],
      collegeList: [],
    }
  },
  mounted() {
    this.hasInfo()
    this.getAllCollege()
    this.getAllLevel()
  },
  methods: {
    checkDateNum(start, end) {
      return start <= end
    },
    // 班级列表
    async getClassList() {
      await getClassList({
        collegeId: this.classForm.collegeId,
        level: this.classForm.level,
      }).then((res) => {
        this.classList = res.data.list
      })
    },
    // 学院列表
    async getAllCollege() {
      await getAllCollege().then((res) => {
        this.collegeList = res.data
      })
    },
    // 届别列表
    async getAllLevel() {
      await getAllLevel().then((res) => {
        this.levelList = res.data
      })
    },
    async postActivityClass() {
      delete this.classForm['deleted']
      var obj = this.classForm
      for (var i in obj) {
        if (!obj[i]) {
          this.$notify({
            title: i + '未填写，请填写后提交',
            type: 'warning',
          })
          return
        }
      }
      await postActivityClass(this.classForm)
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
        tableId: 3,
      }
      getactivityTable(map)
        .then((res) => {
          if (res.code == 10000) {
            // 无数据
            // console.log(res)
            this.classForm = this.value
          } else if (res.code == 0) {
            this.classForm = res.data
          }
          this.classForm.activityId = this.value.activityId
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