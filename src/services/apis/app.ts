import Http from "@/services/http";

export default function(http: Http) {
  return {
    getEnv() {
      return http.get(`/api/environments`);
    },
  };
}
