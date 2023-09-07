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
            @click:row="clickRow"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Credit-level</v-toolbar-title>
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
                    <v-divider class="mx-4" inset vertical></v-divider>

                    <v-text-field
                        label="精确搜索"
                        placeholder="输入姓名或学号"
                        solo
                        clearable
                        style="margin-top:30px;max-width:170px"
                        v-model="searchInput"
                        @keyup.enter="search"
                    ></v-text-field>
                    <v-btn
                        color="primary"
                        dark
                        @click="search"
                        style="margin-left:5px"
                    >
                        搜索
                    </v-btn>
                </v-toolbar>
            </template>

            <template v-slot:item.punished="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <div
                            class="punishedIcon"
                            :style="{
                                'background-color': !item.punished
                                    ? 'green'
                                    : 'red'
                            }"
                        ></div>
                    </template>
                </v-tooltip>
            </template>
            <template v-slot:no-data>
                <div>暂无数据</div>
            </template>
        </v-data-table>

        <!-- 个人信用详情 -->
        <v-row justify="center">
            <v-dialog v-model="showMenu" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">信用详情</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        label="被举报次数"
                                        required
                                        v-model="length"
                                        v-if="length !== 0"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" v-if="length !== 0">
                                    <el-select
                                        v-model="value"
                                        placeholder="请选择"
                                        @change="showReport"
                                    >
                                        <el-option
                                            v-for="item in details"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-alert
                            elevation="8"
                            shaped
                            type="success"
                            v-if="length === 0"
                            >该志愿者被举报次数为零</v-alert
                        >
                        <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="showMenu = false"
                        >
                            取消
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <!-- 被举报的详情信息 -->
        <div class="text-center">
            <v-bottom-sheet v-model="sheet">
                <v-sheet
                    class="text-center"
                    height="650px"
                    width="100%"
                    style="padding: 20px 10px 0 10px"
                >
                    <v-btn class="mt-6" text color="red" @click="closeReport">
                        关闭
                    </v-btn>
                    <div class="py-3">
                        <div class="my-3">
                            <v-simple-table height="550" dense>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td>被举报人参加的活动</td>
                                            <td>
                                                {{
                                                    DetailInfo.activityName
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>举报人姓名</td>
                                            <td>
                                                {{
                                                    DetailInfo.reportingPersonName
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>举报人学号</td>
                                            <td>
                                                {{
                                                    DetailInfo.reportingPersonNum
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>被举报人姓名</td>
                                            <td>
                                                {{
                                                    DetailInfo.reportedPersonName
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>被举报人学号</td>
                                            <td>
                                                {{
                                                    DetailInfo.reportedPersonNum
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>举报原因</td>
                                            <td>
                                                {{
                                                    DetailInfo.reportedReason
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>被举报人参加的活动开始时间</td>
                                            <td>
                                                {{
                                                    DetailInfo.activityStartTime
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>被举报人参加的活动结束时间</td>
                                            <td>
                                                {{
                                                    DetailInfo.activityEndTime
                                                }}
                                            </td>
                                        </tr>

                                        <tr
                                            v-if="
                                                DetailInfo.imageList
                                                    .length !== 0
                                            "
                                        >
                                            <td>举报凭证</td>
                                            <td>
                                                <v-row>
                                                    <v-col
                                                        v-for="(item,
                                                        i) in DetailInfo.imageList"
                                                        :key="i"
                                                        class="d-flex child-flex"
                                                        cols="3"
                                                    >
                                                        <v-img
                                                            :src="
                                                                `${item.imagePath}`
                                                            "
                                                            lazy-src="../../assets/volunteer.png"
                                                            max-width="200"
                                                            max-height="130"
                                                            aspect-ratio="1"
                                                            class="grey lighten-2"
                                                            style="cursor:pointer"
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
                                            <td>举报状态</td>
                                            <td>{{ DetailInfo.status }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </div>
                    </div>
                </v-sheet>
            </v-bottom-sheet>
        </div>

        <div class="text-center">
            <v-pagination
                v-model="getListAPI.currPage"
                :length="totalPage"
                :total-visible="7"
                circle
                @input="initialize"
            ></v-pagination>
        </div>
    </div>
</template>
<script>
import { getAllLevel, getAllCollege, getClassList } from '../../api/common';
import { getStuCreditInfo,getDetailInfoList } from '../../api/admin/report/reportProve';
import store from '../../store';
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
            { text: '学院', value: 'stuCollege', sortable: false },
            { text: '班级', value: 'stuClass', sortable: false },
            { text: '信用等级', value: 'creditLevel', sortable: false },
            { text: '评定', value: 'punished', sortable: false }
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
        //搜索栏值
        searchInput: '',
        //控制信誉详情是否展示
        showMenu: false,
        //点击人的基本信息
        userDetail: {},
        // 被举报人举报列表
        DetailInfoList: [],
        //点击人被举报的基本信息
        DetailInfo: {},
        //被举报次数
        length: 0,
        //select框的值
        value: '',
        sheet: false,
        //举报次数渲染
        details: []
    }),

    created() {
        this.getlevelList();
    },

    methods: {
        icon(i) {
            switch (i) {
            case 0:
                return { text: '未被禁止参加活动', color: 'green' };
            case 1:
                return { text: '可以参加活动', color: 'red' };
            }
        },
        initialize() {
            this.searchInput = '';
            getStuCreditInfo(this.getListAPI).then(res => {
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
        },
        // 选择学院
        collegeChange() {
            this.getListAPI.class = null;
            this.page = 1;
            this.initialize();
            this.getclass();
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
        // 搜索
        search() {
            if (/^\d+$/.test(this.searchInput)) {
                getStuCreditInfo({
                    studentNum: this.searchInput,
                    currPage: 1
                })
                    .then(res => {
                        // console.log('学号查询');
                        // console.log(res);
                        console.log(this.isWork);
                        if (res.data) {
                            this.desserts = [];
                            this.totalPage = res.data.totalPage;
                            this.desserts = res.data.list;
                        } else {
                            this.$notify.error({
                                title: '未查询到该志愿者'
                            });
                        }
                    })
                    .catch(err => {
                        this.$notify.error({
                            message: err.msg
                        });
                    });
            } else {
                console.log({ studentName: this.searchInput, currPage: 1 });
                getStuCreditInfo({ studentName: this.searchInput, currPage: 1 })
                    .then(res => {
                        if (res.data) {
                            // console.log(res);
                            console.log(this.isWork);
                            this.totalPage = res.data.totalPage;
                            this.desserts = res.data.list;
                        } else {
                            this.$notify.error({
                                title: '未查询到该志愿者'
                            });
                        }
                    })
                    .catch(err => {
                        this.$notify.error({
                            message: err.msg
                        });
                    });
            }
            this.totalPage = 0;
        },

        // 鼠标单击一行显示这一行的具体数据
        clickRow(item) {
            // console.log('单击事件生效',item);
            this.showMenu = true;
            this.userDetail = item;
            getDetailInfoList({
                studentNum: item.studentNum
                // studentNum:201602127080
            }).then(res => {
                this.DetailInfoList = res.data;
                if (res.data !== null) this.length = res.data.length;
                else this.length = 0;
                this.details = [];
                for (let i = 1; i <= this.length; i++) {
                    this.details.push({
                        label: '第' + i + '次',
                        value: i
                    });
                }
                console.log(this.details);
            });
        },
        showReport(index) {
            // console.log('@@',index);
            this.sheet = true;
            this.DetailInfo = this.DetailInfoList[index -1 ];
            
            //then为异步任务
            // this.DetailInfo = List[index-1]
            // console.log('@@@',this.DetailInfo);
        },
        closeReport() {
            this.sheet = !this.sheet;
            this.userDetail = {};
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
.punishedIcon {
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: #000;
}
</style>
