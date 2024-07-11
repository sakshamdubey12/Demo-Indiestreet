"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otp, setOtp] = useState("");
  const { toast } = useToast();
  const [toggle, setToggle] = useState("number");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handlePhoneNumberChange = (value) => {
    if (!/^\d+$/.test(value)) {
      setPhoneNumber("");
    } else {
      if (/^[0-9]/.test(value)) {
        setPhoneNumber(value);
      } else setPhoneNumber("");
    }
  };

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    if (phoneError) {
      alert("Please correct the phone number.");
    } else if (phoneNumber.length == 10 && phoneNumber != "") {
      setToggle("otp");
    } else {
      toast({
        variant: "destructive",
        description: "Phone Number required",
      });
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    if (otp.length > 3) {
      setToggle("password");
      console.log(otp);
    } else
      toast({
        variant: "destructive",
        description: "Enter valid OTP!!",
      });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      {
        toast({
          description: "Password changed successfully!!",
        });
        router.push("/");
      }
    } else
      toast({
        variant: "destructive",
        description: "Password doesn't match!!",
      });
  };

  return (
    <div className="w-full h-screen frm flex justify-center items-center sm:px-6 px-3">
      <div className="form sm:p-8 p-4 rounded-md bg-white 2xl:w-[500px] xl:w-1/3 lg:w-2/5 md:w-3/5 sm:w-2/3 w-full shadow-[0_0_40px_rgba(78,27,97,0.15)] border border-[#4e1b6112]">
        <h1 className="md:text-3xl text-2xl font-semibold text-[#4E1B61] sm:mb-3">
          Forgot Password
        </h1>
        {toggle === "number" ? (
          <>
            <form onSubmit={handlePhoneNumberSubmit} className=" mb-3">
              <Label htmlFor="number">
                Enter phone number to change password
              </Label>
              <Input
                name="number"
                className="mb-2"
                minLength={10}
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => handlePhoneNumberChange(e.target.value)}
                placeholder="Phone Number"
              />
              {phoneError && (
                <p className="text-red-500 text-sm mb-2">{phoneError}</p>
              )}
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
            <Link
              href="/auth"
              className="flex justify-center items-center w-fit text-blue-500 text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-0.5" />{" "}
              <span>Back to login</span>
            </Link>
          </>
        ) : toggle === "otp" ? (
          <>
            <form onSubmit={handleOTPSubmit}>
              <Label htmlFor="otp">
                OTP has been sent to{" "}
                <span className="text-blue-500">{phoneNumber}</span>
              </Label>
              <InputOTP
                name="otp"
                maxLength={4}
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
                </InputOTPGroup>
              </InputOTP>
              <span
                className="cursor-pointer text-sm text-blue-500"
                onClick={() => setToggle("number")}
              >
                Edit Phone Number
              </span>
              <Button className="w-full mt-1">Submit</Button>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={handlePasswordChange}>
              <div className="element sm:mb-3 mb-1">
                <Label htmlFor="password" className=" sm:text-base text-xs">
                  Password
                </Label>
                <div className="pass flex relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={`outline-none mt-0.5 sm:text-base text-sm`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="bg-white hover:bg-white text-black hover:text-black border-0 hover:border-0 absolute grid place-items-center right-1 top-1 h-9"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-[20px] h-[20px] absolute" />
                    ) : (
                      <EyeIcon className="w-[20px] h-[20px] absolute" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="element sm:mb-3 mb-1">
                <Label
                  htmlFor="confirmPassword"
                  className=" sm:text-base text-xs"
                >
                  Confirm Password
                </Label>
                <div className="pass flex relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={`outline-none mt-0.5 sm:text-base text-sm`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={handleToggleConfirmPasswordVisibility}
                    className="bg-white hover:bg-white text-black hover:text-black border-0 hover:border-0 absolute grid place-items-center right-1 top-1 h-9"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="w-[20px] h-[20px] absolute" />
                    ) : (
                      <EyeIcon className="w-[20px] h-[20px] absolute" />
                    )}
                  </Button>
                </div>
              </div>
              <Button className="w-full">Submit</Button>
            </form>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default ForgotPassword;
