import { HomeIcon } from "lucide-react";
import NavLink from "./NavLink";
import { CartBtn } from "./CartBtn";

const Navbar = () => {
  return (
    <div className="px-4 py-2 border-b-gray-200 border-b-2">
      <div className="flex items-center justify-between">
        <NavLink href="/">
          <HomeIcon size={20} />
          <span className="text-sm font-medium">Home</span>
        </NavLink>

        <NavLink href="/cart">
          <CartBtn />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
