<template>
  <v-list-item class="mb-0 px-2">
    <v-list-item-avatar class="mr-2">
      <f-mixin-asset-logo :size="32" :logo="transaction.asset.icon_url" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="body-2">
        <span class="amount">+{{ transaction.amount }}</span>
        <span>{{ transaction.asset.symbol }}</span>
      </v-list-item-title>
      <v-list-item-subtitle class="caption text--secondary">
        {{ $dayjs(transaction.created_at).format("YYYY/MM/DD hh:mm:ss") }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Action } from "vuex-class";

@Component({})
class TransactionItem extends Vue {
  @Prop() transaction;
}
export default TransactionItem;
</script>
<style lang="scss" scoped>
.amount {
  font-family: "DIN Alternative", "Menlon", monospace;
  font-weight: bold;
  color: var(--v-primary-base);
}
</style>
