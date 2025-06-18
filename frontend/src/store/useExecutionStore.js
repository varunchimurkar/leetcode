import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"


export const useExecutionStore = create((set) => ({
    isExecuting: false,
    submission: null,

    executeCode: async (source_code, language_id, stdin, expected_outputs, problemId) => {
        try {
            set({ isExecuting: true })


            const res = await axiosInstance.post("/executecode", {
                source_code,
                language_id,
                stdin,
                expected_outputs,
                problemId
            })
           
            set({ submission: res.data.submissions })
           
            toast.success(res.data.message)
        } catch (error) {
            console.log("Error executing code", error)
            toast.error("Error executing code")
        } finally {
            set({ isExecuting: false })
        }
    }
}))