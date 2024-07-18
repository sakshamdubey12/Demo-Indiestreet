"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useForgetPasswordMutation } from "@/redux/slices/user/authSlice";


const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { toast } = useToast();
  const [forgotPassword, { isLoading }] = useForgetPasswordMutation();

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }
console.log({email});
    try {
      const response = await forgotPassword({ email }).unwrap();
console.log(response);
      toast({
        title: "Success",
        description: response.message || "Password reset email sent successfully",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to send password reset email",
        status: "error",
      });
    }
  };

  return (
    <div className="w-full h-screen frm flex justify-center items-center sm:px-6 px-3">
      <div className="form sm:p-8 p-4 rounded-md bg-white 2xl:w-[500px] xl:w-1/3 lg:w-2/5 md:w-3/5 sm:w-2/3 w-full shadow-[0_0_40px_rgba(78,27,97,0.15)] border border-[#4e1b6112]">
        <h1 className="md:text-3xl text-2xl font-semibold text-[#4E1B61] sm:mb-3">
          Forgot Password
        </h1>
        <>
          <form className="mb-3" onSubmit={handleSubmit}>
            <Label htmlFor="email">Enter email to change password</Label>
            <Input
              name="email"
              type="email"
              className="mb-2"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Enter your email id"
            />
            {emailError && (
              <p className="text-red-500 text-sm mb-2">{emailError}</p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
          <p className="text-gray-500 text-sm mb-2">
            Note: The email link will expire in 15 minutes.
          </p>
          <Link
            href="/auth"
            className="flex justify-center items-center w-fit text-blue-500 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-0.5" />{" "}
            <span>Back to login</span>
          </Link>
        </>
      </div>
    </div>
  );
};

export default ForgotPassword;
