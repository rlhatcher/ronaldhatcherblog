/* eslint-disable */
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

/**
 * Sends a pageview event to Google Analytics
 * @param {string} url - The URL of the page being viewed
 * @returns {void}
 */
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  })
}

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value
  })
}
