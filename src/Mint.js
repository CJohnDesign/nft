import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther, parseEther } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import { useEagerConnect, useInactiveListener } from './hooks'
import { injected } from './connectors'
const contract = require("./artifacts/contracts/FreshmanYear.sol/FreshmanYear.json")

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS

function Mint() {
  const [price, setPrice] = useState(0.0001)
  const [amount, setAmount] = useState(1)
  const [success, setSuccess] = useState(null)
	const context = useWeb3React()
	const { connector, library, chainId, account, activate, deactivate, active, error } = context

  const [activatingConnector, _setActivatingConnector] = useState()
  const setActivatingConnector = (state) => {
    if (state && state === connector) {
      _setActivatingConnector(undefined)
    }
    _setActivatingConnector(state)
  }

  // useEffect(() => {
  //   if (library) {
  //     const signer = library.getSigner(account)
  //     const contract_instance = new Contract(CONTRACT_ADDRESS, contract.abi, signer)
  //     // library.getStorageAt(CONTRACT_ADDRESS, 2, (a) => {
  //     //   console.log(a)
  //     // });
  //     contract_instance.whitelistStatus().then((account)=> {
  //       console.log(account)
  //     })
  //   }
  // }, [library])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  function publicMint() {
    setSuccess(null)
    const signer = library.getSigner(account)
    const contract_instance = new Contract(CONTRACT_ADDRESS, contract.abi, signer)
    contract_instance.mintPublic(amount, {value: parseEther((price * amount).toString())}).then((r) => {
      setSuccess(r)
    }).catch((e) => {
      if(e.code == "INSUFFICIENT_FUNDS") {
        toast("Insufficient funds", {type: toast.TYPE.ERROR})
      } else {
        console.error(e)
        toast("Error while trying to mint", {type: toast.TYPE.ERROR})
      }
    })
  }

  function connect() {
    activate(injected)
  }

  function lessAmount() {
    setAmount((state) => state > 1 ? state - 1 : 1)
  }


  function moreAmount() {
    setAmount((state) => state < 10 ? state + 1 : 10)
  }

  return (
    <div className="d-grid gap-2">
      {active && <ButtonGroup>
        <Button
          variant="info"
          className="mt-1"
          onClick={lessAmount}
        >
          -
        </Button>
        <Button
          variant="primary"
          className="mt-1"
          onClick={publicMint}
        >
          Mint {amount} for {price * amount} ETH
        </Button>
        <Button
          variant="info"
          className="mt-1"
          onClick={moreAmount}
        >
          +
        </Button>
      </ButtonGroup>}

      {!active && <Button
        variant="primary"
        className="mt-1"
        onClick={connect}
      >
        Connect
      </Button>}

      {/*<Button
        variant="btn btn-secondary"
        className="mt-1"
        onClick={() => deactivate()}
      >
        Disconnect
      </Button>*/}

      {success && <Modal show={!!success} onHide={() => setSuccess(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Successfully minted {amount} {amount > 1 ? "NFTs" : "NFT"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Tx: {success.hash}</p>
        </Modal.Body>
      </Modal>}
    </div>
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
