<template>
  <div>
    <v-card flat style="padding: 50px 3% 0 3%; margin: 0 4%">
      <v-container>
        <v-row>
          <!-- 活动类别及学院 -->
          <span>活动类别及学院</span>
          <v-col class="d-flex" cols="12">
            <v-select v-model="activityPlanning.activityCategoryId" :items="activityCategoryList" label="请选择活动类型" item-text="activityCategoryName" item-value="activityCategoryId" dense></v-select>
          </v-col>
          <v-col class="d-flex" cols="12">
            <v-select v-model="activityPlanning.level" :items="levelList" label="请选择届别" item-text="level" item-value="level" dense></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" v-if="
              activityPlanning.activityCategoryId == 3 ||
              activityPlanning.activityCategoryId == 4
            ">
            <v-select v-model="activityPlanning.collegeId" :items="collegeList" label="请选择学院" item-text="collegeName" item-value="collegeId" dense @change="getClassList"></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" v-if="
              activityPlanning.activityCategoryId == 4 &&
              activityPlanning.level &&
              activityPlanning.collegeId
            ">
            <v-select v-model="activityPlanning.classOrCollegeId" :items="classList" label="请选择班级" item-text="className" item-value="classId" dense></v-select>
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityName" label="活动名称"></v-text-field>
          </v-col>
          <span>一、活动背景、目的与意义</span>
          <!-- 一、活动背景、目的与意义 -->
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activityPurpose" label="活动目的"></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activityBackground" label="活动背景"></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activitySignificance" label="活动意义"></v-textarea>
          </v-col>
          <!-- 二、活动责任单位 -->
          <span>二、活动责任单位</span>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.sponsor" label="活动主办方"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.contractor" label="活动承办方"></v-text-field>
          </v-col>
          <!-- 三、活动时间与地点 -->
          <span>三、活动时间与地点</span>
          <v-col cols="12">
            活动开始时间
            <el-date-picker v-model="activityInPlanningForm.activityStartTime" align="right" type="date" placeholder="选择开始时间"></el-date-picker>
          </v-col>
          <v-col cols="12">
            活动结束时间
            <el-date-picker v-model="activityInPlanningForm.activityEndTime" align="right" type="date" placeholder="选择结束时间"></el-date-picker>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityAddress" label="活动地点"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityDuration" hint="例:1h/班，1班/天" label="活动时长"></v-text-field>
          </v-col>
          <!-- 四、活动对象 -->
          <span>四、活动对象</span>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityObject" hint="例:软件1902班全体同学" label="活动对象"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityParticipants" label="活动参与人员"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityParticipantsNumber" hint="仅填写人数" label="活动参与人员数量"></v-text-field>
          </v-col>
          <!-- 五、活动内容 -->
          <span>五、活动内容</span>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activityContent" label="活动内容"></v-textarea>
          </v-col>
          <!-- 六、活动资源 -->
          <span>六、活动资源</span>
          <v-col cols="12">
            <v-row v-for="(item, index) in length1" :key="index">
              <v-col cols="7">
                <v-text-field v-model="length1[index].name" label="服务队自行解决的物资"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="length1[index].number" label="数量"></v-text-field>
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
                <v-text-field v-model="length2[index].number" label="数量"></v-text-field>
              </v-col>
            </v-row>
            <v-btn rounded style="margin-right: 50px" @click="change2('+')">+</v-btn>
            <v-btn rounded @click="change2('-')">-</v-btn>
          </v-col>
          <!-- 七、活动开展 -->
          <span>七、活动开展</span>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activityProcess" label="活动准备阶段"></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activityProcessHolding" label="活动举办阶段"></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activityLaterPhases" label="活动后续阶段"></v-textarea>
          </v-col>
          <!-- 八、活动经费预算 -->
          <span>八、活动经费预算</span>
          <v-col cols="12">
            <v-text-field v-model="activityInPlanningForm.activityFunds" hint="请输入数字 单位为元" label="经费预算"></v-text-field>
          </v-col>
          <!-- 九、活动安全 -->
          <span>九、活动安全</span>
          <v-col cols="12">
            <v-textarea v-model="activityInPlanningForm.activitySafe" hint="安全事项" label="活动安全"></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn color="orange" text @click="addActivity"> 提交申请 </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { pushActivityPlanning } from '../../../api/allVolunteer/public'
import {
  getActivityCategoryList,
  getAllLevel,
  getClassList,
  getAllCollege,
} from '../../../api/common'
import { getRandomString } from '../../../api/allVolunteer/leader'
import { dateFormat } from '../../../utils/date'
export default {
  data() {
    return {
      activityPlanning: {
        organizationId: '',
        level: '',
        activityCategoryId: '',
        classOrCollegeId: '',
        activityInPlanningForm: {},
        collegeId: '',
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
  created() {
    this.activityPlanning.organizationId = this.$store.getters.originzationid
    this.getActivityCategoryList()
    this.getAllLevel()
    this.getAllCollege()
    this.getAllLevel()
  },
  mounted() {
    //禁用tab键
    document.onkeydown = function () {
      let key = window.event.keyCode
      if (key == 9) {
        window.event.preventDefault()
      }
    }
  },
  methods: {
    // 处理activityResource
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
    // 活动类别表
    async getActivityCategoryList() {
      await getActivityCategoryList().then((res) => {
        this.activityCategoryList = res.data
      })
    },
    // 班级列表
    async getClassList() {
      await getClassList({
        collegeId: this.activityPlanning.collegeId,
        level: this.activityPlanning.level,
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
    async getAllLevel() {
      await getAllLevel().then((res) => {
        this.levelList = res.data
      })
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
      this.activityInPlanningForm.activityStartTime = dateFormat(
        'YYYY-mm-dd',
        this.activityInPlanningForm.activityStartTime
      )
      this.activityInPlanningForm.activityEndTime = dateFormat(
        'YYYY-mm-dd',
        this.activityInPlanningForm.activityEndTime
      )

      this.activityPlanning.activityInPlanningForm = this.activityInPlanningForm
      console.log(this.activityPlanning)
      await pushActivityPlanning(this.activityPlanning)
        .then((res) => {
          console.log(res.data)
          if (res.code == 0) {
            this.$notify.success({
              title: '申请成功！',
              message: '活动ID为' + res.data,
            })
            this.$router.push('/apply')
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
            message: res.msg,
          })
        })
    },
  },
}
</script>