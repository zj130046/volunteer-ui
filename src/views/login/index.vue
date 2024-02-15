<template>
    <div class="login_container" :class="{ login_mlmlh: mlmlh }">
        <v-img
            src="https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-4.jpg"
            gradient="rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)"
        />

        <v-toolbar absolute flat dark color="transparent" min-width="100%">
            <v-btn text disabled>WUST 志愿活动管理平台</v-btn>
            <v-spacer></v-spacer>
            <v-btn text :to="{ name: 'login' }" style="margin: 0 20px">
                <v-icon style="margin-right: 10px">mdi-fingerprint</v-icon>Login
            </v-btn>
        </v-toolbar>
        <div class="wrap">
            <v-card class="inner_card">
                <v-card class="right" target="_blank">
                    <div class="vicon">
                        <img src="../../assets/volunteer.png" alt="" />
                    </div>
                    <div class="title" color="white">
                        管理员登陆
                        <span class="version">{{ version }}</span>
                    </div>
                </v-card>
                <div class="left">
                    <div class="row">
                        <v-text-field
                            v-model="form.username"
                            label="Account"
                            min-width="100%"
                            dense
                            :value="form.username"
                            prepend-icon="mdi-account-outline"
                            @keydown="changeinput()"
                        ></v-text-field>
                    </div>

                    <div class="row">
                        <v-text-field
                            v-model="form.password"
                            label="Password"
                            min-width="100%"
                            :value="form.password"
                            type="password"
                            prepend-icon="mdi-lock-outline"
                        ></v-text-field>
                    </div>

                    <div class="row row_f">
                        <v-btn
                            block
                            x-large
                            rounded
                            color="primary"
                            @click="handleSignBtn"
                            >let's go</v-btn
                        >
                    </div>
                </div>
                <v-dialog v-model="dialog" width="400" persistent>
                    <v-card
                        class="mx-auto"
                        max-width="400"
                        height="150"
                        outlined
                    >
                        <v-card-title>
                            <v-icon>iconfont vo-xinxi</v-icon>
                        </v-card-title>
                        <v-card-text
                            >您正在登陆Super
                            Admin账号，点击确定获取动态密码</v-card-text
                        >
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                text
                                @click="
                                    dialog = false;
                                    form.username = '';
                                "
                            >
                                取消
                            </v-btn>
                            <v-btn color="primary" text @click="send">
                                发送
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </div>
        <div class="bottomBox">
            武汉科技大学青年志愿者服务总队 ×
            <a href="http://wustlinghang.cn/" target="_blank">
                武汉科技大学领航工作室
            </a>
            <hr />
            <div>
                ©2017 - 2021 武汉科技大学青年志愿者服务总队. All Rights
                Reserved. ICP证:
                <a href="http://www.beian.gov.cn/" target="_blank">
                    鄂ICP备18027181号-1
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { sendpassword } from '../../api/user';
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            timeHello: '',
            mlmlh: false,
            dialog: false,
            //版本号
            version: 'v2021.5.28'
            //问候语
        };
    },
    created() {
        this.getDate();
    },
    methods: {
        send() {
            sendpassword()
                .then(res => {
                    this.$notify({
                        title: '发送成功',
                        message: res.msg,
                        type: 'success'
                    });
                })
                .catch(err => {
                    this.$notify.error({
                        title: '发送失败',
                        message: err
                    });
                });
            this.dialog = false;
        },
        changeinput() {
            if (this.form.username == 'superAdmin') {
                this.dialog = true;
            }
        },
        async handleSignBtn() {
            this.$store
                .dispatch('user/login', this.form)
                .then(res => {
                    this.mlmlh = true;
                    if (this.form.username == 'superAdmin') {
                        this.$router
                            .push({
                                path: '/superadmin'
                            })
                            .catch(() => {});
                    } else {
                        this.$router
                            .push({
                                path: this.redirect || '/'
                            })
                            .catch(() => {});
                        this.$notify({
                            title: `${this.timeHello}`,
                            message: `${this.form.username}`,
                            type: 'success',
                            duration: 3000,
                            offset: 60
                        });
                    }
                })
                .catch(err => {
                    this.$notify.error({
                        title: '登陆失败',
                        message: '请重新登录'
                    });
                });
        },
        getDate() {
            let date = new Date().getHours();
            if (date >= 6 && date <= 8) {
                this.timeHello = '早上好！';
            } else if (date > 8 && date < 12) {
                this.timeHello = '上午好！';
            } else if (date >= 12 && date <= 14) {
                this.timeHello = '中午好！';
            } else if (date > 14 && date < 19) {
                this.timeHello = '下午好！';
            } else if (date >= 19 && date < 24) {
                this.timeHello = '晚上好！';
            } else {
                this.timeHello = '夜深了，要早点休息哟 ~';
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.login_container {
    height: 100vh;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    position: relative;

    .v-image {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
        .v-image__image {
            background-position: center center;
            background-size: 100vh auto;
        }
    }
    .login_footer {
        position: absolute;
        left: 0;
        bottom: 0;
        line-height: 50px;
        width: 100%;
    }
    .wrap {
        position: relative;
        z-index: 1;
        .inner_card {
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
            animation: fadeInUp 0.3s linear;
            padding-top: 130px;
            padding-bottom: 30px;
            .left {
                width: 500px;
                padding: 0 40px;
                margin: 0 10px;
                .row {
                    margin-top: 30px;
                }
                .row_f {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 10px;
                }
            }
            .right {
                position: absolute;
                width: 86%;
                background-color: lightsalmon;
                padding: 20px 0;
                left: 7%;
                top: -30px;
                text-align: center;
                .vicon {
                    width: 60px;
                    height: 60px;
                    margin: 0 auto;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .title {
                    margin-top: 10px;
                    color: #fff;
                    position: relative;
                    .version {
                        position: absolute;
                        font-size: 16px;
                        top: 10px;
                        right: 10px;
                    }
                }
            }
        }
    }
    .bottomBox {
        position: absolute;
        bottom: 15px;
        width: 100%;
        height: 60px;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.5);
        font-size: 16px;
        color: #eee;
        padding: 10px 0;
        user-select: none;
        text-align: center;
        a {
            color: #eee;
            transition: 0.2s ease-in-out;
            text-decoration: none;
        }
        a:hover {
            color: #fff;
            transition: 0.2s ease-in-out;
        }
        hr {
            width: 90%;
            margin: 5px auto;
            height: 1.5px;
            background-image: linear-gradient(
                to right,
                rgba(255, 255, 255, 0),
                black,
                rgba(0, 0, 0, 0)
            );
        }
    }
}
.login_mlmlh {
    transform: scale(5);
    opacity: 0;
}

@media screen and (max-width: 960px) and (min-width: 320px) {
    .login_container {
        .wrap {
            .wrap_title {
                font-size: 36px;
                margin-bottom: 30px;
            }
            .inner_card {
                width: auto;
                margin: 30px;
                .left {
                    width: auto;
                    padding: 30px;
                }
                .right {
                    .v-icon {
                        display: none;
                    }
                    .title {
                        padding: 10px;
                        .version {
                            top: 40px;
                        }
                    }
                }
            }
        }
        .bottomBox {
            bottom: 40px;
            font-size: 12px;
            hr {
                width: 90%;
                margin: 5px auto;
                height: 1.5px;
                background-image: linear-gradient(
                    to right,
                    rgba(255, 255, 255, 0),
                    black,
                    rgba(0, 0, 0, 0)
                );
            }
        }
    }
}
</style>
