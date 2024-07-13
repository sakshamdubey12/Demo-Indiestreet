import React, { useEffect, useState } from "react";
import Header from "@/components/user/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { logout } from "@/redux/slices/common/authSlice";
const CustomerDetail = () => {
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [name, setName] = useState("Customer Name");
  const [email, setEmail] = useState("Customer@email.com");
  const [phone, setPhone] = useState("1234567890");
  const [phoneError, setPhoneError] = useState("");
  const [newAddress, setNewAddress] = useState({
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [savedAddress, setSavedAddress] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleEditName = () => {
    setEditName(!editName);
  };
  const handleEditEmail = () => {
    setEditEmail(!editEmail);
  };
  const handleEditPhone = () => {
    setEditPhone(!editPhone);
  };

  const handleEdit = () => {
    if (editName) {
      setEditName(false);
    }
    if (editEmail) {
      setEditEmail(false);
    }
    if (editPhone) {
      if (validatePhone(phone)) {
        setEditPhone(false);
        setPhoneError("");
      } else {
        setPhoneError("Invalid phone number. Must be 10 digits.");
      }
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSaveAddress = () => {
    if (
      !newAddress.address ||
      !newAddress.pincode ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.country
    ) {
      alert("Please fill out all the fields");
      return;
    }
    setSavedAddress([...savedAddress, newAddress]);
    setNewAddress({
      address: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
    });
    setIsDialogOpen(false);
  };

  const handleDeleteAddress = (index) => {
    setSavedAddress(savedAddress.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const persistData = localStorage.getItem("persist:userData");
    console.log(JSON.parse(persistData));
    if (persistData !== undefined) {
      const parsedData = JSON.parse(persistData);
      const userData = JSON.parse(parsedData.userData);
      setEmail(userData.email)
      setPhone(userData.phoneNumber)

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
          {/* <div className="">
            <Label className="block text-sm font-medium text-gray-700">
              Name
            </Label>
            <div className="relative">
              <Input
                type="text"
                value={name}
                readOnly={!editName}
                className="mt-1 block w-full p-2 pr-10 border-0 border-b sm:text-sm outline-none rounded-none"
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                onClick={handleEditName}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-0"
              >
                <Pen className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div> */}
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
                onClick={handleEditEmail}
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
      {/* <div className=" w-full mx-auto my-5 h-px bg-[#4e1b613d]"></div> */}
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center">
          <Header title="Saved Addresses" className=" mt-9" />
          <div className="mt-6 ml-9">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="md:text-base text-sm px-4 py-2"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Add Address
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>New Address</DialogTitle>
                  <DialogDescription>
                    Add a New Address And Click Save When Done
                  </DialogDescription>
                </DialogHeader>
                <form
                  className="grid gap-4 py-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      rows={3}
                      value={newAddress.address}
                      onChange={handleAddressChange}
                      placeholder="Enter Full Address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="pin">
                      <Label htmlFor="pincode" className="text-right">
                        Pincode
                      </Label>
                      <Input
                        id="pincode"
                        value={newAddress.pincode}
                        onChange={handleAddressChange}
                        placeholder="Your Pincode"
                        pattern="\d{6}"
                        maxLength={6}
                        minLength={6}
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="city" className="text-right">
                        City
                      </Label>

                      <Input
                        id="city"
                        value={newAddress.city}
                        onChange={handleAddressChange}
                        className="col-span-3"
                        type="text"
                        placeholder="Your City"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="state">
                      <Label htmlFor="state" className="text-right">
                        State
                      </Label>
                      <Input
                        id="state"
                        value={newAddress.state}
                        onChange={handleAddressChange}
                        className="col-span-3"
                        type="text"
                        placeholder="Your State"
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="country" className="text-right">
                        Country
                      </Label>
                      <Input
                        id="country"
                        value={newAddress.country}
                        onChange={handleAddressChange}
                        className="col-span-3"
                        type="text"
                        placeholder="Your Country"
                      />
                    </div>
                  </div>
                  <Button type="submit" onClick={handleSaveAddress}>
                    Save changes
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex mt-3">
          <RadioGroup
            defaultValue="primary"
            className="w-full grid md:grid-cols-2 gap-10"
          >
            {savedAddress.map((address, index) => (
              <div
                className="add-1 border flex justify-between items-start py-3 px-5 h-14 relative"
                key={index}
              >
                <RadioGroupItem
                  className=""
                  value={`option-${index}`}
                  id={`option-${index}`}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="w-full h-full mt-0.5 absolute -top-0.5 left-0 pl-14 py-3"
                >
                  {`${address.address}, ${address.city}, ${address.pincode}, ${address.state}, ${address.country}`}
                </Label>
                {/* <Button
                  className="ml-2 p-2"
                  onClick={() => handleDeleteAddress(index)}
                  size="sm"
                >
                  <Trash className="w-4 h-4" />
                </Button> */}
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </>
  );
};

export default CustomerDetail;
