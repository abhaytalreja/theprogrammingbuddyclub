import "../styles/globals.css"
import DefaultLayout from "@/layouts/defaultLayout"
import { useEffect } from "react"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("2079597175673530") // facebookPixelId
        ReactPixel.pageView()

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView()
        })
      })
  }, [router.events])

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
