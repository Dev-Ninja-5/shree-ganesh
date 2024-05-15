import keys from "../../config/keys";

const accountSid = keys.twilliosid;
const authToken = keys.twilioauth;
const messageFrom = keys.twiliomessagefrom;
const client = require("twilio")(accountSid, authToken);
export const sendMessage = async (data: any) => {
  client.messages
    .create({
      contentSid: "HXe66bee2e25a1f9c5b7e78aff2cf2bbc1",
      from: messageFrom,
      contentVariables: JSON.stringify({
        1: data.name,
        2: data.policy_expiry_date,
        3: data.vehicle_number,
        4: data.mobile,
      }),
      to: `whatsapp:+91${data.mobile}`,
    })
    .then((message: any) => console.log({ message }))
    .catch((err: any) => console.log({ err }));
};

export const dummySendMessage = async () => {
  client.messages
    .create({
      from: messageFrom,
      body: "hey Sandesh, this is dummy whatsapp message to test twilio integration",
      to: `whatsapp:+917387741527`,
      // to: `whatsapp:+918954379385`,
    })
    .then((message: any) => {
      console.log({ message });
    })
    .catch((err: any) => err);
};

//Content template SID   HXe66bee2e25a1f9c5b7e78aff2cf2bbc1
//SID  MG3657f758380a2b47a934ce69f26ed926
