<template>
    <div>
        <v-card flat>
            <v-toolbar color="rgb(242,245,248)" dark flat prominent>
                <!-- 搜索框 -->
                <v-col cols="3">
                    <v-text-field
                        background-color="rgb(200,200,200)"
                        v-model="searchInput"
                        class="mx-4"
                        flat
                        hide-details
                        label="输入姓名或学号"
                        prepend-inner-icon="mdi-magnify"
                        solo-inverted
                        @keydown.enter="search"
                    ></v-text-field>
                </v-col>
                <!-- 添加按钮 -->
                <v-btn
                    class="addButton"
                    color="green"
                    siz
                    dark
                    @click="
                        addshow = true;
                        volunteersearchList = [];
                    "
                >
                    添加
                </v-btn>

                <template v-slot:extension>
                    <v-tabs
                        v-model="tabs"
                        right
                        v-if="volunteersearchList[0]"
                        color="red"
                        background-color="rgb(200,200,200)"
                    >
                        <v-tab
                            v-for="(item, index) in volunteersearchList"
                            :key="index"
                            @click="getclass(index)"
                            >{{ item.studentName }}
                        </v-tab>
                    </v-tabs>
                </template>

            </v-toolbar>
            <!-- 主页面 -->
            <v-tabs-items v-model="tabs" v-if="volunteersearchList[0]">
                <v-tab-item
                    v-for="(value, index) in volunteersearchList"
                    :key="index"
                >
                    <v-card>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="
                                            volunteersearchList[index]
                                                .studentNum
                                        "
                                        label="学号"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="
                                            volunteersearchList[index]
                                                .studentName
                                        "
                                        label="姓名"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select
                                        @change="getclass(index)"
                                        v-model="
                                            volunteersearchList[index].level
                                        "
                                        :items="levelList"
                                        label="届别"
                                        item-text="level"
                                        item-value="level"
                                        dense
                                    ></v-select>
                                </v-col>
                                <v-col class="d-flex" cols="12">
                                    <v-select
                                        @change="getclass(index)"
                                        v-model="
                                            volunteersearchList[index].collegeId
                                        "
                                        :items="collegeList"
                                        label="学院"
                                        item-text="collegeName"
                                        item-value="collegeId"
                                        dense
                                    ></v-select>
                                </v-col>
                                <v-col class="d-flex" cols="12">
                                    <v-select
                                        v-model="
                                            volunteersearchList[index].classId
                                        "
                                        :items="classList"
                                        label="班级"
                                        item-text="className"
                                        item-value="classId"
                                        dense
                                    ></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="
                                            volunteersearchList[index].phone
                                        "
                                        label="电话"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="
                                            volunteersearchList[index].qqNum
                                        "
                                        label="QQ"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-card-actions>
                            <v-btn color="red" text @click="deleteVol(value.studentNum)">
                                删除该志愿者
                            </v-btn>
                            <v-btn color="orange" text @click="editVol()">
                                提交修改
                            </v-btn>
                            <v-btn
                                color="green"
                                text
                                @click="getVolTimeInfo(value.studentNum)"
                            >
                                工时信息
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>

            <v-card v-show="addshow">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="addList.studentNum"
                                label="学号"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="addList.studentName"
                                label="姓名"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="addList.level"
                                label="届别"
                            ></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" v-if="addList.level">
                            <v-select
                                @change="getclassAdd"
                                v-model="addList.collegeId"
                                :items="collegeList"
                                label="学院"
                                item-text="collegeName"
                                item-value="collegeId"
                                dense
                            ></v-select>
                        </v-col>
                        <v-col
                            class="d-flex"
                            cols="12"
                            v-if="addList.collegeId"
                        >
                            <v-select
                                v-model="addList.classId"
                                :items="classList"
                                label="班级"
                                item-text="className"
                                item-value="classId"
                                dense
                            ></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="addList.phone"
                                label="电话"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="addList.qqNum"
                                label="QQ"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-btn color="orange" text @click="addvol">
                        添加
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-card>

        <!-- 需求7新加的 -->
        <v-bottom-sheet v-model="showMenu" inset>
            <v-sheet
                class="text-center"
                height="450px"
                style="padding: 20px 10px 0 10px"
            >
                <div class="my-3">
                    <v-simple-table height="380" dense>
                        <template v-slot:default>
                            <tbody>
                                <tr
                                    v-for="item in volunteerTimetable"
                                    :key="item.name"
                                >
                                    <td>{{ item.activityName }}</td>
                                    <td>{{ item.organizationName }}</td>
                                    <td>{{ item.activityDate }}</td>
                                    <td>{{ item.volunteerTime }}</td>
                                    <td>
                                        <v-icon
                                            size="small"
                                            :color="
                                                icon(item.volunteerStatus).color
                                            "
                                            >{{
                                                icon(item.volunteerStatus).text
                                            }}</v-icon
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                    <div class="text-center timeBottom">
                        <v-pagination
                            v-model="getTime.currPage"
                            :length="getTime.totalPage"
                            :total-visible="7"
                            @input="getVolTimeInfo(studentNum)"
                        ></v-pagination>
                    </div>
                    <!-- {{ volunteerTimetable }} -->
                </div>
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>
<script>
import {
    searchmemberInfo,
    changememberInfo,
    deletememberInfo,
    addmemberInfo
} from '../../../api/admin/personInfo/volunteerInfo';
import { getAllLevel, getAllCollege, getClassList } from '../../../api/common';
import { getVolunteerTimetable } from '../../../api/admin/volunteerTime/timetableInfo';

export default {
    data() {
        return {
            tabs: 0,
            searchInput: '',
            volunteersearchList: [],
            collegeList: [],
            classList: [],
            levelList: [],
            addList: {},
            addshow: false,
            //需求7新加的组件的数据
            volunteerTimetable: [],
            showMenu: false,
            getTime: {
                studentNum: '',
                currPage: 1,
                totalPage: 0
            },
            studentNum: ''
        };
    },
    created() {
        this.getcollegeList();
        this.getlevelList();
    },
    methods: {
        icon(i) {
            switch (i) {
            case 1:
                return { text: '组织待认证', color: 'orange' };
            case 2:
                return { text: '总队待认证', color: 'orange' };
            case 3:
                return { text: '组织已驳回', color: 'red' };
            case 4:
                return { text: '总队已驳回', color: 'red' };
            case 5:
                return { text: '已认证', color: 'green' };
            }
        },
        getcollegeList() {
            getAllCollege().then((res) => {
                this.collegeList = res.data;
            });
        },
        getlevelList() {
            getAllLevel().then((res) => {
                this.levelList = res.data;
            });
        },
        async search() {
            this.addshow = false;
            this.volunteersearchList = [];
            const map = {};
            if (/^\d+$/.test(this.searchInput)) {
                map.studentNum = this.searchInput;
            } else {
                map.studentName = this.searchInput;
            }
            await searchmemberInfo(map).then((res) => {
                if (res.data.list[0]) {
                    this.volunteersearchList = res.data.list;
                    this.studentNum = this.volunteersearchList[0].studentNum;
                    this.getclass(this.tabs);
                } else {
                    this.$notify({
                        message: '查无此人',
                        type: 'error'
                    });
                }
            });
        },
        getclass(index) {
            getClassList({
                collegeId: this.volunteersearchList[index].collegeId,
                level: this.volunteersearchList[index].level
            }).then((res) => {
                this.classList = res.data.list;
            });
        },
        getclassAdd() {
            getClassList({
                collegeId: this.addList.collegeId,
                level: this.addList.level
            }).then((res) => {
                this.classList = res.data.list;
            });
        },
        deleteVol(studentNum) {
            //通过FormData构造函数创建一个空对象
            var formdata = new FormData();
            //通过append()方法来追加数据
            formdata.append(
                'studentNum',
                studentNum
            );
            
            deletememberInfo(formdata)
                .then((res) => {
                    this.$notify({
                        title: '已删除',
                        message: res.msg,
                        type: 'success'
                    });
                    this.search();
                })
                .catch((err) => {
                    this.$notify({
                        title: '删除失败',
                        message: err.msg,
                        type: 'error'
                    });
                    this.search();
                });
            this.volunteersearchList = [];
        },
        editVol() {
            changememberInfo(this.volunteersearchList[this.tabs])
                .then((res) => {
                    this.$notify({
                        title: '已修改',
                        message: res.msg,
                        type: 'success'
                    });
                    this.search();
                })
                .catch((err) => {
                    this.$notify({
                        title: '修改失败',
                        message: err.msg,
                        type: 'error'
                    });
                    this.search();
                });
        
        },
        addvol() {
            addmemberInfo(this.addList)
                .then((res) => {
                    this.$notify({
                        title: '已添加',
                        message: res.msg,
                        type: 'success'
                    });
                    this.addList = {};
                    this.addshow = false;
                })
                .catch((err) => {
                    this.$notify({
                        title: '修改失败',
                        message: err.msg,
                        type: 'error'
                    });
                });
        },
        //获取志愿工时信息
        getVolTimeInfo(studentNum) {
            console.log('修改成功');
            console.log('学号',studentNum);
            this.showMenu = true;
            if (studentNum) {
                this.getTime.currPage = 1;
                this.getTime.studentNum = studentNum;
            }
            console.log('getTime参数',this.getTime);
            getVolunteerTimetable(this.getTime)
                .then((res) => {
                    console.log(res);
                    this.volunteerTimetable = res.data.list;
                    this.getTime.totalPage = res.data.totalPage;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    }
};
</script>
<style scoped>
.addButton {
    position: absolute;
    right: 50px;
    margin-top: 18px;
}
</style>
