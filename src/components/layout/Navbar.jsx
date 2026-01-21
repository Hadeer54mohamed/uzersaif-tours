"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { NavLink } from "../NavLink";
import { Button } from "../ui/button";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

const Navbar = ({ transparent = false }) => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => setIsScrolled(window.scrollY > 20);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const switchLocale = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/trips", label: t("trips") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
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
         {/*  {navLinks.map((link) => (
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
          ))} */}

          {/* Language Switcher */}
          <button
            onClick={() => switchLocale(locale === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all text-primary hover:bg-white/10"
            title={locale === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
          >
            <Globe size={18} />
            <span className="text-sm font-medium">{locale === 'ar' ? 'EN' : 'ع'}</span>
          </button>

          <a href="#booking" className="px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all font-bold btn-fire">
            {t("bookNow")}
          </a>
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
       {/*    {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-medium transition-colors py-2 px-2 rounded-lg nav-link"
              activeClassName="nav-link-active"
            >
              {link.label}
            </NavLink>
          ))} */}

          {/* Mobile Language Switcher */}
          <button
            onClick={() => switchLocale(locale === 'ar' ? 'en' : 'ar')}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg transition-all text-primary bg-white/5 hover:bg-white/10"
          >
            <Globe size={18} />
            <span className="font-medium">{locale === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          <a href="#booking" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-3 rounded-xl shadow-md font-bold transition-all btn-fire text-center">
            {t("bookNow")}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
