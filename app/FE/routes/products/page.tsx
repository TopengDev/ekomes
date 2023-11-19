import { ToggleButton } from "../../components/Button"
import Image from "next/image"
import { CreateProductButton } from "./createProductButton"
import { RedirectButton } from "./redirectButton"

export function numberWithCommas(x: number) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const getProducts = async () => {
   const res = await fetch("http://localhost:3000/BE/endpoints/products", {
      body: JSON.stringify({
         // gender: "women",
      }),
      method: "POST",
   })
   return await res.json()
}

export default async function Page() {
   const products = await getProducts()

   const productsData = products.data

   return (
      <>
         <CreateProductButton />
         <div className='center-75 py-32 flex flex-col gap-16'>
            <div className='flex w-full justify-center flex-col items-center gap-2'>
               <h1 className='text-3xl font-medium'>Products</h1>
               <h3 className='text-sm text-gray text-center max-w-[60%]'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
                  perspiciatis error aspernatur, sed fugiat tempore harum
                  veritatis suscipit reiciendis repellat tempora sint rerum a
                  quo, impedit ratione ipsa! Quia, eius.
               </h3>
            </div>
            <div className='flex item-center gap-4'>
               <ToggleButton active={true}>Men</ToggleButton>
               <ToggleButton active={false}>Women</ToggleButton>
               <ToggleButton active={false}>Unisex</ToggleButton>
               <ToggleButton active={false}>Boys</ToggleButton>
               <ToggleButton active={false}>Girls</ToggleButton>
            </div>
            <div className='flex flex-wrap justify-center gap-8 w-full'>
               {productsData.map((product: any) => (
                  <>
                     <RedirectButton id={product.id}>
                        <div className='relative w-full h-[60%] rounded-md overflow-hidden'>
                           <Image
                              src={product.url}
                              alt=''
                              fill={true}
                              sizes='3xl'
                              objectFit='cover'
                           />
                        </div>
                        <div className='flex flex-col justify-between flex-grow bg-light-white'>
                           <div>
                              <h3 className='text-2xl text-dark-gray font-medium bg-light-white'>
                                 {product.display_name}
                              </h3>
                              <div className='flex w-full items-center bg-light-white'>
                                 <h4 className='text-base text-gray font-medium bg-light-white'>
                                    {product.gender}
                                 </h4>
                              </div>
                           </div>
                           <div className='flex justify-between bg-light-white'>
                              <div>
                                 <h2 className='text-xl text-light-red font-bold bg-light-white'>
                                    Rp. {numberWithCommas(product.price)}
                                 </h2>
                              </div>
                           </div>
                        </div>
                     </RedirectButton>
                  </>
               ))}
            </div>
         </div>
      </>
   )
}
