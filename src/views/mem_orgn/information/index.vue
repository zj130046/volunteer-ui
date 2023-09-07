<template>
    <div>
        <v-card class="mt-5">
            <v-row class="justify-center pl-5 pr-5 pb-5">
                <v-col cols="6" sm="12" md="6" v-if="!isCollege">
                    <v-card>
                        <v-list flat>
                            <v-subheader>
                                <!-- 没办法了只能这样了 -->
                                <span style="width:58%">学院</span>

                                <span class="between" style="width:42%">
                                    <span>志愿者人数</span>
                                    <span>完成人数</span>
                                </span>
                            </v-subheader>
                            <v-list-item-group color="primary">
                                <v-list-item
                                    class="list"
                                    v-for="item in collegeList"
                                    :key="item.collegeId"
                                    @click="classComplete(item)"
                                    style="border-bottom:1px solid rgb(193,193,193)"
                                >
                                    <v-list-item-icon style="width:55%">
                                        {{ item.collegeName }}
                                    </v-list-item-icon>

                                    <v-list-item-content>
                                        <v-list-item-title class="between">
                                            <span>{{ item.volunteerNum }}</span>
                                            <span>{{ item.completedNum }}</span>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols="6" sm="12" md="6">
                    <v-card>
                        <v-list flat>
                            <v-chip
                                class="ma-2"
                                color="green"
                                text-color="white"
                            >
                                具体补全情况可查看人员组织-志愿者信息界面
                            </v-chip>
                            <v-subheader>
                                <!-- 没办法了只能这样了 -->
                                <span style="width:78%">学院</span>

                                <span class="between" style="width:62%">
                                    <span>志愿者人数</span>
                                    <span style="margin-right:0px"
                                        >完成人数</span
                                    >
                                </span>
                            </v-subheader>
                            <v-list-item-group color="primary">
                                <v-list-item
                                    class="list"
                                    v-for="item in classList"
                                    :key="item.classId"
                                    style="border-bottom:1px solid rgb(193,193,193)"
                                >
                                    <v-list-item-icon style="width:55%">
                                        {{ item.className }}
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title class="between">
                                            <span>{{ item.volunteerNum }}</span>
                                            <span>{{ item.completedNum }}</span>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import {
    collegeComplete,
    classComplete
} from '../../../api/admin/personInfo/information';
export default {
    data() {
        return {
            collegeList: [],
            classList: [],
            collegeId: 0,
            isCollege: false
        };
    },
    created() {
        this.collegeComplete();
        this.collegeId = localStorage.collegeId;
        if (!['1', '2', '3'].includes(localStorage.rollId)) {
            this.isCollege = true;
            this.classComplete({ collegeId: this.collegeId });
        }
    },
    methods: {
        //各学院信息补全情况
        async collegeComplete() {
            await collegeComplete().then(res => {
                console.log(res.data);
                this.collegeList = res.data;
            });
        },
        //各班级信息补全情况
        async classComplete(item) {
            await classComplete({ collegeId: item.collegeId }).then(res => {
                console.log(res.data);
                this.classList = res.data;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.between {
    display: flex;
    justify-content: space-between;
}
.list:last-child {
    border-bottom: none !important;
}
</style>
