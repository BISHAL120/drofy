import React from "react";

const GuideLinePage = () => {
  const guidelines = [
    {
      title: "রিস্টক বিডি তে স্বাগতম",
      description:
        "আমাদের প্ল্যাটফর্মে আপনাকে স্বাগতম। এখানে আপনি সহজেই আপনার পণ্য ক্রয়-বিক্রয় করতে পারবেন।",
    },
    {
      title: "একাউন্ট তৈরি",
      description:
        "প্রথমে আপনাকে একটি একাউন্ট তৈরি করতে হবে। এজন্য প্রয়োজনীয় তথ্য দিয়ে রেজিস্ট্রেশন সম্পন্ন করুন।",
    },
    {
      title: "অর্ডার ব্যবস্থাপনা",
      description:
        "অর্ডার পেলে দ্রুত প্রসেস করুন। ক্রেতার সাথে যোগাযোগ রাখুন এবং পণ্য ডেলিভারি নিশ্চিত করুন।",
    },
    {
      title: "নিরাপত্তা নির্দেশনা",
      description:
        "অনলাইন লেনদেনের ক্ষেত্রে সতর্ক থাকুন। অচেনা লিংকে ক্লিক করবেন না। আপনার পাসওয়ার্ড গোপন রাখুন।",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        ব্যবহার নির্দেশিকা
      </h1>

      <div className="space-y-6">
        {guidelines.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideLinePage;
