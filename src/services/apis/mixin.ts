import Http from "@/services/http";

export default function(http: Http) {
  return {
    mixinOAuth({ code, state }) {
      return http.get(`/mixin/oauth`, {
        params: { code, state },
      });
    },
    getAssets() {
      return http.get(`/mixin/assets`);
    },
  };
}
