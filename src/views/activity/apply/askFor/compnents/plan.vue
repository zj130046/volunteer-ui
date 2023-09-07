<template>
  <div>
    <v-card flat style="padding: 50px 3% 0 3%; margin: 0 4%">
      <v-container>
        <v-row>
          <!-- 活动信息 -->
          <h4>活动信息</h4>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityName" :rules="[rules.required]" label="活动名称"></v-text-field>
          </v-col>
          <h4>一、活动背景、目的与意义</h4>
          <!-- 一、活动背景、目的与意义 -->
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activityPurpose" :rules="[rules.required]" label="活动目的"></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activityBackground" :rules="[rules.required]" label="活动背景"></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activitySignificance" :rules="[rules.required]" label="活动意义"></v-textarea>
          </v-col>
          <!-- 二、活动责任单位 -->
          <h4>二、活动责任单位</h4>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.sponsor" :rules="[rules.required]" label="活动主办方"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.contractor" :rules="[rules.required]" label="活动承办方"></v-text-field>
          </v-col>
          <!-- 三、活动时间与地点 -->
          <h4>三、活动时间与地点</h4>
          <v-col cols="12">
            <!-- 活动开始时间 -->
            <!-- <el-date-picker v-model="activityInPlanningForm.activityStartTime" align="right" type="date" placeholder="选择开始时间"></el-date-picker> -->
            <v-text-field v-model="activityInPlanningForm.activityStartTime" :rules="[rules.dataRule]" label="活动开始时间"></v-text-field>
          </v-col>
          <v-col cols="12">
            <!-- 活动结束时间 -->
            <!-- <el-date-picker v-model="activityInPlanningForm.activityEndTime" align="right" type="date" placeholder="选择结束时间"></el-date-picker> -->
            <v-text-field v-model="activityInPlanningForm.activityEndTime" :rules="[rules.dataRule,rules.dateNum]" label="活动结束时间"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityAddress" :rules="[rules.required]" label="活动地点"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityDuration" :rules="[rules.required]" hint="例:1h/班，1班/天" label="活动时长"></v-text-field>
          </v-col>
          <!-- 四、活动对象 -->
          <h4>四、活动对象</h4>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityObject" :rules="[rules.required]" label="活动对象"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityParticipants" :rules="[rules.required]" label="活动参与人员"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityParticipantsNumber" :rules="[rules.required,rules.counter]" hint="填写人员数量" label="活动参与人员数量"></v-text-field>
          </v-col>
          <!-- 五、活动内容 -->
          <h4>五、活动内容</h4>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activityContent" :rules="[rules.required]" label="活动内容"></v-textarea>
          </v-col>
          <!-- 六、活动资源 -->
          <h4>六、活动资源</h4>
          <v-col cols="12">
            <v-row v-for="(item, index) in length1" :key="index">
              <v-col cols="7">
                <v-text-field v-model="length1[index].name" label="服务队自行解决的物资"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="length1[index].number" :rules="[rules.counter]" label="数量"></v-text-field>
              </v-col>
            </v-row>
            <v-btn rounded style="margin-right: 50px" @click="change1('+')">+</v-btn>
            <v-btn rounded @click="change1('-')">-</v-btn>
          </v-col>
          <v-col cols="12">
            <v-row v-for="(item, index) in length2" :key="index">
              <v-col cols="7">
                <v-text-field v-model="length2[index].name" label="总队协调解决的物资"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="length2[index].number" :rules="[rules.counter]" label="数量"></v-text-field>
              </v-col>
            </v-row>
            <v-btn rounded style="margin-right: 50px" @click="change2('+')">+</v-btn>
            <v-btn rounded @click="change2('-')">-</v-btn>
          </v-col>
          <!-- 七、活动开展 -->
          <h4>七、活动开展</h4>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activityProcess" :rules="[rules.required]" label="活动准备阶段"></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activityProcessHolding" :rules="[rules.required]" label="活动举办阶段"></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activityLaterPhases" :rules="[rules.required]" label="活动后续阶段"></v-textarea>
          </v-col>
          <!-- 八、活动经费预算 -->
          <h4>八、活动经费预算</h4>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityFunds" :rules="[rules.required,rules.money]" hint="填写预算金额" label="经费预算"></v-text-field>
          </v-col>
          <!-- 九、活动安全 -->
          <h4>九、活动安全</h4>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activitySafe" :rules="[rules.required]" label="活动安全"></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-btn color="primary" @click="addActivity" style="margin: 20px 0 60px 0">
        下一步
      </v-btn>
    </v-card>
  </div>
</template>
<script>
import { pushActivityPlanning, getactivityTable } from '../../../../../api/allVolunteer/public'
// import {
//   getActivityCategoryList,
//   getAllLevel,
//   getClassList,
//   getAllCollege,
// } from '../../../../../api/common'
// import { getRandomString } from '../../../../../api/allVolunteer/leader'
// import { dateFormat } from '../../../../../utils/date'
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
        phoneRule: (value) => /^[1][0-9]{10}$/.test(value) || '输入正确的联系方式',
        money: (value) => /^\d*(?:\.\d{0,2})?$/.test(value) || '金额格式错误，最多两位小数',
        dateNum: (value) =>
          this.checkDateNum(this.activityInPlanningForm.activityStartTime, value) ||
          '开始时间应小于等于结束时间',
      },
      activityPlanning: {
        activityId: '',
        activityInPlanningForm: {},
      },
      activityInPlanningForm: {
        activityName: '',
        activityPurpose: '',
        activityBackground: '',
        activitySignificance: '',
        sponsor: '',
        contractor: '',
        activityStartTime: '',
        activityEndTime: '',
        activityAddress: '',
        activityDuration: '',
        activityObject: '',
        activityParticipants: '',
        activityParticipantsNumber: '',
        activityContent: '',
        activityResource: '',
        activityResourceNeed: '',
        activityProcess: '',
        activityProcessHolding: '',
        activityLaterPhases: '',
        activityFunds: '',
        activitySafe: '',
      },
      activityCategoryList: [],
      collegeList: [],
      classList: [],
      levelList: [],
      length1: [{}],
      length2: [{}],
    }
  },
  mounted() {
    this.hasInfo()
  },
  methods: {
    checkDateNum(start, end) {
      return start <= end
    },
    hasInfo() {
      var map = {
        activityId: this.value.activityId,
        tableId: 1,
      }
      console.log(map)
      getactivityTable(map)
        .then((res) => {
          if (res.code == 10000) {
            // 无数据
            this.activityInPlanningForm = this.value
          } else if (res.code == 0) {
            this.activityInPlanningForm = res.data
            this.length1 = JSON.parse(res.data.activityResource)
            this.length2 = JSON.parse(res.data.activityResourceNeed)
          }
          this.activityInPlanningForm.activityId = this.value.activityId
        })
        .catch((err) => {
          this.$notify.error({
            title: '获取失败111',
            message: err.msg,
          })
        })
    },
    // 动态添加
    change1(a) {
      if (a == '+') {
        this.length1.push({})
      } else {
        this.length1.pop()
      }
    },
    change2(a) {
      if (a == '+') {
        this.length2.push({})
      } else {
        this.length2.pop()
      }
    },
    // 提交申请
    async addActivity() {
      //院级活动
      if (this.activityPlanning.classOrCollegeId == '') {
        this.activityPlanning.classOrCollegeId = this.activityPlanning.collegeId
      }

      //map对象赋值
      // let mmp1 = new Map();
      // this.length1.forEach((item) => {
      //   let key = item.name;
      //   mmp1.set(key, item.num);
      // });
      // let mmp2 = new Map();
      // this.length2.forEach((item) => {
      //   let key = item.name;
      //   mmp2.set(key, item.num);
      // });
      this.activityInPlanningForm.activityResource = this.length1
      this.activityInPlanningForm.activityResourceNeed = this.length2

      //转换时间格式
      // this.activityInPlanningForm.activityStartTime = dateFormat(
      //   'YYYY-mm-dd',
      //   this.activityInPlanningForm.activityStartTime
      // )
      // this.activityInPlanningForm.activityEndTime = dateFormat(
      //   'YYYY-mm-dd',
      //   this.activityInPlanningForm.activityEndTime
      // )

      this.activityPlanning.activityInPlanningForm = this.activityInPlanningForm

      console.log(this.activityInPlanningForm)

      // 判断是否有空的情况
      delete this.activityInPlanningForm['deleted']
      var obj = this.activityInPlanningForm
      for (var i in obj) {
        if (!obj[i]) {
          this.$notify({
            title: i + '未填写，请填写后提交',
            type: 'warning',
          })
          return
        }
      }

      // 从父组件中拿id
      this.activityInPlanningForm.activityId = this.value.activityId
      await pushActivityPlanning(this.activityInPlanningForm)
        .then((res) => {
          if (res.code == 0) {
            this.$notify.success({
              title: '提交成功',
            })
            this.$emit('next')
          } else {
            this.$notify.error({
              title: '申请失败！',
              message: res.msg,
            })
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: '网络错误！',
            message: err.msg,
          })
        })
    },
  },
}
</script>