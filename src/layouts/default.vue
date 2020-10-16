<template>
  <v-app>
    <top-bar />
    <v-main>
      <v-container class="pa-0 my-0">
        <template v-if="breadcrumbItems.length > 1">
          <v-breadcrumbs divider="/" :items="breadcrumbItems"></v-breadcrumbs>
        </template>
      </v-container>
      <nuxt />
    </v-main>
    <toast />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopBar from "@/components/TopBar.vue";
import { Mutation, State } from "vuex-class";

@Component({
  middleware: "i18n",
  components: {
    "top-bar": TopBar,
  },
})
class DefaultLayout extends Vue {
  @State((state) => state.auth.token) token;

  @Mutation("app/SET_ASSETS") setAssets;
  @Mutation("auth/SET_PROFILE") setProfile;
  @Mutation("auth/SET_AUTHINFO") setAuthInfo;
  @Mutation("auth/SET_TOKEN") setToken;

  get breadcrumbItems() {
    const path = (this.$route.name as string).split("-");
    const id = this.$route.params.id;
    console.log(this.$route.name, id);
    switch (this.$route.name) {
      case "projects-id":
        return [
          { text: "Home", disabled: false, to: "/" },
          { text: "Project", disabled: true },
        ];
      case "projects-id-history":
        return [
          { text: "Home", disabled: false, to: "/" },
          {
            text: "Project",
            disabled: false,
            exact: true,
            to: { name: "projects-id", params: { id } },
          },
          { text: "History", disabled: true },
        ];
      case "projects-id-donate":
        return [
          { text: "Home", disabled: false, to: "/" },
          {
            text: "Project",
            disabled: false,
            exact: true,
            to: { name: "projects-id", params: { id } },
          },
          { text: "Donate", disabled: true },
        ];
      case "profile":
        return [
          { text: "Home", disabled: false, to: "/" },
          {
            text: "Profile",
            disabled: true,
          },
        ];
      case "profile-balance":
        return [
          { text: "Home", disabled: false, to: "/" },
          {
            text: "Profile",
            disabled: false,
            exact: true,
            to: { name: "profile" },
          },
          { text: "Balance", disabled: true },
        ];
      case "profile-history":
        return [
          { text: "Home", disabled: false, to: "/" },
          {
            text: "Profile",
            disabled: false,
            exact: true,
            to: { name: "profile" },
          },
          { text: "History", disabled: true },
        ];
      default:
        return [];
    }
  }

  async mounted() {
    const assets = await this.$apis.getAssets();
    this.setAssets(assets);
    if (this.token) {
      try {
        const authInfo = await this.$apis.getAuthInfo();
        const profile = await this.$apis.getMyProfile();
        this.setAuthInfo(authInfo);
        this.setProfile(profile);
      } catch (e) {
        console.log(e);
        this.setToken("");
      }
    }
  }
}
export default DefaultLayout;
</script>

<style lang="scss" scoped></style>
