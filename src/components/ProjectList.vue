<template>
  <div>
    <f-loading :loading="loading" :fullscreen="true" />
    <v-list
      v-infinite-scroll="loadData"
      infinite-scroll-disabled="loadMoreDisabled"
      infinite-scroll-distance="10"
      dense
    >
      <div v-if="projects.length === 0 && !loading" class="">
        <f-tip v-if="filters.length" type="warning mt-2">
          {{
            $t("com.course_list.empty_hint_with_filters", {
              filters: filters.join(", "),
            })
          }}
        </f-tip>
        <f-tip v-else type="info" class="mt-2">
          {{ $t("com.course_list.empty_hint") }}
        </f-tip>
      </div>
      <v-list-item
        v-else
        v-for="project in projects"
        :key="project.id"
        class="px-0"
      >
        <project-item :project="project" @click="gotoProject" />
      </v-list-item>
    </v-list>
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
