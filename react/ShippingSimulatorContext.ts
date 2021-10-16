import { createContext } from 'react'

import type { ShippingSimulatorContextState } from './src/ShippingSimulatorContextProvider'

const ShippingSimulatorContext =
  createContext<Partial<ShippingSimulatorContextState> | null>(null)
export default ShippingSimulatorContext
