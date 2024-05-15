import dotenv from "dotenv";

dotenv.config();

export default {
  dev: process.env.NODE_ENV !== "production",
  secret: process.env.SECRET || "consultancy@loop(^^4&d%#!@secret",
  twilliosid: process.env.TWILIO_ACCOUNT_SID,
  twilioauth: process.env.TWILIO_AUTH_TOKEN,
  twiliomessagefrom:
    process.env.TWILIO_MESSAGE_FROM || "whatsapp:+918999468827",
  mongodb:
    process.env.MONGODB || "mongodb://localhost/shree-ganesh-consultancy",
};
