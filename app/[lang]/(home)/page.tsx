import Badge from "@/components/badge/badge";
import { FaBoltLightning } from "react-icons/fa6";
import { getDictionary, hasLocale } from "@dictionary";
import { notFound } from "next/navigation";
import Button from "@/components/button/button";
import { ImWarning } from "react-icons/im";
import { ApiNames } from "./data";
import { MdFiberManualRecord } from "react-icons/md";
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
          textContent={dict.home["first-section"].badge}
          hasIcon={true}
          icon={<FaBoltLightning color="#f5f9ff" />}
          backgroundColor="var(--tertiary-light-color)"
        />
        <h1 className="text-white text-7xl text-center title">
          {dict.home["first-section"]["title-1"]} <br /><span>{dict.home["first-section"]["title-2"]}</span> {dict.home["first-section"]["title-3"]}
        </h1>
        <p className="text-white text-center text-xl description">{dict.home["first-section"].description}</p>
        <div className="cta-buttons flex flex-row justify-center items-center">
          <Button
            buttonType="button"
            hasTextContent={true}
            textContent={dict.home["first-section"]["cta-1"]}
            hasIcon={false}
            backgroundColor="var(--primary-color)"
            hoverBackgroundColor="var(--primary-dark-color)"
          />
          <Button
            buttonType="button"
            hasTextContent={true}
            textContent={dict.home["first-section"]["cta-2"]}
            hasIcon={false}
            backgroundColor="var(--tertiary-color)"
            hoverBackgroundColor="var(--primary-dark-color)"
            border="1px solid var(--tertiary-light-color)"
          />
        </div>
        <p className="text-center text-sm info">{dict.home["first-section"].info}</p>
      </div>

      <div className="banner w-full py-12 gap-y-12 flex flex-col items-center">
        <p className="text-center">{dict.home.banner.description}</p>
        <div className="flex gap-x-12">
          {ApiNames.map((api) => <span key={api.name} className="text-center text-2xl">{api.name}</span>)}
        </div>
      </div>

      <div className="second-section flex justify-between items-center">
        <div className="left-part flex flex-col">
          <Badge
            hasTextContent={true}
            textContent={dict.home["second-section"].badge}
            hasIcon={false}
            backgroundColor="var(--tertiary-color)"
            border="1px solid var(--tertiary-light-color)"
          />
          <h2 className="text-5xl text-white title">{dict.home["second-section"].title}</h2>
          <p className="text-lg description">{dict.home["second-section"].description}</p>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3"><ImWarning color="var(--error-color)" /> {dict.home["second-section"]["list-1"]}</li>
            <li className="flex items-center gap-3"><ImWarning color="var(--error-color)" /> {dict.home["second-section"]["list-2"]}</li>
            <li className="flex items-center gap-3"><ImWarning color="var(--error-color)" /> {dict.home["second-section"]["list-3"]}</li>
            <li className="flex items-center gap-3"><ImWarning color="var(--error-color)" /> {dict.home["second-section"]["list-4"]}</li>
          </ul>
        </div>
        <div className="right-part flex flex-col">
          <div className="card flex flex-col gap-y-10">
            <p className="flex items-center gap-3"><MdFiberManualRecord size={20} /> {dict.home["second-section"]["api-status"]}</p>
            <div className="placeholders flex flex-col gap-y-4">
              <div className="placeholder"></div>
              <div className="placeholder"></div>
              <div className="placeholder"></div>
            </div>
            <p className="warning-message">{dict.home["second-section"]["warning-message"]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
