<template>
  <v-container class="narrow-page">
    <f-panel padding="20" elevation="low" class="detail mb-4 pb-4">
      <h1 class="mb-4">About Claps.dev</h1>
      <p class="body-1">
        The freedom of developers to work for open source projects is important.
        The serious Heartbleed Bug with a global impact revealed how a poorly
        funded and maintained open source library can “make you bleed”.
      </p>
      <p class="body-1">
        Many open source projects can receive donations or sponsorships, but
        those funds mostly go to specific core maintainers as there is no good
        way to feedback the whole community.
      </p>
      <p class="body-1">
        Claps.dev helps solve the problem by (1) distributing the funds through
        globally available cryptocurrency networks and (2) rewarding all
        contributors proportionally to their contributions.
      </p>
      <p class="body-1">
        We believe Claps.dev is the better way to help massive open source
        developers financially support themselves, thereby making the community
        thrive and enabling developers to freely work on what they love.
      </p>
    </f-panel>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "@/mixins/page";

@Component({
  head() {
    return {
      title: this.title,
    };
  },
  components: {},
})
class AboutPage extends Mixins(PageView) {
  loading = false;

  projectInfo: any = null;

  get title() {
    return "About Claps.dev";
  }
}
export default AboutPage;
</script>
