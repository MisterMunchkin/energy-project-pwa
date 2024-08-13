import TopNavBar from "@/components/navigation/TopNavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Location | Energy Project",
};

export default function NewLocationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="pt-16">
        <TopNavBar 
          title="New Location"
          showAccount
        />
        {children}
    </section>
  );
}