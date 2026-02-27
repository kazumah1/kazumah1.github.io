import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudyPage } from "@/components/ProjectCaseStudyPage";
import { getProjectBySlug, projectSlugs } from "@/content/projects";
import { siteContent } from "@/content/siteContent";

interface ProjectRouteProps {
  params: {
    slug: string;
  };
}

export const generateStaticParams = () => projectSlugs;

export const generateMetadata = ({ params }: ProjectRouteProps): Metadata => {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | ${siteContent.siteConfig.name}`,
    description: project.dek
  };
};

export default function ProjectPage({ params }: ProjectRouteProps): JSX.Element {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudyPage project={project} />;
}
