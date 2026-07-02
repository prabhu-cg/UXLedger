import { create } from "zustand";
import type { Project } from "@/types";

interface ProjectStore {
  projects: Project[];
  activeProject: Project | null;
  setProjects: (projects: Project[]) => void;
  setActiveProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  removeProject: (id: string) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  activeProject: null,
  setProjects: (projects) => set({ projects }),
  setActiveProject: (project) => set({ activeProject: project }),
  addProject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),
  updateProject: (project) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === project.id ? project : p)),
      activeProject:
        state.activeProject?.id === project.id ? project : state.activeProject,
    })),
  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      activeProject:
        state.activeProject?.id === id ? null : state.activeProject,
    })),
}));
