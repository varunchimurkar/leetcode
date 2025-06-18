import { create } from "zustand"
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast"


export const useSubmissionStore = create((set) => ({
    isLoading: false,
    submissions: [],
    submission: null,
    submissionCount: null,

    getAllSubmissions: async () => {
        try {
            set({ isLoading: true })
            const res = await axiosInstance.get("/submission/get-all-submission")
            set({ submissions: res.data.submissions })
            toast.success(res.data.message)
        } catch (error) {
            console.log("Error getting all submissions", error)
            toast.error("Error getting all submissions")
        } finally {
            set({ isLoading: false })
        }
    },

    getSubmissionForProblem: async (problemId) => {

        try {
           
            const res = await axiosInstance.get(`/submission/get-submission/${problemId}`)
            set({ submission: res.data.submissions })
            toast.success(res.data.message)

        } catch (error) {
            console.log("Error getting submissions for problem", error)
            toast.error("Error getting submissions for problem")
        }finally {
            set({ isLoading: false })
        }
    },

    getSubmissionCountForProblem: async (problemId) => {
 try {
            set({ isLoading: true })
            const res = await axiosInstance.get(`/submission/get-submissions-count/${problemId}`)
            set({ submissionCount: res.data.count })
            toast.success(res.data.message)
            

        } catch (error) {
            console.log("Error getting submissions for problem", error)
            toast.error("Error getting submissions for problem")
        }
    }
}))

