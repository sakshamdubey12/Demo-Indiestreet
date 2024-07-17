const UserFooter = lazy(() => import("@/components/user/Userfooter"));
const UserNavbar = lazy(() => import("@/components/user/UserNavbar"));
import { lazy, Suspense } from "react";

export const metadata = {
  title: "IndieStreet",
  description: "Generated by create next app",
};

export default function UserLayout({ children }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Suspense fallback={null}>
        <UserNavbar />
        <div className="flex-grow">{children}</div>
        <UserFooter />
      </Suspense>
    </main>
  );
}
