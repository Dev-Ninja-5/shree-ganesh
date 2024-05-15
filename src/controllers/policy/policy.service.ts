import { Policy } from "../../models";
import { sendMessage } from "../twilio/twilio.service";

export const list = async (args: any) => {
  return await Policy.find(args);
};

export const single = async (id: string) => {
  return await Policy.findById(id);
};

export const create = async (data: any) => {
  return await Policy.create(data);
};

export const update = async (id: string, data: any) => {
  return await Policy.findByIdAndUpdate(id, data);
};

export const remove = async (id: string) => {
  return await Policy.findByIdAndDelete(id);
};

export const sendMessageBeforeOneMonth = async () => {
  let policy = await Policy.find({
    // policy_expiry_date: {
    //   $gte: calculateDayRange(30).start,
    //   $lte: calculateDayRange(30).end,
    // },
  })
    .select("name mobile vehicle_number insurance_type policy_expiry_date")
    .lean();
  policy.forEach(async (el: any) => {
    let template1 = `
    प्रिय ${el.name}, आपल्या वाहन विमा धोरणाची मुदत ${el.policy_expiry_date} रोजी संपणार आहे.
    वाहन क्रमांक: ${el.vehicle_number}
    धोरण क्रमांक: ${el.mobile}
    धोरण प्रकार: व्यापक विमा
    आवश्यक कागदपत्रे:
    फिटनेस प्रमाणपत्र: 01/Jan/2025
    TAX प्रमाणपत्र: 31/March/2025
    PUC प्रमाणपत्र: 26/Jan/2025
    आपण आपले धोरण पुन्हा नवीन करण्यासाठी,
    SHREE GANESH CONSULTANCY ला 9011630016 वर कॉल करा.
    `;
    await sendMessage({ ...el, message: template1 });
  });
};
export const sendMessageBeforeSevenDays = async () => {
  let policy = await Policy.find({
    policy_expiry_date: {
      $gte: calculateDayRange(7).start,
      $lte: calculateDayRange(7).end,
    },
  }).select("name mobile vehicle_number insurance_type policy_expiry_date");

  policy.forEach(async (el: any) => {
    let template1 = `Hi ${el.name} your policy will expire on ${el.policy_expiry_date} with insurance type ${el.insurance_type} and vehicle number ${el.vehicle_number}.`;
    await sendMessage({ ...el, message: template1 });
  });
};
export const sendMessageBeforeTwoDays = async () => {
  let policy = await Policy.find({
    policy_expiry_date: {
      $gte: calculateDayRange(2).start,
      $lte: calculateDayRange(2).end,
    },
  }).select("name mobile vehicle_number insurance_type policy_expiry_date");
  policy.forEach(async (el: any) => {
    let template1 = `Hi ${el.name} your policy will expire on ${el.policy_expiry_date} with insurance type ${el.insurance_type} and vehicle number ${el.vehicle_number}.`;
    await sendMessage({ ...el, message: template1 });
  });
};

function calculateDayRange(daysBeforeToday: number = 0) {
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setDate(today.getDate() - daysBeforeToday);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(startOfDay.getDate() + 1);
  endOfDay.setMilliseconds(endOfDay.getMilliseconds() - 1);

  return {
    start: startOfDay,
    end: endOfDay,
  };
}
