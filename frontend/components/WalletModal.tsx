import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import metamask from '../public/metamask.png'
import kaikas from '../public/kaikas.jpeg'

interface ModalProps {
  walletModal: boolean
  setWalletModal: (a: boolean) => void
  setMetamaskConnected: (a: boolean) => void
}

const WalletModal = (props: ModalProps) => {
  const connectKaikas = async () => {
    try {
      const accounts = await window.klaytn.enable()
      console.log('accounts: ', accounts)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const connectMetamask = async () => {
    try {
      const account = await window.ethereum.request({ method: 'eth_requestAccounts' })
      //   console.log('account: ', account)
      props.setMetamaskConnected(true)
      props.setWalletModal(false)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <>
      <Transition appear show={props.walletModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => props.setWalletModal(false)}
        >
          <div className="absolute bg-black opacity-70 inset-0 z-0"></div>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-70"
              leave="ease-in duration-200"
              leaveFrom="opacity-70"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-1/2 max-w-md p-6 my-12 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-3xl font-medium leading-6 text-gray-900 flex justify-center"
                >
                  Select Wallet
                </Dialog.Title>
                <div className="grid grid-cols-2 p-6">
                  <div
                    className="hover:border-2 hover:border-slate-200 border-2 border-white cursor-pointer p-4 rounded-md flex justify-center"
                    onClick={connectKaikas}
                  >
                    <div>
                      <Image src={kaikas} width="100px" height="100px" />
                      <p className="text-center text-xl">Kaikas</p>
                    </div>
                  </div>
                  <div
                    className="hover:border-2 hover:border-slate-200 border-2 border-white cursor-pointer p-4 rounded-md flex justify-center"
                    onClick={connectMetamask}
                  >
                    <div>
                      <Image src={metamask} width="100px" height="100px" />
                      <p className="text-center text-xl">Metamask</p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default WalletModal
