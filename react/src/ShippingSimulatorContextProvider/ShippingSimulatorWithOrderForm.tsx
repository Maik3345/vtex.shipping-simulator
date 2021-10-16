import React from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useOrderShipping } from 'vtex.order-shipping/OrderShipping'
import BaseShippingSimulator from './BaseShippingSimulator'

const ShippingSimulatorWithOrderForm = ({
  country,
  skuId,
  seller,
  loaderStyles,
  shouldUpdateOrderForm,
  pricingMode,
  selectedQuantity,
  children,
}: any) => {
  const { updateSelectedAddress } = useOrderShipping()
  const { orderForm } = useOrderForm()

  const selectedAddress = orderForm?.shipping?.selectedAddress

  return (
    <BaseShippingSimulator
      children={children}
      skuId={skuId}
      seller={seller}
      country={country}
      loaderStyles={loaderStyles}
      initialPostalCode={
        orderForm?.canEditData || selectedAddress?.isDisposable
          ? selectedAddress?.postalCode
          : undefined
      }
      onShippingAddressUpdate={updateSelectedAddress}
      shouldUpdateOrderForm={shouldUpdateOrderForm}
      pricingMode={pricingMode}
      selectedQuantity={selectedQuantity}
    />
  )
}

export default ShippingSimulatorWithOrderForm
