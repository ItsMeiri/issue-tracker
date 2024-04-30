"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoBug } from "react-icons/io5";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const path = usePathname();
  const { data: session, status } = useSession();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" }
  ];

  return (
    <nav className="mb-5  border-b   px-4 py-3 ">
      <Container><Flex justify={"between"}>
        <Flex align={"center"} gap={"3"}>
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
                    "transition-colors hover:text-zinc-800": true
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
        <Box>
          {status === "authenticated" && (
            <Link href="http://localhost:3000/api/auth/signout">Sign out</Link>
          )}
          {status === "unauthenticated" && (
            <Link href={`http://localhost:3000/api/auth/signin`}>Sign in</Link>
          )}
        </Box>
      </Flex></Container>
    </nav>
  );
};

export default NavBar;
