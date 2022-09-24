export default {
  header: "The Programming Buddy Club",
  NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "",
  url: "https://theprogrammingbuddy.club",
  rssFilePath: "./public/rss",
  tools: [
    {
      shortTitle: "URL Encoder",
      relativeUrl: "/url-encoder",
      shortDescription:
        "Input a string of text or a URL and encode the entered string",
    },
    {
      shortTitle: "URL Decoder",
      relativeUrl: "/url-decoder",
      shortDescription:
        "Input an encoded string of text or a URL and decode the entered string",
    },
    {
      shortTitle: "Color Contrast Checker (WCAG)",
      relativeUrl: "/color-contrast-checker",
      shortDescription:
        "Calculate the color contrast ration for your website (WCAG)",
    },
    {
      shortTitle: "XML Formatter",
      relativeUrl: "/xml-formatter",
      shortDescription:
        "Paste or upload an XML and have it formatted to a beautiful XML format",
    },
    {
      shortTitle: "URL Slug Generator",
      relativeUrl: "/url-slug-generator",
      shortDescription:
        "Convert any title or sentence into a variety of slugs for your pages URL",
    },
    {
      shortTitle: "E-Signature",
      relativeUrl: "/create-signature-online",
      shortDescription:
        "Draw an e-signature or type a signature for your online signature",
    },
    // {
    //   shortTitle: "Invoice Generator",
    //   relativeUrl: "/invoice-generator",
    //   shortDescription:
    //     "Use our Free Invoice generator to make as many invoices you want.",
    // },
  ],
}
