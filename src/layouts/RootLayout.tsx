import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootLayout() {
  return (
    <div>
      <Header />
      <main className='mx-5 mt-5 max-w-sm md:mx-auto'>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
