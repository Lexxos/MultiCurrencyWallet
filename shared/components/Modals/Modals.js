import React from 'react'

import Offer from '../Offer/Offer'
import BalanceCard from '../BalanceCard/BalanceCard'

const MODAL_COMPONENTS = {
    'OFFER': Offer,
    'CARD': BalanceCard
}

const ModalRoot = ({modals, ...rest}) => {
    if (!modals.name) {
        return <span /> 
    }
    
    const SPECIFIC_MODAL = MODAL_COMPONENTS[modals.name]
    return <SPECIFIC_MODAL {...rest} open={modals.open} />
}

export default ModalRoot