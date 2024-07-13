"use client";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useLoginMutation } from "@/redux/slices/common/authSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
=======
import { ArrowLeft, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
>>>>>>> 0ff5036fcd70fd92bd741bd674626b53eef381ee

const Login = () => {
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [errors, setErrors] = useState({});
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
=======
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otp, setOtp] = useState("");
>>>>>>> 0ff5036fcd70fd92bd741bd674626b53eef381ee
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!emailOrPhoneNumber) {
      newErrors.emailOrPhoneNumber = "Email or Phone Number is required";
    } else if (
      !/^\S+@\S+\.\S+$/.test(emailOrPhoneNumber) &&
      !/^\d{10}$/.test(emailOrPhoneNumber)
    ) {
      newErrors.emailOrPhoneNumber =
        "Please enter a valid email or phone number";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const loginData = /^\S+@\S+\.\S+$/.test(emailOrPhoneNumber)
        ? { email: emailOrPhoneNumber, password }
        : { phoneNumber: emailOrPhoneNumber, password };
      const response = await login(loginData).unwrap();
      console.log(response.message);
      if (response.success === true) {
        const { token, ...userData } = response;
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("isAuth", "true");
        Cookies.set("token", token, { expires: 7 });
        const decode = jwt.decode(token);
        if (decode.role === "admin") {
          router.push("/admin");
        } else if (decode.role === "vendor") {
          router.push("/vendor");
        } else {
          router.push("/");
        }
        toast({ title: response.message });
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        description: err.data.message || "something went wrong !",
      });
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

<<<<<<< HEAD
=======
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

>>>>>>> 0ff5036fcd70fd92bd741bd674626b53eef381ee
  return (
    <div className="w-full h-screen frm flex justify-center items-center sm:px-6 px-3">
      <div className="form sm:p-8 p-4 rounded-md bg-white 2xl:w-[500px] xl:w-1/3 lg:w-2/5 md:w-3/5 sm:w-2/3 w-full shadow-[0_0_40px_rgba(78,27,97,0.15)] border border-[#4e1b6112]">
        <h1 className="md:text-3xl text-2xl font-semibold text-[#4E1B61] sm:mb-0.5">
         Forget password 
        </h1>
<<<<<<< HEAD
        <p className="sm:mb-3 mb-1.5 sm:text-base text-sm">
        Enter your email id to forget password .
        </p>
        <form className="sm:mb-5 mb-2.5" onSubmit={handleSubmit}>
          <div className="element sm:mb-3 mb-1">
            <Label
              htmlFor="email"
              className=" sm:text-base text-xs"
            >
              Email 
            </Label>
            <Input
              type="text"
              name="email"
              placeholder="Email "
              className={`outline-none mt-0.5 rounded sm:text-base text-sm`}
              value={emailOrPhoneNumber}
              onChange={(e) => setEmailOrPhoneNumber(e.target.value)}
            />
            {errors.emailOrPhoneNumber && (
              <p className="text-xs text-red-500">
                {errors.emailOrPhoneNumber}
              </p>
            )}
          </div>

          <div className="element sm:mb-3 mb-1">
            <Button
              type="submit"
              className="w-full py-3.5"
              variant="default"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Forget Password "}
            </Button>
          </div>
        </form>
        <div className="add-account sm:text-sm text-xs">
          <p className="mb-1">
            Didn't recieved the email ?{" "}
            <Link href="/auth/user-signup" className="text-blue-600">
              Send forget password link on email again .
            </Link>
          </p>
   </div>
=======
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
>>>>>>> 0ff5036fcd70fd92bd741bd674626b53eef381ee
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
