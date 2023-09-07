import router from './router';
import store from './store';
import {
    Notification
} from 'element-ui';



import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import {
    getToken
} from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({
    showSpinner: false
}); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();
    // set page title
    document.title = getPageTitle(to.meta.title);

    if (getToken()) {
        if (to.path == '/login') {
            // if is logged in, redirect to the home page
            next();
            NProgress.done();
        } else if(to.path == '/superadmin'){
            next()
        } else if(to.path == '/changepassword'){
            next()
        } else {
            const hasGetUserInfo = store.getters.stuName;
            if (hasGetUserInfo) {
                if(store.getters.lastlogin == null){
                    next(`/changepassword`);
                }else{
                    next();
                }
            } else {
                // get user info
                store.dispatch('user/getInfo').then(Resp => {
                    const {
                        data
                    } = Resp
                    const {
                        adminInStuVO
                    } = data
                    let role = adminInStuVO.authorities
                    // console.log('role:', role);
                    store.dispatch('permission/generateRoutes', {
                        role
                    }).then(() => {
                        // 根据roles权限生成可访问的路由表
                        // localStorage.shabi = "2"
                        // router.options = store.getters.routers
                        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                        next(`/`)
                        // next({
                        //     ...to,
                        //     replace: true
                        // }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record

                    })
                }).catch(error => {

                    // remove token and go to login page to re-login
                    store.dispatch('user/resetToken');
                    Notification({
                        title: '您已退出登录',
                        message: '当前登录态已过期，请重新登录。',
                    });
                    // Message.error(error || 'Has Error');
                    next(`/login`);
                    location.reload()
                    NProgress.done();
                })
            }
        }
    } else {
        /* has no token*/
        console.log('no token')
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next();
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
