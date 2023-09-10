<template>
    <div>
        <!-- 工时列表 -->
        <v-data-table
            :headers="headers"
            :items="volunteerTimeList"
            item-key="studentNum"
            class="elevation-1 body"
            disable-pagination
            v-model="selectList"
            show-select
            hide-default-footer
            :loading="volunteerLoading"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer> </v-spacer>
                    <v-col class="d-flex" sm="4">
                        <v-btn
                            color="primary"
                            class="mr-2"
                            @click="deleteVolunteerTimes()"
                            >批量删除</v-btn
                        >
                        <v-btn
                            color="primary"
                            class="mr-2"
                            @click="showAddDialog = true"
                            >添加</v-btn
                        >
                        <v-btn
                            color="primary"
                            class="mr-2"
                            @click="showImportDialog = true"
                            >批量导入</v-btn
                        >
                        <v-btn
                            color="primary"
                            class="mr-2"
                            @click="exportDia = true"
                            >导出</v-btn
                        >
                        <v-btn
                            color="primary"
                            class="mr-2"
                            @click="passTimetable()"
                            >认证</v-btn
                        >
                        <v-btn
                            color="primary"
                            class="mr-2"
                            @click="watchPlanning()"
                            v-if="volunteerUrl != ''"
                            >预览</v-btn
                        >
                        <v-btn
                            color="primary"
                            @click="downloadPlanning()"
                            v-if="volunteerUrl != ''"
                            >下载</v-btn
                        >
                    </v-col>
                </v-toolbar>
            </template>
        </v-data-table>
        <!-- 总条数 -->
        <div>
            <v-chip class="ma-2" color="secondary">
                {{ `共  ${volunteerTimeList.length}  条数据` }}
            </v-chip>
        </div>
        <!-- 导入 -->
        <v-dialog v-model="showImportDialog" persistent max-width="500px">
            <v-card>
                <v-card-title class="headline">
                    批量导入
                </v-card-title>
                <v-card-text>
                    <span :style="{ color: 'red', 'font-size': '10px' }"
                        >请注意:最多只能上传3个文件!</span
                    >
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <el-upload
                        action="string"
                        :limit="3"
                        :http-request="uploadFile"
                        :show-file-list="false"
                    >
                        <el-button size="medium" type="text" color="blue"
                            >点击上传</el-button
                        >
                    </el-upload>
                    <el-button
                        size="medium"
                        type="text"
                        color="blue"
                        @click="download"
                        >下载模板</el-button
                    >
                    <el-button
                        size="medium"
                        type="text"
                        color="blue"
                        @click="showImportDialog = false"
                        >取消</el-button
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 签名 -->
        <v-dialog v-model="exportDia" persistent max-width="500px">
            <v-card>
                <v-card-title class="headline">
                    请填写活动负责人的姓名
                </v-card-title>
                <v-card-text>
                    <v-col cols="12">
                        <v-text-field
                            v-model="exportname"
                            label="输入姓名"
                        ></v-text-field>
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
                    <v-btn color="blue darken-1" text @click="exportD()">
                        确定
                    </v-btn>
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
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="showAddDialog = false"
                    >
                        取消
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="(showAddDialog = false) & addOneData()"
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
    deleteVolunteerTimes,
    addOneData,
    uploadFileData,
    downloadExcel
} from '../../api/admin/volunteerTime/timetableInfo';
import { exportDialog } from '../../api/file';
import { passTimetable } from '../../api/admin/volunteerTime/approveTime';
export default {
    data() {
        return {
            //表头
            headers: [
                { text: 'VID', value: 'volunteerCheckId', sortable: false },
                { text: '姓名', value: 'studentName', sortable: false },
                { text: '学号', value: 'studentNum', sortable: false },
                { text: '工时', value: 'volunteerTime', sortable: false },
                { text: '创建时间', value: 'createTime', sortable: false },
                { text: '认证时间', value: 'confirmTime', sortable: false },
                { text: '活动时间', value: 'activityDate', sortable: false }
            ],
            // 签名
            exportDia: false,
            exportname: '',
            //excel
            volunteerUrl: '',
            //工时表ID
            volunteerCheckId: 0,
            //工时列表
            volunteerTimeList: [],
            //加载
            volunteerLoading: false,
            //被选择的列表
            selectList: [],
            //删除表单
            deleteForm: {
                volunteerCheckId: 0,
                studentNums: []
            },
            //添加
            showAddDialog: false,
            // 导入
            showImportDialog: false,
            //添加表单
            addVolunteerTime: {
                volunteerCheckId: '',
                studentNum: '',
                volunteerTime: ''
            },
            // 上传文件
            file: null
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
            await getTimetableInfo({
                volunteerCheckId: this.volunteerCheckId
            }).then(res => {
                if (res.code == 0) {
                    console.log(res);
                    this.volunteerTimeList = res.data;
                    this.volunteerLoading = false;
                }
            });
        },
        //批量删除
        async deleteVolunteerTimes() {
            console.log(this.selectList);
            this.deleteForm.volunteerCheckId = this.volunteerCheckId;
            for (let i = 0; i < this.selectList.length; i++) {
                this.deleteForm.studentNums[i] = this.selectList[i].studentNum;
            }
            await deleteVolunteerTimes(this.deleteForm).then(res => {
                if (res.code == 0) {
                    this.$notify({
                        title: '删除成功',
                        message: res.msg,
                        type: 'success'
                    });
                    this.getTimetableInfo();
                } else {
                    this.$notify.error({
                        title: '删除失败',
                        message: res.msg
                    });
                }
            });
            this.selectList = [];
        },
        //添加
        async addOneData() {
            this.addVolunteerTime.volunteerCheckId = this.volunteerCheckId;
            await addOneData(this.addVolunteerTime).then(res => {
                if (res.code == 0) {
                    this.$notify({
                        title: '添加成功',
                        message: res.msg,
                        type: 'success'
                    });
                    this.getTimetableInfo();
                } else {
                    this.$notify.error({
                        title: '添加失败',
                        message: res.msg
                    });
                }
            });
        },
        // 导出工时表
        async exportD() {
            var map = {
                boss: this.exportname,
                volunteerCheckId: this.volunteerCheckId
            };
            await exportDialog(map).then(res => {
                if (res.code == 0) {
                    this.$notify.success({
                        title: '生成成功',
                        message: res.msg
                    });
                    this.volunteerUrl = res.data;
                } else {
                    this.$notify.error({
                        title: '生成失败',
                        message: res.err
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
        // 认证
        async passTimetable() {
            await passTimetable({ volunteerCheckId: this.volunteerCheckId })
                .then(res => {
                    this.$notify({
                        title: '已认证',
                        message: res.msg,
                        type: 'success'
                    });
                })
                .catch(err => {
                    this.$notify.error({
                        title: '认证失败',
                        message: err.msg
                    });
                });
            setTimeout(() => {
                this.$router.push({ name: 'authenation' });
            }, 300);
        },

        // 批量导入
        async uploadFile(params) {
            this.file = params.file;
            let fileType = this.file.type;
            if (
                fileType != 'application/vnd.ms-excel' &&
                fileType !=
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ) {
                this.$message.error('只能上传 xls 和 xlsx 形式的文件！');
                return;
            }

            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('volunteerCheckId', this.volunteerCheckId);

            await uploadFileData(formData)
                .then(res => {
                    if (res.code === 0) {
                        this.$message.success('上传成功！');
                        return;
                    }
                    throw res.msg;
                })
                .catch(err => {
                    this.$message.error('上传失败！' + err);
                })
                .finally(() => {
                    this.showImportDialog = false;
                });
        },

        // 下载模板 excel
        async download() {
            await downloadExcel()
                .then(res => {
                    console.log(res);
                    // 创建a标签
                    const link = document.createElement('a');
                    const blob = new Blob([res]);
                    // 设置a标签的href（点击地址）
                    link.href = URL.createObjectURL(blob);
                    // 设置a标签属性
                    link.setAttribute('download', '学生工时批量导入模板表.xlsx');
                    // 点击a标签
                    document.body.appendChild(link);
                    link.click();
                    // 移除a标签
                    document.body.removeChild(link);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style></style>
