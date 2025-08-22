import {
  Calendar,
  Globe,
  Lock,
  Mail,
  Share2,
  Shield,
  Trash2,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
          <h1 className="text-3xl font-bold mb-4">গোপনীয়তা নীতি</h1>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>কার্যকর তারিখ: ০১ আগস্ট ২০২৫</span>
            </div>
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              <Link
                href="https://wa.me/+8801623939834"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                <span>ডেভেলপার: Monerul Islam Bishal</span>
              </Link>
              <Link
                href="https://wa.me/+8801623939834"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">ভূমিকা</h2>
            <p className="text-gray-600 leading-relaxed">
              ReStock BD রিসেলার প্লেস আমাদের ব্যবহারকারীদের গোপনীয়তা রক্ষা
              করতে প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আপনি যখন
              আমাদের ওয়েবসাইট ব্যবহার করেন তখন আমরা কীভাবে আপনার তথ্য সংগ্রহ
              করি, ব্যবহার করি এবং সুরক্ষিত করি। আপনার ডেটা সম্পর্কিত আমাদের
              অনুশীলনগুলি বুঝতে দয়া করে এই নীতিটি মনোযোগ সহকারে পড়ুন।
            </p>
          </section>

          {/* Policy Sections */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">তথ্য সংগ্রহ</h3>
              </div>
              <p className="text-gray-600">
                আমরা ব্যক্তিগত বা সংবেদনশীল ব্যবহারকারীর ডেটা সংগ্রহ করি না,
                অ্যাক্সেস করি না বা শেয়ার করি না যদি না এখানে স্পষ্টভাবে উল্লেখ
                করা হয়।
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold">ডেটা সুরক্ষা</h3>
              </div>
              <p className="text-gray-600">
                আমরা শিল্প-মানের সুরক্ষা ব্যবস্থা বাস্তবায়নের মাধ্যমে আপনার
                ডেটা সুরক্ষিত করতে প্রতিশ্রুতিবদ্ধ।
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Share2 className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold">ডেটা শেয়ারিং</h3>
              </div>
              <p className="text-gray-600">
                আমরা তৃতীয় পক্ষের সাথে ব্যবহারকারীর ডেটা শেয়ার করি না। যদি
                কোনও ইন্টিগ্রেশন বা আপডেটে ডেটা শেয়ার করা জড়িত থাকে, তবে এই
                নীতিটি আপডেট করা হবে।
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Trash2 className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-xl font-semibold">ডেটা মুছে ফেলা</h3>
              </div>
              <p className="text-gray-600">
                যেহেতু ওয়েবসাইট ব্যক্তিগত ডেটা সংগ্রহ করে না, তাই এই সময়ে কোনও
                ডেটা ধরে রাখা বা মুছে ফেলার নীতিমালার প্রয়োজন নেই।
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <section className="mt-12 bg-gray-50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-6">যোগাযোগ করুন</h2>
            <div className="flex flex-wrap gap-6">
              <a
                href="mailto:support@restockbd.com"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Mail className="w-5 h-5 mr-2" />
                support@restockbd.com
              </a>
              <a
                href="https://www.restockbd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Globe className="w-5 h-5 mr-2" />
                www.restockbd.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
