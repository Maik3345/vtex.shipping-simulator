import React from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import ShippingSimulatorLoader from '../ShippingSimulator/Loader'

const OrderFormLoader = (props: any) => {
  const { loading } = useOrderForm()

  if (loading) {
    return <ShippingSimulatorLoader {...props.loaderStyles} />
  }

  return props.children
}

export default OrderFormLoader
