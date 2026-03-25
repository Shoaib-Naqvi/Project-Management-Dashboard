import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

export const useProjectStore = create(
  persist(
    (set) => ({
      projects: [],

      addProject: (title) => set((state) => ({
        projects: [
          ...state.projects, 
          { id: nanoid(), title, tasks: [] }
        ]
      })),

      deleteProject: (projectId) => set((state) => ({
        projects: state.projects.filter(p => p.id !== projectId)
      })),

      updateProject: (projectId, title) => set((state) => ({
        projects: state.projects.map(p => 
          p.id === projectId ? { ...p, title } : p
        )
      })),

      // Tasks
      addTask: (projectId, task) => set((state) => ({
        projects: state.projects.map(p => {
          if (p.id !== projectId) return p;
          return {
            ...p,
            tasks: [
              ...p.tasks, 
              { ...task, id: nanoid() }
            ]
          };
        })
      })),

      editTask: (projectId, taskId, updatedData) => set((state) => ({
        projects: state.projects.map(p => {
          if (p.id !== projectId) return p;
          return {
            ...p,
            tasks: p.tasks.map(t => 
              t.id === taskId ? { ...t, ...updatedData } : t
            )
          };
        })
      })),

      deleteTask: (projectId, taskId) => set((state) => ({
        projects: state.projects.map(p => {
          if (p.id !== projectId) return p;
          return {
            ...p,
            tasks: p.tasks.filter(t => t.id !== taskId)
          };
        })
      })),

      updateTaskStatus: (projectId, taskId, newStatus) => set((state) => ({
        projects: state.projects.map(p => {
          if (p.id !== projectId) return p;
          return {
            ...p,
            tasks: p.tasks.map(t => 
              t.id === taskId ? { ...t, status: newStatus } : t
            )
          };
        })
      })),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query })
    }),
    {
      name: 'project-management-storage',
      partialize: (state) => ({ projects: state.projects }),
    }
  )
);
