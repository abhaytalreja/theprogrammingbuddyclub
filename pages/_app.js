import "../styles/globals.css"
import DefaultLayout from "@/layouts/defaultLayout"

function MyApp({ Component, pageProps }) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
      {/* <div className="fixed bottom-10 right-0 z-30">
        <NewsletterPopup />
      </div> */}
    </DefaultLayout>
  )
}

export default MyApp
