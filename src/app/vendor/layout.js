import VendorNavbar from "@/components/vendor/VendorNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "Indiestreet | Vendor",
  description: "Generated by create next app",
};

export default function VendorLayout({ children }) {
  return (
    <main className=" flex">
      <VendorNavbar />
      {children}
      <ToastContainer/>
    </main>
  );
}
