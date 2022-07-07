import Head from "next/head"
import React from "react"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import { useRouter } from "next/router"
import siteConfig from "@/config/siteConfig"
import CustomHead from "@/components/common/CustomHead"
import Script from "next/script"

export default function DefaultLayout({ children }) {
  const router = useRouter()
  return (
    <div>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f4d001" />
        <meta name="msapplication-TileColor" content="#747474" />
        <meta name="theme-color" content="#ffffff" />
        {/* <meta
          name="p:domain_verify"
          content="65277291b8974992ad879e88a2101a0a"
        /> */}
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      {router.pathname === "/" && (
        <CustomHead
          title={siteConfig.title}
          imageUrl={siteConfig.imageUrl}
          keywords={siteConfig.keywords}
          description={siteConfig.description}
          website={siteConfig.url}
        />
      )}
      <Header />
      {children}
      <Footer />
    </div>
  )
}
