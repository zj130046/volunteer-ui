<template>
  <v-data-table
    :headers="dessertHeaders"
    :items="collegeList"
    single-expand
    :expanded.sync="expanded"
    @item-expanded="getclass()"
    item-key="collegeName"
    show-expand
    class="elevation-1"
    disable-pagination
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Class_Info</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="dialog = true">
          添加
        </v-btn>
        <v-dialog v-model="dialog" persistent max-width="500" hide-overlay>
          <v-card style="padding: 50px 30px 20px 30px">
            <!-- 活动类别及学院 -->
            <v-col class="d-flex" sm="12">
              <v-spacer></v-spacer>
            </v-col>
            <v-col class="d-flex" cols="12">
              <v-select
                v-model="postAPI.typee"
                :items="[
                  { id: 0, type: '学院' },
                  { id: 1, type: '班级' },
                ]"
                label="请选择要添加的类型"
                item-text="type"
                item-value="id"
                dense
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" v-if="postAPI.typee == 0">
              <v-text-field
                v-model="postAPI.collegeName"
                label="学院名称"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" v-if="postAPI.typee == 1">
              <v-select
                v-model="postAPI.level"
                :items="levelList"
                label="请选择届别"
                item-text="level"
                item-value="level"
                dense
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" v-if="postAPI.typee == 1">
              <v-select
                v-model="postAPI.collegeId"
                :items="collegeList"
                label="请选择学院"
                item-text="collegeName"
                item-value="collegeId"
                dense
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" v-if="postAPI.typee == 1">
              <v-text-field
                v-model="postAPI.className"
                label="班级名称"
              ></v-text-field>
            </v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="add"> 确定 </v-btn>
              <v-btn color="green darken-1" text @click="dialog = false">
                取消
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <template>
          <v-data-table
            :headers="classhead"
            :items="classList"
            class="elevation-1"
            item-key="className"
            disable-pagination
            hide-default-footer
            style="margin: 20px 0px"
          >
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="deleteclass(item)"
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
        </template>
        <div class="text-center" style="margin: 20px 0">
          <v-pagination
            v-model="getAPI.currPage"
            :length="getAPI.totalPage"
            :total-visible="7"
            circle
            @input="getclass()"
          ></v-pagination>
        </div>
      </td>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            small
            class="mr-2"
            @click="deletecollege(item)"
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
</template>
<script>
import { getAllLevel, getClassList, getAllCollege } from "../../../api/common";
import {
  deleteCollege,
  deleteClass,
  addCollege,
  addClass,
} from "../../../api/admin/personInfo/class";
export default {
  data() {
    return {
      expanded: [],
      dessertHeaders: [
        {
          text: "学院",
          align: "start",
          sortable: false,
          value: "collegeName",
        },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      classhead: [
        {
          text: "班级",
          align: "start",
          sortable: false,
          value: "className",
        },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      levelList: [],
      collegeList: [],
      classList: [],
      getAPI: {
        currPage: 1,
        totalPage: 0,
      },
      postAPI: {
        typee: 0,
      },
      dialog: false,
    };
  },
  mounted() {
    this.getlevel();
    this.getcollege();
  },
  methods: {
    getlevel() {
      getAllLevel().then((res) => {
        this.levelList = res.data;
      });
    },
    getcollege() {
      getAllCollege().then((res) => {
        this.collegeList = res.data;
      });
    },
    getclass() {
      this.classList = [];
      // console.log(this.expanded[0])
      setTimeout(() => {
        this.getAPI.collegeId = this.expanded[0].collegeId;
        getClassList(this.getAPI).then((res) => {
          this.getAPI.totalPage = res.data.totalPage;
          this.classList = res.data.list;
        });
      }, 300);
    },
    deleteclass(item) {
      let formdata = new FormData();
      formdata.append("classId", item.classId);
      deleteClass(formdata)
        .then((res) => {
          this.$notify({
            title: "删除成功",
            message: res.msg,
            type: "success",
          });
          this.getcollege();
          this.getclass();
        })
        .catch((err) => {
          this.$notify.error({
            title: "删除失败",
            message: res,
          });
        });
    },
    deletecollege(item) {
      let formdata = new FormData();
      formdata.append("collegeId", item.collegeId);
      deleteCollege(formdata)
        .then((res) => {
          this.$notify({
            title: "删除成功",
            message: res.msg,
            type: "success",
          });
          this.getcollege();
          this.getclass();
        })
        .catch((err) => {
          this.$notify.error({
            title: "删除失败",
            message: res,
          });
        });
    },
    add() {
      if (this.postAPI.typee == 0) {
        this.addcollege();
      } else if (this.postAPI.typee == 1) {
        this.addclass();
      } else {
        this.$notify({
          title: "请先选择要添加的类型哦",
        });
      }
    },
    addcollege() {
      console.log(this.postAPI);
      let formdata = new FormData();
      formdata.append("collegeName", this.postAPI.collegeName);
      addCollege(formdata)
        .then((res) => {
          this.$notify({
            title: "添加成功",
            message: res.msg,
            type: "success",
          });
          setTimeout(() => {
            this.getcollege(), this.getclass();
          }, 500);
          this.dialog = false;
        })
        .catch((err) => {
          this.$notify.error({
            title: "删除失败",
            message: res,
          });
        });
    },
    addclass() {
      addClass(this.postAPI)
        .then((res) => {
          this.$notify({
            title: "添加成功",
            message: res.msg,
            type: "success",
          });
          this.dialog = false;
          setTimeout(() => {
            this.getcollege(), this.getclass();
          }, 500);
        })
        .catch((err) => {
          this.$notify.error({
            title: "删除失败",
            message: res,
          });
        });
    },
  },
};
</script>