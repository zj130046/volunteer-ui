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
          <v-toolbar-title>Announcement</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                发布公告
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.title"
                        label="标题"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.content"
                        label="内容"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
                <v-btn color="blue darken-1" text @click="save"> 保存 </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">此操作将删除这条公告</v-card-title>
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
              v-bind="attrs"
              v-on="on"
              >mdi-pencil
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
              v-bind="attrs"
              v-on="on"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>删除</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
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
import {
  deleteAnnouncement,
  editAnnouncement,
  getAnnouncement,
  publishAnnouncement,
} from "../../api/admin/announceSystem.js";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "日期",
        align: "start",
        sortable: false,
        value: "updateTime",
      },
      { text: "标题", value: "title", sortable: false },
      { text: "内容", value: "content", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    page: 1,
    totalPage: 0,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "发布公告" : "编辑公告";
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
  },

  methods: {
    initialize() {
      var test = { currPage: this.page };
      getAnnouncement(test).then((res) => {
        this.totalPage = res.data.totalPage;
        this.desserts = res.data.list;
      });
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log(this.editedItem);
      //通过FormData构造函数创建一个空对象
      var formdata = new FormData();
      //通过append()方法来追加数据
      formdata.append("announcementId", this.editedItem.id);
      deleteAnnouncement(formdata)
        .then((res) => {
          setTimeout(() => {
            this.initialize();
          }, 300);
          this.$notify({
            title: "已删除",
            message: res.msg,
            type: "success",
          });
        })
        .catch((err) => {
          this.$notify.error({
            title: "删除失败",
            message: err.msg,
          });
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
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
      if (this.editedIndex > -1) {
        console.log(this.editedItem);
        //通过FormData构造函数创建一个空对象
        var formdata = new FormData();
        //通过append()方法来追加数据
        formdata.append("announcementId", this.editedItem.id);
        formdata.append("title", this.editedItem.title);
        formdata.append("content", this.editedItem.content);

        editAnnouncement(formdata)
          .then((res) => {
            setTimeout(() => {
              this.initialize();
            }, 300);
            this.$notify({
              title: "已修改",
              message: res.msg,
              type: "success",
            });
          })
          .catch((err) => {
            this.$notify.error({
              title: "修改失败",
              // message: "err.msg"
              message: err.msg,
            });
          });
      } else {
        publishAnnouncement(this.editedItem)
          .then((res) => {
            setTimeout(() => {
              this.initialize();
            }, 300);
            this.$notify({
              title: "已发布",
              message: res.msg,
              type: "success",
            });
          })
          .catch((err) => {
            this.$notify.error({
              title: "发布失败",
              message: err.msg,
            });
          });
      }
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
