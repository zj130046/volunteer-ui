<template>
    <v-card>
        <v-toolbar flat>
            <v-toolbar-title>Timetable Info</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer> </v-spacer>
        </v-toolbar>
        <v-tabs vertical>
            <v-tab
                v-for="(statu, index) in statusList"
                :key="index"
                @click="statuChange(statu.status)"
            >
                <v-icon left>
                    {{ statu.icon }}
                </v-icon>
                {{ statu.text }}
            </v-tab>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <v-data-table
                            :headers="[
                                ...headers,
                                {
                                    text: '审核人',
                                    value: 'reviewerName',
                                    sortable: false
                                },
                                {
                                    text: '认证人',
                                    value: 'authenticatorName',
                                    sortable: false
                                },
                                {
                                    text: 'Actions',
                                    value: 'actions',
                                    sortable: false
                                }
                            ]"
                            :items="timetableList"
                            hide-default-footer
                            class="elevation-1 body"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-xinxi"
                                            @click="getTimetableInfo(item)"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>工时详情</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                        <div class="text-center">
                            <v-pagination
                                v-model="timetableForm.currPage"
                                :length="totalPage"
                                :total-visible="7"
                                circle
                                @input="getAllKindsTable"
                            ></v-pagination>
                        </div>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <v-data-table
                            :headers="[
                                ...headers,
                                {
                                    text: '审核人',
                                    value: 'reviewerName',
                                    sortable: false
                                },
                                {
                                    text: '认证人',
                                    value: 'authenticatorName',
                                    sortable: false
                                },
                                {
                                    text: 'Actions',
                                    value: 'actions',
                                    sortable: false
                                }
                            ]"
                            :items="timetableList"
                            hide-default-footer
                            class="elevation-1 body"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-xinxi"
                                            @click="getTimetableInfo(item)"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>工时详情</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                        <div class="text-center">
                            <v-pagination
                                v-model="timetableForm.currPage"
                                :length="totalPage"
                                :total-visible="7"
                                circle
                                @input="getAllKindsTable"
                            ></v-pagination>
                        </div>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <v-data-table
                            :headers="[
                                ...headers,
                                {
                                    text: '审核人',
                                    value: 'reviewerName',
                                    sortable: false
                                },
                                {
                                    text: '认证人',
                                    value: 'authenticatorName',
                                    sortable: false
                                },
                                {
                                    text: 'Actions',
                                    value: 'actions',
                                    sortable: false
                                }
                            ]"
                            :items="timetableList"
                            hide-default-footer
                            class="elevation-1 body"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-bohuiyuanyinguanli"
                                            @click="getTimetableReason(item)"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>驳回原因</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-chenggong"
                                            @click="confirmTime(item)"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>确认工时表</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-xinxi"
                                            @click="getTimetableInfo(item)"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>工时详情</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                        <div class="text-center">
                            <v-pagination
                                v-model="timetableForm.currPage"
                                :length="totalPage"
                                :total-visible="7"
                                circle
                                @input="getAllKindsTable"
                            ></v-pagination>
                        </div>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <v-data-table
                            :headers="[
                                ...headers,
                                {
                                    text: 'Actions',
                                    value: 'actions',
                                    sortable: false
                                }
                            ]"
                            :items="timetableList"
                            hide-default-footer
                            class="elevation-1 body"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-chenggong"
                                            @click="confirmTime(item)"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>确认工时表</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-xinxi"
                                            @click="getTimetableInfo(item)"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>工时详情</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                        <div class="text-center">
                            <v-pagination
                                v-model="timetableForm.currPage"
                                :length="totalPage"
                                :total-visible="7"
                                circle
                                @input="getAllKindsTable"
                            ></v-pagination>
                        </div>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>

        <!-- 查看驳回原因 -->
        <v-dialog v-model="showRejectReasonDialog" persistent max-width="500px">
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col> </v-col>
                        <v-col cols="12">
                            驳回原因
                            <span>{{ rejectReason.reason }}</span></v-col
                        >
                        <v-col cols="12">
                            审核人
                            <span>{{ rejectReason.studentName }}</span></v-col
                        >
                        <v-col cols="12">
                            审核人学号
                            <span>{{ rejectReason.studentNum }}</span></v-col
                        >
                        <v-col cols="12">
                            驳回时间
                            <span>{{ rejectReason.updateTime }}</span></v-col
                        >
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="showRejectReasonDialog = false"
                    >
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>
<script>
import {
    getAllKindsTable,
    getTimetableReason,
    confirmTime
} from '../../../api/allVolunteer/leader';
export default {
    data() {
        return {
            headers: [
                { text: 'AID', value: 'activityId', sortable: false },
                { text: 'VID', value: 'volunteerCheckId', sortable: false },
                {
                    text: '活动名称',
                    value: 'activityName',
                    sortable: false
                },
                {
                    text: '活动时间',
                    value: 'activityDate',
                    sortable: false
                },
                { text: '届别', value: 'level', sortable: false },
                { text: '状态', value: 'volunteerStatusName', sortable: false },
                {
                    text: '申请者',
                    value: 'crater',
                    sortable: false
                },
                { text: '认证码', value: 'randomString', sortable: false }
            ],
            statusList: [
                { status: 3, text: '待认证', icon: 'mdi-access-point' },
                { status: 1, text: '已认证', icon: 'mdi-account' },
                { status: 2, text: '被驳回', icon: 'mdi-lock' },
                { status: 4, text: '未确认', icon: 'mdi-access-point' }
            ],
            totalPage: 0,
            //工时详情表单
            timetableForm: {
                currPage: 1,
                status: 3,
                // 1-已认证 2-被驳回 3-待认证 4-未确认
                activityId: ''
            },
            //工时详情列表
            timetableList: [],
            //工时表驳回dialog
            showRejectReasonDialog: false,
            //驳回原因
            rejectReason: {}
        };
    },
    created() {
        this.timetableForm.activityId = this.$route.params.id;
        this.getAllKindsTable();
    },
    methods: {
        //
        statuChange(status) {
            this.timetableForm.currPage = 1;
            this.timetableForm.status = status;
            this.getAllKindsTable();
        },
        //获取工时详情
        async getAllKindsTable() {
            await getAllKindsTable(this.timetableForm)
                .then(res => {
                    console.log(res.data.list);
                    if (res.code == 0) {
                        this.timetableList = res.data.list;
                        this.totalPage = res.data.totalPage;
                    }
                })
                .catch(err => {
                    this.$message.error('网络错误！');
                });
        },
        // 确认工时表
        async confirmTime(item) {
            // console.log(item.volunteerCheckId);
            let data = new FormData();
            data.append('volunteerCheckId', item.volunteerCheckId);
            await confirmTime(data)
                .then(res => {
                    console.log(res);
                    if (res.code == 0) {
                        this.$notify.success({
                            title: '确认成功！',
                            message: res.msg
                        });
                        this.getAllKindsTable();
                    } else {
                        this.$notify.error({
                            title: '确认失败！',
                            message: res.msg
                        });
                    }
                })
                .catch(err => {
                    this.$notify.error({
                        title: '网络错误！',
                        message: res.msg
                    });
                });
        },
        // 工时表详情
        getTimetableInfo(item) {
            // console.log(item.volunteerCheckId);
            this.$router.push({
                name: 'volunteerTime',
                params: { id: item.volunteerCheckId }
            });
        },
        //查看驳回原因
        async getTimetableReason(item) {
            await getTimetableReason({
                volunteerCheckId: item.volunteerCheckId
            }).then(res => {
                if (res.code == 0) {
                    this.rejectReason = res.data;
                    this.showRejectReasonDialog = true;
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.body {
    margin: 0 0 20px 2px;
    padding: 5px 15px 5px 15px;
}
.mb-2 {
    margin-top: 10px;
}
.v-card__text {
    font-size: 16px;
    span {
        float: right;
    }
}
</style>
