<template>
    <div class="message">
        <!-- 
            disable-pagination:完全禁止分页
            hide-default-footer:默认隐藏页脚
         -->
        <v-data-table
            :headers="headers"
            :items="menuList"
            class="elevation-1 body"
            disable-pagination
            hide-default-footer
            @click:row="clickRow"
        >
            <!-- 主体 -->
            <template v-slot:top>
                <v-toolbar flat>
                    <!-- 标题 -->
                    <v-toolbar-title>审核消息</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>

                    <!-- 院级操作 -->
                    <v-col cols="2" style="padding-top: 35px">
                        <el-select
                            v-model="value"
                            placeholder="已通过"
                            @change="showMenu"
                            style="padding-bottom: 20px;"
                        >
                            <el-option
                                v-for="item in operaList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </v-col>

                    <!-- 搜索本页 -->
                    <v-col cols="3" sm="2">
                        <v-text-field
                            append-icon="mdi-magnify"
                            label="筛选信息"
                            single-line
                            hide-details
                            @keyup.enter="search"
                            v-model="searchInfo"
                        ></v-text-field>
                    </v-col>
                </v-toolbar>
            </template>
        </v-data-table>

        <!-- 被举报的详情信息 -->
        <div class="text-center">
            <v-bottom-sheet v-model="sheet">
                <v-sheet
                    class="text-center"
                    height="650px"
                    width="100%"
                    style="padding: 20px 10px 0 10px"
                >
                    <v-btn
                        class="mt-6"
                        text
                        color="red"
                        @click="sheet = !sheet"
                    >
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
                                                    DetailInfoList.activityName
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>举报人姓名</td>
                                            <td>
                                                {{
                                                    DetailInfoList.reportingPersonName
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>举报人学号</td>
                                            <td>
                                                {{
                                                    DetailInfoList.reportingPersonNum
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>被举报人姓名</td>
                                            <td>
                                                {{
                                                    DetailInfoList.reportedPersonName
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>被举报人学号</td>
                                            <td>
                                                {{
                                                    DetailInfoList.reportedPersonNum
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>举报原因</td>
                                            <td>
                                                {{
                                                    DetailInfoList.reportedReason
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>被举报人参加的活动开始时间</td>
                                            <td>
                                                {{
                                                    DetailInfoList.activityStartTime
                                                }}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>被举报人参加的活动结束时间</td>
                                            <td>
                                                {{
                                                    DetailInfoList.activityEndTime
                                                }}
                                            </td>
                                        </tr>

                                        <tr
                                            v-if="
                                                DetailInfoList.imageList
                                                    .length !== 0
                                            "
                                        >
                                            <td>举报凭证</td>
                                            <td>
                                                <v-row>
                                                    <v-col
                                                        v-for="(item,
                                                        i) in DetailInfoList.imageList"
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
                                            <td>{{ DetailInfoList.status }}</td>
                                        </tr>

                                        <tr>
                                            <td>驳回意见</td>
                                            <td>{{ DetailInfoList.rejectReason }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </div>
                    </div>
                </v-sheet>
            </v-bottom-sheet>
        </div>

        <!-- 分页 -->
        <div class="text-center">
            <v-pagination
                v-model="currPage"
                :length="pageLength"
                circle
                @input="pagination"
            ></v-pagination>
        </div>
    </div>
</template>

<script>
import { getDetailInfoListBy, getReportInfo } from '../../api/admin/report/reportProve';
export default {
    data() {
        return {
            searchInfo: '',
            pageLength: 0,
            currPage: 1,
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
                // {
                //     text: '举报时间',
                //     value: 'createdTime',
                //     sortable: false
                // },

                { text: '状态', value: 'status', sortable: false }
            ],
            operaList: [
                {
                    label: '已通过',
                    value: 1
                },
                {
                    label: '已驳回',
                    value: 2
                }
            ],
            //select框选中值
            value: '',
            //用于渲染的数据组
            menuList: [],
            statusId: 0,
            //当前页
            model: 1,
            //举报详情
            DetailInfoList: {},
            sheet: false
        };
    },
    mounted() {
        getDetailInfoListBy({
            keywords: '',
            currentPage: 1,
            statusId: 2,
            isPage: 1
        }).then(res => {
            // console.log(res);
            this.menuList = res.data.list;
            this.currPage = 1;
            this.pageLength = 1;
        });
    },
    methods: {
        showMenu(index) {
            console.log(index);
            this.menuList = [];
            this.model = 1;
            this.statusId = 0;
            this.pageLength = 0;
            this.currPage = 1;
            if (index === 1) {
                this.statusId = 2;
            } else {
                this.statusId = 1;
            }
            getDetailInfoListBy({
                keywords: '',
                currentPage: this.currPage,
                statusId: this.statusId,
                isPage: 1
            })
                .then(res => {
                    console.log(res);
                    this.menuList = res.data.list;
                    this.pageLength = res.data.totalPage;
                    this.pageSize = res.data.pageSize;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        pagination(index) {
            // console.log('成功',index)
            this.menuList = [];
            if (this.model === 1) {
                getDetailInfoListBy({
                    keywords: '',
                    currentPage: index,
                    statusId: this.statusId,
                    isPage: 1
                }).then(res => {
                    // console.log(res);
                    this.menuList = res.data.list;
                });
            } else {
                getDetailInfoListBy({
                    keywords: this.searchInfo,
                    statusId: this.statusId,
                    currentPage: index,
                    isPage: 1
                }).then(res => {
                    // console.log('$$$$',res);
                    this.menuList = res.data.list;
                    this.pageLength = res.data.totalPage;
                    this.pageSize = res.data.pageSize;
                });
            }
        },
        //搜索功能
        search() {
            // console.log(111);
            this.model = 0;
            this.menuList = [];
            this.currPage = 1;
            getDetailInfoListBy({
                keywords: this.searchInfo,
                statusId: this.statusId,
                currentPage: this.currPage,
                isPage: 1
            }).then(res => {
                // console.log('$$$$',res);
                this.menuList = res.data.list;
                this.pageLength = res.data.totalPage;
                this.pageSize = res.data.pageSize;
            });
            this.searchInfo = '';
        },
        //点击显示详情信息
        clickRow(item) {
            console.log(123, item);
            this.sheet = true;
            getReportInfo({
                id: item.id
            }).then(res => {
                console.log(res);
                this.DetailInfoList = res.data;
            });
        }
    }
};
</script>

<style></style>
