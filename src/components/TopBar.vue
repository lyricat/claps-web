<template>
  <v-app-bar app flat>
    <v-container class="pa-0">
      <div class="inner d-flex align-center">
        <nuxt-link :to="'/'">
          <v-toolbar-title class="d-flex align-center">
            <v-img
              :height="44"
              :width="80"
              :src="require('@/assets/images/logo.png')"
            />
            <span class="headline font-weight-bold ml-1 text--primary"
              >Claps</span
            >
          </v-toolbar-title>
        </nuxt-link>
        <v-spacer />
        <div class="search-wrapper">
          <!-- <v-text-field
            flat
            dense
            solo
            :hide-details="true"
            label="type to search"
            rounded
          /> -->
        </div>
        <v-spacer />
        <v-menu
          v-model="menu"
          width="500"
          :close-on-content-click="true"
          :nudge-width="200"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn text rounded icon color="primary" v-bind="attrs" v-on="on">
              <v-icon>{{ $icons.mdiMenu }}</v-icon>
            </v-btn>
          </template>
          <v-sheet>
            <v-list>
              <v-list-item-group
                :mandatory="true"
                v-model="currentMenu"
                color="primary"
              >
                <div
                  v-for="(menu, ix) in menuItems"
                  :key="ix"
                  v-if="menu.show"
                  @click="gotoPage(menu)"
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ menu.title }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        menu.subtitle
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-list-item-group>
            </v-list>
          </v-sheet>
        </v-menu>
      </div>
    </v-container>
  </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
class TopBar extends Vue {
  @State((state) => state.app.appbar) appbar;
  @State((state) => state.auth.token) token;

  currentMenu = 0;

  menu = false;

  get menuItems() {
    const token = this.token;
    console.log(token);
    return [
      {
        title: "Explore Projects",
        subtitle: "Find projects you like and donate them",
        path: "index",
        show: true,
      },
      {
        title: "Submit Opensource Projects",
        subtitle: "Let your supporters to financially support them",
        link: "https://forms.gle/9Q43AnyzzKUnJRpT6",
        show: true,
      },
      {
        title: "About Claps",
        subtitle: "Funding open source in a better way",
        link: "about",
        show: true,
      },
      {
        title: "Login",
        subtitle: "Login to view your profile and balance",
        path: "login",
        show: token === undefined || token.length === 0,
      },
      {
        title: "Profile",
        subtitle: "View your profile and balance",
        path: "profile",
        show: token && token.length !== 0,
      },
    ];
  }

  gotoPage(menu) {
    if (menu.path) {
      this.$router.push({ name: menu.path });
    } else {
      window.location.href = menu.link;
    }
  }
}
export default TopBar;
</script>

<style lang="scss" scoped>
.inner {
  margin: 0 auto;
  .v-input {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
  }
  @media only screen and (max-device-width: 736px) {
    .search-wrapper {
      display: none;
    }
  }
}
</style>
