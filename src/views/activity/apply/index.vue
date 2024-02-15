<template>
    <v-card>
        <v-toolbar flat>
            <!-- <v-toolbar-title>User Profile</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider> -->
            <v-col class="d-flex" cols="2" style="margin-top: 30px">
                <v-select
                    v-model="getActivityPlanningForm.category"
                    :items="activityCategoryList"
                    label="常规分类"
                    item-text="activityCategoryName"
                    item-value="activityCategoryId"
                    dense
                    @change="initialize"
                ></v-select>
            </v-col>
            <v-col class="d-flex" cols="2" style="margin-top: 30px">
                <v-select
                    v-model="getActivityKindPlanningForm.characterCategory"
                    :items="activityKindList"
                    label="活动性质分类"
                    item-text="characterName"
                    item-value="characterId"
                    dense
                    @change="initialize"
                ></v-select>
            </v-col>
            <v-spacer> </v-spacer>

            <v-col cols="2" style="padding-top: 35px">
                <v-text-field
                    label="活动ID"
                    hide-details="auto"
                    v-model="getActivityPlanningForm.activityId"
                    @change="initialize()"
                ></v-text-field>
            </v-col>
            <v-col cols="2" style="padding-top: 35px">
                <v-text-field
                    label="活动名"
                    hide-details="auto"
                    v-model="getActivityPlanningForm.activityName"
                    @change="initialize()"
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
            <!-- 搜索筛选框 -->
            <v-dialog v-model="showFilterDialog" persistent max-width="500px">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col class="d-flex" cols="12">
                                <div class="block">
                                    <el-date-picker
                                        v-model="rangeTime"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        format="yyyy - MM - dd"
                                        value-format="yyyy-MM-dd"
                                    >
                                    </el-date-picker>
                                </div>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field
                                    label="申请人"
                                    hide-details="auto"
                                    v-model="getActivityPlanningForm.crater"
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
                            @click="(showFilterDialog = false) & initialize()"
                        >
                            确定
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-menu rounded>
                <template v-slot:activator="{ attrs, on }">
                    <v-btn
                        color="deep-purple accent-4"
                        class="white--text ma-5"
                        v-bind="attrs"
                        v-on="on"
                    >
                        申请
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        link
                        @click="$router.push({ path: '/askFor' })"
                    >
                        <v-list-item-title>新活动</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        link
                        @click="$router.push({ path: '/drafts' })"
                    >
                        <v-list-item-title>草稿箱</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
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
                            :headers="headers"
                            :items="desserts"
                            hide-default-footer
                            class="elevation-1 body"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-shengchenggongdan"
                                            @click="makeTimeTable(item)"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>生成工时表</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-biao"
                                            @click="getTimeTable(item)"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>工时表详情</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                        <div class="text-center">
                            <v-pagination
                                v-if="currpage_kind === 1"
                                v-model="getActivityPlanningForm.currPage"
                                :length="totalPage"
                                :total-visible="7"
                                circle
                                @input="initialize"
                            ></v-pagination>
                            <v-pagination
                                v-else
                                v-model="getActivityKindPlanningForm.currPage"
                                :length="totalPage"
                                :total-visible="7"
                                circle
                                @input="initialize_kind"
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
                            :items="desserts"
                            hide-default-footer
                            class="elevation-1 body"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-shengchenggongdan"
                                            @click="makeTimeTable(item)"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>生成工时表</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-biao"
                                            @click="getTimeTable(item)"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>工时表详情</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                        <div class="text-center">
                            <v-pagination
                                v-if="currpage_kind === 1"
                                v-model="getActivityPlanningForm.currPage"
                                :length="totalPage"
                                :total-visible="7"
                                circle
                                @input="initialize"
                            ></v-pagination>
                            <v-pagination
                                v-else
                                v-model="getActivityKindPlanningForm.currPage"
                                :length="totalPage"
                                :total-visible="7"
                                circle
                                @input="initialize_kind"
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
                            :items="desserts"
                            hide-default-footer
                            class="elevation-1 body"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            small
                                            class="iconfont vo-bohuiyuanyinguanli"
                                            @click="getActivityReason(item)"
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
                                            class="iconfont vo-xiugai"
                                            @click="editActivityPlanning(item)"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        </v-icon>
                                    </template>
                                    <span>修改活动</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                        <div class="text-center">
                            <v-pagination
                                v-if="currpage_kind === 1"
                                v-model="getActivityPlanningForm.currPage"
                                :length="totalPage"
                                :total-visible="7"
                                circle
                                @input="initialize"
                            ></v-pagination>
                            <v-pagination
                                v-else
                                v-model="getActivityKindPlanningForm.currPage"
                                :length="totalPage"
                                :total-visible="7"
                                circle
                                @input="initialize_kind"
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
import { getActivityReason } from '../../../api/allVolunteer/leader';
import { getActivityPlanningList } from '../../../api/allVolunteer/public';
import { getActivityKindList } from '../../../api/admin/activityPlanning/activityInfo';
export default {
    data() {
        return {
            headers: [
                { text: '活动ID', value: 'activityId', sortable: false },
                { text: '活动名称', value: 'activityName', sortable: false },
                {
                    text: '开始时间',
                    value: 'activityStartTime',
                    sortable: false
                },
                { text: '结束时间', value: 'activityEndTime', sortable: false },
                { text: '活动类别', value: 'categoryName', sortable: false },
                {
                    text: '活动性质类别',
                    value: 'characterName',
                    sortable: false
                },
                {
                    text: '志愿组织',
                    value: 'organizationName',
                    sortable: false
                },
                { text: '届别', value: 'level', sortable: false },
                { text: '申请者', value: 'crater', sortable: false },
                { text: '通过人', value: 'authenticator', sortable: false },
                { text: '申请时间', value: 'createTime', sortable: false }
            ],
            desserts: [],
            // 判断分页
            currpage_kind: '',
            statusList: [
                {
                    status: 3,
                    text: '审核中',
                    icon: 'iconfont vo-daibandengdaishenhe'
                },
                { status: 1, text: '已通过', icon: 'iconfont vo-yishenhe' },
                { status: 2, text: '被驳回', icon: 'iconfont vo-bohui' }
            ],
            totalPage: 0,
            dialog: false,
            rangeTime: ['', ''],
            getActivityPlanningForm: {
                activityId: null,
                activityName: null,
                activityStartTime: null,
                activityEndTime: null,
                crater: null,
                currPage: 1,
                status: 3, // 活动审核状态:1-已通过  2-被驳回  3-审核中
                category: 2,
                characterCategory: 2
            },
            //活动性质筛选表的框
            showFilterDialog: false,
            // 活动性质搜索框
            getActivityKindPlanningForm: {
                activityId: null,
                activityName: null,
                activityStartTime: null,
                activityEndTime: null,
                crater: null,
                currPage: 1,
                status: 3, // 活动审核状态:1-已通过  2-被驳回  3-审核中
                category: 2,
                characterCategory: 2
            },
            //查看驳回原因
            showRejectReasonDialog: false,
            //驳回原因
            rejectReason: {},
            //常规活动类型
            activityCategoryList: [
                { activityCategoryId: 2, activityCategoryName: '校级活动' },
                { activityCategoryId: 6, activityCategoryName: '长期活动' },
                { activityCategoryId: 3, activityCategoryName: '短期活动' },
                { activityCategoryId: 4, activityCategoryName: '班级活动' },
                { activityCategoryId: 5, activityCategoryName: '假期个人活动' },
                { activityCategoryId: 1, activityCategoryName: '其他活动' }
            ],
            // 活动性质分类
            activityKindList: [
                { characterId: 1, characterName: '社会公益服务类' },
                { characterId: 2, characterName: '成长关爱服务类' },
                { characterId: 3, characterName: '环境保护服务类' },
                { characterId: 4, characterName: '乡村振兴服务类' },
                { characterId: 5, characterName: '校园建设服务类' },
                { characterId: 6, characterName: '其他领域服务类' }
            ],
            rollId: 0
        };
    },
    created() {
        this.rollId = localStorage.getItem('rollId');
        if (this.rollId == 1 || this.rollId == 2 || this.rollId == 3) {
            this.getActivityPlanningForm.status = 1;
            this.statusList = [
                { status: 1, text: '已通过', icon: 'iconfont vo-yishenhe' }
            ];
            this.headers = [
                ...this.headers,
                { text: 'Actions', value: 'actions', sortable: false }
            ];
        }
        this.initialize();
    },
    methods: {
        statuChange(status) {
            this.getActivityPlanningForm.currPage = 1;
            this.getActivityPlanningForm.status = status;
            this.getActivityKindPlanningForm.currPage = 1;
            this.getActivityKindPlanningForm.status = status;
            this.initialize_kind();
            this.initialize();
        },

        // 提交的活动列表
        async initialize() {
            this.getActivityPlanningForm.characterCategory = this.getActivityKindPlanningForm.characterCategory;
            await getActivityPlanningList({
                ...this.getActivityPlanningForm,
                activityStartTime: this.rangeTime ? this.rangeTime[0] : '',
                activityEndTime: this.rangeTime ? this.rangeTime[1] : ''
            })
                .then(res => {
                    this.desserts = res.data.list;
                    console.log(res.data);
                    this.totalPage = res.data.totalPage;
                    this.currpage_kind = 1;
                })
                .catch(err => {
                    this.$message.error('网络错误！');
                });
            console.log(this.headers);
            this.headers[4].text = '活动类别';
            this.headers[4].value = 'categoryName';
            this.headers[5].text = '';
            this.headers[5].value = '';
        },
        // 活动性质列表
        async initialize_kind() {
            this.getActivityKindPlanningForm.category = this.getActivityPlanningForm.category;
            console.log(this.getActivityKindPlanningForm);
            await getActivityKindList(this.getActivityKindPlanningForm).then(
                res => {
                    this.desserts = res.data.list;
                    console.log(res.data);
                    this.totalPage = res.data.totalPage;
                    this.currpage_kind = 2;
                }
            );
            this.headers[4].text = '';
            this.headers[4].value = '';
            this.headers[5].text = '活动性质类别';
            this.headers[5].value = 'characterName';
        },
        // 生成工时表
        makeTimeTable(item) {
            // console.log(item.activityId);
            this.$router.push({
                name: 'random',
                params: { id: item.activityId }
            });
        },
        // 工时表详情
        getTimeTable(item) {
            // console.log(item.activityId);
            this.$router.push({
                name: 'timetable',
                params: { id: item.activityId }
            });
        },
        // 跳转到申请活动
        askForActivity() {
            this.$router.push({ path: '/askFor' });
        },
        //修改活动策划
        async editActivityPlanning(item) {
            // console.log(item.activityId)
            this.$router.push({
                path: '/askFor',
                query: { activityId: item.activityId }
            });
        },
        //获取驳回原因
        async getActivityReason(item) {
            await getActivityReason({ activityId: item.activityId }).then(
                res => {
                    console.log(res);
                    if (res.code == 0) {
                        this.rejectReason = res.data;
                        this.showRejectReasonDialog = true;
                    }
                }
            );
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
.d-flex {
    margin-top: 50px;
}
</style>
