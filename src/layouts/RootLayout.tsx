import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootLayout() {
  return (
    <div>
      <Header />
      <main className='mt-5 max-w-sm mx-auto px-5'>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
