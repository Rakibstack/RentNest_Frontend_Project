import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navber";
import { getUser } from "@/service/getUser";

const publicLayout = async ({ children }: { children: React.ReactNode }) => {

  const user = await getUser()
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user}></Navbar>

      {children}
      <Footer></Footer>
    </div>
  );
};

export default publicLayout;
