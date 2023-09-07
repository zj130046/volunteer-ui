<template>
    <div>
        <!-- 刚进入时候的弹框 -->
        <v-dialog v-model="dialog" persistent max-width="500" hide-overlay>
            <v-card style="padding: 50px 30px 20px 30px">
                <span>活动招募信息</span>
                <v-col class="d-flex" sm="12">
                    <v-spacer></v-spacer>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="RecruitmentAPI.recruitStart"
                        :rules="[rules.required, rules.dateRules]"
                        placeholder="例日期:2021-08-15"
                        label="招募开始时间"
                    ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12">
                    <v-text-field
                        v-model="RecruitmentAPI.recruitEnd"
                        :rules="[
                            rules.required,
                            rules.dateNum,
                            rules.dateRules
                        ]"
                        placeholder="例日期:2021-08-15"
                        label="招募结束时间"
                    ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12">
                    <v-text-field
                        v-model="RecruitmentAPI.dayTime"
                        :rules="[rules.required, rules.dayTimeRule]"
                        label="活动具体时间"
                    ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12">
                    <v-text-field
                        v-model="RecruitmentAPI.peopleCount"
                        label="活动人数"
                    ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12">
                    <v-file-input
                        v-model="RecruitmentAPI.multipartFile"
                        hide-details="auto"
                        prepend-icon=""
                        label="群聊二维码"
                    ></v-file-input>
                </v-col>
                <v-col class="d-flex" cols="12">
                    <v-text-field
                        v-model="RecruitmentAPI.activityPlace"
                        :rules="[rules.required]"
                        label="活动地点"
                    ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12">
                    <v-text-field
                        v-model="RecruitmentAPI.note"
                        label="备注"
                    ></v-text-field>
                </v-col>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="getsteps">
                        确认申请
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import {
    getPassActivityInfo,
    uploadPassActivityForm
} from '../../../../api/admin/recruit';
import axios from 'axios';
export default {
    data() {
        return {
            rules: {
                required: value => !!value || '禁止为空，请输入',
                counter: value => /^\d*$/.test(value) || '仅输入数字',
                dateNum: value =>
                    this.checkDateNum(
                        this.RecruitmentAPI.recruitStart,
                        value
                    ) || '开始时间应小于等于结束时间',
                // volunteerNum: value =>
                //     this.checkDateNum(
                //         this.baseTableAPI.minParticipants,
                //         value
                //     ) || '限定最少人数应小于等于限定最多人数',
                dayTimeRule: value =>
                    /^(([0-2][0-3])|([0-1][0-9])):[0-5][0-9]-(([0-2][0-3])|([0-1][0-9])):[0-5][0-9]$/.test(
                        value
                    ) || '时间格式->00:00-00:00',
                dateRules: value =>
                    /^\d{4}\-\d{2}\-\d{2}$/.test(value) ||
                    '时间格式->yyyy-mm-dd'
            },
            // 招募活动的基本对象
            RecruitmentAPI: {},
            dialog: true
        };
    },
    created() {},
    mounted() {
        // if (this.$route.query.activityId) {
        //   this.getInfo()
        // }
    },
    methods: {
        //   检查时间或者人数大小
        checkDateNum(start, end) {
            return start <= end;
        },

        //   确认申请活动
        getsteps() {
            // 跳转时取到activityId
            this.RecruitmentAPI.activityId = parseInt(
                this.$route.query.activityId
            );
            this.RecruitmentAPI.organizationId = parseInt(
                localStorage.getItem('organizationId')
            );
            let formData = new FormData(); //  用FormData存放上传文件
            formData.append('file', this.RecruitmentAPI.multipartFile);
            formData.append('activityId', this.RecruitmentAPI.activityId);
            formData.append(
                'organizationId',
                this.RecruitmentAPI.organizationId
            );
            formData.append('recruitStart', this.RecruitmentAPI.recruitStart);
            formData.append('recruitEnd', this.RecruitmentAPI.recruitEnd);
            formData.append('dayTime', this.RecruitmentAPI.dayTime);
            formData.append('activityPlace', this.RecruitmentAPI.activityPlace);
            formData.append('note', this.RecruitmentAPI.note);
            formData.append('peopleCount', this.RecruitmentAPI.peopleCount);

            // 用activityId去请求基本信息
            uploadPassActivityForm(formData)
                .then(res => {
                    this.$message.success('申请成功');
                    this.dialog = false;
                    this.$router.push({ path: '/recruitment' });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
