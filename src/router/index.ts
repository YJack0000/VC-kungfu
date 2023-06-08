import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/HomeView.vue"),
        },
        {
            path: "/form",
            name: "form",
            component: () => import("../views/FormView.vue"),
        },
        {
            path: "/ready",
            name: "ready",
            component: () => import("../views/ReadyView.vue"),
        },
        {
            path: "/game",
            name: "game",
            component: () => import("../views/GameView.vue"),
        },
        {
            path: '/calc',
            name: 'calc',
            component: () => import('../views/CalcView.vue'),
        },
        {
            path: "/result",
            name: "result",
            component: () => import("../views/ResultView.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: () => import("../views/NotFoundView.vue"),
        },
    ],
})

export default router
