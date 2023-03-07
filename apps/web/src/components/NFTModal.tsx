/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { XCircle } from "lucide-react";
import { SiOpensea } from "react-icons/si";

import type { NFT } from "@/lib/types";
import { Button } from "@nft-explorer/ui";
import Link from "next/link";
import { truncateAddress } from "@/lib/utils";

type NFTModalProps = {
  nft: NFT;
  owner: string;
  isOpen: boolean;
  close: () => void;
};

export default function NFTModal({ nft, owner, isOpen, close }: NFTModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => close()}>
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="flex flex-col items-end gap-y-2">
                <XCircle
                  className="text-white cursor-pointer"
                  onClick={() => close()}
                />

                <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-y-4 md:gap-y-0 md:gap-x-4">
                  <img
                    className="rounded-2xl bg-white shadow-[20px_20px_60px_#0000000D] w-[90%] md:w-[250px]"
                    src={nft.imageUrl}
                    alt="NFT image"
                    width={250}
                    height={250}
                    loading="lazy"
                    draggable={false}
                  />
                  <Dialog.Panel className="w-[90%] md:w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-[20px_20px_60px_#0000000D] transition-all">
                    <div className="flex flex-col gap-y-6">
                      <div className="flex flex-col gap-y-2">
                        <Dialog.Title className="flex flex-row justify-start items-center gap-x-2 text-slate-400 text-lg font-medium">
                          {nft.collectionImageUrl && (
                            <Image
                              src={nft.collectionImageUrl}
                              alt="NFT collection image"
                              width={30}
                              height={30}
                              className="rounded-full"
                            />
                          )}
                          {nft.collectionName}
                        </Dialog.Title>
                        <h3 className="font-bold text-2xl md:text-3xl text-black text-left">
                          {nft.title}
                        </h3>
                      </div>

                      <Link
                        href={`https://opensea.io/assets/ethereum/${nft.contractAddress}/${nft.tokenId}`}
                        target="_blank"
                        className="rounded-2xl flex flex-row items-center justify-center font-bold gap-x-2 outline-none bg-slate-200 w-max px-3 py-1 active:scale-90 ease-in-out transition-all"
                      >
                        <SiOpensea className="text-blue-600 h-5 w-5" />
                        Buy on Opensea
                      </Link>

                      <div className="flex flex-col space-y-2">
                        <h3 className="font-bold text-xl">Description</h3>
                        <p>{nft.description}</p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <h3 className="font-bold text-xl">Owner</h3>
                        <p>{truncateAddress(owner)}</p>
                      </div>

                      {nft.attributes.length > 0 && (
                        <div className="flex flex-col gap-y-2">
                          <h3 className="font-bold text-xl">Attributes</h3>
                          <div className="flex flex-row flex-wrap gap-2">
                            {nft.attributes.map((a) => (
                              <div
                                key={a.value + a.trait_type}
                                className="flex flex-col bg-slate-200 rounded-2xl px-3 py-1"
                              >
                                <p className="font-bold">{a.trait_type}</p>
                                <p className="font-medium">{a.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
