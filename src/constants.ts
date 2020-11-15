export const isProduct = process.env.APP_ENV === "prod";

export const GA = "";

export const API_BASE = isProduct
  ? "https://api.claps.dev/api"
  : "https://api-test.claps.dev/api";

export const GITHUB_CLIENT_ID = isProduct
  ? "9386d997f1650ca27a6f"
  : "365a426af206381a9344";

export const MIXIN_CLIENT_ID = isProduct
  ? "0696adff-88f8-4252-80d3-1a4738f30ec0"
  : "a39c3ffc-c308-4c12-b117-fb7410cdbb43";

export const ASSET_ALLOW_LIST = {
  "c6d0c728-2624-429b-8e0d-d9d19b6592fa": 1, // btc
  "43d61dcd-e413-450d-80b8-101d5e903357": 1, // eth
  "23dfb5a5-5d7b-48b6-905f-3970e3176e27": 1, // xrp
  "fd11b6e3-0b87-41f1-a41f-f0e9b49e5bf0": 1, // bch
  "6770a1e5-6086-44d5-b60f-545f9d9e8ffd": 1, // doge
};
