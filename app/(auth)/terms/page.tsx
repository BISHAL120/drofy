import React from "react";

function Page() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        শর্তাবলী এবং নীতিমালা
      </h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">১. সাধারণ শর্তাবলী</h2>
        <p>
          রিস্টক-বিডি প্ল্যাটফর্মে আপনাকে স্বাগতম। এই প্ল্যাটফর্ম ব্যবহার করার
          মাধ্যমে আপনি নিম্নলিখিত শর্তাবলী মেনে চলতে সম্মত হচ্ছেন।
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">২. ড্রপশিপিং নীতিমালা</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            সকল পণ্যের মূল্য অবশ্যই বাজার দরের সাথে সামঞ্জস্যপূর্ণ হতে হবে
          </li>
          <li>গ্রাহকদের কাছে পণ্য পৌঁছানোর সময়সীমা ৩-৭ কার্যদিবস</li>
          <li>সরবরাহকৃত পণ্যের গুণগত মান নিশ্চিত করতে হবে</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">৩. অর্থ প্রদান এবং রিফান্ড</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>সকল লেনদেন অবশ্যই প্ল্যাটফর্মের মাধ্যমে সম্পন্ন করতে হবে</li>
          <li>ত্রুটিপূর্ণ পণ্য ৭ দিনের মধ্যে ফেরত যোগ্য</li>
          <li>রিফান্ড প্রক্রিয়া সম্পন্ন হতে ৫-৭ কার্যদিবস সময় লাগবে</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">৪. বিক্রেতার দায়িত্ব</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>সঠিক পণ্য বিবরণ এবং ছবি প্রদান করতে হবে</li>
          <li>স্টক আপডেট নিয়মিত করতে হবে</li>
          <li>গ্রাহক সেবা দ্রুত প্রদান করতে হবে</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">৫. নিষিদ্ধ পণ্য</h2>
        <p>
          আইনগতভাবে নিষিদ্ধ, জাল, বা ক্ষতিকারক পণ্য বিক্রি করা সম্পূর্ণ নিষিদ্ধ।
          এই নীতি লঙ্ঘন করলে অ্যাকাউন্ট স্থায়ীভাবে বন্ধ করা হবে।
        </p>
      </section>
    </div>
  );
}

export default Page;
