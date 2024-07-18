"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft, EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useResetPasswordMutation } from '@/redux/slices/user/authSlice';

const ForgetPasswordPage = ({ params }) => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Passwords do not match.',
      });
      return;
    }
    try {
      await resetPassword({ token: params.token, password }).unwrap();
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Password updated successfully.',
      });
      router.push('/auth');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.data?.message || 'Could not reset password. Please try again later.',
      });
    }
  };

  return (
    <div className="w-full h-screen frm flex justify-center items-center sm:px-6 px-3">
      <div className="form sm:p-8 p-4 rounded-md bg-white 2xl:w-[500px] xl:w-1/3 lg:w-2/5 md:w-3/5 sm:w-2/3 w-full shadow-[0_0_40px_rgba(78,27,97,0.15)] border border-[#4e1b6112]">
        <h1 className="md:text-3xl text-2xl font-semibold text-[#4E1B61] sm:mb-3">
          Reset Password
        </h1>
        <>
          <form className="mb-3" onSubmit={handleSubmit}>
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="mb-2"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={handleTogglePassword}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mb-2">{passwordError}</p>
            )}
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                className="mb-2"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm new password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Save New Password'}
            </Button>
          </form>
          <Link
            href="/auth"
            className="flex justify-center items-center w-fit text-blue-500 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-0.5" /> <span>Back to login</span>
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Note: The email link will expire in 15 minutes.
          </p>
        </>
      </div>
      <Toaster />
    </div>
  );
};

export default ForgetPasswordPage;
