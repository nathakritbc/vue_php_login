import UserLayout from "./layouts/UserLayout.vue";
import UserFullWidthLayout from "./layouts/UserFullWidthLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";

import AdminLayout from "./layouts/AdminLayout.vue";

// main page
import MainHomePage from "./pages/main/HomePage.vue";

// login Page
import LoginPageVue from "./pages/LoginPage.vue";
import LoginPageUser from "./pages/LoginPageUser.vue";

// user page
import HomePage from "./pages/users/HomePage.vue";
import AddDataSetUserPage from "./pages/users/data-set/AddDataSetPage.vue";
import EditDataSetUserPage from "./pages/users/data-set/EditDataSetPage.vue";

import ShowDataSetPage from "./pages/main/ShowDataSetPage.vue";
import DataIndexPage from "./pages/DataIndexPage.vue";
import AboutPage from "./pages/AboutPage.vue";
import ContactPage from "./pages/ContactPage.vue";
import ExelTestPage from "./pages/main/ExelTest.vue";

//admin page
import AdminHomePage from "./pages/admin/data-set/HomePage.vue";
import AddDataSetPage from "./pages/admin/data-set/AddDataSetPage.vue";
import EditDataSetPage from "./pages/admin/data-set/EditDataSetPage.vue";
import AdminDataIndexPage from "./pages/admin/data-index/DataIndexPage";
import DataIndexShowRawDataPage from "./pages/admin/data-index/ShowRawDataPage.vue";
import IndexDistrictPolicyPage from "./pages/admin/district-policy/IndexPage.vue";
import EditUserPassword from "./pages/EditUserPassword.vue";
import ContactDataTable from "./pages/admin/contact/data-table.vue";
import AdminManagePage from "./pages/admin/manage-admin/index";
// admin/user
import UserListPage from "./pages/admin/user/UserListPage.vue";

import DataSetMainPage from "./pages/admin/data-set/MainPage";
import RegisterUserPage from "./pages/RegisterUserPage.vue";
import GeoMapPage from "./pages/GeoMapPage.vue";

import {
  useAuth as isLogin,
  useAuthSuperAdmin as isSuperAdmin,
} from "@/hooks/useAuth";

import { createWebHistory, createRouter } from "vue-router";
import NotFoundPageVue from "./pages/NotFoundPage.vue";
import { onBeforeMount } from "vue";
import ShowCategoryPageVue from "./pages/users/categories/ShowCategoryPage.vue";
import ShowUnitPage from "./pages/users/units/ShowUnitPage.vue";
import ShowOwnerPage from "./pages/users/owners/ShowOwnerPage.vue";
import ShowAgengyPage from "./pages/users/agency/ShowAgengyPage.vue";
import ShowTypePage from "./pages/users/types/ShowTypePage.vue";

const routes = [
  // user path or user role
  {
    name: "edit-password-user-page",
    path: "/edit-password-user",
    component: EditUserPassword,
  },
  {
    name: "login-page",
    path: "/login",
    component: LoginPageVue,
  },
  {
    name: "login-user-page",
    path: "/login-user",
    component: LoginPageUser,
  },
  {
    name: "register-user-page",
    path: "/register-user",
    component: RegisterUserPage,
  },
  {
    name: "user-layout",
    path: "/",
    component: UserLayout,
    // beforeEnter: async (to, from) => {
    //   if (!isLogin()) {
    //     return {
    //       path: "/login",
    //       // query: { redirect: to.fullPath },
    //     };
    //   }
    //   return true;
    // },
    children: [
      {
        name: "home-page",
        path: "/",
        component: HomePage,
      },
      {
        name: "geo-map-page",
        path: "/geo-map",
        component: GeoMapPage,
      }
    ],
  },
  {
    name: "main-layout",
    path: "/main",
    // beforeEnter: (to, from) => {
    //   if (!isLogin()) {
    //     return {
    //       path: "/login",
    //       // query: { redirect: to.fullPath },
    //     };
    //   }
    //   return true;
    // },
    component: MainLayout,
    children: [
      {
        name: "main-home-page",
        path: "",
        component: MainHomePage,
      },
      {
        name: "exel-main-page",
        path: "exel-file",
        component: ExelTestPage,
      },
    ],
  },
  {
    name: "full-width-layout",
    path: "/full-width",
    // beforeEnter: (to, from) => {
    //   if (!isLogin()) {
    //     return {
    //       path: "/login",
    //       // query: { redirect: to.fullPath },
    //     };
    //   }
    //   return true;
    // },
    component: UserFullWidthLayout,
    children: [
      // {
      //   name: "add-dataset-page-full-width",
      //   path: "add-dataset",
      //   component: AddDataSetUserPage,
      // },
      // {
      //   name: "edit-data-page-full-width",
      //   path: "edit-data/:id",
      //   component: EditDataSetUserPage,
      // },}
      {
        name: "show-data-set-page",
        path: "show-data-set-page/:id",
        component: ShowDataSetPage,
      },
      {
        name: "data-index-page",
        path: "data-index",
        component: DataIndexPage,
      },
      {
        name: "about-page",
        path: "about",
        component: AboutPage,
      },
      {
        name: "contact-page",
        path: "contact",
        component: ContactPage,
      },
    ],
  },
  {
    name: "admin-layout",
    path: "/admin",
    // admin main layout
    beforeEnter: (to, from) => {
      if (!isSuperAdmin()) {
        return {
          path: "/login",
          // query: { redirect: to.fullPath },
        };
      }
      return true;
    },
    children: [
      {
        name: "admin-layout",
        path: "",
        component: AdminLayout,
        children: [
          {
            name: "admin-manage-page",
            path: "admin-manage",
            component: AdminManagePage,
          },
          {
            name: "admin-data-index-page",
            path: "data-index",
            children: [
              {
                name: "data-index-show-page",
                path: "",
                component: AdminDataIndexPage,
              },
              {
                name: "data-index-show-raw-data-page",
                path: ":id",
                component: DataIndexShowRawDataPage,
              },
            ],
          },
          {
            name: "admin-district-policy",
            path: "district-policy",
            component: IndexDistrictPolicyPage,
          },
          {
            name: "admin-data-set-list-page",
            path: "",
            component: AdminHomePage,
          },
          {
            name: "admin-home-page",
            path: "data-set",
            component: DataSetMainPage,
          },
          {
            name: "add-dataset-page",
            path: "add-dataset",
            component: AddDataSetPage,
          },
          {
            name: "edit-dataset-page",
            path: "edit-dataset/:id",
            component: EditDataSetPage,
          },
          {
            name: "categories",
            path: "categories",
            children: [
              {
                name: "show-categories-page",
                path: "",
                component: ShowCategoryPageVue,
              },
            ],
          },
          {
            name: "units",
            path: "units",
            children: [
              {
                name: "show-units-page",
                path: "",
                component: ShowUnitPage,
              },
            ],
          },
          {
            name: "owners",
            path: "owners",
            children: [
              {
                name: "show-owners-page",
                path: "",
                component: ShowOwnerPage,
              },
            ],
          },
          {
            name: "agencies",
            path: "agencies",
            children: [
              {
                name: "show-agencies-page",
                path: "",
                component: ShowAgengyPage,
              },
            ],
          },
          {
            name: "types",
            path: "types",
            children: [
              {
                name: "show-types-page",
                path: "",
                component: ShowTypePage,
              },
            ],
          },
          {
            name: "contacts",
            path: "contacts",
            children: [
              {
                name: "contact-list-page",
                path: "contact-list",
                component: ContactDataTable,
              },
            ],
          },
          {
            name: "users",
            path: "users",
            children: [
              {
                name: "user-list-page",
                path: "user-list",
                component: UserListPage,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "notFoundPage",
    path: "/:pathMatch(.*)*",
    component: NotFoundPageVue,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
