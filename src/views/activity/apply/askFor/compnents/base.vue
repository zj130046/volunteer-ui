<template>
  <div>
    <v-card flat style="padding: 50px 3% 0 3%; margin: 0 4%">
      <v-container>
        <v-col cols="12">
          <v-text-field v-model="baseList.baseName" :rules="[rules.required]" label="基地名称"></v-text-field>
        </v-col>
        <h4>一、负责人信息</h4>
        <v-col cols="12">
          <v-text-field v-model="baseList.personInCharge" :rules="[rules.required]" label="姓名"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="baseList.collegeAndClass" :rules="[rules.required]" label="学院班级"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="baseList.phone" :rules="[rules.required, rules.phoneRule]" label="联系电话"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="baseList.mail" :rules="[rules.required, rules.mail]" label="邮箱"></v-text-field>
        </v-col>
        <h4>二、项目基本信息</h4>
        <h5>单次活动开展规模</h5>
        <v-col cols="12">
          <v-text-field v-model="baseList.activityParticipantsNumber" :rules="[rules.required, rules.counter]" label="人数"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="baseList.activityDuration" :rules="[rules.required]" label="服务时间"></v-text-field>
        </v-col>
        <h5>开展频率</h5>
        <v-col cols="12">
          <v-text-field v-model="baseList.timeWeek" :rules="[rules.required, rules.counter]" label="每周次数"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="baseList.timeMonth" :rules="[rules.required, rules.counter]" label="每月次数"></v-text-field>
        </v-col>
        <h5>基地信息</h5>
        <v-col cols="12">
          <v-select v-model="baseList.listed" :items="[
              { id: 0, lab: '否' },
              { id: 1, lab: '是' },
            ]" item-text="lab" item-value="id" label="服务基地是否挂牌"></v-select>
        </v-col>
        <v-col cols="12" v-if="baseList.listed == 1">
          <v-text-field v-model="baseList.listedTime" :rules="[rules.required, rules.dataRule]" label="挂牌时间"></v-text-field>
        </v-col>
        <h5>项目类别</h5>
        <v-col cols="12">
          <!-- 404404下拉框其他 -->
          <v-select v-model="baseList.projectCategory" :items="projectCategoryitems" label="项目类别" @change="changeqt"></v-select>
          <v-text-field v-show="elseText" v-model="baseList.projectCategory" label="其他"></v-text-field>
        </v-col>
        <h5>开展时间</h5>
        <v-col cols="12">
          <v-text-field v-model="baseList.activityStartTime" :rules="[rules.required, rules.dataRule]" label="开始时间"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="baseList.activityEndTime" :rules="[rules.required, rules.dataRule, rules.dateNum]" label="结束时间"></v-text-field>
        </v-col>
        <h5>项目简介</h5>
        <v-col cols="12">
          <v-textarea v-model="baseList.projectBrief" :rules="[rules.required]" label="项目简介"></v-textarea>
        </v-col>
        <h4>三、志愿服务基地信息</h4>
        <h5>志愿服务基地基本信息</h5>
        <v-col cols="12">
          <v-text-field v-model="baseList.address" :rules="[rules.required]" label="地址"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="baseList.postcode" :rules="[rules.required]" label="邮编"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="baseList.modeOfTravel" :rules="[rules.required]" label="乘车方式"></v-text-field>
        </v-col>
        <h5>服务基地简介</h5>
        <v-col cols="12">
          <v-textarea v-model="baseList.introductionOfServiceBase" :rules="[rules.required]" label="服务基地简介"></v-textarea>
        </v-col>
        <h5>基地负责人信息</h5>
        <v-col cols="12">
          <v-text-field v-model="baseList.personInChargeTwo" :rules="[rules.required]" label="负责人"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="baseList.unitAndPosition" :rules="[rules.required]" label="所在单位及职务"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="baseList.phoneTwo" :rules="[rules.required, rules.phoneRule]" label="联系电话"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="baseList.mailTwo" :rules="[rules.required]" label="邮箱"></v-text-field>
        </v-col>
      </v-container>
      <v-col>
        <v-btn color="primary" @click="addActivity" style="margin: 20px 0 60px 0">
          下一步
        </v-btn>
        <v-btn color="warning" @click="$emit('next')" style="margin: 20px 0 60px 60px">
          跳过
        </v-btn>
      </v-col>
    </v-card>
  </div>
</template>
<script>
import { activityBaseAgreement, getactivityTable } from '../../../../../api/allVolunteer/public'
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
        mail: (value) =>
          /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) || '邮箱格式有误',
        dateNum: (value) =>
          this.checkDateNum(this.baseList.activityStartTime, value) || '开始时间应小于等于结束时间',
      },
      baseList: {
        activityId: '',
      },
      projectCategoryitems: ['敬老', '助残', '支教', '讲解', '社区', '环保', '公共安全', '其他'],
      elseText: false,
    }
  },
  mounted() {
    this.hasInfo()
  },
  methods: {
    checkDateNum(start, end) {
      return start <= end
    },
    changeqt() {
      if (this.baseList.projectCategory == '其他') {
        this.elseText = true
      } else {
        this.elseText = false
      }
    },
    hasInfo() {
      var map = {
        activityId: this.value.activityId,
        tableId: 6,
      }
      getactivityTable(map)
        .then((res) => {
          if (res.code == 10000) {
            // 无数据
            // console.log(res)
            this.baseList = this.value
          } else if (res.code == 0) {
            this.baseList = res.data
          }
          this.baseList.activityId = this.value.activityId
        })
        .catch((err) => {
          this.$notify.error({
            title: '获取失败',
            message: err.msg,
          })
        })
    },
    async addActivity() {
      // console.log(this.baseList)
      delete this.baseList['deleted']
      if (this.baseList.listed == 0) {
        this.listedTime = '无'
      }
      var obj = this.baseList
      for (var i in obj) {
        if (!obj[i] && i != 'listed') {
          this.$notify({
            title: i + '未填写，请填写后提交',
            type: 'warning',
          })
          return
        }
      }
      await activityBaseAgreement(this.baseList)
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