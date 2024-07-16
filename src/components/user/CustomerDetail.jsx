import React, { useEffect, useState } from "react";
import Header from "@/components/user/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/common/authSlice";
import AddressBook from "./AddressBook";

const CustomerDetail = () => {
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [email, setEmail] = useState("guest@email.com");
  const [phone, setPhone] = useState("0000000000");
  const [phoneError, setPhoneError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleEditPhone = () => setEditPhone(!editPhone);

  const handleEdit = () => {
    if (editPhone && !validatePhone(phone)) {
      setPhoneError("Invalid phone number. Must be 10 digits.");
      return;
    }
    setEditName(false);
    setEditEmail(false);
    setEditPhone(false);
    setPhoneError("");
  };

  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  useEffect(() => {
    const persistData = localStorage.getItem("persist:userData");
    if (persistData) {
      const parsedData = JSON.parse(persistData);
      const userData = JSON.parse(parsedData.userData);
      setEmail(userData.email);
      setPhone(userData.phoneNumber);
    }
  }, []);

  return (
    <>
      <div className="personal-detail w-full mx-auto">
        <div className="header flex justify-between items-end">
          <Header title="Personal Details" className="pb-0" />
          <Button
            className="md:text-base text-sm px-4 py-2"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-2 p-4">
          <div className="">
            <Label className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                readOnly={!editEmail}
                className="mt-1 block w-full p-2 pr-10 border-0 border-b sm:text-sm outline-none rounded-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-0"
                onClick={() => setEditEmail(!editEmail)}
              >
                <Pen className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>
          <div className="">
            <Label className="block text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            <div className="relative">
              <Input
                type="text"
                value={phone}
                readOnly={!editPhone}
                className="mt-1 block w-full p-2 pr-10 border-0 border-b sm:text-sm outline-none rounded-none"
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-0"
                onClick={handleEditPhone}
              >
                <Pen className="w-4 h-4 text-gray-600" />
              </Button>
              {phoneError && (
                <p className="text-red-500 text-sm">{phoneError}</p>
              )}
            </div>
          </div>
        </div>
        {(editName || editEmail || editPhone) && (
          <div className="col-span-1">
            <Button
              className="md:text-base text-sm px-4 py-2"
              onClick={handleEdit}
            >
              SAVE
            </Button>
          </div>
        )}
      </div>
      <AddressBook header="Address" />
    </>
  );
};

export default CustomerDetail;
