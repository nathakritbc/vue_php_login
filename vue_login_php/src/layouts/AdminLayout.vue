<template>
  <!-- display on laptop -->
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="!mobile"
      class=""
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list>
        <v-list-item
          @click.stop="rail = !rail"
          prepend-avatar="/images/profile.png"
          :title="`${userLogin.firstname} ${userLogin.lastname}`"
          :subtitle="userLogin.email"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list-item
        v-for="item in items"
        :key="item.id"
        @click="changePage(item.path)"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
      ></v-list-item>
      <!-- <v-list-item
        v-if="userLogin.role === 'SUPER'"
        @click="() => {
          changePage('/admin/users/user-list')
        }"
        prepend-icon="mdi-table-account"
        value="user-management"
        >{{ $t("users") }}
      </v-list-item> -->
      <v-list-item
        @click="
          () => {
            dialog = true;
          }
        "
        prepend-icon="mdi-google-translate"
        value="item.value"
        >{{ $t("language") }}
      </v-list-item>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            v-if="!rail"
            @click="
              () => {
                logout();
              }
            "
            block
            prepend-icon="mdi-logout"
            color="primary"
          >
            Logout</v-btn
          >
          <v-icon color="primary" v-else @click="">mdi-logout</v-icon>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar color="primary" density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          v-if="!mobile"
          @click.stop="rail = !rail"
        ></v-app-bar-nav-icon>
      </template>

      <!-- <v-app-bar-title>Title</v-app-bar-title> -->

      <v-spacer></v-spacer>
      <!--
        <v-btn icon v-if="rail">
          <v-icon>mdi-logout</v-icon>
        </v-btn> -->
    </v-app-bar>

    <v-bottom-navigation v-if="mobile" v-model="value" color="primary" grow>
      <v-btn @click="changePage('/admin')">
        <v-icon>mdi-home-city</v-icon>
        Home
      </v-btn>

      <v-btn @click="changePage('/admin/data-set')">
        <v-icon>mdi-database</v-icon>
        DataSet
      </v-btn>

      <v-btn @click="changePage('/admin/add-dataset')">
        <v-icon>mdi-database-plus</v-icon>
        Create Data
      </v-btn>

      <v-btn @click.stop="drawerMobile = !drawerMobile">
        <v-icon>mdi-collage</v-icon>
        More
      </v-btn>
    </v-bottom-navigation>

    <v-navigation-drawer
      v-if="mobile"
      v-model="drawerMobile"
      temporary
      location="right"
    >
     <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
        nav
      >
        <template v-slot:append>
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in items"
          :key="item.id"
          @click="changePage(item.path)"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
        ></v-list-item>
        <v-list-item
          @click="
            () => {
              dialog = true;
            }
          "
          prepend-icon="mdi-google-translate"
          value="item.value"
          >{{ $t("language") }}
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          value="logout"
          @click="
            () => {
              logout();
            }
          "
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="h-full">
        <router-view></router-view>
        <!-- <footer>
          <FooterComponent />
        </footer> -->
      </v-container>
    </v-main>
  </v-app>

  <v-dialog v-model="dialog" width="auto">
    <v-card
      max-width="400"
      class=" "
      width="300"
      prepend-icon="mdi-google-translate"
    >
      <template v-slot:title
        ><span class="text-primary font-bold">
          {{ $t("selectLanguage") }}
        </span></template
      >
      <div class="pa-5">
        <v-select
          :label="$t('selectLanguage')"
          base-color="secondary"
          :model-value="selectedLocale"
          :items="listLanguageSelect"
          @update:model-value="changeLocale"
        ></v-select>
      </div>
      <template v-slot:actions>
        <!-- <v-btn  class="ms-auto" color="primary" @click="dialog = false">{{
          locale === "th" ? "ตกลง" : "Confirm"
        }}</v-btn> -->
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { LANGUAGE } from "@/Constants";
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
const selectedLocale = ref("English");
const listLanguageSelect = ref(["ภาษาไทย", "ภาษาอังกฤษ", "Thai", "English"]);
import { useLogoutSuper } from "@/hooks/useAuth";
import { useDisplay } from "vuetify";
import { language } from "@/hooks/usei18n";
const { mobile } = useDisplay();
const dialog = ref(false);
const router = useRouter();
import { AUTH } from "@/Constants";
import { getStringCookie } from "@/utils/jsCookie";
import FooterComponent from "@/components/FooterComponent.vue";
let userLogin = reactive({
  email: "",
});
const menuItemThai = [
  {
    id: 1,
    title: "หน้าหลัก",
    value: "home",
    icon: "mdi-home-city",
    path: "/admin",
  },
  {
    id: 2,
    title: "ชุดข้อมูล",
    value: "dataSet",
    icon: "mdi-database",
    path: "/admin/data-set",
  },
  {
    id: 3,
    title: "เพิ่ม ชุดข้อมูล",
    value: "create-data",
    icon: "mdi-database-plus",
    path: "/admin/add-dataset",
  },
  {
    id: 11,
    title: "ดัชนีข้อมูล",
    value: "DataIndex",
    icon: "mdi-drawing-box",
    path: "/admin/data-index",
  },
  {
    id: 12,
    title: "นโยบายเขต",
    value: "DistrictPolicy",
    icon: "mdi-file-document",
    path: "/admin/district-policy",
  },
  {
    id: 4,
    title: "หมวดหมู่",
    value: "Categories",
    icon: "mdi-collage",
    path: "/admin/categories",
  },
  {
    id: 5,
    title: "หน่วยงาน",
    value: "Units",
    icon: "mdi-album",
    path: "/admin/units",
  },
  {
    id: 7,
    title: "เจ้าของ",
    value: "data-owners",
    icon: "mdi-account-settings",
    path: "/admin/owners",
  },
  // {
  //   id: 8,
  //   title: "Data Collection",
  //   value: "data-collection",
  //   icon: "mdi-collage",
  //   path: "",
  // },
  {
    id: 9,
    title: "ประเภท",
    icon: "mdi-view-list",
    value: "view-types",
    path: "/admin/types",
  },
  {
    id: 10,
    title: "เอเจนซี่",
    value: "agency",
    icon: "mdi-camera-gopro",
    path: "/admin/agencies",
  },
  {
    id: 13,
    title: "รายการติดต่อ",
    value: "contacts",
    icon: "mdi-contacts",
    path: "/admin/contacts/contact-list",
  },
  {
    id: 14,
    title: "ผู้ใช้",
    value: "user",
    icon: "mdi-table-account",
    path: "/admin/users/user-list",
  },
  {
    id: 15,
    title: "ผู้ดูเเลระบบ",
    value: "admin",
    icon: "mdi-shield-crown",
    path: "/admin/admin-manage",
  },
];

const items = ref([
  {
    id: 1,
    title: "Home",
    value: "home",
    icon: "mdi-home-city",
    path: "/admin",
  },
  {
    id: 2,
    title: "DataSet",
    value: "dataSet",
    icon: "mdi-database",
    path: "/admin/data-set",
  },
  {
    id: 3,
    title: "Create Data",
    value: "create-data",
    icon: "mdi-database-plus",
    path: "/admin/add-dataset",
  },
  {
    id: 11,
    title: "Data Index",
    value: "DataIndex",
    icon: "mdi-drawing-box",
    path: "/admin/data-index",
  },
  {
    id: 12,
    title: "District Policy",
    value: "DistrictPolicy",
    icon: "mdi-file-document",
    path: "/admin/district-policy",
  },
  {
    id: 4,
    title: "Categories",
    value: "Categories",
    icon: "mdi-collage",
    path: "/admin/categories",
  },
  {
    id: 5,
    title: "Units",
    value: "Units",
    icon: "mdi-album",
    path: "/admin/units",
  },
  {
    id: 7,
    title: "Owner",
    value: "data-owners",
    icon: "mdi-account-settings",
    path: "/admin/owners",
  },
  // {
  //   id: 8,
  //   title: "Data Collection",
  //   value: "data-collection",
  //   icon: "mdi-collage",
  //   path: "",
  // },
  {
    id: 9,
    icon: "mdi-view-list",
    title: "View Types",
    value: "view-types",
    path: "/admin/types",
  },
  {
    id: 10,
    title: "Agency",
    value: "agency",
    icon: "mdi-camera-gopro",
    path: "/admin/agencies",
  },
  {
    id: 13,
    title: "Contact",
    value: "contacts",
    icon: "mdi-contacts",
    path: "/admin/contacts/contact-list",
  },
  {
    id: 14,
    title: "Users",
    value: "user",
    icon: "mdi-table-account",
    path: "/admin/users/user-list",
  },
  {
    id: 15,
    title: "Admin Manage",
    value: "admin",
    icon: "mdi-shield-crown",
    path: "/admin/admin-manage",
  },
]);

const logout = () => {
  if (!useLogoutSuper()) {
    console.error("logout error");
    return;
  }
  router.replace({ path: "/login" });
  router.removeRoute({ path: "/login" });
};
const rail = ref(false);
const drawer = ref(true);
const drawerMobile = ref(false);
const railMobile = ref(false);

const changeLanguage = () => {
  if (language.value === "th") {
    listLanguageSelect.value = ["ภาษาไทย", "ภาษาอังกฤษ"];
    selectedLocale.value = "ภาษาไทย";
    items.value = menuItemThai;
  } else {
    selectedLocale.value = "English";
    listLanguageSelect.value = ["English", "Thai"];
  }
};
const changeLocale = (locale) => {
  if (locale === "Thai") {
    localStorage.setItem(LANGUAGE, "th");
    router.go();
  }
  if (locale === "English") {
    localStorage.setItem(LANGUAGE, "en");
    router.go();
  }
  if (locale === "ภาษาไทย") {
    localStorage.setItem(LANGUAGE, "th");
    router.go();
  }
  if (locale === "ภาษาอังกฤษ") {
    localStorage.setItem(LANGUAGE, "en");
    router.go();
  }
};

onMounted(() => {
  changeLanguage();
  const isLogin = JSON.parse(getStringCookie(AUTH.isLoginSuper));
  userLogin = isLogin;
  if (userLogin.userType !== "SUPER") {
    const newItem = items.value.filter(
      (item) =>
        item.value !== "user" &&
        item.value !== "contacts" &&
        item.value !== "admin"
    );
    const newItemTh = menuItemThai.filter(
      (item) =>
        item.value !== "user" &&
        item.value !== "contacts" &&
        item.value !== "admin"
    );
    items.value = language.value === "th" ? newItemTh : newItem;
  }
  if (mobile.value) {
    drawer.value = true;
    rail.value = true;
  }
});

const value = ref(0);
const changePage = async (location) => {
  await router.push({ path: location });
};
</script>
