import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useApolloClient } from 'react-apollo'
import { removeValidation } from 'vtex.address-form/helpers'
import getShippingEstimates from '../../queries/getShippingEstimates.gql'
import ShippingSimulatorContext from '../../ShippingSimulatorContext'
import { BaseShippingSimulator } from '../../ShippingSimulatorTypes'
import { useAddressState } from '../shared'
import { pathOr } from 'ramda'
import { ToastContext } from 'vtex.styleguide'

const BaseShippingSimulator: FC<BaseShippingSimulator> = (props) => {
  const {
    country,
    seller,
    skuId,
    loaderStyles,
    initialPostalCode = undefined,
    pricingMode,
    selectedQuantity,
    children,
    onShippingAddressUpdate = (_: any) => {},
    shouldUpdateOrderForm,
  } = props

  const { showToast } = useContext(ToastContext)
  const { Provider } = ShippingSimulatorContext
  const [shipping, setShipping] = useState(null)
  const [loading, setLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [showCost, setShowCost] = useState(false)
  const [price, setPrice] = useState(0)
  const { address, updateAddress, isValid } = useAddressState(
    country,
    initialPostalCode
  )

  const client = useApolloClient()

  const handleCalculateShipping = useCallback(
    (e?) => {
      e && e.preventDefault()
      setLoading(true)
      const rawAddress = removeValidation(address)
      setShipping(null)
      setPrice(0)

      client
        .query({
          query: getShippingEstimates,
          variables: {
            country,
            postalCode: rawAddress.postalCode,
            items: [
              {
                quantity: selectedQuantity,
                id: skuId,
                seller,
              },
            ],
          },
        })
        .then((result) => {
          setShipping(result.data.shipping)
          console.log(result.data.shipping)
        })
        .then(() => {
          if (!shouldUpdateOrderForm) return

          return onShippingAddressUpdate?.(rawAddress)
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [
      address,
      client,
      country,
      seller,
      skuId,
      showCost,
      selectedQuantity,
      onShippingAddressUpdate,
      shouldUpdateOrderForm,
    ]
  )

  const handleCloseModal = () => {
    setShipping(null)
    setPrice(0)
    setShowCost(false)
    setModalIsOpen(false)
  }

  useEffect(() => {
    if (shipping) {
      const priceValue = pathOr(
        0,
        ['logisticsInfo', 0, 'slas', 0, 'price'],
        shipping
      )
      if (priceValue) {
        setPrice(priceValue)
        setShowCost(true)
      } else {
        showToast({
          message:
            'No se ha encontrado un precio para la ubicación seleccionada',
          duration: 3000,
        })
      }
    }
  }, [shipping])

  const isMountedRef = useRef(false)

  useEffect(() => {
    if (isMountedRef.current) {
      return
    }

    isMountedRef.current = true

    if (!address || !isValid) {
      return
    }

    handleCalculateShipping()
  }, [handleCalculateShipping, address, isValid])

  const context = useMemo(() => {
    return {
      skuId,
      seller,
      country,
      loaderStyles,
      loading,
      address,
      isValid,
      shipping,
      pricingMode,
      selectedQuantity,
      modalIsOpen,
      showCost,
      price,
      handleCloseModal,
      setShowCost,
      setModalIsOpen,
      onAddressChange: updateAddress,
      onCalculateShipping: handleCalculateShipping,
    }
  }, [
    skuId,
    seller,
    country,
    loaderStyles,
    loading,
    address,
    isValid,
    shipping,
    pricingMode,
    selectedQuantity,
    modalIsOpen,
    price,
    showCost,
  ])

  return <Provider value={context}>{children}</Provider>
}

export default BaseShippingSimulator
