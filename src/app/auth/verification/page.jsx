"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { verifyOTP } from "@/redux/slices/user/userSignupSLice";
import { Input } from "@/components/ui/input";


const Verification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const router = useRouter()

const { toast } = useToast();
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleVerify = async(e) => {
    e.preventDefault()
    try {
      const resp = await    dispatch(verifyOTP({ email, otp }));
      console.log(resp);
      if (resp.payload.success) {
        router.push("/auth")
        toast({
          description: resp.payload.message,
          status: 'success'
        });
      }else{
        toast({
          description: resp.payload.message,
          status: 'warning',
        });
        
      }
    } catch (error) {
      console.log(error);
      toast({
        description: resp.payload.message,
        status: 'error',
      });
    }
  };

  return (
    <div className="w-full h-screen frm flex justify-center items-center sm:px-6 px-3">
      <div className="form sm:p-8 p-4 rounded-md bg-white 2xl:w-[500px] xl:w-1/3 lg:w-2/5 md:w-3/5 sm:w-2/3 w-full shadow-[0_0_40px_rgba(78,27,97,0.15)] border border-[#4e1b6112]">
        <h1 className="md:text-3xl text-2xl font-semibold text-[#4E1B61] sm:mb-3">
          Verify Account
        </h1>
        <p className="text-blue-600 text-sm">
          Verification link has been sent to your email
        </p>
        <form onSubmit={handleVerify}>
          <Label htmlFor="otp">
            OTP has been sent to <span className="text-blue-500">{email}</span>
          </Label>
          <h1>Verify OTP</h1>
      {!localStorage.getItem('email') && (
        <div>
          <label>Email:</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}
          <InputOTP
            name="otp"
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            className="mb-2"
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot
                className="border-2 border-[#4e1b613d] rounded"
                index={0}
              />
              <InputOTPSeparator />
              <InputOTPSlot
                className="border-2 border-[#4e1b613d] rounded"
                index={1}
              />
              <InputOTPSeparator />
              <InputOTPSlot
                className="border-2 border-[#4e1b613d] rounded"
                index={2}
              />
              <InputOTPSeparator />
              <InputOTPSlot
                className="border-2 border-[#4e1b613d] rounded"
                index={3}
              />
              <InputOTPSeparator />
              <InputOTPSlot 
                className="border-2 border-[#4e1b613d] rounded"
                index={4}
              />
              <InputOTPSeparator />
              <InputOTPSlot
                className="border-2 border-[#4e1b613d] rounded"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
          <Button type="submit" className="w-full mt-1">
          Verify
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
