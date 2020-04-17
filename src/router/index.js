import Vue from 'vue'
import VueRouter from 'vue-router'



import login from "../app/view/Login";
import home from "../app/view/Home"
import Groups from "../group/views/Groups";
import Devices from "../device/views/Devices";
import store from "../app/store/main";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
        meta: {
            authenticationRequired: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            authenticationRequired: false
        }
    },
    {
        path: "/Groups",
        name: "Groups",
        component: Groups,
        meta: {
            authenticationRequired: true
        }
    },
    {
        path: '/Devices',
        name: 'Devices',
        component: Devices,
        meta: {
            authenticationRequired: true
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach(function (to, from, next) {
    const authenticationStatus = store.getters.authenticationStatus;
    const authenticationRequired = to.meta.authenticationRequired;

    if (!authenticationRequired) {
        return next();
    }

    if (authenticationStatus == 'AUTHENTICATED') {
        return next();
    }

    next('/login');
});
export default router
