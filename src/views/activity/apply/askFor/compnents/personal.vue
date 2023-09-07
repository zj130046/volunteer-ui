<template>
  <div>
    <v-card flat style="padding: 50px 3% 0 3%; margin: 0 4%">
      <v-container>
        <h4>一、活动信息</h4>
        <v-col cols="12">
          <v-text-field v-model="applicationList.activityName" :rules="[rules.required]" label="活动名称"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="applicationList.collegeAndClass" :rules="[rules.required]" label="学院班级"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="applicationList.activityTime" :rules="[rules.required]" label="活动时间"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="applicationList.activityDuration" :rules="[rules.required]" label="活动时长"></v-text-field>
        </v-col>
        <h4>二、负责人信息</h4>
        <v-col cols="12">
          <v-text-field v-model="applicationList.studentName" :rules="[rules.required]" label="姓名"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="applicationList.studentNum" :rules="[rules.required]" label="学号"></v-text-field>
        </v-col>
        <h4>三、活动地点</h4>
        <v-col cols="12">
          <v-text-field v-model="applicationList.activityAddress" :rules="[rules.required]" label="活动地点"></v-text-field>
        </v-col>
        <v-col cols="12">
          <img :src=imageSave alt="" id="portrait" class="imga" />
        </v-col>
        <v-col cols="4" style="padding-bottom: 35px">
          <v-btn @click="selectLoadImg">
            <div>
              上传活动地点地图
              <input type="file" name="file" accept="image/jpeg, image/png, image/jpg" @change="changeImage()" ref="avatarInput" style="display: none">
            </div>
          </v-btn>
        </v-col>
        <h4>四、活动内容</h4>
        <v-col cols="12">
          <v-textarea v-model="applicationList.activityPurpose" :rules="[rules.required]" label="活动目的"></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="applicationList.activitySignificance" :rules="[rules.required]" label="活动意义"></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="applicationList.activityObject" :rules="[rules.required]" label="活动对象"></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="applicationList.activityContent" :rules="[rules.required]" label="活动内容"></v-textarea>
        </v-col>
      </v-container>
      <v-btn color="primary" @click="addActivity" style="margin: 20px 0 60px 0">
        下一步
      </v-btn>
    </v-card>
    <!-- <div class="btn_select" @click="selectLoadImg">
      <div>
        点击选择需要上传的图片
        <input type="file" name="file" accept="docx/*" @change="changeImage()" ref="avatarInput" style="display: none">
      </div>
    </div>
    <button type="submit" class="btn_submit" @click="upLoad">上传图片</button> -->
  </div>
</template>

<script>
import { getactivityTable, postpersonal } from '../../../../../api/allVolunteer/public'
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
      imageSave: '',
    }
  },
  mounted() {
    this.hasInfo()
  },
  methods: {
    selectLoadImg() {
      this.$refs.avatarInput.dispatchEvent(new MouseEvent('click'))
    },
    changeImage() {
      let files = this.$refs.avatarInput.files
      let that = this
      function readAndPreview(file) {
        that.file = file
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          let reader = new FileReader()
          reader.onload = function () {
            if (that.imgData !== this.result) {
              that.imgData = this.result // 这个是base64的数据格式
              document.getElementById('portrait').src = reader.result
            }
          }
          reader.readAsDataURL(file)
        }
      }
      if (files) {
        ;[].forEach.call(files, readAndPreview)
      }
    },

    hasInfo() {
      var map = {
        activityId: this.value.activityId,
        tableId: 7,
      }
      getactivityTable(map)
        .then((res) => {
          if (res.code == 10000) {
            // 无数据
            // console.log(res)
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
    // 提交
    async addActivity() {
      let imgFile = this.file //获取到上传的图片
      let formData = new FormData() //通过formdata上传
      console.log(this.applicationList)
      delete this.applicationList['deleted']
      delete this.applicationList['base64String']
      delete this.applicationList['addressPic']
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
      Object.keys(this.applicationList).forEach((key) => {
        formData.append(key, this.applicationList[key])
      })
      formData.append('file', imgFile)
      postpersonal(formData)
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
<style>
.imga {
  object-fit: cover;
  height: 300px;
  width: auto;
}
</style>