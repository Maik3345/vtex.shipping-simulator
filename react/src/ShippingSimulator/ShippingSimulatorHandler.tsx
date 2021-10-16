import { pathOr } from 'ramda'
import React from 'react'
import { Modal } from 'vtex.styleguide'
import useShippingSimulator from '../../useShippingSimulator'
import IconClose from '../Icons/IconClose'
import Truck from '../Icons/Truck'
import { ShippingSimulatorContextState } from '../ShippingSimulatorContextProvider'
import styles from './index.css'
import ShippingSimulator from './ShippingSimulator'

const ShippingSimulatorHandler = () => {
  const context = useShippingSimulator() as ShippingSimulatorContextState
  const myRef = React.useRef(null)
  const price = pathOr(
    0,
    ['shipping', 'logisticsInfo', 0, 'slas', 0, 'price'],
    context
  )

  if (!context) return null

  const { modalIsOpen, showCost, setModalIsOpen, handleCloseModal } = context

  return (
    <div className={styles.simulationHandlerContainer}>
      <button
        className={styles.simulationButton}
        onClick={() => setModalIsOpen(true)}
      >
        <div className={styles.simulationButtonIcon}>
          <Truck />
        </div>
        <span className={styles.simulationButtonLabel}>
          Simulador de costos de envió
        </span>
      </button>

      <div className={styles.modalContainer} ref={myRef}>
        <Modal
          centered
          title={
            <div className={styles.simulationModalText}>
              Simulador de{' '}
              <span className={styles.simulationModalSubText}>
                Costos de envió
              </span>
              <div
                className={styles.simulationModalIconClose}
                onClick={() => handleCloseModal()}
              >
                <IconClose size={30} />
              </div>
            </div>
          }
          isOpen={modalIsOpen}
          showCloseIcon={false}
          showTopBar={true}
          onClose={() => handleCloseModal()}
          container={myRef.current}
          bottomBar={
            price && showCost ? (
              <div className={styles.costShipping}>
                <span className={styles.costShippingTitle}>
                  Valor de envió:
                </span>
                <span
                  className={styles.costShippingValue}
                >{`S/ ${price}`}</span>
              </div>
            ) : null
          }
        >
          <ShippingSimulator />
        </Modal>
      </div>
    </div>
  )
}

export default ShippingSimulatorHandler
