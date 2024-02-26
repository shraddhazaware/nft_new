import { createContext, FunctionComponent, ReactNode, useContext, useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from "ethers";
import { createDefaultState, createWeb3State, loadContract, Web3State } from "./utils";
import {ethers} from "ethers";
import { setupHooks } from "@/components/hooks/web3/setupHooks";
import { isWindowDefined } from "swr/_internal";
import { NftMarketContract } from "@_types/nftMarketContract";

interface Web3ProviderProps {
    children: ReactNode; 
}

const pageReload = ()=> {
    window.location.reload();
}
const handleAccount=(ethereum:MetaMaskInpageProvider) =>async()=>{
    const isLocked =! (await ethereum._metamask.isUnlocked());
    if(isLocked){pageReload();}

}

const setGlobalListeners=(ethereum:MetaMaskInpageProvider) => {
    ethereum.on("chainChnaged",pageReload)
    ethereum.on("accountChnages",handleAccount(ethereum))
 }
 const removeGlobalListeners=(ethereum:MetaMaskInpageProvider)=>{
     ethereum?.removeListener("chainChanged",pageReload)
     ethereum?.removeListener("accountChnages",handleAccount)

 }
const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<Web3ProviderProps> = ({ children }) => {
    
    const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

    
    useEffect(() => {
      
        async function initWeb3() {

            try{
                const provider = new ethers.providers.Web3Provider(window.ethereum as any);
                const contract =await loadContract ("NftMarket",provider);
                
               const signer = provider.getSigner();
               const signedContract = contract.connect(signer);
                
               
                setTimeout(() =>setGlobalListeners(window.ethereum),500)

                setWeb3Api(createWeb3State({
                    ethereum:window.ethereum,
                    provider,
                    contract: signedContract as unknown as NftMarketContract,
                    isLoading:false
    
                }))

            } catch(e:any){
                console.error("Please install MetaMask");
                setWeb3Api((api) => createWeb3State({
                    ...api as any,
                    isLoading: false,
                }))

            }
        }
        
        
        initWeb3();
        return() => removeGlobalListeners(window.ethereum)
    }, []);


    return (
        <Web3Context.Provider value={web3Api}>
            {children}
        </Web3Context.Provider>
    );
}


export function useWeb3() {
    return useContext(Web3Context);
}


export function useHooks(){
    const {hooks} = useWeb3();
    return hooks;
}
export default Web3Provider; // Export the Web3Provider component

