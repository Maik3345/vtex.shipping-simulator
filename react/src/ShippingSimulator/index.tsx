import React, { lazy, Suspense } from 'react'
import { NoSSR } from 'vtex.render-runtime'
import ShippingSimulatorLoader from './Loader'
const ShippingSimulatorHandler = lazy(
  () => import('./ShippingSimulatorHandler')
)

const ShippingSimulatorWrapper = () => {
  return (
    <NoSSR>
      <Suspense fallback={<ShippingSimulatorLoader />}>
        <ShippingSimulatorHandler />
      </Suspense>
    </NoSSR>
  )
}

export default ShippingSimulatorWrapper
