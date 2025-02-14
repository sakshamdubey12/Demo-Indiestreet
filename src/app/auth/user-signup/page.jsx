"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { signupUser } from '@/redux/slices/user/userSignupSLice';

const UserRegister = () => {
  const [fullname, setfullname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const loading = useSelector((state) => state.signup.loading);
  const error = useSelector((state) => state.signup.error);

  const validate = () => {
    const newErrors = {};
    if (!fullname) newErrors.fullname = 'Full Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    const userData = { fullname, email, phoneNumber, password };
    dispatch(signupUser(userData))
      .unwrap()
      .then((response) => {
        console.log(response);
        toast({
          description: response.message,
          status: 'success',
        });
        router.push('/auth/verification');
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: 'Error',
          description: err.message || "something went wrong !",
          status: 'error',
        });
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <div className="w-full h-screen frm flex justify-center items-center sm:px-6 px-3">
      <div className="form sm:p-8 p-4 rounded-md bg-white 2xl:w-[500px] xl:w-1/3 lg:w-2/5 md:w-3/5 sm:w-2/3 w-full shadow-[0_0_40px_rgba(78,27,97,0.15)] border border-[#4e1b6112]">
        <h1 className="md:text-3xl text-2xl font-semibold text-[#4E1B61] sm:mb-0.5">
          Create an account
        </h1>
        <p className="sm:mb-3 mb-1.5 sm:text-base text-sm">
          Register on Indiestreet.
        </p>
        <form className="sm:mb-5 mb-2.5" onSubmit={handleSubmit}>
          <div className="element sm:mb-3 mb-1">
            <Label htmlFor="fullname" className=" sm:text-base text-xs">
              Full Name
            </Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className={`outline-none mt-0.5 rounded sm:text-base text-sm`}
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
            />
            {errors.fullname && (
              <p className="text-xs text-red-500">{errors.fullname}</p>
            )}
          </div>
          <div className="element sm:mb-3 mb-1">
            <Label htmlFor="email" className=" sm:text-base text-xs">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className={`outline-none mt-0.5 rounded sm:text-base text-sm `}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="element sm:mb-3 mb-1">
            <Label htmlFor="phoneNumber" className=" sm:text-base text-xs">
              Phone Number
            </Label>
            <Input
              type="text"
              name="phoneNumber"
              minLength={10}
              maxLength={10}
              placeholder="Phone Number"
              className={`outline-none mt-0.5 rounded sm:text-base text-sm `}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="element sm:mb-3 mb-1">
            <Label htmlFor="password" className=" sm:text-base text-xs">
              Password
            </Label>
            <div className="pass flex relative">
              <Input
                type={showPassword ? 'text' : 'password'}
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
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="element sm:mb-3 mb-1">
            <Label htmlFor="confirmPassword" className=" sm:text-base text-xs">
              Confirm Password
            </Label>
            <div className="pass flex relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
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
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            {loading ? 'Loading...' : 'Register'}
          </Button>
        </form>
        <p className="sm:text-base text-xs text-[#7F8691]">
          Already have an account?{' '}
          <Link
            href="/user/auth/login"
            className="sm:text-base text-xs font-semibold text-[#4E1B61]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
