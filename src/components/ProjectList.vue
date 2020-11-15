<template>
  <div>
    <f-loading :loading="loading" :fullscreen="true" />
    <div
      v-infinite-scroll="loadData"
      infinite-scroll-disabled="loadMoreDisabled"
      infinite-scroll-distance="10"
      class="list"
    >
      <div v-if="projects.length === 0 && !loading">
        <f-tip type="info" class="mt-2">
          {{ "No project" }}
        </f-tip>
      </div>
      <div
        v-else
        v-for="project in projects"
        :key="project.id"
        class="px-0 project-wrapper"
      >
        <project-item :project="project" @click="gotoProject" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import ProjectItem from "./ProjectItem.vue";

@Component({
  components: {
    "project-item": ProjectItem,
  },
})
class ProjectList extends Vue {
  @State((state) => state.project.projects) projects;

  @State((state) => state.project.hasNext) hasNext;

  @Action("project/loadProjects") loadProjects;

  loading = false;

  get filters() {
    return [];
  }

  get loadMoreDisabled() {
    const ret = !this.hasNext || this.loading;
    return ret;
  }

  async loadData() {
    this.loading = true;
    await this.loadProjects();
    this.loading = false;
  }

  gotoProject(project) {
    console.log(project);
    this.$router.push({
      name: "projects-id",
      params: { id: project.id },
    });
  }
}
export default ProjectList;
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  .project-wrapper {
    width: 370px;
    margin-right: 16px;
  }
  @media only screen and (max-device-width: 736px) {
    .project-wrapper {
      width: 100%;
      margin-right: 0px;
    }
  }
}
</style>
