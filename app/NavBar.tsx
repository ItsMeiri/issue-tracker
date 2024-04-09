"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoBug } from "react-icons/io5";
import classnames from "classnames";

const NavBar = () => {
  const path = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="mb-5 flex h-14 items-center space-x-6 border-b px-4 ">
      <Link href="/">
        <IoBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "text-zinc-900": path === link.href,
                "text-zinc-500": path !== link.href,
                "transition-colors hover:text-zinc-800": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
