<template>
    <div>
        <!-- 
            disable-pagination:完全禁止分页
            hide-default-footer:默认隐藏页脚
         -->
        <v-data-table
            :headers="headers"
            :items="reportList"
            :search="filterForm.keywords"
            class="elevation-1 body"
            disable-pagination
            hide-default-footer
        >
            <!-- 主体 -->
            <template v-slot:top>
                <v-toolbar flat>
                    <!-- 标题 -->
                    <v-toolbar-title>Audit Message</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>

                    <!-- 院级操作 -->
                    <v-col cols="3" style="padding-top: 35px">
                        <v-select
                            v-model="filterForm.statusId"
                            :items="operaList"
                            label="操作类型"
                            item-text="opera"
                            item-value="id"
                            @change="
                                filterForm.currentPage = 1;
                                getReportList();
                            "
                            dense
                        ></v-select>
                    </v-col>

                    <!-- 搜索本页 -->
                    <v-col cols="3" sm="2">
                        <v-text-field
                            v-model="filterForm.keywords"
                            append-icon="mdi-magnify"
                            label="筛选信息"
                            single-line
                            hide-details
                            @keyup.enter="getReportList()"
                        ></v-text-field>
                    </v-col>

                    <!-- 校级消息 -->
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        @click="$router.push('/credit_message')"
                        v-if="isShowMessage"
                        >消息
                    </v-btn>
                </v-toolbar>
            </template>

            <!-- 操作 -->
            <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            class="iconfont vo-xinxi"
                            @click="getReportInfo(item)"
                            v-bind="attrs"
                            v-on="on"
                        >
                        </v-icon>
                    </template>
                    <span>审核</span>
                </v-tooltip>
            </template>
        </v-data-table>

        <!-- 举报信息详情 -->
        <v-bottom-sheet v-model="showMenu" inset>
            <v-sheet
                height="650px"
                width="1350px"
                style="padding: 20px 10px 0 10px"
            >
                <div class="my-3">
                    <v-simple-table height="550" dense>
                        <template v-slot:default>
                            <tbody>
                                <tr>
                                    <td>活动名称</td>
                                    <td>{{ reportTable.activityName }}</td>
                                </tr>
                                <tr>
                                    <td>被举报人姓名</td>
                                    <td>
                                        <v-text-field
                                            v-model="
                                                reportedPersonInfo.rePersonName
                                            "
                                            label="姓名"
                                            clearable
                                        ></v-text-field>
                                    </td>
                                </tr>
                                <tr>
                                    <td>被举报人学号</td>
                                    <td>
                                        <v-text-field
                                            v-model="
                                                reportedPersonInfo.reportedPersonNum
                                            "
                                            label="学号"
                                            clearable
                                        ></v-text-field>
                                    </td>
                                </tr>
                                <tr>
                                    <td>举报原因</td>
                                    <td>{{ reportTable.reportReason }}</td>
                                </tr>
                                <tr>
                                    <td>违规行为时间</td>
                                    <td>
                                        {{ reportTable.reportedtime }}
                                    </td>
                                </tr>

                                <tr v-if="reportTable.video != null">
                                    <td>举报凭证</td>
                                    <td>
                                        <v-row>
                                            <v-col
                                                v-for="(item,
                                                i) in reportTable.image"
                                                :key="i"
                                                class="d-flex child-flex"
                                                cols="3"
                                            >
                                                <v-img
                                                    :src="`${item.imagePath}`"
                                                    lazy-src="item.imagePath"
                                                    max-width="200"
                                                    max-height="130"
                                                    aspect-ratio="1"
                                                    class="grey lighten-2"
                                                    style="cursor:pointer"
                                                    @click="clickImg(item)"
                                                >
                                                    <template
                                                        v-slot:placeholder
                                                    >
                                                        <v-row
                                                            class="fill-height ma-0"
                                                            align="center"
                                                            justify="center"
                                                        >
                                                            <v-progress-circular
                                                                indeterminate
                                                                color="grey lighten-5"
                                                            ></v-progress-circular>
                                                        </v-row>
                                                    </template>
                                                </v-img>
                                            </v-col>
                                        </v-row>
                                    </td>
                                </tr>
                                <tr>
                                    <td>发起举报时间</td>
                                    <td>{{ reportTable.createTime }}</td>
                                </tr>

                                <tr>
                                    <td>审核状态</td>
                                    <td>{{ reportTable.statusName }}</td>
                                </tr>
                                <tr>
                                    <td>审核意见</td>
                                    <td>
                                        <v-text-field
                                            v-model="
                                                reportedPersonInfo.rejectReason
                                            "
                                            label="驳回时填写"
                                            clearable
                                        ></v-text-field>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>

                <div class="my-3" style="margin-left:550px">
                    <v-row>
                        <div align="center" justify="center">
                            <v-btn
                                color="primary"
                                text
                                @click="proveReport"
                                v-if="statusId != 5"
                                >通过</v-btn
                            >
                            <v-btn
                                color="error"
                                text
                                @click="rejectReport"
                                v-if="statusId != 5"
                                >驳回</v-btn
                            >
                            <v-btn
                                color="warning"
                                text
                                @click="showMenu = false"
                                v-if="statusId != 5"
                                >取消</v-btn
                            >
                            <v-btn
                                text
                                @click="deleteReport"
                                v-if="statusId == 5"
                                >撤回</v-btn
                            >
                        </div>
                    </v-row>
                </div>
            </v-sheet>
        </v-bottom-sheet>

        <v-dialog v-model="dialog" width="80vw">
            <v-card width="80vw">
                <v-img
                    :src="hugeImgSrc"
                    :lazy-src="hugeImgSrc"
                    max-height="800px"
                    aspect-ratio="1"
                    class="grey lighten-2"
                >
                    <template v-slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                            ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        确认
                    </v-btn>
                </v-card-actions> </v-card
            >``
        </v-dialog>

        <!-- 分页 -->
        <div class="text-center">
            <v-pagination
                v-model="filterForm.currentPage"
                :length="reportListTotalpage"
                :total-visible="7"
                circle
                @input="getReportList()"
            ></v-pagination>
        </div>
    </div>
</template>

<script>
import {
    getReportList,
    getReportInfo,
    proveReport,
    rejectReport,
    deleteReport,
    queryTag
} from '../../api/admin/report/reportProve';
export default {
    data() {
        return {
            //表头
            headers: [
                {
                    text: '活动名称',
                    align: 'start',
                    sortable: false,
                    value: 'activityName'
                },
                {
                    text: '被举报人姓名',
                    value: 'reportedPersonName',
                    sortable: false
                },
                {
                    text: '被举报人学号',
                    value: 'reportedPersonNum',
                    sortable: false
                },
                {
                    text: '举报时间',
                    value: 'createdTime',
                    sortable: false
                },

                { text: '状态', value: 'status', sortable: false },
                { text: '操作', value: 'actions', sortable: false }
            ],
            //举报信息
            reportList: [],

            //列表页数
            reportListTotalpage: 0,
            //列表接口参数
            filterForm: {
                statusId: 0,
                //  1 院级负责人待审核(未审核)
                //  2 总队负责人待审核
                //  3 院级负责人审核不通过(举报失败)
                //  4 总队负责人审核不通过(举报失败)
                //  5 审核通过（举报成功）
                currentPage: 1,
                keywords: '',
                isPage: 0
            },
            //院级操作列表
            operaList: [
                // { id: 1, opera: '院级负责人待审核' },
                // { id: 2, opera: '总队负责人待审核' },
                // { id: 5, opera: '审核通过' },
                // { id: 3, opera: '院级负责人审核不通过' },
                // { id: 4, opera: '总队负责人审核不通过' },
                { id: 0, opera: '待审核' },
                { id: 1, opera: '已驳回' },
                { id: 2, opera: '已通过' }
            ],
            showMenu: false,
            //举报详情表单，
            reportTable: {
                image: [],
                video: [],
                reportedtime: '',
                activityName: '',
                reportReason: '',
                statusName: '',
                createTime: ''
            },
            // async getReportInfo 返回的数据，举报最后通过时，需要传，
            //3、
            detailInfo: {
                id: '',
                detailInfoId: '',
                reportedPersonNum: '',
                activityStartTime: '',
                toReduceLevels: 0,
                currentCreditLevel: 0,
                timesZero: 0
            },
            //提交的被举报人的信息表
            reportedPersonInfo: {
                rePersonName: null,
                reportedPersonNum: null,
                informId: 0,
                rejectReason: '',
                statusId: ''
            },
            // 是否显示图片大图
            dialog: false,
            hugeImgSrc: '',
            // 详情表中的id
            detailId: null,
            isShowMessage: true
        };
    },
    created() {
        // 获取数据
        this.getReportList();
        // 判断消息界面是否显示
        queryTag().then(res => {
            // console.log('%%%%%',res);
            if (res.data === 1) {
                this.isShowMessage = false;
            }
        });
    },
    methods: {
        //获取举报列表
        async getReportList() {
            this.listLoading = true;
            await getReportList(this.filterForm).then(res => {
                if (res.code == 0) {
                    this.reportList = res.data.list;
                    this.reportListTotalpage = res.data.totalPage;
                    this.listLoading = false;
                    console.log('res', res);
                }
            });
        },

        // 获取详情
        async getReportInfo(item) {
            this.detailId = null;
            this.showMenu = true;
            console.log(item);
            // 获取详情表
            const detailInfo = await getReportInfo({
                id: item.id,
                statusId: item.statusId
            });
            // detailInfo: {
            //     id: '',
            //     detailInfoId: '',
            //     reportedPersonNum: '',
            //     activityStartTime: '',
            //     toReduceLevels: 0,
            //     currentCreditLevel: 0,
            //     timesZero: 0
            // },

            this.detailInfo.id = detailInfo.data.id;
            this.detailInfo.detailInfoId = detailInfo.data.detailInfoId;
            this.detailInfo.reportedPersonNum = detailInfo.data.reportedPersonNum;
            this.detailInfo.activityStartTime = detailInfo.data.activityStartTime;
            this.detailInfo.toReduceLevels = detailInfo.data.toReduceLevels;
            this.detailInfo.currentCreditLevel = detailInfo.data.currentCreditLevel;
            this.detailInfo.timesZero = detailInfo.data.timesZero;


            // 每次赋值之前，将凭证置空，用来判断是否渲染举报凭证这个东西
            this.reportTable.video = [];
            this.reportTable.image = [];
            // 详情表信息(详情表中有简表中的信息)
            this.reportTable.reportedtime =
                detailInfo.data.activityStartTime +
                ' — ' +
                detailInfo.data.activityEndTime;
            this.reportTable.activityName = detailInfo.data.activityName;
            this.reportTable.reportReason = detailInfo.data.reportedReason;
            this.reportTable.createTime = detailInfo.data.createdTime;
            // 图文
            this.reportTable.image = detailInfo.data.imageList;
            this.reportTable.video = detailInfo.data.videoList;

            // 简表信息
            this.reportTable.statusName = item.status;
            this.reportedPersonInfo.rePersonName = item.reportedPersonName;
            this.reportedPersonInfo.reportedPersonNum = item.reportedPersonNum;
            this.reportedPersonInfo.informId = item.reportId;
            this.reportedPersonInfo.statusId = item.statusId;
            this.reportedPersonInfo.rejectReason = detailInfo.data.rejectReason;

            // 存下事件id
            this.detailId = item.id;
        },

        // 通过举报
        async proveReport() {
            //2、
            this.detailInfo.reportedPersonNum = this.reportedPersonInfo.reportedPersonNum;
            await proveReport(this.detailInfo).then(res => {
                if (res.code == 0) {
                    this.$notify.success({
                        title: '通过成功'
                    });
                    this.reportList = [];
                    this.getReportList();
                    this.showMenu = false;
                } else {
                    this.$notify.error({
                        title: res.msg
                    });
                }
            });
        },
        // 驳回失败
        async rejectReport() {
            await rejectReport({
                id: this.detailId,
                rejectReason: this.reportedPersonInfo.rejectReason ==null ? "" :this.reportedPersonInfo.rejectReason
            }).then(res => {
    
                if (res.code == 0) {
                    this.$notify.success({
                        title: '驳回成功'
                    });
                    this.reportList = [];
                    this.getReportList();
                    this.showMenu = false;
                } else {
                    this.$notify.error({
                        title: res.msg
                    });
                }
                this.reportedPersonInfo.rejectReason= '';
            });
        },

       async deleteReport() {
            await deleteReport({
                id: this.detailId,
                //4、
                stuNum: this.reportedPersonInfo.reportedPersonNum
            }).then(res => {
                if (res.code == 0) {
                    this.$notify.success({
                        title: '撤回成功'
                    });
                    this.reportList = [];
                    this.getReportList();
                    this.showMenu = false;
                } else {
                    this.$notify.error({
                        title: '撤回失败'
                    });
                }
            });
        },

        clickImg(src) {
            console.log(src);
            this.hugeImgSrc = src.imagePath;
            this.dialog = true;
        }
    },
    computed: {
        statusId() {
            return this.reportedPersonInfo.statusId;
        }
    }
};
</script>

<style>
.body {
    margin: 0 0 20px 2px;
    padding: 5px 15px 5px 15px;
}
.d-flex {
    margin-top: 30px;
}
</style>
