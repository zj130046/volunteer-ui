<template>
  <div>
    <v-card flat style="padding: 50px 3% 0 3%; margin: 0 4%">
      <v-container>
        <v-row>
          <v-col class="d-flex" cols="12">
            <span style="margin-top: 5px; margin-right: 5px">工时表日期</span>
            <el-date-picker
              v-model="timetableForm.activityDate"
              align="right"
              type="date"
              placeholder="选择工时表日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="timetableForm.effectiveTime"
              label="认证码有效时间（单位：小时）"
              :rules="[rules.counter]"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-combobox
              v-model="timetableForm.volunteerTimes"
              :items="timeList"
              label="可认证工时列表"
              multiple
              outlined
              dense
            ></v-combobox>
          </v-col>
          <v-col cols="12">
            <v-btn type="primary" @click="getString()">生成工时表</v-btn>
          </v-col>
          <v-col cols="12" v-if="stringNum != ''" style="user-select: text">
            六位码为 {{ stringNum }}
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { getRandomString, getDates } from "../../../api/allVolunteer/leader";
import { dateFormat } from "../../../utils/date";
export default {
  data() {
    return {
      rules: { counter: (value) => /^\d*$/.test(value) || "仅输入数字" },
      //工时表表单
      timetableForm: {
        activityId: "",
        effectiveTime: "",
        activityDate: "",
        volunteerTimes: [],
      },
      //已经生成过工时表的日期
      activityDateList: [],
      //已生成工时表日期样式改变
      pickerOptions: {
        cellClassName: (time) => {
          //   console.log(
          //     this.activityDateList.includes(dateFormat("YYYY-mm-dd", time))
          //   );
          if (this.activityDateList.includes(dateFormat("YYYY-mm-dd", time))) {
            return "red";
          }
        },
      },
      //工时选项
      timeList: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12],
      //六位码
      stringNum: "",
    };
  },
  created() {
    this.timetableForm.activityId = this.$route.params.id;
    this.getDates();
  },
  methods: {
    //获取已经生成过工时表的日期
    async getDates() {
      await getDates({ activityId: this.timetableForm.activityId }).then(
        (res) => {
          console.log(res.data);
          this.activityDateList = res.data;
        }
      );
    },
    //生成工时表 获得六位认证码
    async getString() {
      if (this.timetableForm.volunteerTimes == []) {
        this.$notify({
          title: "请选择可认证工时列表！",
          type: "error",
        });
        return;
      }
      if (typeof this.timetableForm.activityDate != "string")
        this.timetableForm.activityDate = dateFormat(
          "YYYY-mm-dd",
          this.timetableForm.activityDate
        );
      console.log(this.timetableForm);
      await getRandomString(this.timetableForm)
        .then((res) => {
          console.log(res);
          if (res.code == 0) {
            this.$notify.success({
              title: "生成成功!",
              message: res.msg,
            });
            this.stringNum = res.data;
          } else {
            this.$notify.error({
              title: "生成失败!",
              message: res.msg,
            });
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: "网络错误!",
            message: err,
          });
        });
    },
  },
};
</script>

<style>
/* 已生成工时表日期样式改变 */
.red span {
  color: #fff !important;
  background-color: lightpink !important;
}
</style>