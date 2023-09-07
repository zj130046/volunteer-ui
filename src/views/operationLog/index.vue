<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="desserts"
            class="elevation-1 body"
            disable-pagination
            hide-default-footer
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title
                        @click="
                            searchInput = '';
                            filterForm = { currPage: 1 };
                            initialize();
                        "
                        >Admin-Info</v-toolbar-title
                    >
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-col cols="2" style="padding-top: 35px">
                        <v-text-field
                            v-model="searchInput"
                            label="搜索活动"
                            append-icon="iconfont vo-sousuo"
                            @click:append="search"
                            @keyup.enter="search"
                        ></v-text-field>
                    </v-col>
                    <v-spacer> </v-spacer>
                    <v-col class="d-flex" sm="2" v-if="isSearch">
                        <v-select
                            v-model="filterForm.operationOrganization"
                            :items="operaList"
                            label="组织"
                            item-text="organizationName"
                            item-value="organizationId"
                            @change="initialize"
                            dense
                        ></v-select>
                    </v-col>
                </v-toolbar>
            </template>
            <template v-slot:item.operationCategory="{ item }">
                <v-chip :color="getColor(item.operationCategory)" dark small>
                    {{ checkCategory(item.operationCategory) }}
                </v-chip>
            </template>
        </v-data-table>
        <div class="text-center">
            <v-pagination
                v-model="filterForm.currPage"
                :length="totalPage"
                :total-visible="7"
                circle
                @input="initialize"
            ></v-pagination>
        </div>
    </div>
</template>
<script>
import { getLogs } from '../../api/admin/operateLog';
import { getAllOrganization } from '../../api/common';
export default {
    data() {
        return {
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'operationRecordId'
                },
                { text: '操作内容', value: 'operatorContent' },
                { text: '操作类别', value: 'operationCategory' },
                { text: '管理员', value: 'operatorName' },
                { text: '操作时间', value: 'updateTime' }
            ],
            totalPage: 0,
            desserts: [],
            filterForm: {
                currPage: 1,
                operationOrganization: 0,
                operationContent: ''
            },
            searchInput: '',
            operaList: [],
            //组织id与日志id相同
            organizationId: 0,
            //是否显示选择栏
            isSearch: true
        };
    },
    created() {
        this.organizationId = localStorage.organizationId;
        //不是总队管理员 则不显示筛选
        if (!['1', '2', '3'].includes(localStorage.rollId)) {
            this.isSearch = false;
            this.filterForm.operationOrganization = this.organizationId;
        }
        this.getorg();
        this.initialize();
    },
    methods: {
        getorg() {
            getAllOrganization().then(res => {
                this.operaList = res.data;
                // console.log(this.operaList)
            });
        },
        async initialize() {
            console.log(this.filterForm);
            await getLogs(this.filterForm)
                .then(res => {
                    this.desserts = res.data.list;
                    this.totalPage = res.data.totalPage;
                    this.filterForm.operationContent = null;
                })
                .catch(err => {
                    this.$message.error('网络错误！');
                });
        },
        getColor(operationCategory) {
            if (operationCategory == 2) return 'rgb(244,67,54)';
            else if (operationCategory == 3) return 'rgb(92,187,246)';
            else return 'rgb(83,178,87)';
        },
        search() {
            console.log(this.searchInput);
            this.filterForm = {
                currPage: 1,
                operationContent: this.searchInput
            };
            this.initialize();
        },
        checkCategory(id) {
            switch (id) {
                case 1:
                    return '增加';
                case 2:
                    return '删除';
                case 3:
                    return '修改';
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
.d-flex {
    margin-top: 30px;
}
</style>
