import Http from "@/services/http";

export default function(http: Http) {
  return {
    getProjects({ keywords, offset, limit }) {
      return http.get(`/projects/`, {
        params: { q: keywords, offset, limit },
      });
    },

    getProject(name) {
      return http.get(`/projects/${name}`);
    },

    getProjectTransactions(id, offset, limit) {
      return http.get(`/projects/${id}/transactions`, {
        params: { offset, limit },
      });
    },

    getProjectBotAsset({ botId, assetId }) {
      return http.get(`/bots/${botId}/assets/${assetId}`);
    },
  };
}
