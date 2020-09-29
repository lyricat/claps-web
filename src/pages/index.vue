<template>
  <v-container>
    <project-list />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PageView from "@/mixins/page";
import ProjectList from "@/components/ProjectList.vue";

@Component({
  head() {
    return {
      title: this.title,
    };
  },
  components: {
    "project-list": ProjectList,
  },
})
class IndexPage extends Mixins(PageView) {
  get title() {
    return "hello";
  }
}
export default IndexPage;
</script>

<style lang="scss" scoped></style>
