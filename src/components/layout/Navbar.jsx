"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NavLink } from "../NavLink";
import { Button } from "../ui/button";

const Navbar = ({ transparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => setIsScrolled(window.scrollY > 20);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/Trips", label: "الرحلات" },
    { href: "/about", label: "من نحن" },
    { href: "/contact", label: "تواصل معنا" },
  ];

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-scrolled' : transparent ? 'navbar-transparent' : 'navbar-scrolled'
      }`}
    >
      <div className="flex items-center justify-between h-20 px-4 md:px-8">
        {/* Logo */}
        <NavLink
          href="/"
          className="flex items-center gap-2 hover:scale-[1.03] transition-all duration-300"
        >
          <Image
            src="/TOURS.png"
            alt="Uzer Saif Tours Logo"
            width={64}
            height={64}
            className="drop-shadow-md"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className="relative font-medium transition-all nav-link"
              activeClassName="nav-link-active"
            >
              <span className="hover:text-fire transition-colors">
                {link.label}
              </span>
              <span className="absolute bottom-0 right-0 h-[2px] w-0 transition-all hover:w-full hover:left-0 nav-link-underline" />
            </NavLink>
          ))}

          <Button className="px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all font-bold btn-fire">
            احجز الآن
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg transition-all text-primary bg-transparent"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden`}
        style={{
          maxHeight: isMobileMenuOpen ? "500px" : "0",
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
      >
        <div
          className={`py-4 space-y-4 px-4 rounded-b-2xl transform transition-transform duration-500 mobile-menu ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-10"
          }`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-medium transition-colors py-2 px-2 rounded-lg nav-link"
              activeClassName="nav-link-active"
            >
              {link.label}
            </NavLink>
          ))}

          <Button className="w-full py-3 rounded-xl shadow-md font-bold transition-all btn-fire">
            احجز الآن
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
