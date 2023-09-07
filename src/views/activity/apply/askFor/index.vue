<template>
    <div>
        <!-- 刚进入时候的弹框 -->
        <v-dialog v-model="dialog" persistent max-width="500" hide-overlay>
            <v-card style="padding: 50px 30px 20px 30px">
                <span>活动基本信息</span>
                <v-col class="d-flex" sm="12">
                    <v-spacer></v-spacer>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="baseTableAPI.activityName"
                        :rules="[rules.required]"
                        label="活动名称"
                    ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12">
                    <v-select
                        v-model="baseTableAPI.activityCategoryId"
                        :items="activityCategoryList"
                        label="请选择常规活动类型"
                        item-text="activityCategoryName"
                        item-value="activityCategoryId"
                        dense
                    ></v-select>
                </v-col>
                <v-col class="d-flex" cols="12">
                    <v-select
                        v-model="baseTableAPI.characterCategory"
                        :items="activityKindList"
                        label="请选择活动性质类型"
                        item-text="characterName"
                        item-value="id"
                        dense
                    ></v-select>
                </v-col>
                <v-col class="d-flex" cols="12">
                    <v-select
                        v-model="baseTableAPI.level"
                        :items="levelList"
                        label="请选择届别"
                        item-text="level"
                        item-value="level"
                        dense
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="baseTableAPI.activityStartTime"
                        :rules="[rules.required, rules.dataRule]"
                        label="开始时间"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="baseTableAPI.activityEndTime"
                        :rules="[rules.required, rules.dateNum, rules.dataRule]"
                        label="结束时间"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="baseTableAPI.dayTime"
                        :rules="[rules.required, rules.dayTimeRule]"
                        label="志愿活动具体时间"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="baseTableAPI.minParticipants"
                        :rules="[rules.required, rules.counter]"
                        label="活动限定的最少人数"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="baseTableAPI.maxParticipants"
                        :rules="[
                            rules.required,
                            rules.volunteerNum,
                            rules.counter
                        ]"
                        label="活动限定的最多人数"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="baseTableAPI.activityAddress"
                        label="活动地点"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="baseTableAPI.remarks"
                        label="备注信息"
                    ></v-text-field>
                </v-col>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="getsteps">
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-stepper v-model="elIndex" v-show="!dialog">
            <!-- 步骤条 -->
            <v-stepper-header
                style="padding: 0 5%;height: 100px;font-size: 13px"
            >
                <v-btn style="margin-top: 30px" @click="editbase"
                    >修改基本信息</v-btn
                >
                <v-stepper-step
                    v-for="(val, index) in steps"
                    :key="index"
                    :complete="elIndex > val.id"
                    :step="val.id"
                    style="width: 13%;height:100px"
                >
                    {{ val.step }}
                </v-stepper-step>
            </v-stepper-header>
            <!-- 表单 -->
            <v-card class="mb-12" min-height="680px">
                <div v-bind:is="component" :value="passAPI" @next="next"></div>
            </v-card>
            <v-stepper-items>
                <!-- 完成 -->
                <v-stepper-content step="8">
                    <v-btn color="primary" @click="complatePush">
                        提交
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>
<script>
// 引入组件
import plan from './compnents/plan.vue';
import application from './compnents/application.vue';
import areaAsk from './compnents/area.vue';
import baseAsk from './compnents/base.vue';
import classAsk from './compnents/classAsk.vue';
import personal from './compnents/personal.vue';
import registration from './compnents/registration.vue';

import {
    getActivityDraft,
    complatePush,
    getActivityInfoTable
} from '../../../../api/allVolunteer/public';
import {
    getActivityCategoryList,
    getAllLevel,
    getActivityKindList
} from '../../../../api/common';
import { getActivityInf_ } from '../../../../api/admin/recruit';
export default {
    components: {
        plan,
        application,
        registration,
        areaAsk,
        baseAsk,
        classAsk,
        personal
    },
    data() {
        return {
            rules: {
                required: value => !!value || '禁止为空，请输入',
                dataRule: value =>
                    /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(
                        value
                    ) || '日期格式->0000-00-00',
                counter: value => /^\d*$/.test(value) || '仅输入数字',
                phoneRule: value =>
                    /^[1][3,4,5,7,8][0-9]{9}$/.test(value) ||
                    '输入正确的联系方式',
                money: value =>
                    /^\d*(?:\.\d{0,2})?$/.test(value) ||
                    '金额格式错误，最多两位小数',
                dateNum: value =>
                    this.checkDateNum(
                        this.baseTableAPI.activityStartTime,
                        value
                    ) || '开始时间应小于等于结束时间',
                dayTimeRule: value =>
                    /^(([0-2][0-3])|([0-1][0-9])):[0-5][0-9]-(([0-2][0-3])|([0-1][0-9])):[0-5][0-9]$/.test(
                        value
                    ) || '时间格式->00:00-00:00',
                volunteerNum: value =>
                    this.checkDateNum(
                        this.baseTableAPI.minParticipants,
                        value
                    ) || '限定最少人数应小于等于限定最多人数'
            },
            component: '',
            steps: [{ id: 1 }],
            baseTableAPI: {},
            passAPI: {},
            activityCategoryList: [],
            // 活动性质存放数组
            activityKindList: [],
            levelList: [],
            elIndex: 1,
            indexNum: 0,
            dialog: true
        };
    },
    created() {},
    mounted() {

        this.getActivityCategoryList();
        this.getActivityKindList();
        this.getAllLevel();
        if (this.$route.query.activityId) {
            this.getInfo();
            this.getActivityInf_();
        }

        // 禁用Tab键
        document.onkeydown = function() {
            let key = window.event.keyCode;
            if (key == 9) {
                window.event.preventDefault();
            }
        };
    },
    methods: {
        editpassAPI() {
            // 传递需要的数据
            this.passAPI.characterCategory = this.baseTableAPI.characterCategory;
            this.passAPI.activityName = this.baseTableAPI.activityName;
            this.passAPI.level = this.baseTableAPI.level;
            this.passAPI.activityStartTime = this.baseTableAPI.activityStartTime;
            this.passAPI.activityEndTime = this.baseTableAPI.activityEndTime;
            this.passAPI.activityAddress = this.baseTableAPI.activityAddress;
            this.passAPI.activityAddress = this.baseTableAPI.activityAddress;
            this.passAPI.activityId = this.baseTableAPI.activityId;
            this.passAPI.maxParticipants = this.baseTableAPI.maxParticipants;
            this.passAPI.minParticipants = this.baseTableAPI.minParticipants;
            this.passAPI.dayTime = this.baseTableAPI.dayTime;
        },
        editbase() {
            this.dialog = true;
        },
        checkDateNum(start, end) {
            return start <= end;
        },
        next() {
            this.indexNum++;
            if (this.steps[this.indexNum]) {
                this.elIndex = this.steps[this.indexNum].id;
                this.component = this.steps[this.indexNum].component;
                // console.log(this.elIndex)
            } else {
                this.$notify({
                    title: '最后一页了'
                });
            }
        },
        // 检测到带参访问的时候
        getInfo() {
            setTimeout(() => {
                this.dialog = false;
            }, 10);
            // 跳转时取到activityId
            var id = this.$route.query.activityId;
            // 用activityId去请求基本信息
            getActivityInfoTable({ activityId: id })
                .then(res => {
                    this.baseTableAPI = res.data;
                    this.baseTableAPI.activityId = res.data.activityId;
                    this.baseTableAPI.activityCategoryId = res.data.category;
                    console.log("------------",this.baseTableAPI);
                    this.steps = [];
                    for (
                        let i = 0;
                        i < res.data.tablesNeedToSubmit.length;
                        i++
                    ) {
                        switch (res.data.tablesNeedToSubmit[i]) {
                            case 1:
                                this.steps.push({
                                    id: 1,
                                    step: '活动策划书',
                                    component: 'plan'
                                });
                                break;
                            case 2:
                                this.steps.push({
                                    id: 2,
                                    step: '志愿服务活动申请表',
                                    component: 'application'
                                });
                                break;
                            case 3:
                                this.steps.push({
                                    id: 3,
                                    step: '班级活动申请表',
                                    component: 'classAsk'
                                });
                                break;
                            case 4:
                                this.steps.push({
                                    id: 4,
                                    step: '志愿服务长期项目登记表',
                                    component: 'registration'
                                });
                                break;
                            case 5:
                                this.steps.push({
                                    id: 5,
                                    step: '保卫处场地审批表',
                                    component: 'areaAsk'
                                });
                                break;
                            case 6:
                                this.steps.push({
                                    id: 6,
                                    step: '志愿者服务基地登记表',
                                    component: 'baseAsk'
                                });
                                break;
                            case 7:
                                this.steps.push({
                                    id: 7,
                                    step: '个人志愿活动申请表',
                                    component: 'personal'
                                });
                                break;
                        }
                    }
                    this.steps.push({ id: 8, step: '完成' });
                    this.elIndex = 1;
                    this.component = this.steps[0].component;
                    this.$notify({
                        title: '请填写对应表单',
                        type: 'success'
                    });
                    this.editpassAPI();
                })
                .catch(err => {
                    this.$notify.error({
                        title: '请求失败',
                        message: err.msg
                    });
                });
        },
        // 活动类列表
        async getActivityCategoryList() {
            await getActivityCategoryList().then(res => {
                this.activityCategoryList = res.data;
                this.activityCategoryList.shift();
            });
        },
        // 活动性质列表
        async getActivityKindList() {
            await getActivityKindList().then(res => {
                this.activityKindList = res.data;
                console.log(this.activityKindList);
            });
        },
        // 届别列表
        async getAllLevel() {
            await getAllLevel().then(res => {
                this.levelList = res.data;
            });
        },
        // 获取人数限制要求
        getActivityInf_() {
            setTimeout(() => {
                this.dialog = false;
            }, 10);
            // 跳转时取到activityId
            var id = this.$route.query.activityId;
            getActivityInf_({ activityId: id }).then(res => {
                this.baseTableAPI.maxParticipants = res.data.maxParticipants;
                this.baseTableAPI.minParticipants = res.data.minParticipants;
                // console.log(this.baseTableAPI)
            });
        },
        getsteps() {
            this.baseTableAPI.organizationId = this.$store.getters.originzationid;
            console.log(this.baseTableAPI);
            getActivityDraft(this.baseTableAPI)
                .then(res => {
                    this.baseTableAPI.activityId = res.data.activityId;
                    this.steps = [];
                    for (let i = 0; i < res.data.tables.length; i++) {
                        switch (res.data.tables[i]) {
                            case 1:
                                this.steps.push({
                                    id: 1,
                                    step: '活动策划书',
                                    component: 'plan'
                                });
                                break;
                            case 2:
                                this.steps.push({
                                    id: 2,
                                    step: '志愿服务活动申请表',
                                    component: 'application'
                                });
                                break;
                            case 3:
                                this.steps.push({
                                    id: 3,
                                    step: '班级活动申请表',
                                    component: 'classAsk'
                                });
                                break;
                            case 4:
                                this.steps.push({
                                    id: 4,
                                    step: '志愿服务长期项目登记表',
                                    component: 'registration'
                                });
                                break;
                            case 5:
                                this.steps.push({
                                    id: 5,
                                    step: '保卫处场地审批表',
                                    component: 'areaAsk'
                                });
                                break;
                            case 6:
                                this.steps.push({
                                    id: 6,
                                    step: '志愿者服务基地登记表',
                                    component: 'baseAsk'
                                });
                                break;
                            case 7:
                                this.steps.push({
                                    id: 7,
                                    step: '个人志愿活动申请表',
                                    component: 'personal'
                                });
                                break;
                        }
                    }
                    this.steps.push({ id: 8, step: '完成' });
                    this.elIndex = this.steps[this.indexNum].id;
                    this.component = this.steps[this.indexNum].component;
                    this.$notify({
                        title: '请填写对应表单',
                        type: 'success'
                    });
                    this.editpassAPI();
                    this.dialog = false;
                })
                .catch(err => {
                    this.$notify.error({
                        title: '请求失败',
                        message: err
                    });
                });
        },
        complatePush() {
            let form = new FormData();
            form.append('activityId', this.baseTableAPI.activityId);
            complatePush(form)
                .then(res => {
                    if (res.code == 0) {
                        this.$notify({
                            title: '申请成功',
                            message: res.msg,
                            type: 'success'
                        });
                        this.$router.push({ path: '/dashboard' });
                    } else {
                        this.$notify.error({
                            title: '申请失败',
                            message: res.msg
                        });
                    }
                })
                .catch(err => {
                    this.$notify.error({
                        title: '申请失败',
                        message: err.msg
                    });
                });
        }
    }
};
</script>
