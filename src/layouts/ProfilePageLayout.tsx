import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@/components/Header/Header";

function ProfilePageLayout() {
  return (
    <main>
      <Header />
      <section className='max-w-3xl mx-auto pt-14  min-h-screen flex flex-col'>
        <Outlet />
      </section>
      <ScrollRestoration />
    </main>
  );
}

export default ProfilePageLayout;
