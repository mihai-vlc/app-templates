const Homepage = {
    setup() {
        return { msg: Vue.ref("Say hello") };
    },
    template: /*html*/ `
    <h1>Welcome to my application</h1>
    <div>{{msg}}</div>
    <input type="text" name="msg" v-model="msg" />`,
};

const CountersPage = {
    template: /*html*/ `<div>
    <app-counter></app-counter>
    <app-counter :initial-value="4"></app-counter>
    <app-counter></app-counter>
    <app-counter :initial-value="16"></app-counter>
    <app-counter></app-counter>
</div>`,
};

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: Homepage,
        },
        {
            path: "/counters",
            component: CountersPage,
        },
    ],
});

const app = Vue.createApp({
    template: /*html*/ `
<nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/counters">Counters</router-link>
</nav>
<router-view></router-view>
`,
});

app.use(router);

window.appComponents.forEach(function (component) {
    app.component(component.tagName, component);
});

app.mount("#app");
