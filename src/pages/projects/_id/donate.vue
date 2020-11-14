<template>
  <v-container class="narrow-page">
    <f-loading v-if="loading" :loading="loading" />
    <template v-if="project && !loading">
      <f-asset-amount-input
        v-model="selectedAmount"
        :assets="supportedAssets"
        :asset.sync="selectedAsset"
        :selectable="true"
        :label="'Select Assets'"
        :precision="8"
      />

      <f-panel padding="0" elevation="low" class="detail mt-4 mb-4">
        <div class="overline px-4 mt-2">DONATION DISTRIBUTIONS</div>
        <v-list class="type-selector mb-2">
          <v-list-item class="mb-0 px-2" @click="showAlgorithmSheet = true">
            <v-list-item-avatar class="mr-2">
              <v-icon color="primary" :size="24">
                {{ algorithms[selectedAlgorithm].icon }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="body-1">
                {{ algorithms[selectedAlgorithm].title }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>
                {{ $icons.mdiChevronRight }}
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
        <f-tip type="info" class="mb-4 mx-4">
          <div>
            <strong>{{ "Description:" }}</strong>
          </div>
          {{ algorithms[selectedAlgorithm].description }}
        </f-tip>
      </f-panel>

      <f-bottom-sheet v-model="showDonationSheet">
        <template #activator="{ on }">
          <v-btn
            color="primary"
            rounded
            depressed
            block
            v-on="on"
            :disabled="!validated"
            >Donation</v-btn
          >
        </template>
        <template #title>
          <div class="title">Donate to {{ project.name }}</div>
        </template>
        <template #subheader> </template>
        <div class="text-center px-4">
          <div class="body-1 mb-2">
            Transfer to followed address
          </div>
          <div class="body-1 mb-4">
            <v-text-field
              v-model="donateAddress"
              filled
              rounded
              readonly
              :hide-details="true"
            >
            </v-text-field>
          </div>
          <v-btn
            color="primary"
            class="mb-4"
            rounded
            depressed
            v-clipboard:copy="donateAddress"
            >Copy Address</v-btn
          >
          <div class="body-1 mb-2 mt-2">
            Or scan the QrCode with your wallet
          </div>
          <f-qr-code :text="donateAddress" class="mb-2" />
          <f-tip type="warning" class="mb-2">
            Use the address to donate in {{ selectedAsset.symbol }} network. It
            may take several minutes to be confirmed.
          </f-tip>
        </div>
      </f-bottom-sheet>

      <v-bottom-sheet v-model="showAlgorithmSheet">
        <v-sheet class="pr-4 text-left pb-4">
          <v-list shaped class="mb-2">
            <v-list-item-group
              :mandatory="true"
              v-model="selectedAlgorithm"
              color="primary"
            >
              <div v-for="(alg, ix) in algorithms" :key="alg.name">
                <v-list-item class="pl-4 mb-0" @click="selectAlgorithm(ix)">
                  <v-list-item-avatar>
                    <v-icon size="24">{{ alg.icon }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ alg.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ alg.description }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list-item-group>
          </v-list>
        </v-sheet>
      </v-bottom-sheet>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import PageView from "@/mixins/page";
import ProjectItem from "@/components/ProjectItem.vue";
import { ASSET_ALLOW_LIST } from "@/constants";

@Component({
  head() {
    return {
      title: this.title,
    };
  },
  components: {
    "project-item": ProjectItem,
  },
})
class ProjectDonatePage extends Mixins(PageView) {
  @State((state) => state.app.assets) assets;

  loading = false;

  projectInfo: any = null;

  selectedAmount = "1";

  selectedAsset: any = null;

  showAlgorithmSheet = false;

  showDonationSheet = false;

  selectedAlgorithm = 3;

  botAssetInfo: any = null;

  get supportedAssets() {
    return this.assets
      .map((x: any) => {
        if (
          Object.prototype.hasOwnProperty.call(ASSET_ALLOW_LIST, x.asset_id)
        ) {
          return this.buildAsset(this.assets, x);
        }
        return null;
      })
      .filter((x) => x !== null);
  }

  get donateAddress() {
    if (this.botAssetInfo) {
      return this.botAssetInfo.destination;
    }
    return "...";
  }

  set donateAddress(val) {
    return;
  }

  get algorithms() {
    const ret = [
      {
        icon: this.$icons.mdiPollBox,
        title: "By Merico’s Algorithm",
        description:
          "The algorithm of Persper use code analytics to calculate each developer’s contribution.",
      },
      {
        icon: this.$icons.mdiViewGridPlus,
        title: "By Commits",
        description: "More commits, more contributions",
      },
      {
        icon: this.$icons.mdiPlaylistPlus,
        title: "By Changed Lines",
        description: "More modifications, more contributions",
      },
      {
        icon: this.$icons.mdiApproximatelyEqualBox,
        title: "Identical Amount",
        description: "All members in this project get the same money",
      },
    ];
    if (this.projectInfo) {
      for (let ix = 0; ix < this.projectInfo.botIds.length; ix++) {
        const bot = this.projectInfo.botIds[ix];
        ret[parseInt(bot.distribution)]["id"] = bot.id;
      }
      return ret;
    }
    return [];
  }

  get title() {
    return "Project";
  }

  get project() {
    if (this.projectInfo) {
      return this.projectInfo.project;
    }
    return null;
  }

  get members() {
    if (this.projectInfo) {
      return this.projectInfo.members;
    }
    return null;
  }

  get repositories() {
    if (this.projectInfo) {
      return this.projectInfo.repositories;
    }
    return [];
  }

  get validated() {
    return this.selectedAsset && this.selectedAlgorithm !== -1;
  }

  @Watch("selectedAsset")
  @Watch("selectedAlgorithm")
  async updateBotAssetInfo() {
    if (this.algorithms && this.algorithms.length && this.selectedAsset) {
      this.botAssetInfo = await this.$apis.getProjectBotAsset({
        botId: (this.algorithms[this.selectedAlgorithm] as any).id,
        assetId: this.selectedAsset.id,
      });
    }
  }

  buildAsset(assets: any, asset: any) {
    const chainAsset = assets.find((a) => a.asset_id === asset.chain_id);
    return {
      id: asset.asset_id,
      symbol: asset.symbol,
      name: asset.name,
      logo: asset.icon_url,
      label: "",
      chainLogo: chainAsset && chainAsset.icon_url,
    };
  }

  async mounted() {
    this.loading = true;
    const projectName = this.$route.params.id;
    this.projectInfo = await this.$apis.getProject(projectName);
    this.selectedAsset = this.supportedAssets[0];
    this.loading = false;
  }

  selectAlgorithm(ix) {
    this.selectedAlgorithm = ix;
    this.showAlgorithmSheet = false;
  }

  gotoRepo(repo) {
    window.location.href = `https://github.com/${repo.slug}`;
  }
}
export default ProjectDonatePage;
</script>
