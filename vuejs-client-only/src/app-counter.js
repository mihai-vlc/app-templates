(function () {
    window.appComponents.push({
        tagName: "app-counter",
        setup() {
            const count = Vue.ref(0);

            return {
                count: count,
                increment() {
                    count.value += 4;
                },
                decrement() {
                    count.value -= 4;
                },
            };
        },
        template: /*html*/ `<div>
        <h1>COUNTER</h1>
        <div>count is {{ count }}</div>
        <button @click="increment">increment</button>
        <button @click="decrement">decrement</button>
        </div>`,
    });
})((window.appComponents = window.appComponents || []));
