"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"; 
import { FaPencilAlt, FaCheckCircle } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AccountEditPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [formData, setFormData] = useState({
    vendorName: "Vendor Name",
    email: "email@example.com",
    phoneNumber: "1234567890",
    businessCategory: "Category",
    panNumber: "PAN12345",
    gstNumber: "GST12345",
    addressProof: "AddressProofDocument.pdf",
    bankDoc: "BankDocument.pdf",
    gstDoc: "GSTDocument.pdf"
  });

  const openModal = (field) => {
    setCurrentField(field);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentField("");
  };

  const handleChange = (e) => {
    if (["addressProof", "bankDoc", "gstDoc"].includes(currentField)) {
      setFormData({ ...formData, [currentField]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [currentField]: e.target.value });
    }
  };

  const handleSave = () => {
    // Implement save functionality here
    closeModal();
  };

  return (
    <div className="container mx-auto p-4">
      {/* <div className="flex justify-between mb-10"> */}
        <h1 className="text-2xl font-bold mb-4">Edit Account</h1>
        
      {/* </div> */}
      <div className="flex flex-col justify-center items-center my-12">
      <Avatar className="h-32 w-32 ">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex items-center mt-4">
        <p className="mr-2 font-semibold text-2xl">{formData.vendorName}</p>
         <Dialog open={isOpen && currentField === "vendorName"} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <button onClick={() => openModal("vendorName")}>
                    <FaPencilAlt className="h-5 w-5 text-gray-500" />
                  </button>
                </DialogTrigger>
                <DialogContent style={{ backgroundColor: "#f0f0f0", }} > 
                  <DialogHeader>
                    <DialogTitle>Edit {currentField.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</DialogTitle>
                  </DialogHeader>
                  {["addressProof", "bankDoc", "gstDoc"].includes(currentField) ? (
                    <input
                      type="file"
                      className="w-full border px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full border px-2 py-1 rounded"
                      value={formData[currentField] || ""}
                      onChange={handleChange}
                    />
                  )}
                  <DialogFooter>
                    <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Proceed Changes</button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
        </div>
       
      </div>
      <div className="grid grid-cols-2 w-[75%] mx-auto gap-8">
        {Object.keys(formData).slice(1,).map((field) => (
          <div key={field} className="flex items-center justify-between shadow-md border-b p-4 rounded">
            {/* <h1>{field}</h1> */}
            <div>
              <span className="font-medium">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: </span>
              {typeof formData[field] === 'string' && <span>{formData[field]}</span>}
            </div>
            <div className="flex items-center space-x-2">
              {["email", "phoneNumber"].includes(field) && (
                <FaCheckCircle className="h-5 w-5 text-green-500" />
              )}
              <Dialog open={isOpen && currentField === field} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <button onClick={() => openModal(field)}>
                    <FaPencilAlt className="h-5 w-5 text-gray-500" />
                  </button>
                </DialogTrigger>
                <DialogContent style={{ backgroundColor: "#f0f0f0", }} > 
                  <DialogHeader>
                    <DialogTitle>Edit {currentField.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</DialogTitle>
                  </DialogHeader>
                  {["addressProof", "bankDoc", "gstDoc"].includes(currentField) ? (
                    <input
                      type="file"
                      className="w-full border px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full border px-2 py-1 rounded"
                      value={formData[currentField] || ""}
                      onChange={handleChange}
                    />
                  )}
                  <DialogFooter>
                    <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Proceed Changes</button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
      <button className="flex justify-center items-center mx-auto mt-6 px-4 py-2 bg-blue-500 text-white rounded">Raise a Query</button>
    </div>
  );
};

export default AccountEditPage;
