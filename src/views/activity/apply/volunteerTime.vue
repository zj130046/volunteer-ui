<template>
  <div>
    <!-- 工时列表 -->
    <v-data-table
      :headers="headers"
      :items="volunteerTimeList"
      disable-pagination
      class="elevation-1 body"
      hide-default-footer
      :loading="volunteerLoading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer> </v-spacer>
          <v-col class="d-flex" sm="1">
            <v-btn color="primary" @click="showAddDialog = true">添加</v-btn>
          </v-col>
          <v-col class="d-flex" sm="1">
            <v-btn color="primary" @click="exportDia = true">导出</v-btn>
          </v-col>
          <v-col class="d-flex" sm="1" v-if="volunteerUrl != ''">
            <v-btn color="primary" @click="watchPlanning()">预览</v-btn>
          </v-col>
          <v-col class="d-flex" sm="1" v-if="volunteerUrl != ''">
            <v-btn color="primary" @click="downloadPlanning()">下载</v-btn>
          </v-col>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="iconfont vo-cuowu1" @click="deleteTime(item)">
        </v-icon>
        <v-icon small class="iconfont vo-xiugai" @click="showEdit(item)">
        </v-icon>
      </template>
    </v-data-table>
    <!-- 总条数 -->
    <div>
      <v-chip class="ma-2" color="secondary">
        {{ `共  ${volunteerTimeList.length}  条数据` }}
      </v-chip>
    </div>
    <!-- 签名 -->
    <v-dialog v-model="exportDia" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline"> 请填写活动负责人姓名 </v-card-title>
        <v-card-text>
          <v-col cols="12">
            <v-text-field v-model="exportname" label="输入姓名"></v-text-field>
          </v-col>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="
              exportDia = false;
              exportname = '';
            "
          >
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="exportD()"> 确定 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 添加dialog -->
    <v-dialog v-model="showAddDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline"> 添加工时信息 </v-card-title>
        <v-card-text>
          <v-col class="d-flex" cols="12">
            <v-text-field
              v-model="addVolunteerTime.studentNum"
              label="学号"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="addVolunteerTime.volunteerTime"
              label="工时"
            ></v-text-field>
          </v-col>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showAddDialog = false">
            取消
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="(showAddDialog = false) & addTime()"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 修改dialog -->
    <v-dialog v-model="showEditDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline"> 修改工时信息 </v-card-title>
        <v-card-text>
          <v-col class="d-flex" cols="12">
            <v-text-field
              v-model="editVolunteerTime.studentNum"
              label="学号"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="editVolunteerTime.volunteerTime"
              label="工时"
            ></v-text-field>
          </v-col>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showEditDialog = false">
            取消
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="(showEditDialog = false) & editTime()"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
    getTimetableInfo,
    deleteTime,
    addTime,
    editTime,
} from '../../../api/allVolunteer/leader';
import { exportDialog } from '../../../api/file';
export default {
    data() {
        return {
            //表头
            headers: [
                {
                    text: 'VID',
                    sortable: false,
                    value: 'volunteerCheckId',
                },
                { text: '姓名', value: 'studentName', sortable: false },
                { text: '学号', value: 'studentNum', sortable: false },
                { text: '工时', value: 'volunteerTime', sortable: false },
                { text: '创建时间', value: 'createTime', sortable: false },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            // 签名
            exportDia: false,
            exportname: '',
            //excel
            volunteerUrl: '',
            // 工时表ID
            volunteerCheckId: 0,
            // 工时列表
            volunteerTimeList: [],
            // 加载
            volunteerLoading: false,
            // 删除表单
            deleteForm: {
                volunteerCheckId: '',
                studentNum: '',
            },
            //添加
            showAddDialog: false,
            //添加表单
            addVolunteerTime: {
                volunteerCheckId: '',
                studentNum: '',
                volunteerTime: '',
            },
            //修改
            showEditDialog: false,
            //修改表单
            editVolunteerTime: {
                volunteerCheckId: '',
                studentNum: '',
                volunteerTime: '',
            },
        };
    },
    created() {
        this.volunteerCheckId = this.$route.params.id;
        this.getTimetableInfo();
    },
    methods: {
    //获取工时详情
        async getTimetableInfo() {
            this.volunteerLoading = true;
            await getTimetableInfo({ volunteerCheckId: this.volunteerCheckId }).then(
                (res) => {
                    if (res.code == 0) {
                        console.log(res.data);
                        this.volunteerTimeList = res.data;
                        this.volunteerLoading = false;
                    }
                }
            );
        },
        //删除
        async deleteTime(item) {
            let data = new FormData();
            data.append('volunteerCheckId', this.volunteerCheckId);
            data.append('studentNum', item.studentNum);
            await deleteTime(data)
                .then((res) => {
                    if (res.code == 0) {
                        this.$notify({
                            title: '删除成功',
                            message: res.msg,
                            type: 'success',
                        });
                        this.getTimetableInfo();
                    } else {
                        this.$notify.error({
                            title: '删除失败',
                            message: res.msg,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        //添加
        async addTime() {
            this.addVolunteerTime.volunteerCheckId = this.volunteerCheckId;
            await addTime(this.addVolunteerTime).then((res) => {
                if (res.code == 0) {
                    this.$notify({
                        title: '添加成功',
                        message: res.msg,
                        type: 'success',
                    });
                    this.getTimetableInfo();
                } else {
                    this.$notify.error({
                        title: '添加失败',
                        message: res.msg,
                    });
                }
            });
        },
        //修改
        showEdit(item) {
            this.editVolunteerTime.volunteerCheckId = item.volunteerCheckId;
            this.editVolunteerTime.studentNum = item.studentNum;
            this.showEditDialog = true;
        },
        //修改
        async editTime() {
            await editTime(this.editVolunteerTime).then((res) => {
                if (res.code == 0) {
                    this.$notify({
                        title: '修改成功',
                        message: res.msg,
                        type: 'success',
                    });
                    this.getTimetableInfo();
                } else {
                    this.$notify.error({
                        title: '修改失败',
                        message: res.msg,
                    });
                }
            });
        },
        // 导出工时表
        async exportD() {
            var map = {
                boss: this.exportname,
                volunteerCheckId: this.volunteerCheckId,
            };
            await exportDialog(map).then((res) => {
                if (res.code == 0) {
                    this.$notify.success({
                        title: '生成成功',
                        message: res.msg,
                    });
                    this.volunteerUrl = res.data;
                } else {
                    this.$notify.error({
                        title: '生成失败',
                        message: res.msg,
                        //更改前是err
                    });
                    
                }
            });
            this.exportDia = false;
            this.exportname = '';
        },
        //预览工时表
        watchPlanning() {
            window.open(
                'https://view.officeapps.live.com/op/view.aspx?src=' +
          this.volunteerUrl,
                '_blank'
            );
        },
        //下载工时表
        downloadPlanning() {
            window.open(this.volunteerUrl, '_blank');
        },
    },
};
</script>

<style>
</style>