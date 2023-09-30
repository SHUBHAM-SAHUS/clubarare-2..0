import Modal from 'react-modal'
import { useReducer } from 'react'
import { useRouter } from 'next/router'
import { FieldValues } from 'react-hook-form'
import { XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'

import { NFTCreationManagerProps } from './interface'
import {
  convertStoreToFormData,
  getCurrentStep,
  getListingObjectForSig,
  getStepLength,
  handleKlaytnHashOrder,
  isBackArrowHidden,
  pointerArrowClassName,
} from './utils'
import { initialState, reducer } from './reducer'
import { getActions } from './actions'
import { NetworkType } from './enums'

import { Card } from 'design-systems/Atoms/Card'
import { ProgressBar } from 'design-systems/Atoms/ProgressBar'
import { WalletInfo } from 'design-systems/Molecules/Wallet/WalletInfo'
import { useConnector, useNFTCreation } from 'context'
import { CHAIN_NAMES, CLUBRARE_NETWORKS, DEFAULT_KLAYTN_CHAIN_ID, PAGE_ROUTES } from 'utils'
import { useToast } from 'hooks/useToast'
import { useCategories } from 'hooks/api/useCategories'
import { useCollectible } from 'hooks/api/useCollectible'
import { useCreateCollection } from 'hooks/api/useCreateCollection'
import { useEditProfile } from 'hooks/api/useEditProfile'
import { useNFTCreationManager } from 'hooks/api/useNFTCreationManager'
import { useProfile } from 'hooks/api/useProfile'
import { useUserNFTAssets } from 'hooks/api/useUserNFTAssets'
import { useGlobalState } from 'hooks/store/useGlobalState'
import { useListAsset } from 'hooks/useListAsset'
import { useMarketPlaceContract } from 'hooks/useMarketplaceContract'

export const NFTCreationManager: React.FC<NFTCreationManagerProps> = () => {
  const router = useRouter()
  const { chainId } = useConnector()
  const { authUser: activatingUser, connector: activatingConnector } = useGlobalState()
  const { collectionListAssets: collections, refetchCollectionList } = useNFTCreationManager()
  const { opened, closeNFTCreation } = useNFTCreation()
  const { hashOrder } = useMarketPlaceContract(activatingUser?.networkId as ClubRareNetworks)
  const {
    userAuthenticationCredit: credit,
    userProfile: profile,
    refetchUserAuthenticationCredit,
    refetchUserProfile,
  } = useProfile(activatingUser?.walletAddress as string)
  const { editProfileAsync } = useEditProfile()
  const { createCollectibleAsync } = useCollectible()
  const { categories } = useCategories()
  const { createNewCollection } = useCreateCollection()
  const [store, dispatch] = useReducer(reducer, initialState)
  const { onListAsset } = useListAsset()
  const { warningToast } = useToast()
  const { refetchUserAssets } = useUserNFTAssets(activatingUser?.walletAddress as string, 'all', false)

  const { stepId, flowType, productId } = store
  const { Body } = getCurrentStep(flowType, stepId)
  const actions = getActions(dispatch)
  const { onBack, onCreateNew, onCreateItem } = actions
  const progress = (100 * stepId) / getStepLength(flowType)

  /**
   * Creates an on-chain or off-chain collection and returns the collection data.
   *
   * @param values - The form data for the collection.
   * @returns The collection data.
   */
  const onCreateNewCollection = async (values: FieldValues) => {
    try {
      const { collectionType } = store
      const fieldValues = {
        ...values,
        chain: collectionType,
        networkId: activatingUser ? activatingUser.networkId : CLUBRARE_NETWORKS.ETHEREUM,
      }
      const res = await createNewCollection(fieldValues)
      await refetchCollectionList()
      return res
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Updates the user's agreement status on review step
   *
   * @param isAgreementSigned A boolean indicating whether the user has signed the agreement or not.
   * @returns A promise that resolves with the updated user profile object.
   */
  const onUserAgreement = async (isAgreementSigned: boolean) => await editProfileAsync({ isAgreementSigned })

  /**
   * Creates a collectible and prepares the listing object for signature.
   * If a nonce is provided, it lists the asset on the marketplace.
   *
   * @param nonce - Nonce from marketplace smart contract for the listing object signature.
   * @returns If a nonce is provided and the asset is listed, returns the result of onListAsset().
   */
  const onCreateCollectible = async (nonce: BigNumber) => {
    try {
      const network = props.network
      const finalData = await convertStoreToFormData({ ...store, network })
      const collectible = await createCollectibleAsync(finalData)
      if (!collectible.status) {
        warningToast('Collection creation failed')
        return
      }
      onCreateItem(collectible.data.id)

      const listing = getListingObjectForSig(
        store,
        collectible,
        activatingUser?.walletAddress as AddressString,
        chainId
      )
      let hashOrderSignature = ''
      if (chainId === DEFAULT_KLAYTN_CHAIN_ID) {
        const OrderTuple = await handleKlaytnHashOrder(listing, nonce, activatingConnector as WalletTypes)
        hashOrderSignature = await hashOrder(OrderTuple)
      }
      if (nonce && listing) {
        const res = await onListAsset({ hashOrderSignature, listing, nonce })
        await refetchUserAuthenticationCredit()
        await refetchUserAssets?.()
        await refetchUserProfile?.()
        return res
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Function to handle the 'Product Page' button click event.
   * It calls the onCreateNew function, navigates to the new nft product page
   * and closes the NFT creation modal.
   *
   * @returns {void}
   */
  const onProductPage = async () => {
    onCreateNew()
    if (productId) router.push(PAGE_ROUTES.product(productId))
    closeNFTCreation()
  }

  /**
   * Function to handle closing the NFT creation modal by calling the `onCreateNew` function
   * and then closing the modal by calling the `closeNFTCreation` function.
   */
  const handleCloseModal = () => {
    onCreateNew()
    closeNFTCreation()
  }

  const props = {
    agreement: profile?.isAgreementSigned,
    categories,
    collections,
    credit,
    email: profile?.email ?? store.email,
    initial: { email: profile?.email, name: profile?.name },
    isWhiteListedSeller: profile?.isWhiteListedSeller,
    name: profile?.name ?? store.name,
    network:
      activatingConnector === 'METAMASK' || activatingConnector === 'WEB3-AUTH'
        ? NetworkType.ETHEREUM
        : NetworkType.KLAYTN,
    onCreateCollectible,
    onCreateNewCollection,
    onProductPage,
    onUserAgreement,
  }

  /**
   * A utility function that renders an overlay element with content and a progress bar.
   *
   * @param {React.ComponentPropsWithRef<'div'>} props - Props to pass down to the containing div element.
   * @param {React.ReactNode} contentElement - The main content element to render within the containing div.
   * @returns {JSX.Element} The rendered overlay element.
   */
  const renderOverlayElement = (props: React.ComponentPropsWithRef<'div'>, contentElement: React.ReactNode) => (
    <div {...props}>
      {/* Render the main content element */}
      {contentElement}

      {/* Render the connected network and wallet info */}
      <div className="invisible absolute left-0 top-4 mx-8 rounded-md p-2 md:visible">
        <WalletInfo
          chain={String(CHAIN_NAMES[chainId])}
          chainClassName="text-neutral-400"
          walletAddress={activatingUser?.walletAddress}
          walletClassName="text-neutral-100"
        />
      </div>

      {/* Render the progress bar if the progress is not 100% */}
      {progress !== 100 && (
        <div className="absolute bottom-14 left-0 right-0 mx-8 md:bottom-0 md:my-1">
          <ProgressBar className="w-full" value={progress} />
        </div>
      )}
    </div>
  )

  return (
    <Modal
      ariaHideApp={false}
      className="filterOverlayOverFlowHidden fixed rounded-xl"
      isOpen={opened}
      overlayClassName="bg-light w-full h-full fixed top-0 left-0 bg-opacity-60 z-[3000] max-h-screen backdrop-blur-md flex justify-center items-center"
      overlayElement={renderOverlayElement}
    >
      <div className="content-center md:w-[500px]">
        <Card className=" relative flex h-screen flex-col justify-between !rounded-none bg-neutral-100 !px-xl !pb-2 pt-14 md:h-auto md:!rounded-md md:!px-2xl md:pt-7">
          <div
            className={`flex items-center ${
              isBackArrowHidden(flowType, stepId) ? 'justify-end' : 'justify-between'
            }   pt-1 md:items-end md:justify-end `}
          >
            <ArrowLeftIcon
              className={`${pointerArrowClassName}
              ${isBackArrowHidden(flowType, stepId) && 'hidden'}
              absolute left-4 top-3 md:hidden`}
              onClick={onBack}
            />
            <XMarkIcon
              className={`absolute right-5 top-3  md:!h-8 md:!w-8 ${pointerArrowClassName}`}
              onClick={handleCloseModal}
            />
          </div>
          <Body {...store} {...actions} {...props} />
        </Card>
      </div>
    </Modal>
  )
}
