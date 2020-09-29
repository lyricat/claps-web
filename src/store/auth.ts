import { MutationTree, GetterTree, ActionTree } from "vuex";

const state = () => ({
  token: "",
  profile: {
    user: null,
  },
  authInfo: {},
});

export type AuthState = ReturnType<typeof state>;

export const getters: GetterTree<AuthState, any> = {
  isLogged(state) {
    return Boolean(state.token);
  },
  getToken(state) {
    return state.token;
  },
};

export const mutations: MutationTree<AuthState> = {
  SET_TOKEN(state, data) {
    state.token = data;
  },
  SET_PROFILE(state, data) {
    state.profile = data;
  },
  SET_AUTHINFO(state, data) {
    state.authInfo = data;
  },
};

export const actions: ActionTree<AuthState, any> = {
  logout({ commit }) {
    commit("SET_TOKEN", { token: "" });
  },
};
