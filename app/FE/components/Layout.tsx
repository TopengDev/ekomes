import { Button, ButtonInversed } from "./Button"

export const Layout = (props: React.PropsWithChildren) => {
   return (
      <>
         <Navbar />
         <div className='bg-white'>
            {/* <div className='w-full h-[80px] bg-yellow-200' /> */}

            {props.children}
         </div>
      </>
   )
}

export const Navbar = () => {
   return (
      <div className='w-full h-[80px] sticky top-0 left-0 bg-white z-30 '>
         <div className='center-75'>
            <div className='flex items-center'>
               <h1 className='text-4xl font-bold'>STORE</h1>
            </div>
            <div className='flex item-center gap-6'>
               <a
                  href='/FE/routes/products'
                  className='flex items-center hover:text-light-red transition-all duration-150'
               >
                  Products
               </a>
               <a href='/FE/routes/user/login'>
                  <Button>Sign in</Button>
               </a>
               <a href='/FE/routes/user/register'>
                  <ButtonInversed>Sign up</ButtonInversed>
               </a>
            </div>
         </div>
      </div>
   )
}
