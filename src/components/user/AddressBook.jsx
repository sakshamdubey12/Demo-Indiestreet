import React, { useEffect, useState } from "react";
import Header from "@/components/user/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
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
import { Textarea } from "../ui/textarea";
import {
  useGetAddressesQuery,
  useAddAddressMutation,
  useDeleteAddressMutation,
  useSetPrimaryAddressMutation,
} from "@/redux/slices/user/addressSlice";
import { useToast } from "@/components/ui/use-toast";

const AddressBook = ({ header }) => {
  const { data: addressesData, refetch } = useGetAddressesQuery();
  const [primaryAddressId, setPrimaryAddressId] = useState(null);
  const [addAddress] = useAddAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [setPrimaryAddress] = useSetPrimaryAddressMutation();
  const { toast } = useToast();
  const [newAddress, setNewAddress] = useState({
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    type: "home",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setNewAddress((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSaveAddress = async () => {
    if (Object.values(newAddress).some((field) => !field)) {
      alert("Please fill out all the fields");
      return;
    }
    try {
      await addAddress(newAddress);
      toast({ description: "Address added successfully" });
      setNewAddress({
        address: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
        type: "home",
      });
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast({ description: "Failed to add address" });
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      toast({ description: "Address deleted successfully" });
      refetch();
    } catch (error) {
      toast({ description: "Failed to delete address" });
    }
  };

  const handleSetPrimaryAddress = async (id) => {
    try {
      await setPrimaryAddress(id);
      toast({ description: "Primary address set successfully" });
      refetch();
    } catch (error) {
      toast({ description: "Failed to set primary address" });
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center">
        <Header title={header} className="mt-9" />
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
                onSubmit={(e) => e.preventDefault()}
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
                <RadioGroup
                  value={newAddress.type}
                  onValueChange={(value) =>
                    setNewAddress((prevState) => ({
                      ...prevState,
                      type: value,
                    }))
                  }
                  className="w-full grid grid-cols-4 gap-3"
                >
                  <div className="home flex items-center">
                    <RadioGroupItem value="home" id="home" className="mr-1.5" />
                    <Label htmlFor="home">Home</Label>
                  </div>
                  <div className="office flex items-center">
                    <RadioGroupItem
                      value="office"
                      id="office"
                      className="mr-1.5"
                    />
                    <Label htmlFor="office">Office</Label>
                  </div>
                  {/* <div className="other flex items-center">
                  <RadioGroupItem
                    value="other"
                    id="other"
                    className="mr-1.5"
                  />
                  <Label htmlFor="other">Other</Label>
                </div> */}
                </RadioGroup>
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
          className="w-full grid md:grid-cols-2 md:gap-3 gap-2"
          onValueChange={(value) => handleSetPrimaryAddress(value)}
        >
          {addressesData?.addresses?.length > 0 ? (
            addressesData?.addresses?.map((address) => (
              <div
                className="add-1 border flex justify-between items-start h-14 relative"
                key={address._id}
              >
                <RadioGroupItem
                  className="ml-5 mt-2.5"
                  value={address._id}
                  id={`option-${address._id}`}
                />
                <Label
                  htmlFor={`option-${address._id}`}
                  className="h-full mt-0.5 absolute -top-0.5 left-0 pl-12 md:w-[85%] w-[80%] md:py-2 py-1 xl:text-sm lg:text-xs text-xs"
                >
                  {`${address.address}, ${address.city}, ${address.pincode}, ${address.state}`}
                </Label>
                <Dialog>
                  <DialogTrigger className=" bg-[#4E1B61] h-full md:w-14 w-10 flex justify-center items-center text-white">
                    <Trash className="w-4 h-4" />
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>Confirm Delete</DialogHeader>
                    <DialogDescription>
                      Are you sure you want to delete this address?
                    </DialogDescription>
                    <DialogFooter>
                      <Button
                        className="w-fit"
                        onClick={() => handleDeleteAddress(address._id)}
                      >
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))
          ) : (
            <p>No addresses added yet!!</p>
          )}
        </RadioGroup>
      </div>
    </div>
  );
};

export default AddressBook;
