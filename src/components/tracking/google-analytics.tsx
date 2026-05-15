import Script from 'next/script'
import { TRACKING } from '@/lib/site'

/**
 * Google Analytics 4 con gtag.
 * Si NEXT_PUBLIC_GA_MEASUREMENT_ID no está seteado, no renderiza nada.
 */
export function GoogleAnalytics() {
  const measurementId = TRACKING.gaMeasurementId
  if (!measurementId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', { send_page_view: true });
          `,
        }}
      />
    </>
  )
}
