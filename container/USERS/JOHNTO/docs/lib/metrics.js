const logger = console

export const GA_ID = 'UA-119536559-1'

export const pageview = (url, title) => {
  try {
    window.gtag('config', GA_ID, {
      page_location: url,
      page_title: title
    })
  } catch (err) {
    logger.error('Error in analytics: pageview;', err)
  }
}

export const event = ({ action, category, label, value, ...data }) => {
  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
      ...data
    })
  } catch (err) {
    logger.error('Error in analytics: event;', err)
  }
}
