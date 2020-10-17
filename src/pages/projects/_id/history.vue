<template>
  <v-container class="narrow-page pt-0">
    <f-loading v-if="loading" :loading="loading" />
    <template v-if="project && !loading">
      <transaction-list :project-id="project.id" />
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import PageView from "@/mixins/page";
import { ASSET_ALLOW_LIST } from "@/constants";
import TransactionList from "@/components/TransactionList.vue";

@Component({
  head() {
    return {
      title: this.title,
    };
  },
  components: { TransactionList },
})
class ProjectHistoryPage extends Mixins(PageView) {
  @State((state) => state.app.assetMap) assetMap;

  loading = false;

  projectInfo: any = null;

  get title() {
    return "History";
  }

  get project() {
    if (this.projectInfo) {
      return this.projectInfo.project;
    }
    return null;
  }

  async mounted() {
    this.loading = true;
    const projectName = this.$route.params.id;
    this.projectInfo = await this.$apis.getProject(projectName);

    this.loading = false;
  }
}
export default ProjectHistoryPage;
</script>

<style lang="scss" scoped></style>
