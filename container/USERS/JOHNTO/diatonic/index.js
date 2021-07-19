'use strict'

module.exports = function diatonic (options) {
  options = options || {}

  if (options.px) {
    return {
      nonpareille: '8px',
      minion: '9px',
      petit: '11px',
      bourgeois: '12px',
      longPrimer: '13px',
      smallPica: '15px',
      pica: '16px',
      english: '19px',
      columbian: '21px',
      greatPrimer: '24px',
      doubleSmallPica: '28px',
      doublePica: '32px',
      doubleGreatPrimer: '48px',
      canon: '62px',
      fiveLinePica: '80px',
      inch: '96px'
    }
  } else {
    return {
      nonpareille: '.5rem',
      minion: '.5625rem',
      petit: '.6875rem',
      bourgeois: '.75rem',
      longPrimer: '.8125rem',
      smallPica: '.9375rem',
      pica: '1rem',
      english: '1.1875rem',
      columbian: '1.3125rem',
      greatPrimer: '1.5rem',
      doubleSmallPica: '1.75rem',
      doublePica: '2rem',
      doubleGreatPrimer: '3rem',
      canon: '3.875rem',
      fiveLinePica: '5rem',
      inch: '6rem'
    }
  }
}
