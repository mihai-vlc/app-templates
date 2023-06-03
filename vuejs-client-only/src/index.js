(function () {
    /** @type {import('vue')} */
    var Vue = window.Vue;
    /** @type {import('vue-router')} */
    var VueRouter = window.VueRouter;

    const { ref, createApp } = Vue;
    const { createRouter, createWebHashHistory } = VueRouter;

    /** @type {import('vue').Component} */
    const Homepage = {
        setup() {
            return { msg: ref("Say hello") };
        },
        template: /*html*/ `
            <h1>Welcome to my application</h1>
            <div>{{msg}}</div>
            <n-space justify="center">
                <n-input v-model:value="msg"></n-input>
                <n-button>Click me</n-button>
            </n-space>
        `,
    };

    /** @type {import('vue').Component} */
    const CountersPage = {
        template: /*html*/ `
            <div>
                <app-counter></app-counter>
                <app-counter :initial-value="4"></app-counter>
                <app-counter></app-counter>
                <app-counter :initial-value="16"></app-counter>
                <app-counter></app-counter>
            </div>
        `,
    };

    const router = createRouter({
        history: createWebHashHistory(),
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

    const app = createApp({
        setup() {
            return {
                darkTheme: naive.darkTheme,
            };
        },
        template: /*html*/ `
            <n-config-provider :theme="darkTheme">
                <nav>
                    <router-link to="/">Home</router-link> |
                    <router-link to="/counters">Counters</router-link>
                </nav>
                <router-view></router-view>
            </n-config-provider>
        `,
    });

    app.use(router);
    app.use(naive);

    window.appComponents.forEach(function (component) {
        app.component(component.tagName, component);
    });

    app.mount("#app");
})();
