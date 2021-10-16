import React, { FC, useContext } from 'react'
import { OrderShippingProvider } from 'vtex.order-shipping/OrderShipping'
import { ProductContext } from 'vtex.product-context'
import { useRuntime } from 'vtex.render-runtime'
import { Address, ShippingSimulator } from '../../ShippingSimulatorTypes'
import { getDefaultSeller } from '../shared'
import BaseShippingSimulator from './BaseShippingSimulator'
import OrderFormLoader from './OrderFormLoader'
import ShippingSimulatorWithOrderForm from './ShippingSimulatorWithOrderForm'

declare var window: any

export interface ShippingSimulatorContextState {
  skuId: string
  seller: string
  country: string
  loading: boolean
  address: { [key: string]: Address }
  isValid: boolean
  shipping: null
  selectedQuantity: string
  modalIsOpen: boolean
  loaderStyles: any
  showCost: boolean
  price: number
  handleCloseModal: () => void
  setShowCost: React.Dispatch<React.SetStateAction<boolean>>
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCalculateShipping: () => void
  onAddressChange: (newAddress: any) => void
}

const ShippingSimulatorManagerProvider: FC<ShippingSimulator> = (props) => {
  const { culture } = useRuntime()
  const productContext = useContext(ProductContext)
  const { children, pricingMode } = props
  const country = props.country || culture.country
  const skuId = props.skuId || productContext?.selectedItem?.itemId
  const selectedQuantity = productContext?.selectedQuantity?.toString()

  const { loaderStyles } = props

  let sellerId = props.seller

  if (!sellerId) {
    const defaultSeller = getDefaultSeller(
      productContext?.selectedItem?.sellers
    )

    if (defaultSeller) {
      sellerId = defaultSeller.sellerId
    }
  }

  const { shouldUpdateOrderForm = true } = props

  if (
    window.__RUNTIME__?.settings?.['vtex.store']
      ?.enableOrderFormOptimization !== true
  ) {
    return (
      <BaseShippingSimulator
        children={children}
        country={country}
        skuId={skuId}
        seller={sellerId}
        pricingMode={pricingMode}
        selectedQuantity={selectedQuantity}
        loaderStyles={loaderStyles}
      />
    )
  }

  return (
    <OrderShippingProvider>
      <OrderFormLoader>
        <ShippingSimulatorWithOrderForm
          children={children}
          country={country}
          seller={sellerId}
          skuId={skuId}
          loaderStyles={props.loaderStyles}
          pricingMode={pricingMode}
          selectedQuantity={selectedQuantity}
          shouldUpdateOrderForm={shouldUpdateOrderForm}
        />
      </OrderFormLoader>
    </OrderShippingProvider>
  )
}

export default ShippingSimulatorManagerProvider
