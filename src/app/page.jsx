"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import Hero from "@/components/homePage/Hero";
import DonationSection from "@/components/homePage/DonationSection";
import Link from "next/link";

export default function HomePage() {
  const { lang } = useLanguage();
  const messages = getContent(lang, "home");

  return (
    <>
      <Hero content={messages.hero} />

      <section className="bg-[#f9f7f2] py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading mb-4">
              {messages.journey.title}
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {messages.journey.text}
            </p>

            <Link
              href="/about"
              className="inline-block bg-yellow-500 px-6 py-3 rounded-md font-medium hover:bg-yellow-400 transition"
            >
              {messages.journey.cta}
            </Link>
          </div>

          <div className="relative pl-8 border-l-2 border-yellow-500/30 py-4">
            <div className="mb-10 relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
              <span className="text-sm font-bold text-yellow-600">
                {messages.journey.timeline.startYear}
              </span>
              <h4 className="font-heading text-lg">
                {messages.journey.timeline.startTitle}
              </h4>
              <p className="text-sm text-gray-600">
                {messages.journey.timeline.startDescription}
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-gray-300"></div>
              <span className="text-sm font-bold text-gray-400">
                {messages.journey.timeline.presentYear}
              </span>
              <h4 className="font-heading text-lg text-gray-400">
                {messages.journey.timeline.presentTitle}
              </h4>
              <p className="text-sm text-gray-500">
                {messages.journey.timeline.presentDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-heading mb-6">
            {messages.foundation.title}
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8">
            {messages.foundation.text}
          </p>

          <Link
            href="/statement-of-faith"
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            {messages.foundation.cta}
          </Link>
        </div>
      </section>

      <section className="bg-[#f9f7f2] py-20">
        {" "}
        <div className="max-w-6xl mx-auto px-6">
          {" "}
          <h2 className="text-3xl font-heading text-center mb-12">
            {" "}
            {messages.ministries.title}{" "}
          </h2>{" "}
          <div className="grid md:grid-cols-2 gap-8">
            {" "}
            {messages.ministries.list.map((item, i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                {" "}
                <h3 className="text-xl font-heading mb-3">
                  {" "}
                  {item.title}{" "}
                </h3>{" "}
                <p className="text-gray-700 mb-6"> {item.text} </p>{" "}
                <Link
                  href={item.link}
                  className="text-yellow-600 font-medium hover:underline"
                >
                  {" "}
                  {item.cta}{" "}
                </Link>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>

      <DonationSection content={messages.donationSection} />
    </>
  );
}
