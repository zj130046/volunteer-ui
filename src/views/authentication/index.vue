<!-- 活动工时认证 -->
<template>
    <v-card>
        <v-dialog v-model="dialog" persistent max-width="450px">
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row style="margin-top: 30px">
                            <v-col cols="12">
                                <v-text-field
                                    v-model="input"
                                    color="purple darken-2"
                                    label="驳回原因"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        取消
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="rejectTimetable()"
                    >
                        驳回
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- 筛选框结构 -->
        <v-toolbar flat class="toolbar">
            <!-- <v-toolbar-title>User Profile</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider> -->
            <!-- 21暑假工时系统完善 需求4 -->
            <v-toolbar-title>authentication</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer> </v-spacer>

            <!-- <v-text-field
                v-model="searchInput"
                append-icon="mdi-magnify"
                label="通过关键信息筛选本页"
                single-line
                hide-details
                @input="log"
                @keyup.enter="log"
            ></v-text-field> -->
            <v-col cols="3" style="padding-top: 35px">
                <v-text-field
                    label="活动ID"
                    hide-details="auto"
                    v-model="filterForm.activityId"
                    @change="log()"
                ></v-text-field>
            </v-col>
            <v-col cols="3" style="padding-top: 35px">
                <v-text-field
                    label="工时表ID"
                    hide-details="auto"
                    v-model="filterForm.volunteerCheckId"
                    @change="log()"
                ></v-text-field>
            </v-col>
            <v-col cols="3" style="padding-top: 35px">
                <v-text-field
                    label="活动名"
                    hide-details="auto"
                    v-model="filterForm.activityName"
                    @change="log()"
                ></v-text-field>
            </v-col>
            <v-col cols="1">
                <v-btn
                    class="mr-3"
                    elevation="2"
                    color="primary"
                    @click="showFilterDialog = true"
                    >筛选</v-btn
                >
            </v-col>
        </v-toolbar>
        <!-- 筛选dialog -->
        <v-dialog v-model="showFilterDialog" persistent max-width="500px">
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col class="d-flex" cols="12">
                            <el-date-picker
                                v-model="filterForm.activityDate"
                                type="date"
                                placeholder="活动开始时间"
                                format="yyyy - MM - dd"
                                value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                label="创建者"
                                hide-details="auto"
                                v-model="filterForm.crater"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                label="服务队"
                                hide-details="auto"
                                v-model="filterForm.organizationName"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="showFilterDialog = false"
                    >
                        取消
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="(showFilterDialog = false) & log()"
                    >
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-tabs vertical>
            <!-- 待审核，已通过，已驳回，左上角内容 -->
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
            <!-- 待审核 -->
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
                            :items="desserts"
                            hide-default-footer
                            class="elevation-1 body"
                            :search="searchInput"
                            :page.sync="this.filterForm.currPage"
                        >
                            <!--Action-->
                            <template v-slot:item.actions="{ item }">
                                <!--工时信息按钮-->
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-xinxi"
                                            @click="
                                                timeTable(item.volunteerCheckId)
                                            "
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>工时信息</span>
                                </v-tooltip>

                                <!--认证按钮-->
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-chenggong"
                                            @click="passTimetable(item)"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>认证</span>
                                </v-tooltip>
                                <!--驳回按钮-->
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-cuowu1"
                                            @click="
                                                reject.volunteerCheckId = item.volunteerCheckId;
                                                    dialog = true
                                            "
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                            <!-- // filterForm.volunteerCheckId =
                                                //     item.volunteerCheckId; -->
                                        </v-icon>
                                    </template>
                                    <span>驳回</span>
                                </v-tooltip>
                                <!--删除按钮-->
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-shanchu"
                                            @click="adminDelete(item)"
                                            v-if="rollId == '1'"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>删除</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                        <div class="text-center">
                            <v-pagination
                                v-model="filterForm.currPage"
                                :length="totalPage"
                                :total-visible="7"
                                circle
                                @input="initialize"
                            ></v-pagination>
                        </div>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <!-- 已通过 -->
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
                            :items="desserts"
                            hide-default-footer
                            class="elevation-1 body"
                            :search="searchInput"
                            :page.sync="this.filterForm.currPage"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-xinxi"
                                            @click="
                                                timeTable(item.volunteerCheckId)
                                            "
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>工时信息</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-shanchu"
                                            @click="adminDelete(item)"
                                            v-if="rollId == '1'"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>删除</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                        <div class="text-center">
                            <v-pagination
                                v-model="filterForm.currPage"
                                :length="totalPage"
                                :total-visible="7"
                                circle
                                @input="initialize"
                            ></v-pagination>
                        </div>
                    </v-card-text>
                </v-card>
            </v-tab-item>

            <!-- 已驳回 -->
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
                            :items="desserts"
                            hide-default-footer
                            class="elevation-1 body"
                            :search="searchInput"
                            :page.sync="this.filterForm.currPage"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-xinxi"
                                            @click="
                                                timeTable(item.volunteerCheckId)
                                            "
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>工时信息</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-shanchu"
                                            @click="adminDelete(item)"
                                            v-if="rollId == '1'"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>删除</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                        <div class="text-center">
                            <v-pagination
                                v-model="filterForm.currPage"
                                :length="totalPage"
                                :total-visible="7"
                                circle
                                @input="initialize"
                            ></v-pagination>
                        </div>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>

        <!-- 删除工时表对话框 -->
        <v-dialog v-model="showDeleteDialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline"> 确定删除工时表 </v-card-title>
                <v-card-text>删除此工时表将会删除所有相关信息！</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="showDeleteDialog = false"
                    >
                        取消
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="adminDeleteTimetable()"
                    >
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- 确认工时表对话框 -->
        <v-dialog v-model="showConfirmDialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline"> 确定工时表 </v-card-title>
                <v-card-text>确认所有相关信息吗？</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="showConfirmDialog = false"
                    >
                        取消
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="adminConfirmTimetable()"
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
    allKindsTable,
    adminDeleteTimetable
} from '../../api/admin/volunteerTime/timetableInfo';
import {
    rejectTimetable,
    passTimetable
} from '../../api/admin/volunteerTime/approveTime';
import { Form } from 'element-ui';
export default {
    data() {
        return {
            searchInput: '',
            headers: [
                { text: '活动ID', value: 'activityId', sortable: false },
                { text: '活动名称', value: 'activityName', sortable: false },
                {
                    text: '工时表ID',
                    value: 'volunteerCheckId',
                    sortable: false
                },
                { text: '活动时间', value: 'activityDate', sortable: false },
                { text: '创建者', value: 'crater', sortable: false },
                { text: '届别', value: 'level', sortable: false },
                {
                    text: '服务队',
                    value: 'organizationName',
                    sortable: false
                },

                {
                    text: '工时表状态',
                    value: 'volunteerStatusName',
                    sortable: false
                }
            ],
            desserts: [],
            examined: [],
            authentication: [],
            reject: {
                volunteerCheckId: 0,
                rejectReason: ''
            },
            filterForm: {
                organizationName: null,
                crater: null,
                activityDate: null,
                activityName: null,
                volunteerCheckId: null,
                currPage: 1,
                status: 3,
                activityId: null
            },
            statusList: [
                {
                    status: 3,
                    text: '待审核',
                    icon: 'iconfont vo-daibandengdaishenhe'
                },
                { status: 1, text: '已通过', icon: 'iconfont vo-yishenhe' },
                { status: 2, text: '已驳回', icon: 'iconfont vo-bohui' }
            ],
            totalPage: 2,
            dialog: false,
            input: '',

            //负责人id
            rollId: '',
            //是否显示删除框
            showDeleteDialog: false,
            //是否确认工时表
            showConfirmDialog: false,
            //删除的工时表ID
            deleteId: 0,
            //确认的工时表ID
            confirmId: -1,
            showFilterDialog: false
        };
    },
    created() {
        this.initialize();
        this.rollId = localStorage.getItem('rollId');
    },
    methods: {
        //测试搜索
        log() {
            console.log('请看');
            console.log(this.filterForm);

            allKindsTable(this.filterForm).then(res => {
                this.desserts = res.data.list;
                this.totalPage = res.data.totalPage;
                this.filterForm.currPage = 1;
                console.log('111');
                console.log(this.desserts);
                console.log(this.totalPage);
            });
        },
        statuChange(status) {
            this.filterForm.currPage = 1;
            this.filterForm.status = status;
            console.log(status);
            this.initialize();
        },

        initialize() {
            allKindsTable(this.filterForm).then(res => {
                this.desserts = res.data.list;
                this.totalPage = res.data.totalPage;
                console.log('111');
                console.log(this.desserts);
            });
        },
        timeTable(id) {
            this.$router.push({ name: 'volunteerInfo', params: { id: id } });
        },
        //驳回
        async rejectTimetable() {
            if (this.input == '') {
                this.$notify.error({
                    title: '请输入驳回原因'
                });
                return;
            }
            await rejectTimetable({
                volunteerCheckId: this.reject.volunteerCheckId,
                rejectReason: this.input
            })
                .then(res => {
                    this.$notify({
                        title: '已驳回',
                        message: res.msg,
                        type: 'success'
                    });
                })
                .catch(err => {
                    this.$notify.error({
                        title: '驳回失败',
                        message: err.msg
                    });
                });
            setTimeout(() => {
                this.initialize();
            }, 300);
            this.dialog = false;
        },

        passTimetable(item) {
            this.confirmId = item.volunteerCheckId;
            this.showConfirmDialog = true;
        },
        adminDelete(item) {
            this.deleteId = item.volunteerCheckId;
            this.showDeleteDialog = true;
        },
        //认证
        async adminConfirmTimetable() {
            this.showConfirmDialog = false;
            console.log(this.confirmId);
            console.log('sad');
            await passTimetable({ volunteerCheckId: this.confirmId })
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
                this.initialize();
            }, 300);
        },
        async adminDeleteTimetable() {
            this.showDeleteDialog = false;
            let data = new FormData();
            data.append('volunteerCheckId', this.deleteId);
            await adminDeleteTimetable(data).then(res => {
                if (res.code == 0) {
                    this.$notify.success({
                        title: '删除成功'
                    });
                    this.initialize();
                } else {
                    this.$notify.error({
                        title: '删除失败'
                    });
                }
            });
        }
    }
};
</script>
<style scoped>
.body {
    margin: 0 0 20px 2px;
    padding: 5px 15px 5px 15px;
}
.d-flex {
    margin-top: 15px;
}
</style>
