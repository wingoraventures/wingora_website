import { caseStudies } from "./caseStudies";
import { experienceProjects } from "./experienceProjects";

export { caseStudies, experienceProjects };

export const allProjects = [...caseStudies, ...experienceProjects];

export const findProject = (id) => allProjects.find((p) => p.id === id);
