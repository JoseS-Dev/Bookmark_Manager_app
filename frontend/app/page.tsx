import Image from "next/image";
import HeaderLanding from "@/components/ui/Headers/HeaderLanding";
import Banner from "@/components/ui/Banner";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col">
      <HeaderLanding />
      <Banner />
    </main>
  );
}
