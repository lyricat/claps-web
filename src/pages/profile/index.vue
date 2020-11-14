<template>
  <v-container>
    <f-loading v-if="loading" :loading="loading" />
    <template v-if="user && !loading">
      <v-row>
        <v-col cols="12" sm="12" md="5" lg="4">
          <f-panel padding="0" elevation="low" class="detail mb-4">
            <div class="top d-flex align-center mt-4 px-4 mb-2">
              <div class="avatar mt-0">
                <v-avatar><v-img :src="user.avatar_url" :size="48"/></v-avatar>
              </div>
              <div class="title ml-2">
                {{ user.name }}
              </div>
            </div>
            <div class="emails body-2 text--secondary px-4 my-4">
              <div
                class="email"
                v-for="email in user.emails"
                :key="email.email"
              >
                {{ email.email }}
                <v-icon size="16" color="primary">{{ $icons.mdiCheck }}</v-icon>
              </div>
            </div>
            <div class="donation-info body-1 text--secondary px-4 mb-4">
              {{ "Received" }}
              <em>${{ parseFloat(user.donation.amount).toFixed(4) }}</em>
              {{ "from" }}
              <em>{{ user.donation.count }}</em>
              {{ "patrons" }}
            </div>
            <v-divider />
            <div class="d-flex justify-space-between pa-4">
              <v-btn
                color="primary"
                rounded
                outlined
                depressed
                @click="gotoHistory"
                >History</v-btn
              >
              <v-spacer />
              <v-btn color="primary" rounded depressed @click="gotoBalance"
                >Balance</v-btn
              >
            </div>
          </f-panel>
        </v-col>
        <v-col cols="12" sm="12" md="7" lg="8">
          <f-panel padding="0" elevation="low" class="detail mb-4">
            <div class="overline px-4 mt-2">Projects</div>
            <v-list>
              <v-list-item
                v-for="proj in projects"
                :key="proj.id"
                @click="gotoProject(proj)"
              >
                <v-list-item-avatar>
                  <v-img :src="proj.avatar_url" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="body-1">
                    {{ proj.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ proj.description }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </f-panel>
        </v-col>
      </v-row>
    </template>
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
class UserPage extends Mixins(PageView) {
  loading = false;

  profile: any = null;

  authInfo: any = null;

  donation: any = null;

  get title() {
    return "Profile";
  }

  get projects() {
    if (this.profile) {
      return this.profile.projects;
    }
    return [];
  }

  get user() {
    if (this.authInfo && this.profile && this.donation) {
      return {
        name: this.authInfo.user.name,
        avatar_url: this.authInfo.user.avatar_url,
        github_url: this.authInfo.user.html_url,
        donation: {
          count: this.donation.donations,
          amount: this.donation.total,
        },
        emails: this.profile.emails,
      };
    }
    return null;
  }

  async mounted() {
    this.loading = true;
    this.authInfo = await this.$apis.getAuthInfo();
    this.profile = await this.$apis.getMyProfile();
    this.donation = await this.$apis.getMyDonation();
    this.loading = false;
  }

  gotoProject(proj) {
    this.$router.push({ name: "projects-id", params: { id: proj.id } });
  }

  gotoHistory() {
    this.$router.push({ name: "profile-history" });
    return;
  }

  gotoBalance() {
    this.$router.push({ name: "profile-balance" });
    return;
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
</style>
