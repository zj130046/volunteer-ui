<template>
    <div class="body">
        <v-dialog
            transition="dialog-top-transition"
            max-width="800"
            v-model="dialog"
            persistent
            hide-overlay
        >
            <v-card flat class="middle">
                <v-col cols="8">
                    <v-text-field
                        v-model="certificationForm.randomString"
                        :rules="[rules.required, rules.counter]"
                        label="认证码"
                        counter
                        maxlength="6"
                        append-outer-icon="iconfont vo-chenggong"
                        @click:append-outer="submitCertification"
                    >
                    </v-text-field>
                </v-col>
            </v-card>
        </v-dialog>
        <v-card flat style="padding:50px 3% 0 3%;margin:0 4%;" v-show="!dialog">
            <v-container>
                <!-- 活动信息 -->
                <span>活动信息</span>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            v-model="activityInfo.activityId"
                            label="活动ID"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="activityInfo.activityName"
                            label="活动名称"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="activityInfo.authenticator"
                            label="活动负责人"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="activityInfo.activityStartTime"
                            label="开始时间"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="activityInfo.activityEndTime"
                            label="结束时间"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="activityInfo.categoryName"
                            label="类别"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="activityInfo.organizationName"
                            label="组织"
                            readonly
                        ></v-text-field>
                    </v-col>

                    <!-- 个人信息 -->
                    <span>个人信息</span>
                    <v-col cols="12">
                        <v-text-field
                            v-model="personInfo.studentName"
                            label="姓名"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="personInfo.studentNum"
                            label="学号"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <!-- 选择工时 -->
                    <span>选择工时</span>
                    <v-col class="d-flex" cols="12">
                        <v-select
                            v-model="volunteerTimeFrom.volunteerTime"
                            :items="activityInfo.volunteerTimes"
                            label="选择你的工时"
                            dense
                        ></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-row align="center">
                            <v-checkbox
                                v-model="enabled"
                                hide-details
                                class="shrink mr-2 mt-0"
                            ></v-checkbox>
                            <v-dialog v-model="dialog0" width="600px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="primary"
                                        text
                                        plain
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        我同意遵守 诚信守则
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">诚信守则</span>
                                    </v-card-title>
                                    <v-card-text>
                                        "诚信协议我承诺，诚信参与志愿服务活动,所选择工时数为本人此次活动真实的服务时长。我同意，公开我的志愿服务时长和活动记录等信息，以配合广大志愿者和学校对诚信志愿的监督与核查!"
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-btn color="orange" text @click="addActivity">
                    提交认证
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import { getActivityInfo, pushTime } from '../../../api/allVolunteer/public';
import { isNumber } from '../../../utils/validate';
export default {
    data() {
        return {
            certificationForm: {
                randomString: ''
            },
            volunteerTimeFrom: {
                randomString: '',
                volunteerTime: 0
            },
            activityInfo: {
                activityId: '',
                activityName: '',
                activityTime: '',
                activityAdmin: ''
            },
            personInfo: {},
            dialog: true,
            dialog0: false,
            rules: {
                required: value => !!value || '请输入6位验证码',
                counter: value =>
                    (value.length == 6 && isNumber(value)) || '输入6位数字'
            },
            enabled: false
        };
    },
    created() {
        this.personInfo.studentNum = localStorage.getItem('studentnum');
        this.personInfo.studentName = localStorage.getItem('name');
    },
    methods: {
        async submitCertification() {
            if (!isNumber(this.certificationForm.randomString)) {
                this.$notify({
                    title: '请输入正确的验证码！',
                    type: 'warning'
                });
                return;
            }
            if (this.certificationForm.randomString.length < 6) {
                this.$notify({
                    title: '请将活动验证码填写完整！',
                    type: 'warning'
                });
                return;
            }
            await getActivityInfo(this.certificationForm)
                .then(res => {
                    console.log(res);
                    if (res.code == 0) {
                        this.activityInfo = res.data;
                        this.$notify({
                            title: '认证成功',
                            type: 'success'
                        });
                        this.volunteerTimeFrom.randomString = this.certificationForm.randomString;
                        this.dialog = false;
                    } else if (res.code == 108) {
                        this.$notify.error({
                            message: res.msg
                        });
                        return;
                    } else {
                        this.$notify.error({
                            message: res.msg
                        });
                    }
                })
                .catch(err => {
                    this.$notify.error({
                        title: '网络错误',
                        message: err.msg
                    });
                });
        },
        async addActivity() {
            if (this.enabled) {
                // var map = {
                //   randomString: this.volunteerTimeFrom.randomString,
                //   volunteerTime: this.volunteerTimeFrom.volunteerTime,
                // }
                let data = new FormData();
                data.append(
                    'randomString',
                    this.volunteerTimeFrom.randomString
                );
                data.append(
                    'volunteerTime',
                    this.volunteerTimeFrom.volunteerTime
                );
                // console.log(map)
                await pushTime(data)
                    .then(res => {
                        if (res.code == 0) {
                            this.$notify.success({
                                title: '已提交',
                                message: res.msg
                            });
                            this.dialog = true;
                        } else {
                            this.$notify.error({
                                message: res.msg
                            });
                        }
                    })
                    .catch(err => {
                        this.$notify.error({
                            title: '网络错误',
                            message: err
                        });
                    });
            } else {
                this.$notify({
                    title: '请勾选下方诚信守则',
                    type: 'warning'
                });
            }
        }
    }
};
</script>
<style scoped>
.body {
    width: 100%;
    min-height: 90%;
    background-image: url(../../../assets/background.jpg);
    background-size: 100% 100%;
}
.middle {
    padding: 50px 0 0 30%;
    height: 200px;
    background-image: url(../../../assets/background.jpg);
    background-size: 100% 100%;
}
</style>
