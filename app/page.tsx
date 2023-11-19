"use client"

import { GlobalCTXProvider } from "./FE/context/globalContext"

export default function Home() {
   return (
      <>
         <Wrapper>
            <main className=''>
               <h1>TEST APP</h1>
            </main>
         </Wrapper>
      </>
   )
}

const Wrapper = (props: React.PropsWithChildren) => (
   <GlobalCTXProvider>{props.children}</GlobalCTXProvider>
)
