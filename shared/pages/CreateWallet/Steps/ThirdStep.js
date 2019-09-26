import React, { useState } from 'react'

import CSSModules from 'react-css-modules'
import styles from '../CreateWallet.scss'

import { connect } from 'redaction'
import reducers from 'redux/core/reducers'

import ReactTooltip from 'react-tooltip'
import { FormattedMessage, injectIntl } from 'react-intl'

import Explanation from '../Explanation'
import icons from '../images'


const subHeaderText = () => (
  <FormattedMessage
    id="createWalletSubHeader3"
    defaultMessage="Choose wallet protection level"
  />
)

const CreateWallet = (props) => {
  const { intl: { locale } } = props

  const [border, setBorder] = useState({
    color: {
      withoutSecure: false,
      sms: false,
      google2FA: false,
      multisignature: false,
    },
    selected: '',
  })

  const handleClick = name => {

    const colors = border.color

    Object.keys(border.color).forEach(el => {
      if (el !== name) {
        colors[el] = false
      } else {
        colors[el] = true
      }
    })
    setBorder({ color: colors, selected: name })
    reducers.createWallet.newWalletData({ type: 'secure', data: name })
  }

  const coins = [
    { text: locale === 'en' ? 'Without Secure' : 'Без защиты', name: 'withoutSecure', capture: locale === 'en' ? 'suitable for small amounts' : 'Подходит для небольших сумм' },
    { text: 'SMS', name: 'sms', capture: locale === 'en' ? 'transactions are confirmed by SMS code' : 'Транзакции подтверждаются кодом по SMS' },
    {
      text: 'Google 2FA',
      name: 'google2FA',
      capture: locale === 'en' ?
        'Transactions are verified through the Google Authenticator app' :
        'Транзакции подтверждаются через приложение Google Authenticator',
    },
    {
      text: 'Multisignature',
      name: 'multisignature',
      capture: locale === 'en' ?
        'Transactions are confirmed from another device and / or by another person.' :
        'Транзакции подтверждаются с другого устройства и/или другим человеком',
    },
  ]

  return (
    <div>
      <Explanation subHeaderText={subHeaderText()} step="3">
        <FormattedMessage
          id="createWalletCapture3"
          defaultMessage="No protection, sms, google auth, multisig"
        />
      </Explanation>
      <div styleName="secureChooserWrapper">
        {coins.map(el => {
          const { name, capture, text } = el
          return (
            <div styleName={`card thirdCard ${border.color[name] ? 'purpleBorder' : ''}`} onClick={() => handleClick(name)}>
              <img
                styleName="logo thirdPageIcons"
                src={icons[name]}
                alt={`${name} icon`}
                role="image"
              />
              <div styleName="listGroup">
                <li><b>{text}</b></li>
                <li>{capture}</li>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
export default injectIntl(CSSModules(CreateWallet, styles, { allowMultiple: true }))
