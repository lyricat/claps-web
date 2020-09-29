export const state = () => ({
  dark: false,
  snackbar: {
    show: false,
    message: "",
    color: "info",
  },
  appbar: {
    title: "",
    style: "",
    show: true,
    back: false,
    flat: true,
  },
  assets: [],
  assetMap: {},
});

export const mutations = {
  toast(state, { message, color }) {
    state.snackbar.show = true;
    state.snackbar.message = message;
    state.snackbar.color = color;
  },
  setSnackbar(state, val) {
    state.snackbar.show = val;
  },
  SET_APPBAR(state, value) {
    const defaultValue = {
      title: "",
      style: "",
      show: true,
      back: false,
      flat: true,
    };
    state.appbar = { ...defaultValue, ...value };
  },
  SET_ASSETS(state, value) {
    const assetMap = {};
    for (let ix = 0; ix < value.length; ix++) {
      assetMap[value[ix].asset_id] = value[ix];
    }
    state.assetMap = Object.assign({}, assetMap);
    state.assets = value;
  },
};
