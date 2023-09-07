<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1 body"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title @click="initialize">Admin-Info</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-col cols="2" style="padding-top: 35px">
            <v-text-field
              v-model="searchInput"
              label="输入姓名或学号"
              append-icon="iconfont vo-sousuo"
              @keydown.enter="search"
              @click:append="search"
            ></v-text-field>
          </v-col>
          <v-spacer> </v-spacer>
          <v-dialog v-model="dialog" persistent max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                添加管理员
              </v-btn>
            </template>
            <!-- 添加和修改管理员信息的表单 -->
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.studentNum"
                        label="学号"
                        @change="queryAdmin"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" v-if="searchAdminList.studentNum != null">
                      <v-text-field
                        v-model="searchAdminList.studentName"
                        label="姓名"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12">
                      <v-select
                        v-model="editedItem.rollId"
                        :items="roleList"
                        label="授予权限"
                        item-text="rollName"
                        item-value="rollId"
                        @change="getAllOrganization"
                        dense
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      v-if="
                        (editedItem.rollId == 2 ||
                          editedItem.rollId == 3 ||
                          editedItem.rollId == 7 ||
                          editedItem.rollId == 8) &&
                        localrollId != 8
                      "
                    >
                      <v-select
                        v-if="editedItem.rollId != 7 && editedItem.rollId != 8"
                        v-model="editedItem.mangeRange"
                        :items="organization"
                        label="权限范围"
                        item-text="organizationName"
                        item-value="organizationId"
                        multiple
                      >
                        <template v-slot:selection="{ item, index }">
                          <v-chip v-if="index === 0">
                            <span>{{ item.organizationName }}</span>
                          </v-chip>
                          <v-chip v-if="index === 1">
                            <span>{{ item.organizationName }}</span>
                          </v-chip>
                          <span v-if="index === 2" class="grey--text caption">
                            +{{ editedItem.mangeRange.length - 2 }}
                            others
                          </span>
                        </template>
                      </v-select>
                      <v-select
                        v-if="editedItem.rollId == 7 || editedItem.rollId == 8"
                        v-model="editedItem.mangeRange[0]"
                        :items="organization"
                        label="权限范围"
                        item-text="organizationName"
                        item-value="organizationId"
                      ></v-select>
                    </v-col>
                    <!-- <v-col cols="12">
                        <v-text-field
                            v-model="editedItem.password"
                            label="密码"
                        ></v-text-field>
                    </v-col> -->
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
                <v-btn color="blue darken-1" text @click="save"> 添加 </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <!-- 确认删除的提示框 -->
            <v-card>
              <v-card-title class="headline">此操作将删除该管理员</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >取消</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >删除</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
              v-show="isDelate(item.rollId)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>修改</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              class="mr-2"
              @click="deleteItem(item)"
              v-show="isDelate(item.rollId)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>删除</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="totalPage"
        :total-visible="7"
        circle
        @input="initialize"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { getAllOrganization } from "../../../api/common.js";
import { searchmemberInfo } from "../../../api/admin/personInfo/volunteerInfo";
import {
  searchAdminAll,
  searchAdminName,
  searchAdminNum,
  addAdminInGeneral,
  deleteAdminInGeneral,
  addAdminInCollege,
  deleteAdminInCollege,
  addAdminInOrganization,
  deleteAdminInOrganization,
  editAdminInfo,
} from "../../../api/admin/personInfo/adminInfo.js";
export default {
  data: () => ({
    // 添加管理员时按学号搜索到的列表
    searchAdminList: [],
    localrollId: localStorage.getItem("rollId"),
    page: 1,
    totalPage: 0,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "姓名",
        align: "start",
        sortable: false,
        value: "adminName",
      },
      { text: "学号", value: "studentNum", sortable: false },
      { text: "权限", value: "rollName", sortable: false },
      { text: "所属组织", value: "organizationName", sortable: false },
      { text: "创建人", value: "craterName", sortable: false },
      { text: "操作", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      studentNum: "",
      rollId: "",
      mangeRange: [],
    },
    defaultItem: {
      studentNum: "",
      rollId: "",
      mangeRange: [],
    },
    // 写死的权限列表
    roleList: [
      {
        rollId: 2,
        rollName: "总队认证负责人",
      },
      {
        rollId: 3,
        rollName: "总队审核负责人",
      },
      {
        rollId: 4,
        rollName: "院队总负责人",
      },
      // {
      //   rollId: 5,
      //   rollName: '院队认证负责人',
      // },
      {
        rollId: 6,
        rollName: "院队审核负责人",
      },
      {
        rollId: 7,
        rollName: "组织管理员",
      },
      {
        rollId: 8,
        rollName: "组织总负责人",
      },
    ],
    // 组织列表
    organization: [],
    searchInput: "",
    searchList: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "添加" : "编辑";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
    this.get();
  },

  methods: {
    get() {
      if (this.localrollId == 4) {
        var arr = new Array();
        arr[0] = this.roleList[2];
        arr[1] = this.roleList[3];
        this.roleList = arr;
      } else if (this.localrollId == 8) {
        var arr0 = new Array();
        arr0[0] = this.roleList[4];
        this.roleList = arr0;
        this.editedItem.mangeRange[0] = this.$store.getters.originzationid;
      }
    },
    // 处理权限列表mangerange
    handleMangeRange() {
      if (this.editedItem.rollId == 2 || this.editedItem.rollId == 3) {
        this.editedItem.mangeRange = [];
        for (var i = 0; i < this.editedItem.mangeRangeName.length; i++) {
          this.editedItem.mangeRange.push(this.editedItem.mangeRangeName[i][1]);
        }
      } else {
        this.editedItem.mangeRange = [];
        this.editedItem.mangeRange[0] = this.editedItem.mangeRangeName;
      }
    },
    // 添加页面中的查找
    queryAdmin() {
      searchmemberInfo({ studentNum: this.editedItem.studentNum }).then(
        (res) => {
          if (res.data.list[0]) {
            this.searchAdminList = res.data.list[0];
          } else {
            this.$notify.error({
              message: "未查询到此志愿者",
            });
          }
        }
      ).catch;
    },
    // 是否展示删除按钮
    isDelate(rollId) {
      if (this.localrollId == 1 && rollId > 1) {
        return true;
      } else if (this.localrollId == 4 && (rollId == 5 || rollId == 6)) {
        return true;
      } else {
        return false;
      }
    },
    // 获取权限列表
    getAllOrganization() {
      getAllOrganization().then((res) => {
        this.organization = [];
        if (this.editedItem.rollId == 2 || this.editedItem.rollId == 3) {
          this.organization = res.data;
        } else if (this.editedItem.rollId == 7 || this.editedItem.rollId == 8) {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].categoryId == 3) {
              this.organization.push(res.data[i]);
            }
          }
        }
      });
    },
    // 搜索
    search() {
      // this.desserts = []
      if (/^\d+$/.test(this.searchInput)) {
        searchAdminNum({ studentNum: this.searchInput })
          .then((res) => {
            if (res.data) {
              this.desserts = [];
              this.desserts[0] = res.data;
            } else {
              this.$notify.error({
                title: "未查询到该管理员",
              });
            }
          })
          .catch((err) => {
            this.$notify.error({
              message: err.msg,
            });
          });
      } else {
        searchAdminName({ adminName: this.searchInput })
          .then((res) => {
            if (res.data[0]) {
              this.desserts = [];
              this.desserts = res.data;
            } else {
              this.$notify.error({
                title: "未查询到该管理员",
              });
            }
          })
          .catch((err) => {
            this.$notify.error({
              message: err.msg,
            });
          });
      }
      this.totalPage = 0;
    },
    initialize() {
      // 当搜索之后，页数会变为0，这里判断一下重新获取列表
      if (this.currPage == 0) {
        this.currPage = 1;
      }
      var test = { currPage: this.page };
      searchAdminAll(test).then((res) => {
        this.totalPage = res.data.totalPage;
        this.desserts = res.data.list;
        console.log(this.desserts);
      });
    },
    //编辑管理员信息
    editItem(item) {
      console.log(item);
      this.editedIndex = 0;
      this.editedItem = Object.assign({ mangeRange: [] }, item);
      this.editedItem.roll = item.rollId;
      this.editedItem.adminId = item.adminId;
      this.getAllOrganization();
      console.log("-------",this.editedItem);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.mangeRange = [];
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      var map = {
        adminId: this.editedItem.adminId,
      };
      if (this.editedItem.rollId == 2 || this.editedItem.rollId == 3) {
        deleteAdminInGeneral(map)
          .then((res) => {
            this.$notify({
              title: "已删除",
              type: "success",
            });
          })
          .catch((err) => {
            this.$notify.error({
              title: "删除失败",
              message: err.msg,
            });
          });
      } else if (
        this.editedItem.rollId == 4 ||
        this.editedItem.rollId == 5 ||
        this.editedItem.rollId == 6
      ) {
        deleteAdminInCollege(map)
          .then((res) => {
            this.$notify({
              message: "已删除",
              type: "success",
            });
          })
          .catch((err) => {
            this.$notify.error({
              title: "删除失败",
              message: err.msg,
            });
          });
      } else if (this.editedItem.rollId == 7 || this.editedItem.rollId == 8) {
        deleteAdminInOrganization(map)
          .then((res) => {
            this.$notify({
              message: "已删除",
              type: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            this.$notify.error({
              title: "删除失败",
              message: err.msg,
            });
          });
      }
      setTimeout(() => {
        this.initialize();
      }, 700);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.searchAdminList = [];
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex != -1) {
        this.edit();
        return;
      }
      if (this.editedItem.rollId == 2 || this.editedItem.rollId == 3) {
        addAdminInGeneral(this.editedItem)
          .then((res) => {
            this.desserts.push(this.editedItem);
            this.$notify({
              title: "已添加",
              message: res.msg,
              type: "success",
            });
          })
          .catch((err) => {
            this.$notify.error({
              title: "添加失败",
              message: err.msg,
            });
          });
      } else if (
        this.editedItem.rollId == 4 ||
        this.editedItem.rollId == 5 ||
        this.editedItem.rollId == 6
      ) {
        var map = {
          studentNum: this.editedItem.studentNum,
          rollId: this.editedItem.rollId,
          // password: this.editedItem.password
        };
        console.log(map);
        addAdminInCollege(map)
          .then((res) => {
            this.desserts.push(this.editedItem);
            this.$notify({
              title: "已添加",
              message: res.msg,
              type: "success",
            });
          })
          .catch((err) => {
            this.$notify.error({
              title: "添加失败",
              message: err,
            });
          });
      } else if (this.editedItem.rollId == 7 || this.editedItem.rollId == 8) {
        addAdminInOrganization(this.editedItem)
          .then((res) => {
            this.desserts.push(this.editedItem);
            this.$notify({
              title: "已添加",
              message: res.msg,
              type: "success",
            });
          })
          .catch((err) => {
            this.$notify.error({
              title: "添加失败",
              message: err.msg,
            });
          });
      }
      setTimeout(() => {
        this.initialize();
      }, 700);
      this.close();
    },
    edit() {

      let mangeRangeString = '';
      
      this.editedItem.mangeRange.forEach(item =>{
        mangeRangeString += '-'+item;
      })
      this.editedItem.mangeRange = mangeRangeString;
      console.log("=-=-=-=-=-",this.editedItem.mangeRange)
      editAdminInfo(this.editedItem).then((res) => {
        
        console.log(res.data);
        this.$notify.info({
        title: "修改成功",
      });
      });
      
      return;
      editAdminInfo(this.editedItem).then((res) => {
        console.log(res.data);
      });
      setTimeout(() => {
        this.initialize();
      }, 700);
      this.close();
    },
  },
};
</script>

<style scoped>
.body {
  margin: 0 0 20px 2px;
  padding: 5px 15px 5px 15px;
}
</style>
