import { useHooks } from "../../provider/web3"



export const useAccount=() => {
    const hooks =useHooks();
    const swrREs= hooks.useAccount();
    return {
        account:swrREs
    }
}

export const useNetwork = () =>{
    const hooks =useHooks();
    const swrRes = hooks.useNetwork();

    return {
        network:swrRes
    }
}

export const useListedNfts= () => {
    const hooks = useHooks();
    const swrRes = hooks.useListedNfts();

    return{
        nfts: swrRes
    }
}

export const useOwnedNfts= () => {
    const hooks = useHooks();
    const swrRes = hooks.useOwnedNfts();

    return{
        nfts: swrRes
    }
}