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
                    <v-toolbar-title>Organization-Info</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" persistent max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                添加组织
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="
                                                    editedItem.organizationName
                                                "
                                                label="组织名称"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-select
                                                v-model="editedItem.categoryId"
                                                :items="type"
                                                label="组织类型"
                                                item-text="categoryName"
                                                item-value="id"
                                            ></v-select>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            v-if="editedItem.categoryId == 2"
                                        >
                                            <v-select
                                                v-model="editedItem.collegeId"
                                                :items="collegeList"
                                                label="学院"
                                                item-text="collegeName"
                                                item-value="collegeId"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="close"
                                >
                                    取消
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save">
                                    保存
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="headline"
                                >此操作将删除该组织</v-card-title
                            >
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="closeDelete"
                                    >取消</v-btn
                                >
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="deleteItemConfirm"
                                    >删除</v-btn
                                >
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)"
                            v-bind="attrs"
                            v-on="on"
                        >
                            mdi-pencil
                        </v-icon>
                    </template>
                    <span>修改</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="deleteItem(item)"
                            v-bind="attrs"
                            v-on="on"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                    <span>删除</span>
                </v-tooltip>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import {
    getAllOrganization,
    getOrgnizationType,
    getAllCollege
} from '../../../api/common';
import {
    addOrganization,
    deleteOrganization,
    editOrganization
} from '../../../api/admin/personInfo/orgnization';
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: '组织名称',
                align: 'start',
                sortable: false,
                value: 'organizationName'
            },
            { text: '平均工时', value: 'averageTime', sortable: false },
            { text: '所属学院', value: 'collegeName', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false }
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {},
        type: [],
        collegeList: [],
        averageTime: []
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? '添加' : '修改';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        }
    },

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            getOrgnizationType().then(res => {
                this.type = res.data;
            });
            getAllOrganization().then(res => {
                this.desserts = res.data;
            });
            getAllCollege().then(res => {
                this.collegeList = res.data;
            });
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            var map = {
                organizationId: this.editedItem.organizationId
            };
            deleteOrganization(map)
                .then(res => {
                    this.$notify({
                        title: '已删除',
                        message: res.msg,
                        type: 'success'
                    });
                })
                .catch(err => {
                    this.$notify.error({
                        title: '删除失败',
                        message: err.msg
                    });
                });
            setTimeout(() => {
                this.initialize();
            }, 300);
            this.desserts.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                this.editedItem.id = this.editedItem.organizationId;
                console.log(this.editedItem);
                editOrganization(this.editedItem)
                    .then(res => {
                        this.$notify({
                            title: '已修改',
                            message: res.data.msg,
                            type: 'success'
                        });
                    })
                    .catch(err => {
                        this.$notify.error({
                            title: '添加失败',
                            message: err.msg
                        });
                    });
            } else {
                addOrganization(this.editedItem)
                    .then(res => {
                        this.$notify({
                            title: '已添加',
                            message: res.data.msg,
                            type: 'success'
                        });
                    })
                    .catch(err => {
                        this.$notify.error({
                            title: '添加失败',
                            message: err.msg
                        });
                    });
            }
            setTimeout(() => {
                this.initialize();
            }, 300);
            this.close();
        }
    }
};
</script>
<style scoped>
.body {
    margin: 0 0 20px 2px;
    padding: 5px 15px 5px 15px;
}
</style>
