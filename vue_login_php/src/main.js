import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import "./style.css";
import "ant-design-vue/dist/reset.css";
import router from "./routes";
import Antd from "ant-design-vue";
import App from "./App.vue";
const app = createApp(App);

// Use the router and store
app.use(router);
app.use(Antd);

// Register plugins
registerPlugins(app);

// Mount the app
app.mount("#app");
