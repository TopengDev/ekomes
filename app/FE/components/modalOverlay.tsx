"use client"

export type TProps = {
   open?: boolean
}

export default function ModalOverlay({
   children,
   open,
}: TProps & React.PropsWithChildren) {
   return (
      <>
         {open && (
            <section className='fixed w-screen h-screen top-0 left-0 z-40 backdrop-brightness-50 backdrop-blur-sm flex justify-center items-center'>
               {children}
            </section>
         )}
      </>
   )
}
