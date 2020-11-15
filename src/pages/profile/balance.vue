<template>
  <v-container>
    <f-loading v-if="loading" :loading="loading" />
    <template v-if="!loading">
      <f-panel padding="16" elevation="low" class="asset mb-4">
        <template v-if="!connectedMixin">
          <div class="text-center ma-2">
            <v-icon size="64" color="primary">
              {{ $icons.mdiCheckCircle }}
            </v-icon>
          </div>
          <div class="body-2 text-center mb-4">
            You've connected with Mixin Messenger. <br />
            Tap "Withdraw" button to send all assets to your Mixin Messenger.
          </div>
          <div class="text-center">
            <v-btn
              rounded
              depressed
              color="primary"
              :disabled="!connectedMixin"
              @click="withdraw"
              >Withdraw</v-btn
            >
          </div>
        </template>
        <template v-else>
          <div class="text-center ma-2">
            <v-icon size="64">
              {{ $icons.mdiFlashCircle }}
            </v-icon>
          </div>
          <div class="title text-center mb-2">
            One more step to withraw
          </div>
          <div class="body-2 text-center mb-4">
            To reduce transfer fee, Claps.dev uses Mixin Network to transfer and
            store assets.<br />
            Please connect with Mixin Messenger to withdraw asset.
          </div>
          <div class="btns text-center mb-2">
            <v-btn
              class="download-btn mb-4"
              color="primary"
              depressed
              rounded
              outlined
              @click="download"
              >Download Mixin Messenger</v-btn
            >
            <br />
            <v-btn
              class="download-btn"
              color="primary"
              depressed
              rounded
              @click="connect"
              >Connect w/ Mixin Messenger</v-btn
            >
          </div>
        </template>
      </f-panel>
      <div class="assets">
        <f-panel
          padding="0"
          elevation="low"
          class="asset mb-4 px-4 py-2"
          v-for="asset in balanceAssets"
        >
          <div class="top d-flex align-center">
            <f-mixin-asset-logo :size="38" :logo="asset.icon_url" />
            <div class="ml-2">
              <div class="body-1">{{ asset.symbol }}</div>
              <div class="body-2 text--secondary">{{ asset.name }}</div>
            </div>
          </div>
          <v-divider class="mt-2" />
          <div class="d-flex justify-space-between mt-2 mb-0">
            <div class="label body-2">
              Balance
            </div>
            <div class="amount">
              <div class="body-2">
                {{ parseFloat(asset.balance).toFixed(8) }}
              </div>
              <div class="caption text--secondary">
                ${{ parseFloat(asset.balance_usd).toFixed(4) }}
              </div>
            </div>
          </div>
          <div class="d-flex justify-space-between mt-1 mb-0">
            <div class="label body-2">
              Total
            </div>
            <div class="amount">
              <div class="body-2">
                {{ parseFloat(asset.total).toFixed(8) }}
              </div>
              <div class="caption text--secondary">
                ${{ parseFloat(asset.total_usd).toFixed(4) }}
              </div>
            </div>
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
import { ASSET_ALLOW_LIST } from "@/constants";
import { redirectToMixinOAuth } from "@/utils/account";

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
    let ret = this.assets
      .map((x) => {
        if (
          Object.prototype.hasOwnProperty.call(this.assetMap, x.asset_id) &&
          Object.prototype.hasOwnProperty.call(ASSET_ALLOW_LIST, x.asset_id)
        ) {
          const a = this.assetMap[x.asset_id];
          x.symbol = a.symbol;
          x.name = a.name;
          x.icon_url = a.icon_url;
          x.total_usd = parseFloat(x.total) * parseFloat(a.price_usd);
          x.balance_usd = parseFloat(x.balance) * parseFloat(a.price_usd);
          return x;
        }
        return null;
      })
      .filter((x) => x !== null);
    ret = ret.sort((a, b) => {
      if (a.balance_usd < b.balance_usd) {
        return 1;
      } else if (a.balance_usd > b.balance_usd) {
        return -1;
      }
      return 0;
    });
    return ret;
  }

  download() {
    window.location.href = "https://mixin.one/messenger";
  }

  connect() {
    redirectToMixinOAuth({ name: "profile-balance" });
  }

  async withdraw() {
    await this.$apis.withdraw();
    this.reload();
  }

  async mounted() {
    await this.reload();
  }
  async reload() {
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
    width: 370px;
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
