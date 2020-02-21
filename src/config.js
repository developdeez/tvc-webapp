const domain =
  process.env.NODE_ENV === "production"
    ? "157.245.140.249:4444"
    : "localhost:4444";
export const websocketUrl = `ws://${domain}/subscriptions`;
export const apiUrl = `http://${domain}/graphql`;
