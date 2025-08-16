import React from 'react'

const Page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">গোপনীয়তা নীতি</h1>
      
      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold mb-2">ব্যক্তিগত তথ্য সংগ্রহ</h2>
          <p>আমরা আপনার নাম, ঠিকানা, ফোন নম্বর এবং ইমেইল ঠিকানা সংগ্রহ করি যা কেবল অর্ডার প্রক্রিয়াকরণ এবং ডেলিভারির জন্য ব্যবহৃত হয়।</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">তথ্যের ব্যবহার</h2>
          <p>আপনার তথ্য শুধুমাত্র অর্ডার প্রক্রিয়াকরণ, পণ্য ডেলিভারি এবং গ্রাহক সেবা প্রদানের জন্য ব্যবহৃত হয়। আমরা কখনোই আপনার ব্যক্তিগত তথ্য তৃতীয় পক্ষের সাথে শেয়ার করি না।</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">পেমেন্ট সুরক্ষা</h2>
          <p>আমরা সুরক্ষিত পেমেন্ট গেটওয়ে ব্যবহার করি এবং আপনার পেমেন্ট তথ্য এনক্রিপ্টেড পদ্ধতিতে সংরক্ষণ করা হয়।</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">কুকি নীতি</h2>
          <p>আমাদের ওয়েবসাইট কুকি ব্যবহার করে আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করার জন্য। আপনি আপনার ব্রাউজার সেটিংস থেকে কুকি নিষ্ক্রিয় করতে পারেন।</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">যোগাযোগ</h2>
          <p>গোপনীয়তা সংক্রান্ত যেকোনো প্রশ্নের জন্য আমাদের সাথে ইমেইলে যোগাযোগ করুন।</p>
        </section>
      </div>
    </div>
  )
}

export default Page