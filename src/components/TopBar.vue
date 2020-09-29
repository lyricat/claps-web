<template>
  <v-app-bar app flat>
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
        <v-text-field
          flat
          dense
          solo
          :hide-details="true"
          label="type to search"
          rounded
        />
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
  </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
class TopBar extends Vue {
  @State((state) => state.app.appbar) appbar;

  currentMenu = 0;

  menu = false;

  get menuItems() {
    return [
      {
        title: "Explore Projects",
        subtitle: "Find projects you like and donate them",
        path: "index",
      },
      {
        title: "Submit Opensource Projects",
        subtitle: "Let your supporters to financially support them",
        path: "contact",
      },
      {
        title: "Login",
        subtitle: "View your profile and balance",
        path: "login",
      },
    ];
  }

  gotoPage(menu) {
    this.$router.push({ name: menu.path });
  }
}
export default TopBar;
</script>

<style lang="scss" scoped>
.inner {
  width: 1036px;
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
