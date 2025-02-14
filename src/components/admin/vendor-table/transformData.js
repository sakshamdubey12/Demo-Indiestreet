import { verify } from "jsonwebtoken";

export const transformData = (data) => {
  return data?.map((item) => {
    const accountProof = item.files?.[0]?.url || "";
    const addressProof = item.files?.[1]?.url || "";
    const gstProof = item.files?.[2]?.url || "";
    return {
      vendorId : item.vendorId,
      fullname: item.fullname,
      email: item.email,
      phoneNumber: item.phoneNumber,
      businessName: item.businessName,
      businessCategory: item.businessCategory,
      verify:item.isVerified,
      pan: item.pan,
      gst: item.gst,
      accountProof,
      addressProof,
      gstProof,
    };
  });
};
