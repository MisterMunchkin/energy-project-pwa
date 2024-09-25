import TopNavBar from "@/components/navigation/TopNavBar";
import { ServerComponentProps } from "@/types/server-component-props.types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Location Detail | Energy Project",
};

export default function LocationDetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode,
  params: ServerComponentProps,
}>) {
  console.log(params);

  return (
    <section>
      <TopNavBar 
        title="Location Detail"
        showAccount
      />
      {children}
    </section>
  )
}