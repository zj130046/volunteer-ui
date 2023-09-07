<template>
    <v-card>
        <v-toolbar flat>
            <!-- 左侧输入框 -->
            <el-row>
                <el-col class="d-flex" style="margin-top: 15px;">
                    <el-input
                        placeholder="请输入活动名称"
                        clearable
                        v-model="getPassActivityForm_kind.activityName"
                        @clear="getActivityForm"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getActivity()"
                        ></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <v-spacer> </v-spacer>
            <!-- 右侧 申请 按钮 -->
            <v-menu rounded>
                <template v-slot:activator="{ attrs, on }">
                    <v-btn
                        color="deep-purple accent-4"
                        class="white--text ma-5"
                        v-bind="attrs"
                        v-on="on"
                        @click="$router.push({ path: '/askForVolunteer' })"
                    >
                        申请
                    </v-btn>
                </template>
            </v-menu>
        </v-toolbar>
        
        <div>
            <v-data-table
                :headers="headers"
                :items="getActivityInfo"
                hide-default-footer
                sort-by="calories"
                class="elevation-1 body"
                disable-pagination
            >
                <template v-slot:item.actions="{ item }">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                small
                                class="mr-2"
                                v-bind="attrs"
                                v-on="on"
                                @click="getVolunteerInfo(item)"
                            >
                                iconfont vo-xinxi
                            </v-icon>
                        </template>
                        <span>志愿者信息</span>
                    </v-tooltip>
                </template>
            </v-data-table>
            <div class="text-center">
                <v-pagination
                    v-if="currpage_kind === 1"
                    v-model="getPassActivityForm.currPage"
                    :length="totalPage"
                    :total-visible="7"
                    circle
                    @input="getActivityForm"
                ></v-pagination>
                <v-pagination
                    v-else
                    v-model="getPassActivityForm_kind.currPage"
                    :length="totalPage"
                    :total-visible="7"
                    circle
                    @input="getActivity"
                ></v-pagination>
            </div>
        </div>
    </v-card>
</template>
<script>
import { getActivity_, getRecruitInfo } from '../../api/admin/recruit';
export default {
    data() {
        return {
            headers: [
                { text: '活动ID',align: 'start',sortable: false,value: 'id' },
                { text: '活动名称', value: 'activityName', sortable: false },
                { text: '招募开始时间',value: 'recruitStart',sortable: false },
                { text: '招募结束时间', value: 'recruitEnd', sortable: false },
                { text: '活动类别', value: 'category', sortable: false },
                { text: '志愿组织', value: 'organization', sortable: false },
                { text: '届别', value: 'level', sortable: false },
                { text: '申请者', value: 'crater', sortable: false },
                { text: '通过人', value: 'authenticator', sortable: false },
                { text: '申请时间', value: 'createTime', sortable: false },
                { text: 'Actions', value: 'actions', sortable: false }
            ],
            // 搜索活动的列表
            getActivityInfo: [],
            pageSize: '',
            totalPage: 0,
            //  通过申请的招募活动列表
            getPassActivityInfo: [],
            // 开始页面对象
            getPassActivityForm: {
                currPage: 1
            },
            // 查找页面对象
            getPassActivityForm_kind: {
                currPage: 1,
                activityName: ''
            },
            //判断显示是否为查找的分页
            currpage_kind: ''
        };
    },
    created() {
        this.getActivityForm();
    },
    methods: {
        //模糊搜索
        async getActivity() {
            await getActivity_(this.getPassActivityForm_kind).then(res => {
                if (res.code == 0) {
                    this.getActivityInfo = [];
                    this.totalPage = res.data.totalPage;
                    this.currpage_kind = 2;
                    this.getActivityInfo = res.data.list;
                }
            });
        },

        //二级界面活动列表显示
        async getActivityForm() {
            await getRecruitInfo(this.getPassActivityForm).then(res => {
                if (res.code == 0) {
                    this.getActivityInfo = res.data.list;
                    this.currpage_kind = 1;
                    this.totalPage = res.data.totalPage;
                    // console.log(this.getPassActivityInfo)
                }
            });
        },

        // 点击志愿者信息跳转页面
        getVolunteerInfo(item) {
            this.$router.push({
                path: '/VolunteerInfo',
                query: { activityId: item.id }
            });
        }
    }
};
</script>
