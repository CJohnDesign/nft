import React, { useState, useEffect } from "react";
import { Button, Row } from "react-bootstrap";
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther, parseEther } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import { useEagerConnect, useInactiveListener } from './hooks'
import { injected } from './connectors'
const contract = require("./artifacts/contracts/FreshmanYear.sol/FreshmanYear.json")

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS

function Mint() {
	const context = useWeb3React()
	const { connector, library, chainId, account, activate, deactivate, active, error } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])
  // does it really needs to be an useEffect?
  // could be writen as ?
  // const [activatingConnector, _setActivatingConnector] = useState()
  // const setActivatingConnector = (state) => {
  //   if (state && state === connector) {
  //     setActivatingConnector(undefined)
  //   }
  //   setActivatingConnector(state)
  // }

	// useEffect(() => {
 //    // setActivatingConnector(injected)
 //    // injected.activate()
 //    // activate(injected)

 //    // injected.getProvider().then((account)=> {
 //    //   console.log(account.enable())
 //    // })

 //    // // injected.isAuthorized().then((account)=> {
 //    // //   console.log(account)
 //    // // })

 //    // injected.getAccount().then((account)=> {
 //    //   console.log(account)
 //    // })
	// }, [])


  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()
  console.log('triedEager', triedEager)

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  console.log(context)

  function publicMint() {
    const signer = library.getSigner(account)
    const contract_instance = new Contract(CONTRACT_ADDRESS, contract.abi, signer)
    contract_instance.mintPublic(1, {value: parseEther("0.001")}).then((r) => {
      console.log(r)
      alert("Minted!")
    })
    // console.log(data)
  }

  return (
    <>
      {active && <Row><Button
        variant="primary"
        className="mt-1"
        onClick={publicMint}
      >
        Mint
      </Button></Row>}

      {!active ? <Button
        variant="primary"
        className="mt-1"
        onClick={() => activate(injected)}
      >
        Connect
      </Button> : <Button
        variant="primary"
        className="mt-1"
        onClick={() => deactivate()}
      >
        Disconnect
      </Button>}
    </>
        
  );
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export default function() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Mint />
    </Web3ReactProvider>
  )
}
