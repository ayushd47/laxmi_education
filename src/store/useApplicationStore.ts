import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Application {
  id: string;
  studentId: string;
  universityId: string;
  courseId: string;
  status: "draft" | "submitted" | "under_review" | "accepted" | "rejected";
  documents: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  programs: string[];
  requirements: string[];
  tuitionFee: number;
  applicationDeadline: string;
  imageUrl: string;
  description: string;
}

export interface Course {
  id: string;
  name: string;
  universityId: string;
  duration: string;
  level: "undergraduate" | "graduate" | "phd";
  requirements: string[];
  tuitionFee: number;
  description: string;
}

interface ApplicationState {
  applications: Application[];
  universities: University[];
  courses: Course[];
  selectedUniversity: University | null;
  selectedCourse: Course | null;
  isLoading: boolean;
  error: string | null;
}

interface ApplicationActions {
  setApplications: (applications: Application[]) => void;
  addApplication: (application: Application) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  setUniversities: (universities: University[]) => void;
  setCourses: (courses: Course[]) => void;
  setSelectedUniversity: (university: University | null) => void;
  setSelectedCourse: (course: Course | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchApplications: () => Promise<void>;
  fetchUniversities: () => Promise<void>;
  fetchCourses: (universityId?: string) => Promise<void>;
  submitApplication: (applicationData: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
}

type ApplicationStore = ApplicationState & ApplicationActions;

const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get) => ({
      // State
      applications: [],
      universities: [],
      courses: [],
      selectedUniversity: null,
      selectedCourse: null,
      isLoading: false,
      error: null,

      // Actions
      setApplications: (applications) => {
        set({ applications });
      },

      addApplication: (application) => {
        set((state) => ({
          applications: [...state.applications, application],
        }));
      },

      updateApplication: (id, updates) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, ...updates, updatedAt: new Date().toISOString() } : app
          ),
        }));
      },

      deleteApplication: (id) => {
        set((state) => ({
          applications: state.applications.filter((app) => app.id !== id),
        }));
      },

      setUniversities: (universities) => {
        set({ universities });
      },

      setCourses: (courses) => {
        set({ courses });
      },

      setSelectedUniversity: (university) => {
        set({ selectedUniversity: university });
      },

      setSelectedCourse: (course) => {
        set({ selectedCourse: course });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      fetchApplications: async () => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch('/api/applications');
          if (response.ok) {
            const applications = await response.json();
            set({ applications, isLoading: false });
          } else {
            set({ error: 'Failed to fetch applications', isLoading: false });
          }
        } catch (error) {
          set({ error: 'Network error', isLoading: false });
        }
      },

      fetchUniversities: async () => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch('/api/universities');
          if (response.ok) {
            const universities = await response.json();
            set({ universities, isLoading: false });
          } else {
            set({ error: 'Failed to fetch universities', isLoading: false });
          }
        } catch (error) {
          set({ error: 'Network error', isLoading: false });
        }
      },

      fetchCourses: async (universityId) => {
        set({ isLoading: true, error: null });

        try {
          const url = universityId ? `/api/courses?universityId=${universityId}` : '/api/courses';
          const response = await fetch(url);
          if (response.ok) {
            const courses = await response.json();
            set({ courses, isLoading: false });
          } else {
            set({ error: 'Failed to fetch courses', isLoading: false });
          }
        } catch (error) {
          set({ error: 'Network error', isLoading: false });
        }
      },

      submitApplication: async (applicationData): Promise<boolean> => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch('/api/applications', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(applicationData),
          });

          if (response.ok) {
            const newApplication = await response.json();
            set((state) => ({
              applications: [...state.applications, newApplication],
              isLoading: false,
            }));
            return true;
          } else {
            const errorData = await response.json();
            set({
              error: errorData.message || 'Failed to submit application',
              isLoading: false,
            });
            return false;
          }
        } catch (error) {
          set({
            error: 'Network error. Please try again.',
            isLoading: false,
          });
          return false;
        }
      },
    }),
    {
      name: "application-store",
      partialize: (state) => ({
        applications: state.applications,
        selectedUniversity: state.selectedUniversity,
        selectedCourse: state.selectedCourse,
      }),
    }
  )
);

export default useApplicationStore;

