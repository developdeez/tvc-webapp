const domain =
  process.env.NODE_ENV === "production" ? "157.245.140.249" : "localhost:4444";
export const webscoketUrl = `ws://${domain}`;
export const apiUrl = `http://${domain}`;
export const mongoDBUrl =
  "mongodb://naw-admin:goviral123@ds011251.mlab.com:11251/heroku_52860pgd";
export const redishost = "redis-15887.c12.us-east-1-4.ec2.cloud.redislabs.com";
export const redisport = "15887";
export const redispass = "M0p1hU32ki9JdBcvf5tX4n8wVi31dkUT";
