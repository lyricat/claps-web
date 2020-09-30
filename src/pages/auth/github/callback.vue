<template>
  <div />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import Base64 from "@/utils/base64";

@Component
class GithubAuthPage extends Vue {
  @Mutation("auth/SET_TOKEN") setToken;

  async mounted() {
    const code = this.$route.query.code;
    let redirectRouteName = "profile";

    if (this.$route.query.state) {
      try {
        const state: any = JSON.parse(
          Base64.decode(this.$route.query.state as any),
        );
        redirectRouteName = state.redirect;
      } catch (err) {
        console.log(err);
      }
    }

    const resp = await this.$apis.auth(code as string);
    this.setToken(resp.token);

    this.$router.push({ name: redirectRouteName });
  }
}
export default GithubAuthPage;
</script>
