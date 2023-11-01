import { Outlet, ScrollRestoration } from "react-router-dom";
import AnimatedPage from "@/components/animate/AnimatedPage";
import Header from "@/components/Header/Header";

function RootLayout() {
  return (
    <main>
      <Header />
      <section className='max-w-3xl mx-auto pt-20 pb-8 sm:px-10 px-5 min-h-screen flex flex-col '>
        <AnimatedPage>
          <Outlet />
        </AnimatedPage>
      </section>
      <ScrollRestoration />
    </main>
  );
}

export default RootLayout;
