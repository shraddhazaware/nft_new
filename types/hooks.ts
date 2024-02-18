/*import { MetaMaskInpageProvider } from "@metamask/providers";
import {Contract,providers} from "ethers"
import { SWRResponse } from "swr";

export type Web3Dependencies ={
    provider: providers.Web3Provider;
    contract: Contract;
    ethereum: MetaMaskInpageProvider;

}

export type  CryptoHookFactory<D=any, P=any> = {
    (d: Partial <Web3Dependencies>): CryptoHandlerHook<D,P>
}
export type CryptoHandlerHook <D =any, P=any>= (params ?:P) => Cryptoswrresponse<D>

export type Cryptoswrresponse<D> = SWRResponse<D>;
*/

import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from "ethers";
import { SWRResponse } from "swr";

export type Web3Dependencies ={
    provider:providers.Web3Provider;
    contract:Contract;
    ethereum:MetaMaskInpageProvider;
    isLoading:boolean;
}

export type CryptoHookFactory <D=any, R=any, P=any>= {
    (d:Partial<Web3Dependencies>):CryptoHandlerHook<D, R, P>
}
export type CryptoHandlerHook <D=any, R=any, P=any> = (params?:P) => CryptoSWRResponse<D,R>

export type CryptoSWRResponse<D=any,R=any>= SWRResponse<D> & R;
