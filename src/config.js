import configJson from "./auth_config.json";

export default function getConfig() {
  return {
    domain: configJson.domain,
    clientId: configJson.clientId,
  };
}
