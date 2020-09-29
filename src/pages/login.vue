<template>
  <v-container>
    <f-loading v-if="loading" :loading="loading" />
    <template v-if="!loading">
      <f-panel padding="0" elevation="low" class="detail mb-4 pb-4">
        <div class="title text-center px-4 mt-4 mb-4">Welcome to Claps</div>
        <div class="body-2 mb-4 text-center text--secondary">
          Greeting. Login to your Github account below.
        </div>
        <div class="px-4">
          <v-btn color="primary" rounded block depressed @click="login"
            >Sign in with Github</v-btn
          >
        </div>
      </f-panel>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "@/mixins/page";
import { GITHUB_CLIENT_ID } from "@/constants";

@Component({
  head() {
    return {
      title: this.title,
    };
  },
  components: {},
})
class LoginPage extends Mixins(PageView) {
  loading = false;

  projectInfo: any = null;

  get title() {
    return "Login";
  }

  login() {
    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user&redirect_uri=${encodeURIComponent(
      "http://localhost:3000/auth/github/callback",
    )}`;
    window.location.href = url;
  }
}
export default LoginPage;
</script>
