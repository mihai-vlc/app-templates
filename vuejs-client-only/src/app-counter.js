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
                <button @click="increment">increment</button>
                <button @click="decrement">decrement</button>
            </div>
        `,
    });
})((window.appComponents = window.appComponents || []));
