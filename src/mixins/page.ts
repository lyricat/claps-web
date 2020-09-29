import Vue, { VueConstructor } from "vue";
import { Component } from "vue-property-decorator";
import { Mutation } from "vuex-class";

export interface Page extends Vue {
  title: string;
}

@Component({
  head() {
    const vm = this as Page;
    return {
      title: vm.title,
      meta: [
        {
          hid: "theme-color",
          name: "theme-color",
          content: vm.$store.state.app.dark ? "#000000" : "#FFFFFF",
        },
      ],
    };
  },
  beforeRouteEnter(_to, _from, next) {
    next((vm: any) => {
      vm.setLang();
      vm.setPage();
    });
  },
})
export default class PageView extends Vue {
  @Mutation("app/SET_APPBAR") setAppbar;

  get pageTitle(): any {
    return "";
  }

  get description() {
    return "";
  }

  get appbar() {
    return {};
  }

  setLang() {
    let locale = "en";
    if (navigator.language.includes("zh")) {
      locale = "zh";
    } else if (navigator.language.includes("ja")) {
      locale = "ja";
    } else {
      locale = "en";
    }
    this.$i18n.locale = locale;
    // this.$vuetify.lang.current = locale;
    const doc: any = window.document;
    doc.title = this.pageTitle;
  }

  setPage() {
    this.setAppbar({
      title: this.pageTitle,
      ...this.appbar,
    });
  }
}
