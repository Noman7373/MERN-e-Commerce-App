import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="mt-2 lg:min-h-[70vh] sm:min-h-[58vh] xs:min-h-[61vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
