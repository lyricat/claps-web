<template>
  <v-container class="narrow-page pt-0">
    <f-loading v-if="loading" :loading="loading" />
    <template v-if="project && !loading">
      <div class="" v-for="group in groups">
        <div class="text--secondary overline mb-1 ml-3">{{ group.text }}</div>
        <f-panel padding="0" elevation="low" class="mb-4">
          <v-list class="">
            <v-list-item
              class="mb-0 px-4"
              v-for="tx in group.transactions"
              :key="tx.id"
            >
              <v-list-item-avatar class="mr-2">
                <f-mixin-asset-logo :size="32" :logo="tx.asset.icon_url" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="body-1">
                  <span class="amount">+{{ tx.amount }}</span>
                  <span>{{ tx.asset.symbol }}</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </f-panel>
      </div>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import PageView from "@/mixins/page";
import { ASSET_ALLOW_LIST } from "@/constants";

@Component({
  head() {
    return {
      title: this.title,
    };
  },
  components: {},
})
class ProjectHistoryPage extends Mixins(PageView) {
  @State((state) => state.app.assetMap) assetMap;

  loading = false;

  projectInfo: any = null;

  transactions: any = [];

  groups: any = [];

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

    const resp = await this.$apis.getProjectTransactions(projectName);
    this.transactions = resp.transactions;

    const ret = {};
    for (let ix = 0; ix < this.transactions.length; ix++) {
      const tx = this.transactions[ix];
      const dayLabel = this.$dayjs(tx.createdAt).format("YYYY/MM/DD");
      if (!Object.prototype.hasOwnProperty.call(ret, dayLabel)) {
        ret[dayLabel] = {
          text: dayLabel,
          transactions: [],
        };
      }
      const _tx = this.buildTx(tx);
      if (_tx) {
        ret[dayLabel].transactions.push(_tx);
      }
    }

    this.groups = Object.values(ret);
    this.loading = false;
  }

  buildTx(tx: any) {
    if (Object.prototype.hasOwnProperty.call(this.assetMap, tx.asset_id)) {
      tx.asset = this.assetMap[tx.asset_id];
    }
    return tx;
  }
}
export default ProjectHistoryPage;
</script>

<style lang="scss" scoped>
.amount {
  font-family: "DIN Alternative", "Menlon", monospace;
  font-weight: bold;
  color: var(--v-primary-base);
}
</style>
