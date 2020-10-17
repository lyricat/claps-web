<template>
  <div>
    <f-loading :loading="loading" :fullscreen="true" />
    <div
      v-infinite-scroll="loadData"
      infinite-scroll-disabled="loadMoreDisabled"
      infinite-scroll-distance="10"
    >
      <div v-if="transactions.length === 0 && !loading">
        <f-tip type="info" class="mt-2">
          {{ "No transaction" }}
        </f-tip>
      </div>
      <v-list class="list" v-else>
        <transaction-item
          v-for="tran in transactions"
          :key="tran.id"
          :transaction="tran"
        />
      </v-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import TransactionItem from "./TransactionItem.vue";

@Component({
  components: {
    "transaction-item": TransactionItem,
  },
})
class TransactionList extends Vue {
  @State((state) => state.app.assetMap) assetMap;

  @Prop() projectId;

  transactions: any = [];

  loading = false;

  offset = 0;
  limit = 20;
  total = 0;

  hasNext = true;

  get loadMoreDisabled() {
    const ret = !this.hasNext || this.loading;
    return ret;
  }

  mounted() {
    this.offset = 0;
  }

  async loadData() {
    this.loading = true;
    let incoming: any = [];
    if (this.projectId) {
      const resp = await this.$apis.getProjectTransactions(
        this.projectId,
        this.offset,
        this.limit,
      );
      incoming = resp.transactions.map((x) => {
        return this.buildTx(x);
      });
    } else {
      const resp = await this.$apis.getMyTransfers(this.offset, this.limit);
      incoming = resp.transfers.map((x) => {
        return this.buildTx(x);
      });
    }
    if (this.limit > incoming.length) {
      this.hasNext = false;
    }

    this.offset = this.transactions.length;

    this.transactions = [...this.transactions, ...incoming];
    this.loading = false;
  }

  buildTx(tx: any) {
    if (Object.prototype.hasOwnProperty.call(this.assetMap, tx.asset_id)) {
      tx.asset = this.assetMap[tx.asset_id];
    }
    return tx;
  }
}
export default TransactionList;
</script>
<style lang="scss" scoped></style>
