/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
// Composables
import { createVuetify } from "vuetify";

const myCustomLightTheme = {
  dark: false,
  colors: {
    // background: "#FFFFFF",
    // surface: "#FFFFFF",
    // primary: "#084e82",
    // // "primary-darken-1": "#084e82",
    // secondary: "#6592B4",
    // // "secondary-darken-1": "#018786",
    // info: "#00a0df",
    // success: "#009b64",
    // warning: "#F3F590",
    // error: "#F59390",
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  // blueprint: md3,

  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
});
