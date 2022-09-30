import React from "react"

export default function SocialJoinGroups() {
  return (
    <div className="text-center my-12">
      <p className="my-4">
        JOIN OUR WHATSAPP GROUP TO GET LATEST COUPON AS SOON AS UPDATED{" "}
      </p>
      <a
        href="https://chat.whatsapp.com/JqScq7f7oSrCKhVkqj7Iez"
        title={`Join the programming buddy club on whatsapp`}
        target="_blank"
        rel="nofollow noopener"
        className="font-bold border rounded-xl py-2 px-12 bg-green-100 hover:bg-green-200"
      >
        JOIN WHATSAPP
      </a>
      <p className="my-4">JOIN OUR TELEGRAM CHANNEL TO GET LATEST COUPON</p>
      <a
        href="https://t.me/programmingBuddyClubChat"
        title={`Join the programming buddy club on Telegram`}
        target="_blank"
        rel="nofollow noopener"
        className="font-bold border rounded-xl py-2 px-12 bg-sky-100 hover:bg-sky-200"
      >
        JOIN TELEGRAM
      </a>
      <p className="my-4">JOIN OUR FACEBOOK GROUP TO GET LATEST COUPON</p>
      <a
        href="https://www.facebook.com/groups/programmingbuddyclub"
        title={`Join the programming buddy club on Facebook Group`}
        target="_blank"
        rel="nofollow noopener"
        className="font-bold border rounded-xl py-2 px-12 text-white bg-blue-800 hover:bg-blue-700"
      >
        JOIN FACEBOOK
      </a>
    </div>
  )
}
