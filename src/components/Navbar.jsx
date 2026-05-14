"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  const messages = getContent(lang, "navbar");

  return (
    <>
      {/* Navbar */}
      <header className="w-full fixed top-0 z-50 bg-black/60 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6 justify-between">

          <Link
            href="/"
            className="font-heading flex gap-2 justify-center items-center text-xl tracking-wide text-white"
          >
            <span>{messages.logo}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 font-heading">
            <ul className="flex items-center gap-8 text-md text-gray-200">
              <li>
                <Link href="/">{messages.links.home}</Link>
              </li>
              <li>
                <Link href="/about">{messages.links.about}</Link>
              </li>
              <li>
                <Link href="/statement-of-faith">
                  {messages.links.statementOfFaith}
                </Link>
              </li>
              <li>
                <Link href="/ministries">{messages.links.ministries}</Link>
              </li>
              <li>
                <Link href="/impressum">{messages.links.legalNotice}</Link>
              </li>
              <li>
                <Link href="/gallery">{messages.links.gallery}</Link>
              </li>
            </ul>

            <LanguageSwitcher sidebar={false} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-white"
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </nav>
      </header>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-1/2 max-w-xs bg-[#F1EFEC] transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 flex flex-col h-full overflow-y-auto">
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="self-end mb-10"
            aria-label="Close menu"
          >
            <X size={26} />
          </button>

          {/* Links */}
          <nav className="flex flex-col gap-6 font-heading text-lg mb-4">
            <Link href="/" onClick={() => setOpen(false)}>
              {messages.links.home}
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              {messages.links.about}
            </Link>
            <Link href="/statement-of-faith" onClick={() => setOpen(false)}>
              {messages.links.statementOfFaith}
            </Link>
            <Link href="/ministries" onClick={() => setOpen(false)}>
              {messages.links.ministries}
            </Link>
            <Link href="/impressum" onClick={() => setOpen(false)}>
              {messages.links.legalNotice}
            </Link>
            <Link href="/gallery" onClick={() => setOpen(false)}>
              {messages.links.gallery}
            </Link>
          </nav>

          <LanguageSwitcher sidebar={true} />
        </div>
      </aside>
    </>
  );
};

export default Navbar;
