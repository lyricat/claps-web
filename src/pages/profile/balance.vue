<template>
  <v-container>
    <f-loading v-if="loading" :loading="loading" />
    <template v-if="!loading">
      <f-panel padding="16" elevation="low" class="asset mb-4">
        <template v-if="connectedMixin">
          Connected
        </template>
        <template v-else>
          <div class="body-2 text-center mb-4">
            Claps uses Mixin Network to store assets. Please connect with Mixin
            Messenger to withdraw coins.
          </div>
          <div class="">
            <v-btn
              class="download-btn mb-4"
              color="primary"
              block
              depressed
              rounded
              outlined
              @click="download"
              >Download Mixin Messenger</v-btn
            >
            <v-btn
              class="download-btn"
              color="primary"
              block
              depressed
              rounded
              @click="connect"
              >Connect with Mixin</v-btn
            >
          </div>
        </template>
      </f-panel>
      <div class="assets">
        <f-panel
          padding="16"
          elevation="low"
          class="asset mb-4"
          v-for="asset in balanceAssets"
        >
          <div class="top d-flex align-center">
            <f-mixin-asset-logo :size="38" :logo="asset.icon_url" />
            <div class="ml-2">
              <div class="body-1">{{ asset.symbol }}</div>
              <div class="body-2 text--secondary">{{ asset.name }}</div>
            </div>
            <v-spacer />
            <v-btn
              rounded
              depressed
              outlined
              color="primary"
              :disabled="!connectedMixin"
              >Withdraw</v-btn
            >
          </div>
          <div class="mt-2 mb-0">
            <div class="title">{{ parseFloat(asset.balance).toFixed(8) }}</div>
            <div class="body-2">${{ parseFloat(asset.total).toFixed(4) }}</div>
          </div>
        </f-panel>
      </div>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { State } from "vuex-class";
import PageView from "@/mixins/page";
import Base64 from "@/utils/base64.js";
import { ASSET_ALLOW_LIST, MIXIN_CLIENT_ID } from "@/constants";

@Component({
  head() {
    return {
      title: this.title,
    };
  },
  components: {},
})
class UserPage extends Mixins(PageView) {
  @State((state) => state.app.assetMap) assetMap;
  @State((state) => state.auth.authInfo) authInfo;
  loading = false;

  assets: any = [];

  get title() {
    return "My Balance";
  }

  get connectedMixin() {
    if (this.authInfo && this.authInfo.mixinAuth) {
      return true;
    }
    return false;
  }

  get balanceAssets() {
    const ret = this.assets
      .map((x) => {
        if (
          Object.prototype.hasOwnProperty.call(this.assetMap, x.asset_id) &&
          Object.prototype.hasOwnProperty.call(ASSET_ALLOW_LIST, x.asset_id)
        ) {
          const a = this.assetMap[x.asset_id];
          x.symbol = a.symbol;
          x.name = a.name;
          x.icon_url = a.icon_url;
          return x;
        }
        return null;
      })
      .filter((x) => x !== null);
    return ret;
  }

  download() {
    window.location.href = "https://mixin.one/messenger";
  }

  connect() {
    const redirect = { name: "profile-balance" };
    const url = `https://mixin.one/oauth/authorize?client_id=${MIXIN_CLIENT_ID}&scope=PROFILE:READ&response_type=code&state=${Base64.encode(
      JSON.stringify({ redirect }),
    )}`;
    window.location.href = url;
  }

  async mounted() {
    this.loading = true;
    const resp = await this.$apis.getMyAssets();
    this.assets = resp.assets;
    this.loading = false;
  }
}
export default UserPage;
</script>
<style lang="scss" scoped>
.donation-info {
  em {
    font-weight: bold;
    color: var(--v-primary-base);
  }
}
.assets {
  display: flex;
  flex-wrap: wrap;
  .asset {
    width: 420px;
    margin-right: 16px;
  }
  @media only screen and (max-device-width: 736px) {
    .asset {
      width: 100%;
      margin-right: 0;
    }
  }
}
</style>
