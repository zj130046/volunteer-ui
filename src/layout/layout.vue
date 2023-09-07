<template>
    <div
        class="page_root"
        v-resize="onResize"
        :class="{ miniVariant: miniVariant }"
    >
        <!--菜单开始-->
        <v-navigation-drawer
            v-model="menuDrawer"
            disable-resize-watcher
            mini-variant-width="74"
            class="page_drawer"
            absolute
            dark
            style="z-index: 4"
        >
            <template v-slot:img>
                <v-img
                    src="https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg"
                    gradient="rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)"
                />
            </template>

            <v-list nav class="py-0">
                <v-list-item @click="onAxios" style="margin-top: 8px">
                    <v-list-item-avatar size="40">
                        <img src="../assets/volunteer.png" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="title"
                            >志愿者服务平台</v-list-item-title
                        >
                        <v-list-item-subtitle
                            >WustVolunteer</v-list-item-subtitle
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list nav class="py-0" style="margin-top: 20px">
                <template v-for="(item, index) in menus">
                    <template
                        v-if="
                            item.visible &&
                                item.children &&
                                item.children.length > 1
                        "
                    >
                        <v-list-group
                            :key="item.path"
                            :prepend-icon="item.meta.icon"
                            :group="item.name"
                            active-class="v_list_group_active"
                            :value="checkMenuGroupValue(item.path)"
                        >
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        item.meta.title
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item
                                v-for="(child, key) in item.children"
                                :key="key"
                                :to="{ name: child.name }"
                                active-class="primary"
                            >
                                <v-list-item-avatar>
                                    <v-icon v-text="child.meta.icon"></v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        child.meta.title
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                    </template>
                    <template v-else>
                        <v-list-item
                            v-if="item.visible"
                            :key="index"
                            :to="{ path: item.path }"
                            active-class="primary"
                        >
                            <v-list-item-icon>
                                <v-icon>{{ item.meta.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    item.meta.title
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </template>
            </v-list>
        </v-navigation-drawer>
        <!--菜单结束-->
        <!--主体开始-->
        <v-main class="page_right_content" :class="{ darkMode: darkMode }">
            <v-toolbar absolute class="header">
                <!--处理显示导航菜单-->
                <v-btn
                    fab
                    style="margin-right: 16px"
                    text
                    @click="handleMenuDrawer"
                    v-if="!menuDrawer"
                >
                    <v-icon v-if="menuDrawer">mdi-drag</v-icon>
                    <v-icon v-else>mdi-drag-horizontal</v-icon>
                </v-btn>
                <!--处理导航菜单mini样式-->
                <v-btn
                    fab
                    style="margin-right: 16px"
                    text
                    @click="handleMiniMenu"
                    v-else
                >
                    <v-icon v-if="!miniVariant">mdi-view-headline</v-icon>
                    <v-icon v-else>mdi-view-headline</v-icon>
                </v-btn>
                <!-- <v-btn small text disabled></v-btn> -->
                <v-toolbar-title style="text-transform: capitalize">{{
                    pageTitle
                }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu
                    v-model="noticeVisible"
                    :close-on-content-click="false"
                    max-width="280px"
                    offset-y
                    open-on-hover
                >
                    <template v-slot:activator="{ on }">
                        <v-btn text v-on="on">
                            <v-icon>mdi-bell</v-icon>
                        </v-btn>
                    </template>

                    <!-- 公告 -->
                    <v-card min-width="200">
                        <v-list dense>
                            <v-subheader>Announcement</v-subheader>
                            <v-list-item-group color="primary">
                                <v-list-item
                                    v-for="(item, i) in announceList"
                                    :key="i"
                                >
                                    <v-list-item-content
                                        @click="showAnnounceDialog(item)"
                                    >
                                        <v-list-item-title
                                            v-text="item.title"
                                        ></v-list-item-title>
                                        <v-list-item-subtitle
                                            v-html="
                                                item.createTime +
                                                    '    ' +
                                                    item.adminName
                                            "
                                        ></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                        <v-divider></v-divider>
                    </v-card>
                </v-menu>

                <!-- 公告弹窗 -->
                <v-dialog v-model="announceDialog" width="500" persistent>
                    <v-card>
                        <v-card-title class="headline">
                            {{ announcement.title }}
                        </v-card-title>

                        <v-card-text
                            style="white-space: pre-wrap; letter-spacing: 1px"
                        >
                            {{ announcement.content }}
                        </v-card-text>
                        <v-card-actions>
                            <v-sapcer></v-sapcer>
                            <v-btn
                                color="green darken-1"
                                text
                                @click="announceDialog = false"
                            >
                                确定
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-btn text @click="fullScreen" class="min_hide">
                    <v-icon>mdi-arrow-expand-all</v-icon>
                </v-btn>
                <v-menu open-on-hover top offset-y nudge-bottom="100">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn text class="min_hide" v-bind="attrs" v-on="on">
                            <v-icon>mdi-account-circle</v-icon>
                            <div class="name">
                                {{ studentName }}
                            </div>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item>
                            <v-btn text @click="logout">退出登录</v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn text @click="changepassword">修改密码</v-btn>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-btn text @click="settingsVisible = true">
                    <v-icon>mdi-settings</v-icon>
                </v-btn>
            </v-toolbar>
            <div class="zwf"></div>
            <transition name="fade-transform" mode="out-in">
                <keep-alive :key="curTime">
                    <router-view v-if="$route.meta.keepAlive" />
                </keep-alive>
            </transition>
            <transition name="fade-transform" mode="out-in">
                <router-view
                    v-if="!$route.meta.keepAlive"
                    :key="curTime"
                ></router-view>
            </transition>
        </v-main>
        <v-navigation-drawer v-model="settingsVisible" absolute temporary right>
            <v-subheader>Color Option</v-subheader>
            <v-list subheader>
                <template v-for="(item, key) in colors">
                    <v-list-item
                        :key="key + 2"
                        :class="{
                            'v-list-item--active': item.active
                        }"
                        @click="handleChangeColor(item.color, key)"
                    >
                        <v-list-item-avatar
                            :color="item.color"
                            :size="25"
                        ></v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-subtitle>{{
                                item.name
                            }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
            <!-- <v-subheader>Language</v-subheader>
            <v-radio-group
                v-model="Language"
                @change="handleCutover"
                style="margin: 0 20px"
            >
                <v-radio label="中文" value="zh_CN" color="primary"></v-radio>
                <v-radio
                    label="English"
                    value="en_US"
                    color="primary"
                ></v-radio>
            </v-radio-group> -->
            <v-subheader>Dark Mode</v-subheader>
            <v-switch
                v-model="darkMode"
                @change="onDarkModeChange"
                style="margin-left: 20px"
            ></v-switch>
        </v-navigation-drawer>
        <!--主体结束-->
    </div>
</template>
<script>
import { getAnnouncement } from '../api/enterPage';
import store from '../store';
export default {
    data() {
        return {
            studentName: localStorage.getItem('name'),
            menuDrawer: true,
            expandOnHover: false,
            noticeVisible: false,
            bg: {
                src:
                    'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
                'linear-gradient':
                    'to top right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)'
            },
            miniVariant: false,
            Language: 'en_US',
            settingsVisible: false,
            isFullScreen: false,
            name: '',
            desc: '',
            token: '',
            news: [],
            admins: [
                ['Management', 'people_outline'],
                ['Settings', 'settings']
            ],
            cruds: [
                ['Create', 'add'],
                ['Read', 'insert_drive_file'],
                ['Update', 'update'],
                ['Delete', 'delete']
            ],
            announceList: [],
            announceDialog: false,
            announcement: {
                title: '',
                content: ''
            }
        };
    },
    computed: {
        loadPaths() {
            return this.$route.path.split('/');
        },
        curTime() {
            return this.$store.state.curTime;
        },
        pageTitle() {
            return this.$route.meta.title;
        },
        locale(key) {
            return this.$t('header.' + key);
        },
        darkMode: {
            get: function() {
                return this.$store.state.app.darkMode;
            },
            set: function(newValue) {
                this.$store.state.app.darkMode = newValue;
            }
        },
        menus() {
            console.log('router,', this.$router);
            const { options } = this.$router;
            return options.routes;
        },
        colors() {
            return this.$store.state.app.colors;
        }
    },
    created() {
        this.getAnnouncement();
    },
    mounted() {},
    beforeDestroy() {
        localStorage.clear();
    },
    destroyed() {
        localStorage.clear();
    },
    methods: {
        changepassword() {
            this.$router.push({ path: '/changepassword' });
        },
        logout() {
            localStorage.clear();
            this.$router.push('/login');
            location.reload();
        },
        onResize(e) {
            if (!e) return;
            const { innerWidth } = e.srcElement;
            if (innerWidth > 1250) {
                // console.log('BOOM');
                this.menuDrawer = true;
            }
        },
        onDarkModeChange(val) {
            this.$vuetify.theme.dark = val;
            this.$store.commit('handleDarkMode', val);
        },
        checkMenuGroupValue(path) {
            const arr = path.split('/');
            if (!arr[1]) {
                return false;
            }
            return this.loadPaths.includes(arr[1]);
        },
        handleMenuDrawer() {
            this.menuDrawer = !this.menuDrawer;
        },
        handleMiniMenu() {
            console.log('handleMenuDrawer', this.$store.getters.addRouters);

            this.$router.options = this.$store.getters.routers;
            console.log('after router:', this.$router);
            this.miniVariant = !this.miniVariant;
        },
        onAxios() {
            console.log('reflesh');
        },
        tmyx() {
            this.$store.commit('handleChangeMlmlh');
        },
        tmlx() {
            this.$store.commit('handleChangeYmlmlh');
        },
        handleChangeColor(color, key) {
            this.$vuetify.theme.themes.light.primary = color;
            this.$store.commit('handleSetColor', key);
            this.$vuetify.theme.dark = false;
            this.$store.commit('handleDarkMode', false);
        },
        handleCutover(val) {
            this.$i18n.locale = val;
        },
        handleSignOut() {
            this.$store.commit('handleSignOut');
            setTimeout(() => {
                this.$router.push('/login');
            }, 300);
        },
        fullScreen() {
            const el = document.documentElement;
            const rfs =
                el.requestFullScreen ||
                el.webkitRequestFullScreen ||
                el.mozRequestFullScreen ||
                el.msRequestFullscreen;
            if (typeof rfs != 'undefined' && rfs) {
                rfs.call(el);
            }
            this.isFullScreen = true;
            return;
        },
        async getAnnouncement() {
            await getAnnouncement().then(res => {
                console.log(res.data);
                if (res.code == 0) {
                    this.announceList = res.data;
                }
            });
        },
        showAnnounceDialog(item) {
            this.announcement.title = item.title;
            this.announcement.content = item.content;
            this.announceDialog = true;
        }
    }
};
</script>
<style scoped>
.name {
    font-size: 18px;
    padding-left: 8px;
}
</style>
