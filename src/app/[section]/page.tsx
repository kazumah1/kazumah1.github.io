import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionPageClient } from "@/components/SectionPageClient";
import { isSectionId, sectionPageOrder, sectionPages } from "@/content/sections";
import { siteContent } from "@/content/siteContent";

interface SectionRouteProps {
  params: {
    section: string;
  };
}

export const generateStaticParams = () =>
  sectionPageOrder.map((sectionId) => ({ section: sectionId }));

export const generateMetadata = ({
  params
}: SectionRouteProps): Metadata => {
  if (!isSectionId(params.section)) {
    return {};
  }

  const section = sectionPages[params.section];
  return {
    title: `${section.title} | ${siteContent.siteConfig.name}`,
    description: section.shortDescription
  };
};

export default function SectionPage({
  params
}: SectionRouteProps): JSX.Element {
  if (!isSectionId(params.section)) {
    notFound();
  }

  return <SectionPageClient sectionId={params.section} />;
}
