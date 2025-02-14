import "./globals.css";
import { Poppins } from "next/font/google";
import StoreProvider from "@/redux/storeProider";
import { Toaster } from "@/components/ui/toaster";
const inter = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "IndieStreet",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
