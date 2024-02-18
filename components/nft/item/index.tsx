

import { NftMeta } from "@/types/nft";
import { FunctionComponent } from "react"

type NftItemProps ={
  item : NftMeta;
}
const NftItem: FunctionComponent<NftItemProps> = ({item}) => {
    return (
    <>
    <div className='flex-shrink-0'>
      <img
       className='{"h full w-full object-cover'
       src={item.image}
       alt='New NFT'
      />
      </div>
      <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
      <div className='flex-1'>
        <p className='text-sm font-medium text-indigo-600'>
        Creatures NFT
        </p>
      <div className='block mt-2'>
          <p className='text-xl semibold text-gray-900'>{item.name} </p>
          <p className='mt-3 mb-3 text-base text-grey-500'>{item.description}</p>
      </div>
     </div>
     <div className='overflow-hidden mb-4'>
        <dl className="-mx-4 -mt-4 flex flex-wrap">
        <div className='flex flex-col px-4 pt-4'>
          <dt className='order-2 text-sm font-medium text-grey-500 pl-5'>Price</dt>
            <dd className='order-1 text-xl font-extrabold text-indigo-600'>
            <div className='flex justify-center items-center pl-5'>
            100
            <img className="h-6" src="/images/small-eth.webp" alt="ether" />
            </div>
            </dd>
        </div>
        
        { item.attributes.map(attribute =>
         <div  key={attribute.trait_type} className='flex flex-col px-4 pt-4'>
           <dt className='order-2 text-sm font-medium text-grey-500'>
            {attribute.trait_type}
           </dt>
           <dd className='order-1 text-xl font-extrabold text-indigo-600'>
            {attribute.value}
           </dd>
          </div>


        )}

        </dl>
        </div>
          <div className="flex justify-end space-x-1">
            <button 
              type='button'
              className='inline-flex justify-center items-center h-10 px-6 py-2 border border-gray-300 rounded-lg text-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300 disabled:shadow-none disabled:cursor-not-allowed hover:bg-indigo-500 hover:text-white hover:border-indigo-500'>
              Buy
            </button>
            <button 
              type='button'
              className='inline-flex justify-center items-center h-10 px-6 py-2 border border-gray-300 rounded-lg text-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300 disabled:shadow-none disabled:cursor-not-allowed hover:bg-indigo-500 hover:text-white hover:border-indigo-500'>
              Preview
            </button>
          </div>
         </div>
    </>

    )
}


export default NftItem;