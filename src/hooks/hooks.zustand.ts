import { create } from "zustand";

type TaskState = {
  tasks: string[];
  completedTasks: string[];
  addTask: (task: string) => void;
  completeTask: (task: string) => void;
  deleteTask: (task: string) => void;
  deleteCompletedTasks: (task: string) => void;
};

export const useTasks = create<TaskState>((set) => ({
  tasks: [],
  completedTasks: [],
  addTask: (task: string) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  completeTask: (task: string) =>
    set((state) => ({
      completedTasks: [...state.completedTasks, task],
    })),
  deleteTask: (task: string) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t !== task),
    })),
  deleteCompletedTasks: (task: string) =>
    set((state) => ({
      completedTasks: state.completedTasks.filter((t) => t !== task),
    })),
}));
