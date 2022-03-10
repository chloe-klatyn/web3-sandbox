import { ChevronDoubleRightIcon } from '@heroicons/react/outline'

const InfoCard = () => {
  return (
    <div className="w-screen">
      <div className="border shadow shadow-lg w-1/5 rounded-md border-2 border-gray-400 border-double p-4">
        <div className="border-b-2 border-dotted text-xl pb-2 hover:text-gray-500">
          <a href="https://github.com/Krustuniverse-KlaytnGroup/klaytn-contracts" target="_blank">
            DApp Title
          </a>
        </div>
        <div className="py-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua
        </div>
        <div className="flex place-content-between">
          <span>xxx</span>
          <a href="https://github.com/Krustuniverse-KlaytnGroup/klaytn-contracts" target="_blank">
            <ChevronDoubleRightIcon className="w-5 h-5 ml-2 text-lightorange cursor-pointer transition duration-500 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default InfoCard
