import TopNavBar from "@/components/navigation/TopNavBar";
import { Metadata } from "next";

/**
 * Metadata
 */
export const metadata: Metadata = {
  title: "New Location | Energy Project",
};

/**
 *SSR Layout for new location form
 * @param param0 ReactNode childrn
 * @returns ReactNode
 */
export default function NewLocationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="pt-[65px]">
      <TopNavBar title="New Location" showAccount />
      {children}
    </section>
  );
}
