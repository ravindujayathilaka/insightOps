import crypto from "crypto";

export const generateApiKey = () => {
  return "sk_live_" + crypto.randomBytes(32).toString("hex");
};
