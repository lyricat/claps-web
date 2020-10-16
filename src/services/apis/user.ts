import Http from "@/services/http";

export default function(http: Http) {
  return {
    auth(code: string) {
      return http.get(`/oauth?code=${code}`);
    },

    getAuthInfo() {
      return http.get(`/authInfo`);
    },

    getMyDonation() {
      return http.get(`/user/donation`);
    },

    getMyTransfers() {
      return http.get(`/user/transfers`);
    },

    getMyProfile() {
      return http.get(`/user/profile`);
    },

    getMyAssets() {
      return http.get(`/user/assets`);
    },

    withdraw() {
      return http.post(`/user/withdraw`);
    },
  };
}
