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
import { redirectToGithubOAuth } from "@/utils/account";
import PageView from "@/mixins/page";

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
    redirectToGithubOAuth();
  }
}
export default LoginPage;
</script>
