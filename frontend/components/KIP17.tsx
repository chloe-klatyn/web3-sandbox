import { create } from 'ipfs-http-client'
import { useState } from 'react'

const url: string | any = 'https://ipfs.infura.io:5001/api/v0'
const client = create(url)

const KIP17 = () => {
  const [imageURL, setImageURL] = useState('')

  const onFileUpload = async (e: any) => {
    const file = e.target.files[0]
    try {
      console.log(`adding ${file.name} to ipfs....`)
      const { cid } = await client.add(
        { content: file },
        {
          cidVersion: 1,
          hashAlg: 'sha2-256',
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${cid}`
      console.log('ipfs url: ', url)
      setImageURL(url)
    } catch (e) {
      console.error('Error uploading file: ', e)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="space-y-6 w-1/4">
        <div className="text-2xl font-bold flex justify-center">Mint NFT</div>
        <div className="grid grid-cols-1">
          <label className="md:text-sm text-xs text-gray-500 font-body tracking-wider">Name</label>
          <input
            className="text-gray-500 border border-gray-400 px-4 py-2 outline-none rounded-md mt-2"
            type="text"
            name="name"
          />
        </div>
        <div className="grid grid-cols-1">
          <label className="md:text-sm text-xs text-gray-500 font-body tracking-wider">
            Description
          </label>
          <textarea
            className="text-gray-500 border border-gray-400 px-4 py-2 outline-none rounded-md mt-2"
            name="description"
          />
        </div>
        {imageURL ? (
          <img src={imageURL} width="400px" height="400px" />
        ) : (
          <div className="flex items-center justify-center w-full mt-2">
            <label className="flex flex-col border-2 border-dashed border-gray-400 w-full rounded-lg h-32 group">
              <div className="flex flex-col items-center justify-center p-8 cursor-pointer">
                <svg
                  className="w-10 h-10 group-hover:text-gray-500"
                  fill="none"
                  stroke="grey"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="text-sm text-gray-400 group-hover:text-gray-500 pt-1 tracking-wider">
                  Select media (jpg, png, gif)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".jpeg,.jpg,.png,.gif"
                onChange={onFileUpload}
              />
            </label>
          </div>
        )}
        <div className="flex items-center justify-center pt-5 pb-5">
          <button className="bg-grey text-white tracking-widest font-header py-2 px-8 rounded-full text-xs hover:bg-magma">
            MINT KIP7 TOKEN
          </button>
        </div>
      </div>
    </div>
  )
}

export default KIP17
