import Base64 from "./base64";
import { MIXIN_CLIENT_ID, GITHUB_CLIENT_ID } from "@/constants";

export function redirectToMixinOAuth(redirect: any) {
  // const redirect = { name: "profile-balance" };
  const url = `https://mixin.one/oauth/authorize?client_id=${MIXIN_CLIENT_ID}&scope=PROFILE:READ&response_type=code&state=${Base64.encode(
    JSON.stringify({ redirect }),
  )}`;
  window.location.href = url;
}

export function redirectToGithubOAuth() {
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user`;
  window.location.href = url;
}
