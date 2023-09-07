<template>
    <div>
        <v-card class="mt-5">
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="6" sm="12" md="6">
                    <!-- 公告 -->
                    <v-card :loading="announcementLoading" class="mt-5">
                        <v-subheader>公告</v-subheader>
                        <v-card-title class="headline">
                            {{ announcement.title }}
                        </v-card-title>

                        <v-card-text
                            style="white-space: pre-wrap; letter-spacing: 1px"
                        >
                            {{ announcement.content }}
                        </v-card-text>
                    </v-card>
                    <!-- 待处理 -->
                    <v-card :loading="dateLoading" class="mt-5">
                        <v-list flat>
                            <v-subheader>待处理</v-subheader>
                            <v-list-item-group color="primary">
                                <v-list-item
                                    @click="$router.push('/event')"
                                    v-if="rollId != 2"
                                >
                                    <v-list-item-icon>
                                        待审核活动信息
                                    </v-list-item-icon>
                                    <v-list-item-content class="dealColor">
                                        <v-list-item-title>{{
                                            volunteerData.activityToPass
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    @click="$router.push('/authenation')"
                                    v-if="rollId == 3 || rollId == 1"
                                >
                                    <v-list-item-icon>
                                        待审核工时及总结
                                    </v-list-item-icon>
                                    <v-list-item-content class="dealColor">
                                        <v-list-item-title>{{
                                            volunteerData.timetableToReview
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    @click="$router.push('/authenation')"
                                    v-if="rollId == 2 || rollId == 1"
                                >
                                    <v-list-item-icon>
                                        待认证工时
                                    </v-list-item-icon>
                                    <v-list-item-content class="dealColor">
                                        <v-list-item-title>{{
                                            volunteerData.timetableToPass
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols="6" sm="12" md="6">
                    <v-card :loading="infoLoading">
                        <v-list flat>
                            <v-subheader>个人信息</v-subheader>
                            <v-list-item-group color="primary">
                                <v-list-item>
                                    <v-list-item-icon>
                                        组织名称
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{
                                            adminInfo.adminInStuVO
                                                .organizationName
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-icon> 职位 </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{
                                            adminInfo.adminInStuVO.rollName
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-icon> 学院 </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{
                                            adminInfo.collegeName
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-icon>
                                        政治面貌
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{
                                            adminInfo.politicalOutlookName
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-icon> 班级 </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{
                                            adminInfo.className
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-icon> 电话 </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{
                                            adminInfo.phone
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-icon> QQ </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{
                                            adminInfo.qqNum
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>

        <!-- 年度统计 -->
        <v-card class="mt-5" :loading="dateLoading">
            <v-subheader>年度统计</v-subheader>
            <v-row class="justify-center mb-6">
                <v-col
                    cols="3"
                    sm="12"
                    md="3"
                >
                    <v-card class="pa-5" tile outlined>
                        <span>志愿者人数</span>
                        <span class="volunteerData">{{
                            volunteerData.laststudentNum
                        }}</span>
                    </v-card>
                </v-col>
                <v-col
                    cols="3"
                    sm="12"
                    md="3"
                    @click="$router.push('/authenation')"
                >
                    <v-card class="pa-5" tile outlined>
                        <span>志愿者工时</span>
                        <span class="volunteerData">{{
                            volunteerData.lasttimeNum
                        }}</span>
                    </v-card>
                </v-col>
                <v-col cols="3" sm="12" md="3" @click="$router.push('/event')">
                    <v-card class="pa-5" tile outlined>
                        <span>志愿者活动数</span>
                        <span class="volunteerData">{{
                            volunteerData.lastactivityNum
                        }}</span>
                    </v-card>
                </v-col>
                <v-col
                    cols="3"
                    sm="12"
                    md="3"
                    @click="$router.push('/organization')"
                >
                    <v-card class="pa-5" tile outlined>
                        <span>注册率</span>
                        <span class="volunteerData">{{
                            volunteerData.loginRate
                        }}</span>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>

        <!-- 数据概览 -->
        <v-card class="mt-5" :loading="dateLoading">
            <v-subheader>数据概览</v-subheader>
            <v-row class="justify-center mb-6">
                <v-col
                    cols="3"
                    sm="12"
                    md="3"
                    @click="$router.push('/volunteer')"
                >
                    <v-card class="pa-5" tile outlined>
                        <span>志愿者人数</span>
                        <span class="volunteerData">{{
                            volunteerData.volunteerNum
                        }}</span>
                    </v-card>
                </v-col>
                <v-col
                    cols="3"
                    sm="12"
                    md="3"
                    @click="$router.push('/authenation')"
                >
                    <v-card class="pa-5" tile outlined>
                        <span>志愿者总工时</span>
                        <span class="volunteerData">{{
                            volunteerData.timeNum
                        }}</span>
                    </v-card>
                </v-col>
                <v-col cols="3" sm="12" md="3" @click="$router.push('/event')">
                    <v-card class="pa-5" tile outlined>
                        <span>志愿者活动总数</span>
                        <span class="volunteerData">{{
                            volunteerData.activityNum
                        }}</span>
                    </v-card>
                </v-col>
                <v-col
                    cols="3"
                    sm="12"
                    md="3"
                    @click="$router.push('/organization')"
                >
                    <v-card class="pa-5" tile outlined>
                        <span>志愿组织数</span>
                        <span class="volunteerData">{{
                            volunteerData.organizationNum
                        }}</span>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import {
    getStudentInfo,
    getVolunteerDate,
    getAnnouncement
} from '../../api/enterPage';
export default {
    data() {
        return {
            adminInfo: {
                adminInStuVO: {}
            },
            infoLoading: false,
            volunteerData: {},
            dateLoading: false,
            announcement: {
                title: '暂无公告',
                content: ''
            },
            announcementLoading: false,
            //管理员权限
            rollId: 0
        };
    },
    created() {
        this.getStudentInfo();
        this.getVolunteerDate();
        this.getAnnouncement();
        this.rollId = localStorage.rollId;
    },
    methods: {
        async getStudentInfo() {
            this.infoLoading = true;
            await getStudentInfo().then(res => {
                if (res.code == 0) {
                    this.adminInfo = res.data;
                    console.log(this.adminInfo);
                    this.infoLoading = false;
                }
            });
        },
        async getVolunteerDate() {
            this.dateLoading = true;
            await getVolunteerDate().then(res => {
                // console.log(res.data);
                if (res.code == 0) {
                    res.data.loginRate = (res.data.loginRate*100)+'%';
                    this.volunteerData = res.data;
                    this.dateLoading = false;
                }
            });
        },
        async getAnnouncement() {
            this.announcementLoading = true;
            await getAnnouncement().then(res => {
                // console.log(res)
                if (res.code == 0 && res.data.length != 0) {
                    this.announcement = res.data[0];
                }
                this.announcementLoading = false;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.v-list-item__title {
    text-align: right;
}
.dealColor {
    color: lightcoral;
    .v-list-item__title {
        font-size: 25px !important;
    }
}
.pa-5 {
    line-height: 30px;
    user-select: none;
}
.volunteerData {
    float: right;
    color: #1890ff;
    font-size: 30px;
}
</style>
