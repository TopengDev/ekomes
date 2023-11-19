"use client"

export const Button = ({
   children,
   onClick,
}: { onClick?: (props?: any) => any } & React.PropsWithChildren) => {
   return (
      <>
         <button
            className=' text-black py-3 px-12 rounded-lg drop-shadow-xl hover:bg-black hover:text-light-white transition-all duration-150'
            onClick={() => (onClick ? onClick() : "")}
         >
            {children}
         </button>
      </>
   )
}

export const ButtonInversed = ({
   children,
   onClick,
}: { onClick?: (props?: any) => any } & React.PropsWithChildren) => {
   return (
      <>
         <button
            className='bg-black text-light-white py-3 px-12 rounded-lg drop-shadow-xl hover:bg-light-white hover:text-black transition-all duration-150'
            onClick={() => (onClick ? onClick() : "")}
         >
            {children}
         </button>
      </>
   )
}

export const ToggleButton = ({
   children,
   onClick,
   active,
}: {
   onClick?: (props?: any) => any
   active: boolean
} & React.PropsWithChildren) => {
   let activeStyle = active
      ? "bg-black text-light-white py-3 px-12 rounded-lg drop-shadow-xl hover:bg-white transition-all duration-150 hover:text-black"
      : "bg-light-gray text-gray py-3 px-12 rounded-lg drop-shadow-xl hover:bg-black transition-all duration-150 hover:text-light-white"

   return (
      <>
         <button
            className={activeStyle}
            onClick={() => (onClick ? onClick() : "")}
         >
            {children}
         </button>
      </>
   )
}
