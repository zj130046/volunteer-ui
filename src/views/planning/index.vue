<template>
    <div>
        <!-- 活动列表 -->
        <v-data-table
            :headers="headers"
            :items="activityList"
            class="elevation-1 body"
            disable-pagination
            hide-default-footer
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-col cols="3" style="padding-top: 35px">
                        <v-select
                            v-model="filterForm.category"
                            :items="activityCategoryList"
                            item-text="activityCategoryName"
                            item-value="activityCategoryId"
                            label="活动类型"
                            @change="getActivityList()"
                            dense
                        ></v-select>
                    </v-col>
                    <v-col cols="3" style="padding-top: 35px">
                        <v-select
                            v-model="filterForm.status"
                            :items="operaList"
                            label="操作类型"
                            item-text="opera"
                            item-value="id"
                            @change="getActivityList()"
                            dense
                        ></v-select>
                    </v-col>
                    <v-col cols="3" sm="2">
                        <v-btn
                            class="mr-3"
                            elevation="2"
                            color="primary"
                            @click="showFilterDialog = true"
                            >筛选</v-btn
                        >
                    </v-col>
                </v-toolbar>
            </template>
            <!-- 操作 -->
            <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            class="iconfont vo-shangchuan1"
                            style="margin-right:10px"
                            @click="
                                activityPlanningSubmit(
                                    item.activityId,
                                    item.activityStartTime,
                                    item.activityEndTime
                                )
                            "
                            v-show="filterForm.status == 1"
                            v-bind="attrs"
                            v-on="on"
                        >
                        </v-icon>
                    </template>
                    <span>总结提交</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            class="iconfont vo-daochuwendang"
                            @click="
                                exportSummary(
                                    item.activityId,
                                    item.activityName
                                )
                            "
                            v-bind="attrs"
                            v-on="on"
                            v-show="filterForm.status == 1"
                        >
                        </v-icon>
                    </template>
                    <span>导出总结</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            class="iconfont vo-xinxi"
                            @click="activityPlanningDetail(item.activityId)"
                            v-bind="attrs"
                            v-on="on"
                        >
                        </v-icon>
                    </template>
                    <span>活动详情</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            class="iconfont vo-chenggong"
                            @click="passActivity(item.activityId)"
                            v-show="filterForm.status == 3"
                            v-bind="attrs"
                            v-on="on"
                        >
                        </v-icon>
                    </template>
                    <span>通过</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            class="iconfont vo-cuowu1"
                            @click="showRejectReason(item.activityId)"
                            v-show="filterForm.status == 3"
                            v-bind="attrs"
                            v-on="on"
                        >
                        </v-icon>
                    </template>
                    <span>驳回</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            class="iconfont vo-shanchu"
                            @click="deleteActivity(item)"
                            v-if="rollId == '1' || rollId == '3'"
                            v-bind="attrs"
                            v-on="on"
                        >
                        </v-icon>
                    </template>
                    <span>删除</span>
                </v-tooltip>
            </template>
        </v-data-table>
        <!-- 分页 -->
        <div class="text-center">
            <v-pagination
                v-model="filterForm.currPage"
                :length="activityListTotalpage"
                :total-visible="7"
                circle
                @input="getActivityList()"
            ></v-pagination>
        </div>
        <!-- dialogs -->
        <div>
            <!-- 筛选dialog -->
            <v-dialog v-model="showFilterDialog" persistent max-width="500px">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <!-- <v-col class="d-flex" cols="12">
                <v-select
                  v-model="filterForm.category"
                  :items="activityCategoryList"
                  item-text="activityCategoryName"
                  item-value="activityCategoryId"
                  label="活动类型"
                  dense
                ></v-select>
              </v-col> -->
                            <v-col class="d-flex" cols="12">
                                <v-select
                                    v-model="filterForm.organizationId"
                                    :items="organizationList"
                                    item-text="organizationName"
                                    item-value="organizationId"
                                    label="组织"
                                    dense
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    v-model="filterForm.level"
                                    :items="levelList"
                                    item-text="level"
                                    item-value="level"
                                    label="届别"
                                    dense
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    v-model="filterForm.collegeId"
                                    :items="collegeList"
                                    item-text="collegeName"
                                    item-value="collegeId"
                                    label="学院"
                                    dense
                                    @change="getClassList"
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="12"
                                v-if="
                                    filterForm.category == 4 &&
                                        filterForm.level != '' &&
                                        filterForm.collegeId != ''
                                "
                            >
                                <v-select
                                    v-model="filterForm.classId"
                                    :items="classList"
                                    item-text="className"
                                    item-value="classId"
                                    label="班级"
                                    dense
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="showFilterDialog = false"
                        >
                            取消
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="
                                (showFilterDialog = false) & getActivityList()
                            "
                        >
                            确定
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- 驳回dialog -->
            <v-dialog
                v-model="showRejectReasonDialog"
                persistent
                max-width="500px"
            >
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col class="d-flex" cols="12">
                                <v-text-field
                                    v-model="rejectReasonForm.rejectReason"
                                    label="驳回原因"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="showRejectReasonDialog = false"
                        >
                            取消
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="
                                (showRejectReasonDialog = false) &
                                    rejectActivity()
                            "
                        >
                            确定
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- 活动总结提交dialog -->
            <v-dialog v-model="showSubmitDialog" persistent max-width="500px">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col class="d-flex" cols="12">
                                <v-textarea
                                    counter
                                    :rules="[rules.required]"
                                    v-model="SubmitForm.textcontent"
                                    label="活动总结内容"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="d-flex" cols="12">
                                <v-textarea
                                    counter
                                    :disabled="
                                        SubmitForm.ImageList.length == 0
                                            ? true
                                            : false
                                    "
                                    v-model="SubmitForm.textpicture"
                                    label="活动图片总结"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                        <el-upload
                            ref="upload"
                            action="#"
                            accept="image/jpeg,image/png"
                            multiple
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :file-list="SubmitForm.ImageList"
                            :on-change="OnChange"
                            :auto-upload="false"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="" />
                        </el-dialog>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="Conserve()">
                            取消
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="SubmitUpload()"
                        >
                            提交总结
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- 长期活动的月份确定dialog -->
            <v-dialog v-model="monthDialog" persistent max-width="500px">
                <v-card>
                    <div
                        style="cursor: pointer;  position: absolute; top:-6px;left:5px; font-size:30px"
                        @click="CloseMonthDialog()"
                    >
                        &times;
                    </div>
                    <!-- 无奈调不了高度目前只能用这种新式撑开 -->
                    <v-card-text> </v-card-text>
                    <v-card-text> </v-card-text>
                    <div
                        style="font-size:15px;position:absolute;left:20px;top:28px;"
                    >
                        请选择你要提交长期活动总结的月份
                    </div>
                    <v-card-text> </v-card-text>
                    <v-card-text>
                        <el-select
                            style="margin-left:100px;"
                            v-model="SubmitForm.monthly"
                            placeholder="请选择需要提交总结的月份"
                            @change="ChangeMonth()"
                        >
                            <el-option
                                v-for="item in mothList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
        <!-- 删除dialog -->
        <v-dialog v-model="showDeleteDialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline"> 确定删除志愿活动 </v-card-title>
                <v-card-text
                    >删除此活动将会删除所有相关信息以及所有工时表！</v-card-text
                >
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="showDeleteDialog = false"
                    >
                        取消
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="adminDeleteActivity()"
                    >
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import {
    rejectActivity,
    passActivity
} from '../../api/admin/activityPlanning/activityReview';
import {
    getActivityList,
    adminDeleteActivity,
    exportSummary
} from '../../api/admin/activityPlanning/activityInfo';
import {
    getAllLevel,
    getClassList,
    getAllCollege,
    getAllOrganization
} from '../../api/common';
import { uploadForm, Showupload } from '../../api/file';
export default {
    data() {
        return {
            //表头
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'activityId'
                },
                { text: '活动名称', value: 'activityName', sortable: false },
                {
                    text: '组织名称',
                    value: 'organizationName',
                    sortable: false
                },
                {
                    text: '开始时间',
                    value: 'activityStartTime',
                    sortable: false
                },
                { text: '结束时间', value: 'activityEndTime', sortable: false },
                { text: '创建者', value: 'crater', sortable: false },
                { text: '创建时间', value: 'createTime', sortable: false },
                { text: '状态', value: 'statusName', sortable: false },
                { text: '操作', value: 'actions', sortable: false }
            ],
            //活动列表
            activityList: [],
            //列表页数
            activityListTotalpage: 0,
            //列表接口参数
            filterForm: {
                category: 2,
                collegeId: '',
                classOrCollegeId: '',
                organizationId: '',
                level: '',
                status: 3,
                // 1 已通过 2 被驳回 3 待审核
                craterStudentName: '',
                currPage: 1
            },
            //操作列表
            operaList: [
                { id: 3, opera: '待审核' },
                { id: 1, opera: '已通过' },
                { id: 2, opera: '已驳回' }
            ],
            //届别列表
            levelList: [],
            //学院列表
            collegeList: [],
            //班级列表
            classList: [],
            //组织列表
            organizationList: [],
            //活动分类列表
            activityCategoryList: [
                { activityCategoryId: 2, activityCategoryName: '校级活动' },
                { activityCategoryId: 6, activityCategoryName: '长期活动' },
                { activityCategoryId: 3, activityCategoryName: '短期活动' },
                { activityCategoryId: 4, activityCategoryName: '班级活动' },
                { activityCategoryId: 5, activityCategoryName: '假期个人活动' },
                { activityCategoryId: 1, activityCategoryName: '其他活动' }
            ],
            //筛选dialog
            showFilterDialog: false,
            //拒绝dialog
            showRejectReasonDialog: false,
            //拒绝表单
            rejectReasonForm: {
                activityId: '',
                rejectReason: ''
            },
            //负责人id
            rollId: '',
            //是否显示删除框
            showDeleteDialog: false,
            //删除的工时表ID
            deleteId: 0,
            //活动总结提交
            SubmitForm: {
                textcontent: '',
                textpicture: '',
                activityid: '', // 图片列表
                ImageList: [],
                monthly: 0,
                Startmonth: 0,
                Endmonth: 0
            }, // 显示上传图放大效果
            dialogVisible: false,
            dialogImageUrl: '',
            rules: {
                required: value => !!value || '禁止为空，请输入'
            }, // 长期活动月份dialog
            monthDialog: false, // 存放月份的数组
            mothList: [],
            //是否显示活动总结提交框
            showSubmitDialog: false
        };
    },
    created() {
        this.rollId = localStorage.getItem('rollId');
        this.getActivityList();
        this.getAllLevel();
        this.getAllCollege();
        this.getAllOrganization();
    },
    methods: {
        //获取活动列表
        async getActivityList() {
            console.log('this.filterForm.status：', this.filterForm.status);
            this.listLoading = true;
            await getActivityList(this.filterForm).then(res => {
                // console.log(res);
                if (res.code == 0) {
                    this.activityList = res.data.list;
                    this.activityListTotalpage = res.data.totalPage;
                    this.listLoading = false;
                    console.log(res);
                }
            });
        },
        //获取活动状态
        getStatus() {
            switch (this.filterForm.status) {
                case '1':
                    return '已通过';
                case '2':
                    return '已驳回';
                case '3':
                    return '待审核';
            }
        },
        //活动策划跳转
        activityPlanningDetail(id) {
            this.$router.push({ name: 'activityPlanning', params: { id: id } });
        },
        //获取筛选列表
        async getAllLevel() {
            await getAllLevel().then(res => {
                this.levelList = res.data.reverse();
                console.log(res.data);
            });
        },
        async getAllCollege() {
            await getAllCollege().then(res => {
                this.collegeList = res.data;
            });
        },
        async getClassList() {
            await getClassList({
                collegeId: this.filterForm.collegeId,
                level: this.filterForm.level
            }).then(res => {
                this.classList = res.data.list;
            });
        },
        async getAllOrganization() {
            await getAllOrganization().then(res => {
                this.organizationList = res.data;
            });
        },
        //通过活动策划
        async passActivity(id) {
            let data = new FormData();
            data.append('activityId', id);
            await passActivity(data).then(res => {
                if (res.code == 0) {
                    this.$notify({
                        title: '已通过',
                        message: res.msg,
                        type: 'success'
                    });
                    this.getActivityList();
                } else {
                    this.$notify.error({
                        title: '通过失败',
                        message: res.msg
                    });
                }
            });
        },
        //驳回dialog
        showRejectReason(id) {
            this.showRejectReasonDialog = true;
            this.rejectReasonForm.activityId = id;
        },
        //驳回活动策划
        async rejectActivity() {
            if (this.rejectReasonForm.rejectReason == '') {
                this.$notify({
                    title: '请输入驳回原因',
                    type: 'error'
                });
                return;
            }
            let data = new FormData();
            data.append('activityId', this.rejectReasonForm.activityId);
            data.append('rejectReason', this.rejectReasonForm.rejectReason);
            await rejectActivity(data).then(res => {
                if (res.code == 0) {
                    this.$notify({
                        title: '已驳回',
                        message: res.msg,
                        type: 'success'
                    });
                    this.getActivityList();
                } else {
                    this.$notify.error({
                        title: '驳回失败',
                        message: res.msg
                    });
                }
            });
        },
        //总队总负责人删除活动
        deleteActivity(item) {
            this.deleteId = item.activityId;
            this.showDeleteDialog = true;
        },
        async adminDeleteActivity() {
            this.showDeleteDialog = false;
            let data = new FormData();
            data.append('activityId', this.deleteId);
            await adminDeleteActivity(data).then(res => {
                if (res.code == 0) {
                    this.$notify.success({
                        title: '删除成功'
                    });
                    this.getActivityList();
                } else {
                    this.$notify.error({
                        title: '删除失败'
                    });
                }
            });
        },
        // 活动总结提交dialog
        activityPlanningSubmit(id, starttime, endtime) {
            this.SubmitForm.activityid = id;
            this.SubmitForm.Startmonth = parseInt(starttime.substring(5, 7));
            let j = this.SubmitForm.Startmonth;
            this.SubmitForm.Endmonth = parseInt(endtime.substring(5, 7));
            if (this.filterForm.category == 6) {
                for (
                    let i = 0;
                    i <= this.SubmitForm.Endmonth - this.SubmitForm.Startmonth;
                    i++, j++
                ) {
                    let temp = {
                        value: 0,
                        label: ''
                    };
                    temp.value = j;
                    temp.label = j + '月';
                    this.mothList.push(temp);
                }
                this.monthDialog = true;
            } else {
                this.showSubmitDialog = true;
                this.ShowuploadForm(this.SubmitForm);
            }
        },
        //关闭月份选择dialog
        CloseMonthDialog() {
            this.monthDialog = false;
            this.mothList = [];
        },
        // 选择月份进入活动总结
        ChangeMonth() {
            this.ShowuploadForm(this.SubmitForm);
            this.monthDialog = false;
            this.showSubmitDialog = true;
            console.log(this.SubmitForm.monthly);
        },
        // 回显图片和文字
        async ShowuploadForm(data) {
            await Showupload(data).then(res => {
                console.log(res.data);
                this.SubmitForm.textcontent = res.data.activityContent;
                this.SubmitForm.textpicture = res.data.photoContent;
                for (let i = 0; i < res.data.url.length; i++) {
                    this.SubmitForm.ImageList.push({
                        url: res.data.url[i]
                    });
                }
            });
        },
        // 点击总结取消按钮
        Conserve() {
            this.SubmitForm.textcontent = '';
            this.SubmitForm.textpicture = '';
            this.SubmitForm.ImageList = [];
            this.mothList = [];
            this.SubmitForm.monthly = 0;
            this.showSubmitDialog = false;
        },
        // 预览图片
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 删除图片
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.SubmitForm.ImageList = fileList;
            if (this.SubmitForm.ImageList.length == 0)
                this.SubmitForm.textpicture = '';
        },
        // 上传图片时
        OnChange(file, fileList) {
            const isType = file.type === 'image/jpeg' || 'image/png';
            if (!isType) {
                this.$message.error('上传图片只能是 JPG 格式!');
                fileList.pop();
            }
            this.SubmitForm.ImageList.push(file);
            console.log(this.SubmitForm.ImageList);
        }, // 判断图片描述框的内容是否符合格式
        Checkcontent(txt) {
            let arr = [];
            let flag = 0; //判断是否是否出现错误格式
            let reg = /\d+、/; //图片描述框的规范正则表达式
            arr = txt.split('；');
            if (!txt) return true;
            else {
                if (arr.length > 1) {
                    for (let i = 0; i < arr.length - 1; i++) {
                        if (reg.test(arr[i]) === false) {
                            flag = 1;
                            break;
                        }
                    }
                    if (arr[arr.length - 1] != '') flag = 1;
                } else {
                    if (
                        reg.test(arr[0]) === false ||
                        arr[0].indexOf('；') == -1
                    ) {
                        flag = 1;
                    }
                }
                if (flag == 1) return false;
                else return true;
            }
        }, // 点击上传图片和文本信息
        async SubmitUpload() {
            let formData = new FormData(); //  用FormData存放上传文件
            this.SubmitForm.ImageList.forEach(file => {
                if (file.raw) {
                    formData.append('file', file.raw);
                } else {
                    formData.append('url', file.url);
                }
            });
            console.log('格式', this.Checkcontent(this.SubmitForm.textpicture));
            if (!this.SubmitForm.textcontent) {
                this.$notify.error({
                    title: '提交总结活动失败',
                    message: '活动总结内容未写'
                });
            } else if (
                this.SubmitForm.ImageList.length != 0 &&
                !this.SubmitForm.textpicture
            ) {
                this.$notify.error({
                    title: '提交总结活动失败',
                    message: '活动总结图片描述内容未写'
                });
            } else if (
                this.Checkcontent(this.SubmitForm.textpicture) === false
            ) {
                console.log(this.SubmitForm.textpicture);
                this.$notify.error({
                    title: '提交总结活动失败',
                    message: '活动总结图片描述内容格式错误'
                });
            } else {
                console.log(this.SubmitForm.textcontent);
                await uploadForm(this.SubmitForm, formData).then(res => {
                    this.$notify({
                        title: '已提交',
                        message: res.data,
                        type: 'success'
                    });
                    this.SubmitForm.textcontent = '';
                    this.SubmitForm.textpicture = '';
                    this.SubmitForm.ImageList = [];
                    this.SubmitForm.monthly = 0;
                    this.mothList = [];
                });
                this.showSubmitDialog = false;
            }
        },
        //导出已通过的活动总结的word文档
        async exportSummary(data, name) {
            this.$notify.success({
                title: '正在导出'
            });

            await exportSummary({ activityId: data })
                .then(res => {
                    //处理后端返回的文件流生成word并下载
                    //保存请求头中包含的文件名

                    let blob = new Blob([res], {
                        type:
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=UTF-8'
                    });

                    let link = document.createElement('a'); //创建超链接标签a
                    let objectUrl = URL.createObjectURL(blob);
                    link.setAttribute('href', objectUrl);
                    link.setAttribute('download', name + '汇编.docx');
                    link.click(); //触发点击事件
                    //释放内存
                    window.URL.revokeObjectURL(link.href);

                    this.$notify.success({
                        title: '导出成功'
                    });
                })
                .catch(err => {
                    this.$notify.error({
                        title: '导出失败'
                    });
                });
        }
    }
};
</script>
<style scoped>
.body {
    margin: 0 0 20px 2px;
    padding: 5px 15px 5px 15px;
}
.d-flex {
    margin-top: 30px;
}
</style>
