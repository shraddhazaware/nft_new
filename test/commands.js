

const instance = await NftMarket.deployed();

instance.mintToken("https://coffee-written-raven-33.mypinata.cloud/ipfs/QmZBwAhMrEn2RJ3qdtjqYyXgv9nYcqpkJ83vamXdktRDwm","500000000000000000",{value:"25000000000000000",from:accounts[0]})

instance.mintToken("https://coffee-written-raven-33.mypinata.cloud/ipfs/QmT1pFMkhxqiXKrLbVU9XfRhZyhVX2CA1BG8ZoDEA1AX6L","300000000000000000",{value:"25000000000000000",from:accounts[0]})