<template>
  <div>
    <!-- 管理员列表 -->
    <v-data-table
      :headers="headers"
      :items="adminList"
      class="elevation-1 body"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-col cols="3" style="padding-top: 35px">
            <v-text-field
              v-model="searchForm.studentNum"
              label="请输入学号查询个人信息"
              append-icon="iconfont vo-sousuo"
              @keyup.enter.native="getStudentInfo()"
            ></v-text-field>
          </v-col>
          <v-spacer> </v-spacer>
          <v-col sm="3">
            <v-btn
              class="mr-3"
              elevation="2"
              color="primary"
              @click="showAddAdmin = true"
              >设立负责人</v-btn
            >
            <v-btn class="mr-3" elevation="2" color="primary" @click="logout()"
              >退出登录</v-btn
            >
          </v-col>
        </v-toolbar>
      </template>
      <!-- 操作 -->
      <template v-slot:item.actions="{ item }">
        <v-icon small class="iconfont vo-cuowu1" @click="deleteAdmin(item)">
        </v-icon>
      </template>
    </v-data-table>
    <!-- 分页 -->
    <div class="text-center">
      <v-pagination
        v-model="currPage"
        :length="totalpage"
        :total-visible="7"
        circle
        @input="getGeneralAdmins()"
      ></v-pagination>
    </div>
    <!-- dialogs -->
    <div>
      <!-- 添加dialog -->
      <v-dialog v-model="showAddAdmin" persistent max-width="500px">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col class="d-flex" cols="12">
                <v-text-field
                  v-model="setForm.studentNum"
                  label="学号"
                  hint="默认密码为学号"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="showAddAdmin = false">
              取消
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="(showAddAdmin = false) & setAdmin()"
            >
              确定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 个人信息 -->
      <v-dialog v-model="showStudentInfoDialog" max-width="500px">
        <v-card :loading="loading">
          <v-list flat>
            <v-subheader>个人信息</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-icon> 学号 </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{
                    studentInfo.studentNum
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon> 姓名 </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{
                    studentInfo.studentName
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon> 学院 </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{
                    studentInfo.collegeName
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon> 年级 </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ studentInfo.level }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon> 班级 </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{
                    studentInfo.className
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon> 电话 </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ studentInfo.phone }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon> QQ </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ studentInfo.qqNum }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon> 组织名称 </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{
                    studentInfo.adminInStuVO.organizationName
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon> 职位 </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{
                    studentInfo.adminInStuVO.rollName
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import {
  getGeneralAdmins,
  deleteAdmin,
  setAdmin,
  getStudentInfo,
} from "../../api/admin/superAdmin";
export default {
  data() {
    return {
      //表头
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "adminId",
        },
        { text: "学号", value: "studentNum", sortable: false },
        {
          text: "管理员",
          value: "adminName",
          sortable: false,
        },
        {
          text: "职位",
          value: "rollName",
          sortable: false,
        },
        { text: "组织", value: "organizationName", sortable: false },
        { text: "创建时间", value: "createTime", sortable: false },
        { text: "actions", value: "actions", sortable: false },
      ],
      //管理员列表
      adminList: [],
      //当前页
      currPage: 1,
      //列表页数
      totalpage: 0,
      //添加dailog
      showAddAdmin: false,
      //添加表单
      setForm: {
        studentNum: "",
      },
      //搜索dialog
      showStudentInfoDialog: false,
      //搜索表单
      searchForm: {
        studentNum: "",
      },
      //学生信息
      studentInfo: {
        adminInStuVO: {},
      },
      //加载
      loading: false,
    };
  },
  created() {
    this.getGeneralAdmins();
  },
  methods: {
    //负责人列表
    async getGeneralAdmins() {
      await getGeneralAdmins({ currPage: this.currPage }).then((res) => {
        if (res.code == 0) {
          this.adminList = res.data.list;
          this.totalpage = res.data.totalPage;
        }
      });
    },
    //设立负责人
    async setAdmin() {
      let data = new FormData();
      data.append("studentNum", this.setForm.studentNum);
      await setAdmin(data).then((res) => {
        if (res.code == 0) {
          this.$notify.success({
            title: "添加成功！",
            message: res.data,
          });
          this.getGeneralAdmins();
        } else {
          this.$notify.error({
            title: "添加失败！",
            message: res.data,
          });
        }
      });
    },
    //删除负责人
    async deleteAdmin(item) {
      await deleteAdmin({ adminId: item.adminId }).then((res) => {
        if (res.code == 0) {
          this.$notify.success({
            title: "删除成功！",
            message: res.data,
          });
          this.getGeneralAdmins();
        } else {
          this.$notify.error({
            title: "删除失败！",
            message: res.data,
          });
        }
      });
    },
    //获得学生信息
    async getStudentInfo() {
      this.showStudentInfoDialog = true;
      this.loading = true;
      await getStudentInfo(this.searchForm).then((res) => {
        if (res.code == 0) {
          //   console.log(res.data);
          this.studentInfo = res.data;
          this.loading = false;
        } else {
          this.$notify.error({
            title: "加载失败！",
            message: res.msg,
          });
        }
      });
    },
    //退出登录
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      location.reload();
    },
  },
};
</script>
<style scoped>
.body {
  margin: 0 0 20px 2px;
  padding: 5px 15px 5px 15px;
}
.d-flex {
  margin-top: 30px;
}
.v-list-item__title {
  text-align: right;
}
</style>