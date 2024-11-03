import TopNavBar from "@/components/navigation/TopNavBar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Location Detail | Energy Project",
};

/**
 * LocationDetail Layout SSR page
 * @param param0 props for LocationDetail SSR
 * @returns ReactNode
 */
export default function LocationDetailLayout({
  children,
  header,
  barchart,
}: Readonly<{
  children: React.ReactNode;
  header: React.ReactNode;
  barchart: React.ReactNode;
}>) {
  return (
    <section>
      <TopNavBar title="Location Detail" showAccount />
      <main className="py-[50px] flex flex-col space-y-4 bg-epp-white">
        <div className="flex flex-col">
          {header}
          {barchart}
        </div>
        {children}
      </main>
    </section>
  );
}
