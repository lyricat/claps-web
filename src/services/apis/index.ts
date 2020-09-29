import createMixinApis from "./mixin";
import createUserApis from "./user";
import createProjectApis from "./project";

import Http from "@/services/http";

export default function(http: Http) {
  return {
    ...createMixinApis(http),
    ...createUserApis(http),
    ...createProjectApis(http),
  };
}
