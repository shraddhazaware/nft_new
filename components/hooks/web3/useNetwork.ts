

import { CryptoHookFactory } from "@_types/hooks";
import useSWR from "swr";

const NETWORKS: {[K: string]: string} = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  5777: "Ganache",
  1337: "Ganache"
}

const targetId=process.env.NEXT_PUBLIC_TARGET_CHAIN_ID as string;
const targetNetwork =NETWORKS[targetId];

type UseNetworkResponse = {

  isLoading:boolean;
  isSupported:boolean;
  targetNetwork:string;
}

type NetwrokHookFactory =CryptoHookFactory <string,UseNetworkResponse>


export type UseNetworkHook =ReturnType<NetwrokHookFactory>

export const hookFactory:NetwrokHookFactory= ({provider,isLoading})=> () =>{
  
  const {data,isValidating,...swr} = useSWR (
    provider ? "web3/useNetwork":null,
    async () => {
      const chainId = (await provider!.getNetwork()).chainId;
      if(!chainId){
        throw "Cannot retreive network.Please,refresh browser or connect to different netwrok"
      }
      return NETWORKS[chainId];
    },{
      revalidateOnFocus:false
    }
  )

  
  
   return{
    ...swr,
    data,
    isValidating,
    targetNetwork,
    isSupported:data === targetNetwork,
    isLoading:isLoading as boolean
   };
}

