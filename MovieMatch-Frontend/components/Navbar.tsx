"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Button from "./Button";
import classNames from "classnames";
import { IfAuthenticated, IfNotAuthenticated } from "./If";

const Links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Movies",
    href: "/movies",
  },
  {
    name: "Genres",
    href: "/genres",
  },
];

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item has-text-primary is-size-5" href="/">
          Movie Match
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="primaryNav"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        className={classNames(["navbar-menu", { "is-active": navOpen }])}
        id="primaryNav"
      >
        <div className="navbar-start">
          {Links.map((link, i) => {
            return (
              <NavItem props={link} key={`link--${i}--${link.href}`}></NavItem>
            );
          })}
          <IfAuthenticated>
            <NavItem props={{ name: "My movies", href: "my-movies" }} />
          </IfAuthenticated>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <IfAuthenticated>
                <p className="has-text-info mr-4">{session?.user?.firstName}</p>
                <Button color="is-light" onClick={() => signOut()}>
                  Logout
                </Button>
              </IfAuthenticated>
              <IfNotAuthenticated>
                <Button>
                  <Link href="/auth/signup">Sign up</Link>
                </Button>
                <Button color="is-light" onClick={() => signIn()}>
                  Log in
                </Button>
              </IfNotAuthenticated>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

type NavItemProps = {
  props: {
    name: string;
    href: string;
  };
};

function NavItem({ props }: NavItemProps) {
  return (
    <Link className="navbar-link is-arrowless is-size-6" href={props.href}>
      {props.name}
    </Link>
  );
}

export default Navbar;
