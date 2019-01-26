import Vue from 'vue'
import Router from 'vue-router'

// import components for router
import LoginComponent from '../components/Login.vue'
import ProfileComponent from '../components/Profile.vue'
import AboutComponent from '../components/About.vue'

Vue.use(Router)

export default new Router({
    routes : [
        {
            path : "/",
            name : "login_route",
            component : LoginComponent
        },
        {
            path : "/about",
            name : "about_route",
            component : AboutComponent
        },
        {
            path : "/profile",
            name : "profile_route",
            component : ProfileComponent,
            props: true //IMP
        }
    ]
})