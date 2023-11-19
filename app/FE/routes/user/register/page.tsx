"use client"

import ModalOverlay from "@/app/FE/components/modalOverlay"
import { useRef, useState } from "react"
import LoadingCircle from "@/public/Rolling-1s-188px"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/navigation"

export default function Page() {
   return (
      <section className=''>
         <RegisterCard />
      </section>
   )
}

function RegisterCard() {
   const router = useRouter()
   const [loading, setLoading] = useState<boolean>(false)

   const emailRef: any = useRef(null)
   const nameRef: any = useRef(null)
   const passwordRef: any = useRef(null)

   const register = async () => {
      toast("Registering new user", {
         autoClose: 2500,
      })
      setLoading(true)
      try {
         const res = await fetch("/BE/endpoints/users/register", {
            body: JSON.stringify({
               email: emailRef.current.value,
               name: nameRef.current.value,
               password: passwordRef.current.value,
            }),
            method: "POST",
         })

         const jsonRes = await res.json()

         setLoading(false)

         if (!jsonRes.success) {
            toast(jsonRes.msg, { autoClose: 2500 })
         } else {
            toast(`Successfully registered new user`, { autoClose: 2500 })
            router.replace("/FE/routes/user/login")
         }
      } catch (e: any) {
         toast(e.toString(), { autoClose: 2500 })
         setLoading(false)
      }
   }

   return (
      <ModalOverlay open={true}>
         <div className='bg-light-white rounded-xl w-[45%] h-[65%] flex justify-center items-center relative max-w-[700px] max-h-[845px] px-10 py-12 flex-col drop-shadow-xl'>
            <ToastContainer />
            {/* <div className='flex justify-center items-center absolute w-48 h-48 hover:text-xl  top-0 right-0'>
               <button className='z-40' onClick={() => setOpen(false)}>
                  <i className='fa-solid fa-circle-xmark fa-beat fa-2xl color-[#ee6467]'></i>
               </button>
            </div> */}
            <div className='flex justify-around items-center flex-col w-full h-full gap-10 relative py-32 px-12 rounded-xl bg-light-white'>
               <div className=''>
                  <h1 className='text-4xl font-bold bg-light-white'>
                     Registration
                  </h1>
               </div>
               <div className='w-full flex flex-col gap-6 bg-light-white'>
                  <div className='flex flex-col w-full gap-4 bg-light-white'>
                     <label
                        htmlFor=''
                        className='text-black text-2xl font-medium bg-light-white'
                     >
                        Email
                     </label>
                     <input
                        type='email'
                        className='h-[48px] rounded-xl p-4 bg-light-white border-solid border-gray border-[1px] opacity-50'
                        ref={emailRef}
                     />
                  </div>
                  <div className='flex flex-col w-full gap-4 bg-light-white'>
                     <label
                        htmlFor=''
                        className='text-black text-2xl font-medium bg-light-white'
                     >
                        Name
                     </label>
                     <input
                        type='text'
                        className='h-[48px] rounded-xl p-4 bg-light-white border-solid border-gray border-[1px] opacity-50'
                        ref={nameRef}
                     />
                  </div>
                  <div className='flex flex-col w-full gap-4 bg-light-white'>
                     <label
                        htmlFor=''
                        className='text-black text-2xl font-medium bg-light-white'
                     >
                        Password
                     </label>
                     <input
                        type='password'
                        className='h-[48px] rounded-xl p-4 bg-light-white border-solid border-gray border-[1px] opacity-50'
                        ref={passwordRef}
                     />
                  </div>
               </div>
               {
                  <>
                     <div className='w-full '>
                        <button
                           className='bg-black h-[64px] rounded-xl p-4 flex justify-center items-center font-medium text-light-white w-full hover:bg-light-white hover:text-black transition-all duration-150'
                           onClick={() => register()}
                           disabled={loading}
                        >
                           {loading ? (
                              <div className=''>
                                 <LoadingCircle />
                              </div>
                           ) : (
                              "Register"
                           )}
                        </button>
                     </div>
                     <div className='text-blue-400 font-medium hover:text-black transition-all duration-150 bg-light-white'>
                        <a
                           href='/FE/routes/user/login'
                           className='bg-light-white'
                        >
                           Login
                        </a>
                     </div>
                  </>
               }
            </div>
         </div>
      </ModalOverlay>
   )
}
