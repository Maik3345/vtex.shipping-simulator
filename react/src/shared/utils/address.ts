import { pathOr } from 'ramda'
import { useState } from 'react'
import { addValidation } from 'vtex.address-form/helpers'

let addressId = 1

const getRandomAddressId = () =>
  (addressId++ * new Date().getTime() * -1).toString().replace('-', '')

export const getNewAddress = (country: any, postalCode: any) => {
  const randomAddressId = getRandomAddressId()

  return {
    addressId: randomAddressId,
    addressType: 'residential',
    city: null,
    complement: null,
    country,
    geoCoordinates: [],
    neighborhood: null,
    number: null,
    postalCode: postalCode ?? null,
    receiverName: null,
    reference: null,
    state: null,
    street: null,
    addressQuery: null,
  }
}

export const useAddressState = (country: any, postalCode: any) => {
  const [address, setAddress] = useState(() =>
    addValidation(getNewAddress(country, postalCode))
  )

  const department = pathOr('', ['state', 'value'], address)
  const city = pathOr('', ['city', 'value'], address)

  const [isValid, setIsValid] = useState(!!postalCode)

  const updateAddress = (newAddress: any) => {
    const updatedAddress = {
      ...address,
      ...newAddress,
    }

    setAddress(updatedAddress)
    setIsValid(
      updatedAddress.postalCode.valid && department != '' && city != ''
    )
  }

  return { address, updateAddress, isValid }
}
