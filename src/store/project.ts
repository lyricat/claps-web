import { ActionTree } from "vuex";

const ITEMS_PER_PAGE = 20;

export const state = () => ({
  projects: [],
  searchValue: "",
  hasNext: true,
});
export type ProjectsState = ReturnType<typeof state>;

export const mutations = {
  SET_PROJECTS(state, data) {
    state.projects = data;
  },
  SET_PROJECT(state, data) {
    const projects = state.projects.slice();
    for (let ix = 0; ix < projects.length; ix++) {
      if (projects[ix].id === data.id) {
        projects.splice(ix, 1, data);
        break;
      }
    }
    state.projects = projects;
  },
  SET_PROJECT_COURSE_VALUE(state, value) {
    state.searchValue = value;
  },
  SET_HAS_NEXT(state, value) {
    state.hasNext = value;
  },
};

export const actions: ActionTree<ProjectsState, {}> = {
  async loadProjects({ commit, state }, { reload } = { reload: false }) {
    const offset = reload ? 0 : state.projects.length;
    const projects = await this.$apis.getProjects({
      offset,
      limit: ITEMS_PER_PAGE,
      keywords: state.searchValue,
    });
    const incoming = projects;
    commit("SET_HAS_NEXT", incoming.length === ITEMS_PER_PAGE);
    commit(
      "SET_PROJECTS",
      reload ? incoming : [...state.projects, ...incoming],
    );
  },
};
