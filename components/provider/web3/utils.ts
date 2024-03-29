import { Web3Hooks, setupHooks } from "@/components/hooks/web3/setupHooks";
import { Web3Dependencies } from "@_types/hooks";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, ethers, providers } from "ethers";

declare  global{
    interface Window {
        ethereum:MetaMaskInpageProvider;
    }
}

type Nullable<T>=
{ 
    [p in keyof T]: T[p] | null;
}

export type Web3State = {
    isLoading: boolean;
    hooks : Web3Hooks;
} & Nullable<Web3Dependencies>


export const createDefaultState = ()=> {
    return {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true,
        hooks: setupHooks({isLoading:true} as any)
    }
}

export const createWeb3State = ({ 
    ethereum,provider,contract,isLoading
}:Web3Dependencies) => {
    return {
        ethereum,
        provider,
        contract,
        isLoading,
        hooks: setupHooks({ethereum,provider,contract,isLoading})
    }
}

const NETWORK_ID=process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async  (
    name:string ,
     provider:providers.Web3Provider
     ):Promise<Contract>=> {
        
        if(!NETWORK_ID) {
            return Promise.reject("Network ID is not defined");
        }

        
        const res =await fetch (`/contracts/${name}.json`)
        const Artifact = await res.json();

        
        if(Artifact.networks[NETWORK_ID].address){
            const contract=new ethers.Contract(
                Artifact.networks[NETWORK_ID].address,
                Artifact.abi,
                provider

            )
           
            return contract;
        }
        else{
            return Promise.reject(`Contract:[${name}] cannot be loaded!`);
        }
}



 
