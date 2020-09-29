import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import infiniteScroll from "vue-infinite-scroll";
import Uikit from "@foxone/uikit";

import "animate.css";

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
Vue.use(infiniteScroll);
Vue.use(Uikit);
