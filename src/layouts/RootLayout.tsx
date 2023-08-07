import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootLayout() {
  return (
    <main className='min-h-screen'>
      <Header />
      <section className='max-w-3xl mx-auto py-20 px-10 min-h-screen'>
        <Outlet />
      </section>
    </main>
  );
}

export default RootLayout;
