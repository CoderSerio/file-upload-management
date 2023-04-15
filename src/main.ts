import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { router, routes } from "./routes";
import { useUserStore } from "./stores";
import { USER_LEVEL } from "./type";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(ElementPlus);
app.use(router);

app.mount("#app");

//路由鉴权
const userStore = useUserStore();
router.beforeEach((to, from, next) => {
	// // next()
	// if(!userStore.getUser.level || !userStore.getUser){
	// 	next('/login')
	// 	return
	// }else{
	routes.find((item) => {
		if (item.path == to.path) {
			console.log(USER_LEVEL[+item.rightControl], userStore.getUser);
			if (USER_LEVEL[item.rightControl] > userStore.getUser.level) {
				alert("用户权限不足");
				next("/");
			} else {
				next();
			}
		}
	});
	next();
	// }
});
