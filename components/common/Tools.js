import React from "react"
import ToolItem from "./ToolItem"
import siteConfig from "@/config/siteConfig"

export default function Tools() {
  // const toolsArray = Object.values(siteConfig.tools)
  console.log(siteConfig.tools)
  return (
    <section className="text-gray-600 body-font mt-16">
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Free Online Tools And Converters for your use
          </h2>
        </div>
        <div className="flex flex-wrap -m-4 ">
          {siteConfig.tools.map((item) => {
            return (
              <div className="p-4 md:w-1/3" key={item.shortTitle}>
                <ToolItem
                  title={item.shortTitle}
                  description={item.shortDescription}
                  url={item.relativeUrl}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
