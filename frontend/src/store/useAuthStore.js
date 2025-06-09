import { create } from "zustand"
import { axiosInstance } from "../lib/axios"

import toast from "react-hot-toast"


export const userAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,


    checkAuth: async () => {

        set({ isCheckingAuth: true })

        try {
            const res = await axiosInstance.get("/auth/check")
            console.log("checkauth res", res.data)
            set({ authUser: res.data.user })

        } catch (error) {
            console.log("❌ Error checking auth:", error)
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }

    },


    signup: async (data) => {

        set({ isSigninUp: true })

        try {
            const res = await axiosInstance.post("/auth/register", data)

            console.log("signup respose", res.data)

            set({ authUser: res.data.user })

            toast.success(res.data.message)

        } catch (error) {
            console.log("❌ Error signing up:", error)

            toast.error("Error signing up")
        }
        finally {
            set({ isSigninUp: false })
        }

    },

    login: async (data) => {

        set({ isLoggingIn: true })

        try {
            const res = await axiosInstance.post("/auth/login", data)

             console.log("logging respose", res.data)

            set({ authUser: res.data.user })

            toast.success(res.data.message)

        } catch (error) {
             console.log("❌ Error Logging in:", error)
            //set({authUser:null})
            toast.error("Error Logging in")
        }
        finally {
            set({ isLoggingIn: false })
        }

    },

    logout: async () => {



        try {
            const res = await axiosInstance.post("/auth/logout")

             console.log("logout respose", res.data)

            set({ authUser: null })

            toast.success("Logout Successful")

        } catch (error) {
              console.log("❌ Error logging out:", error)
            //set({authUser:null})
            toast.error("Error logging out")
        }


    }
}))

export default userAuthStore