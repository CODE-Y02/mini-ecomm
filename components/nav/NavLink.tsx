"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Button asChild variant={isActive ? "default" : "outline"}>
      <Link href={href} className="flex items-center">
        {children}
      </Link>
    </Button>
  );
};

export default NavLink;
