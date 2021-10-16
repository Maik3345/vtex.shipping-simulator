import { pathOr } from 'ramda'
import React from 'react'
import {
  AddressContainer,
  AddressRules,
  PostalCodeGetter,
} from 'vtex.address-form'
import { StyleguideInput } from 'vtex.address-form/inputs'
import { Button } from 'vtex.styleguide'
import useShippingSimulator from '../../useShippingSimulator'
import Pin from '../Icons/Pin'
import { ShippingSimulatorContextState } from '../ShippingSimulatorContextProvider'
import styles from './index.css'
import ShippingSimulatorLoader from './Loader'

const ShippingSimulator = () => {
  const context = useShippingSimulator() as ShippingSimulatorContextState

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
  } = context

  const department = pathOr('', ['state', 'value'], address)
  const city = pathOr('', ['city', 'value'], address)
  const neighborhood = pathOr('', ['neighborhood', 'value'], address)

  if (!seller || !skuId) {
    return <ShippingSimulatorLoader {...loaderStyles} />
  }

  return (
    <div className={styles.modalSimulationContainer}>
      {!showCost ? (
        <div className={`${styles.shippingContainer} t-small c-on-base`}>
          <AddressRules country={country} shouldUseIOFetching>
            <AddressContainer
              Input={StyleguideInput}
              address={address}
              onChangeAddress={onAddressChange}
              autoCompletePostalCode
              disabled={loading}
            >
              <PostalCodeGetter onSubmit={onCalculateShipping} />
            </AddressContainer>
          </AddressRules>
          <div className={styles.shippingCTA}>
            <Button
              onClick={onCalculateShipping}
              disabled={!isValid}
              type="submit"
              isLoading={loading}
            >
              Consultar
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.shippingCostView}>
          <div className={styles.addressInformation}>
            <div className={styles.addressInformationIcon}>
              <Pin />
            </div>
            <div className={styles.addressInformationText}>
              <span className={styles.addressInformationTextValue}>
                {department != '' ? department : ''}
                {city != '' ? `, ${city}` : ''}{' '}
                {neighborhood != '' ? `, ${neighborhood}` : ''}
              </span>
            </div>
            <div
              className={styles.addressInformationEdit}
              onClick={() => setShowCost(false)}
            >
              <span className={styles.addressInformationEditAction}>
                Editar
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShippingSimulator
