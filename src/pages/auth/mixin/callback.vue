<template>
  <div />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";
import Base64 from "@/utils/base64";

@Component
class GithubAuthPage extends Vue {
  @Mutation("auth/SET_TOKEN") setToken;
  @State((state) => state.auth.authInfo) authInfo;

  async mounted() {
    const code = this.$route.query.code;

    setTimeout(async () => {
      console.log(this.authInfo);
      const resp = await this.$apis.mixinOAuth({
        code: code as string,
        state: this.authInfo.randomUid,
      });
      this.setToken(resp.token);

      this.$router.push({ name: "profile-balance" });
    }, 100);
  }
}
export default GithubAuthPage;
</script>
