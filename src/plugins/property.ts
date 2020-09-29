import { Plugin } from "@nuxt/types";
import createApiService from "@/services/createApiService";
import utils from "@/utils";

declare module "vue/types/vue" {
  interface Vue {
    title?: string;
    $utils: typeof utils;
    $icons: typeof utils.icons;
    $dayjs: typeof utils.dayjs;
    $apis: ReturnType<typeof createApiService>;
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $utils: typeof utils;
    $icons: typeof utils.icons;
    $dayjs: typeof utils.dayjs;
    $apis: ReturnType<typeof createApiService>;
  }
}

declare module "vuex/types/index" {
  interface Store<S> {
    $utils: typeof utils;
    $icons: typeof utils.icons;
    $dayjs: typeof utils.dayjs;
    $apis: ReturnType<typeof createApiService>;
  }
}

const plugin: Plugin = ({ app }, inject) => {
  inject("apis", createApiService(app));
  inject("utils", utils);
  inject("icons", utils.icons);
  inject("dayjs", utils.dayjs);
};

export default plugin;
