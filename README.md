# Shipping Simulator

> Components used in the product showcase, quickView, and product detail page

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

> Components used in the product detail view

The Shipping Simulator app is responsible for providing the modal functionality for calculate the cost of the shipping for the selected location

## Configuration

1. Add the `shipping-calculator` app as a dependency in you theme's `manifest.json` file:

```json
  "dependencies": {
+   "dcmallio.shipping-calculator": "1.x"
  }
```

Now, you can import any of the exported components and hooks from the app. Here's an example of a component that render's the name of the product whose data is stored in the nearest `ProfileContext`:

```typescript
// Notice that this is TypeScript, and this code should be in a .tsx fileimport React, { FC } from 'react'
import { useShippingSimulator } from 'dcmallio.shipping-calculator'

const MyComponent: FC = () => {
  const {
    country,
    address,
    loading,
    isValid,
    seller,
    loaderStyles,
    skuId,
    showCost,
    onAddressChange,
    onCalculateShipping,
    setShowCost,
  } = useShippingSimulator()

  return <Fragment>{country}</Fragment>
}

export default MyComponent

```

Or use the implementation with the interface `shipping-calculator`

```json
{
  "shipping-calculator": {
    "children": ["shipping-calculator-view"]
  }
}
```

The `shipping-calculator` provide the context for use in all children components and the `shipping-calculator-view` provide the modal functionality

### Hooks

### `useShippingSimulator`

This is the most useful export from this app. The `useShippingSimulator` hook can be used to read the data from the nearest `ShippingSimulatorContext` relative to its caller.

You should expect an object that looks like that as the return value of `useShippingSimulator`. Be aware that, if the hook is called **outside** of a `ShippingSimulatorContextProvider`, the return value could be `undefined` or an empty object.
