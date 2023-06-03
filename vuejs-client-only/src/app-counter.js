(function (/** @type {import('vue').Component[]} */ appComponents) {
    /** @type {import('vue')} */
    var Vue = window.Vue;
    const { ref, onMounted, onUnmounted } = Vue;

    appComponents.push({
        tagName: "app-counter",
        props: {
            initialValue: {
                type: Number,
                default: 0,
            },
        },
        setup(props) {
            const count = ref(props.initialValue);

            onMounted(() => {
                console.log("Counter component mounted");
            });

            onUnmounted(() => {
                console.log("Counter component UNmounted");
            });

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
        template: /*html*/ `
            <div>
                <h1>COUNTER</h1>
                <div>count is {{ count }}</div>
                <n-button @click="increment">increment</n-button>
                -
                <n-button @click="decrement">decrement</n-button>
            </div>
        `,
    });
})((window.appComponents = window.appComponents || []));
