<template>
    <div>
        <v-data-table
            item-key="studentNum"
            :headers="headers"
            :items="desserts"
            sort-by="calories"
            class="elevation-1 body"
            disable-pagination
            hide-default-footer
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Volunteer-Info</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <!-- 选择届别的下拉框 -->
                    <div class="text-center">
                        <v-menu :close-on-content-click="false" offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="primary"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    选择班级
                                </v-btn>
                            </template>
                            <v-list max-width="250">
                                <v-list-item>
                                    <v-select
                                        v-model="getListAPI.level"
                                        :items="dropList.levelList"
                                        label="届别"
                                        item-text="level"
                                        item-value="level"
                                        dense
                                        outlined
                                        @change="levelChange"
                                    ></v-select>
                                </v-list-item>
                                <v-list-item v-if="dropList.collegeList[0]">
                                    <v-select
                                        v-model="getListAPI.collegeId"
                                        :items="dropList.collegeList"
                                        label="学院"
                                        item-text="collegeName"
                                        item-value="collegeId"
                                        dense
                                        outlined
                                        @change="collegeChange"
                                    ></v-select>
                                </v-list-item>
                                <v-list-item v-if="dropList.classList[0]">
                                    <v-select
                                        v-model="getListAPI.classId"
                                        :items="dropList.classList"
                                        label="班级"
                                        item-text="className"
                                        item-value="classId"
                                        dense
                                        outlined
                                        @change="classChange"
                                    ></v-select>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <div class="mx-4"></div>
                    <!-- 导出信息的按扭 -->
                    <div class="text-center" v-if="getListAPI.level != null&&rollId==1">
                        <v-menu :close-on-content-click="false" offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="primary"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="ShowDialog"
                                >
                                    导出信息
                                </v-btn>
                            </template>
                        </v-menu>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="$router.push('/vol_modify')"
                        >操作</v-btn
                    >
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="getVolTimeInfo(item)"
                            v-bind="attrs"
                            v-on="on"
                        >
                            iconfont vo-xinxi
                        </v-icon>
                    </template>
                    <span>工时信息</span>
                </v-tooltip>
            </template>
            <template v-slot:item.info="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <div
                            class="infoIcon"
                            :style="{
                                'background-color':
                                    getInfoStatus(item) == 0 ? 'green' : 'red'
                            }"
                        ></div>
                    </template>
                </v-tooltip>
            </template>
            <template v-slot:no-data>
                <div>暂无数据</div>
            </template>
        </v-data-table>
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
                            @input="getVolTimeInfo"
                        ></v-pagination>
                    </div>
                    <!-- {{ volunteerTimetable }} -->
                </div>
            </v-sheet>
        </v-bottom-sheet>
        <div class="text-center">
            <v-pagination
                v-model="getListAPI.currPage"
                :length="totalPage"
                :total-visible="7"
                circle
                @input="initialize"
            ></v-pagination>
        </div>

        <!-- 确认按照具体格式进行导出 -->
        <v-dialog
            v-model="exportDia"
            persistent
            max-width="500px"
            style="position:relative padding:100px"
        >
            <v-card class="text-center">
                <span
                    style="cursor: pointer;  position: absolute; top:-6px;left:5px; font-size:30px"
                    @click="CloseDialog()"
                    >&times;</span
                >
                <!-- 无奈调不了高度目前只能用这种新式撑开 -->
                <v-card-text> </v-card-text>
                <v-card-text> </v-card-text>
                <v-card-text> </v-card-text>
                <v-card-text> </v-card-text>
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="exportInfo(getListCollege)"
                >
                    按学院下载总表
                </v-btn>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="ClassDownload"
                >
                    按班级下载分表
                </v-btn>
                <v-card-text> </v-card-text>
                <v-card-text> </v-card-text>
                <v-card-text> </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { getAllLevel, getAllCollege, getClassList } from '../../../api/common';
import { searchmemberInfo } from '../../../api/admin/personInfo/volunteerInfo';
import { getVolunteerTimetable } from '../../../api/admin/volunteerTime/timetableInfo';
import { exportAdminInfo } from '../../../api/admin/personInfo/adminInfo';
import store from '../../../store';
export default {
    data: () => ({
        headers: [
            {
                text: '学号',
                align: 'start',
                sortable: false,
                value: 'studentNum'
            },
            { text: '姓名', value: 'studentName', sortable: false },
            { text: '学院', value: 'collegeName', sortable: false },
            { text: '班级', value: 'className', sortable: false },
            { text: '联系方式', value: 'phone', sortable: false },
            { text: '信息补全', value: 'info', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false }
        ],
        desserts: [],
        totalPage: 0,
        dropList: {
            levelList: [],
            collegeList: [],
            classList: []
        },
        getListAPI: {
            level: null,
            collegeId: null,
            classId: null,
            currPage: 1
        },
        volunteerTimetable: [],
        showMenu: false,
        getTime: {
            studentNum: '',
            currPage: 1,
            totalPage: 0
        },
        // 弹窗是否显示
        exportDia: false,
        // 存放该学院所有班级的id
        allclassId: {
            classIdList: []
        },
        // 存放一个届的对象
        getListLevle: {
            level: null
        },
        // 存放一个届和学院的对象
        getListCollege: {
            level: null,
            collegeId: null
        },
        // 存放登录者id
        rollId:'',
    }),

    created() {
        this.getlevelList();
        this.rollId = localStorage.getItem('rollId');
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
        initialize() {
            searchmemberInfo(this.getListAPI).then(res => {
                this.totalPage = res.data.totalPage;
                this.desserts = res.data.list;
                console.log(this.desserts);
            });
        },
        // 选择届别
        levelChange() {
            this.dropList.classList = [];
            this.getListAPI.classId = null;
            if (this.getListAPI.collegeId) {
                this.getclass();
                this.initialize();
            }
            // console.log(this.getListAPI.level);
        },
        // 选择学院
        collegeChange() {
            this.getListAPI.class = null;
            this.page = 1;
            this.initialize();
            this.getclass();
            // getClassList({
            //   collegeId: this.getListAPI.collegeId,
            //   level: this.getListAPI.level,
            // }).then((res) => {
            //   this.dropList.classList = res.data.list
            // })
            // this.getListAPI.classId = ''
        },
        // 选择班级
        classChange() {
            this.initialize();
        },
        // 获取班级列表
        getclass() {
            getClassList({
                collegeId: this.getListAPI.collegeId,
                level: this.getListAPI.level
            }).then(res => {
                console.log(res.data);
                this.dropList.classList = res.data.list;
            });
            this.getListAPI.classId = '';
        },
        // 获取届别和学院列表
        getlevelList() {
            getAllLevel().then(res => {
                this.dropList.levelList = res.data;
            });
            if (localStorage.getItem('rollId') == 4) {
                this.dropList.collegeList = store.getters.college;
                this.getListAPI.collegeId = store.getters.college[0].collegeId;
            } else {
                getAllCollege().then(res => {
                    this.dropList.collegeList = res.data;
                });
            }
        },
        //获取志愿工时信息
        getVolTimeInfo(item) {
            console.log('item:');
            console.log(item);
            this.showMenu = true;
            if (item.studentNum) {
                this.getTime.currPage = 1;
                this.getTime.studentNum = item.studentNum;
            }
            console.log(this.getTime);
            getVolunteerTimetable(this.getTime)
                .then(res => {
                    console.log(res);
                    this.volunteerTimetable = res.data.list;
                    this.getTime.totalPage = res.data.totalPage;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //返回信息补全状态
        getInfoStatus(item) {
            if (
                // item.campus == null ||
                // item.dormitoryBuilding == null ||
                // item.dormitoryHouseNum == null ||
                // item.dormitoryLayer == null ||
                !item.idCardNumber||
                !item.phone ||
                !item.politicalOutlook ||
                !item.qqNum
                // item.provinceName == null ||
                // item.registeredVolunteerNum == null
            ) {
                return 1;
            } else {
                return 0;
            }
        },
        // 点击按钮下载导出信息的表格
        async exportInfo(datas) {
            let data = new FormData();
            if (
                this.getListAPI.level != null &&
                this.getListAPI.classId == null &&
                this.getListAPI.collegeId == null
            )
                data.append('level', datas.level);
            if (
                this.getListAPI.classId == '' &&
                this.getListAPI.collegeId != null
            ) {
                data.append('level', datas.level);
                data.append('collegeId', datas.collegeId);
            }
            if (
                this.getListAPI.classId != '' &&
                this.getListAPI.collegeId != null
            ) {
                data.append('level', datas.level);
                data.append('collegeId', datas.collegeId);
                data.append('classId', datas.classId);
            }

            await exportAdminInfo(data)
                .then(res => {
                    // console.log('这个是下载的接口', res);
                    let blob = new Blob([res], {
                        type: 'application/vnd.ms-excel'
                    });
                    let objectUrl = URL.createObjectURL(blob);
                    window.location.href = objectUrl;
                })
                .catch(err => {
                    console.log(err);
                    this.$notify.error({
                        title: '导出失败',
                        message: err
                    });
                });
        },
        // 判断是否进行弹窗或者下载操作
        ShowDialog() {
            // console.log(this.getListAPI);
            if (
                this.getListAPI.level != null &&
                this.getListAPI.classId == null &&
                this.getListAPI.collegeId == null
            ) {
                this.getListLevle.level = this.getListAPI.level;
                this.exportInfo(this.getListLevle);
            }

            if (
                this.getListAPI.classId == '' &&
                this.getListAPI.collegeId != null
            ) {
                this.getListCollege.level = this.getListAPI.level;
                this.getListCollege.collegeId = this.getListAPI.collegeId;
                this.exportDia = true;
            }

            if (
                this.getListAPI.classId != '' &&
                this.getListAPI.collegeId != null
            ) {
                console.log(this.getListAPI);
                this.exportInfo(this.getListAPI);
            }
        },

        // 关闭弹窗
        CloseDialog() {
            this.exportDia = false;
        },

        //   点击按班级下载分表循环访问导出接口
        ClassDownload() {
            this.getclass();
            console.log(this.dropList.classList.length)
            for (let i = 0; i < this.dropList.classList.length; i++) {
                // console.log(this.dropList.classList[i].classId)
                this.getListAPI.classId = this.dropList.classList[i].classId;
                // console.log("下载总",this.getListAPI)
                this.exportInfo(this.getListAPI);
            }
        }
    }
};
</script>
<style scoped>
.body {
    margin: 0 0 20px 2px;
    padding: 5px 15px 5px 15px;
}
.timeBottom {
    padding-left: 20px;
}
.infoIcon {
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: #000;
}
</style>
