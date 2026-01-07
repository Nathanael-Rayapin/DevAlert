import Badge from "@/components/badge/badge";
import { FaBoltLightning } from "react-icons/fa6";
import { getDictionary, hasLocale } from "@dictionary";
import { notFound } from "next/navigation";
import Button from "@/components/button/button";
import "./home.css";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="home-container flex flex-col items-center w-full min-h-screen">
      <div className="first-section flex flex-col items-center">
        <Badge
          hasTextContent={true}
          textContent={dict.home.badge}
          hasIcon={true}
          icon={<FaBoltLightning color="#f5f9ff" />}
          backgroundColor="var(--tertiary-light-color)"
        />
        <h1 className="text-white text-7xl text-center title">
          {dict.home["title-1"]} <br /><span>{dict.home["title-2"]}</span> {dict.home["title-3"]}
        </h1>
        <p className="text-white text-center text-xl description">{dict.home.description}</p>
        <div className="cta-buttons flex flex-row justify-center items-center">
          <Button
            buttonType="button"
            hasTextContent={true}
            textContent={dict.home["cta-1"]}
            hasIcon={false}
            backgroundColor="var(--primary-color)"
            hoverBackgroundColor="var(--primary-dark-color)"
          />
          <Button
            buttonType="button"
            hasTextContent={true}
            textContent={dict.home["cta-2"]}
            hasIcon={false}
            backgroundColor="var(--tertiary-color)"
            hoverBackgroundColor="var(--primary-dark-color)"
            border="1px solid var(--tertiary-light-color)"
          />
        </div>
        <p className="text-center text-sm info">{dict.home.info}</p>
      </div>
    </div>
  );
}
