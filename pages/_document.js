import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
          rel="stylesheet"
        ></link>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2306119198554594"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body className="text-slate-700 antialiased font-varela container mx-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
