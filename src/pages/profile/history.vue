<template>
  <v-container class="narrow-page pt-0">
    <f-loading v-if="loading" :loading="loading" />
    <template>
      <transaction-list />
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import PageView from "@/mixins/page";
import TransactionList from "@/components/TransactionList.vue";

@Component({
  head() {
    return {
      title: this.title,
    };
  },
  components: { TransactionList },
})
class ProfileHistoryPage extends Mixins(PageView) {
  loading = false;

  projectInfo: any = null;

  get title() {
    return "History";
  }
}
export default ProfileHistoryPage;
</script>

<style lang="scss" scoped></style>
