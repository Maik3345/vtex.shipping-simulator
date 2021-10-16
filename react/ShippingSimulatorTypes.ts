export interface BaseShippingSimulator {
  selectedQuantity: string | undefined
  initialPostalCode?: any
  seller: string
  skuId?: string
  pricingMode: any
  country: string
  loaderStyles: any
  onShippingAddressUpdate?: (_: any) => {}
  shouldUpdateOrderForm?: () => void
}

export interface ShippingSimulator {
  seller: string
  skuId?: string
  pricingMode: any
  country: string
  loaderStyles: any
  shouldUpdateOrderForm?: () => void
}

export interface Address {
  value: any[] | null | string
}
