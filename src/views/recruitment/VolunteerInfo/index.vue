<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="VolunteerInfo"
            hide-default-footer
            sort-by="calories"
            class="elevation-1 body"
            disable-pagination
        >
        </v-data-table>
        <div class="text-center">
            <v-pagination
                v-model="VolunteerForm.currPage"
                :length="totalPage"
                :total-visible="7"
                circle
                @input="getVolunteerList"
            ></v-pagination>
        </div>
    </div>
</template>
<script>
import { getVolunteerInfo } from '../../../api/admin/recruit';
export default {
    data() {
        return {
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
                { text: '联系方式', value: 'phone', sortable: false },
                { text: 'QQ', value: 'qq', sortable: false }
            ],
            totalPage: 0,
            //  志愿者信息列表
            VolunteerInfo: [],
            // 页面对象
            VolunteerForm: {
                currPage: 1,
                activityId: 1
            }
        };
    },
    created() {},
    mounted() {
        if (this.$route.query.activityId) {
            this.getVolunteerList();
        }
    },
    methods: {
        //志愿者信息列表显示
        async getVolunteerList() {
            //    获取activityId并存在对象里面
            this.VolunteerForm.activityId = this.$route.query.activityId;
            await getVolunteerInfo(this.VolunteerForm).then(res => {
                if (res.code == 0) {
                    this.VolunteerInfo = res.data.list;
                    this.totalPage = res.data.totalPage;
                }
            });
        }
    }
};
</script>
