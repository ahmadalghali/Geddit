import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootLayout() {
  return (
    <main>
      <Header />

      <section className='max-w-3xl mx-auto pt-20 pb-8 md:px-10 px-5 min-h-screen flex flex-col'>
        <Outlet />
      </section>
    </main>
  );
}

export default RootLayout;
