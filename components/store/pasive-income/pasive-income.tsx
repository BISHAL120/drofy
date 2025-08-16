import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Users, Target, CheckCircle, Info } from "lucide-react"

// Actual commission data provided by user
const commissionRanges = [
  { min: 2501, max: 10000, l1: 15, l2: 12, l3: 10, l4: 5 },
  { min: 1501, max: 2500, l1: 10, l2: 7, l3: 5, l4: 4 },
  { min: 1001, max: 1500, l1: 8, l2: 5, l3: 4, l4: 3 },
  { min: 801, max: 1000, l1: 7, l2: 4, l3: 3, l4: 2 },
  { min: 701, max: 800, l1: 6, l2: 4, l3: 3, l4: 2 },
  { min: 601, max: 700, l1: 6, l2: 4, l3: 2, l4: 2 },
  { min: 501, max: 600, l1: 6, l2: 3, l3: 2, l4: 2 },
  { min: 401, max: 500, l1: 5, l2: 2, l3: 2, l4: 2 },
  { min: 301, max: 400, l1: 4, l2: 2, l3: 2, l4: 2 },
  { min: 201, max: 300, l1: 3, l2: 2, l3: 2, l4: 2 },
  { min: 101, max: 200, l1: 2, l2: 2, l3: 2, l4: 2 },
  { min: 0, max: 100, l1: 1, l2: 1, l3: 1, l4: 1 },
]

const tierColors = {
  l1: "bg-emerald-100 text-emerald-800 border-emerald-200",
  l2: "bg-blue-100 text-blue-800 border-blue-200",
  l3: "bg-purple-100 text-purple-800 border-purple-200",
  l4: "bg-orange-100 text-orange-800 border-orange-200",
}

const tierLabels = {
  l1: "১ম",
  l2: "২য়",
  l3: "৩য়",
  l4: "৪র্থ",
}

export default function PasiveIncomeComponent() {
  const maxCommission = Math.max(...commissionRanges.map((r) => Math.max(r.l1, r.l2, r.l3, r.l4)))
  const topTierRange = `${commissionRanges[0].min.toLocaleString()} - ${commissionRanges[0].max.toLocaleString()}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-8 w-8 text-emerald-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              কমিশন চার্ট
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            আপনার বিক্রয় পারফরম্যান্সের ভিত্তিতে প্রতিযোগিতামূলক কমিশন অর্জন করুন। উচ্চ বিক্রয় ভলিউম সব স্তরে ভাল কমিশন রেট আনলক করে।
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-emerald-600">সর্বোচ্চ কমিশন</p>
                  <p className="text-2xl font-bold text-emerald-700">{maxCommission}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-600">টপ টিয়ার রেঞ্জ</p>
                  <p className="text-lg font-bold text-blue-700">৳{topTierRange}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-600">কমিশন স্তর</p>
                  <p className="text-2xl font-bold text-purple-700">৪টি</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-600">প্রবেশ স্তর</p>
                  <p className="text-2xl font-bold text-orange-700">১%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commission Chart */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-slate-800">বিক্রয় ভলিউম অনুযায়ী কমিশন রেট</CardTitle>
            <CardDescription className="text-slate-600">
              মাসিক বিক্রয় পারফরম্যান্সের ভিত্তিতে কমিশনের পরিমাণ (শতাংশে)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 px-4 font-semibold text-slate-700 min-w-[200px]">বিক্রয় রেঞ্জ</th>
                    {Object.entries(tierLabels).map(([key, label]) => (
                      <th key={key} className="text-center py-4 px-4 font-semibold text-slate-700 min-w-[120px]">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {commissionRanges.map((row, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-800">
                          ৳{row.min.toLocaleString()} - ৳{row.max.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge className={`${tierColors.l1} font-semibold px-3 py-1`}>{row.l1}%</Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge className={`${tierColors.l2} font-semibold px-3 py-1`}>{row.l2}%</Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge className={`${tierColors.l3} font-semibold px-3 py-1`}>{row.l3}%</Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge className={`${tierColors.l4} font-semibold px-3 py-1`}>{row.l4}%</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Content Sections from Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Passive Income Section */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-emerald-600" />
                প্যাসিভ ইনকাম কি?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-slate-600 leading-relaxed">
                আপনার ড্রপশিপিং এর একটি নেটওয়ার্ক তৈরি করে ভবিষ্যতে রেগুলার ইনকাম করার জন্য কাজ করা, যার উপর আপনি এগিয়ে থাকবেন। এই
                আপনার অতিরিক্ত আয়ের একটি ইনকাম অপশন হবে।
              </p>
            </CardContent>
          </Card>

          {/* How to Earn Section */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                কিভাবে প্যাসিভ ইনকাম করবেন?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-slate-600 leading-relaxed">
                যেই গ্রুপের সাথে ইনকাম হিসেবে রেফারেল বিজনেসে সবাই আগ্রহী হবে। আপনি তখন এই রেফার আগ্রহী লোক কেন্দ্রীয় সেবা নিয়ে
                আসবেন। এই হবে আপনার প্যাসিভ ইনকাম।
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seller Information */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                সেলার হতে কি এবং কিভাবে পারবেন?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-slate-600 leading-relaxed">
                আপনার একটিভ থেকে ১০ টি অর্ডার সম্পূর্ণ হলে রেফারেল হওয়ার পর আপনি হয় মার্কেটের বিভিন্ন একটি রেফারেল সেলার। রেফারেল সেলার
                হওয়ার সাথে সাথে আপনি এই কমিশন পাবেন।
              </p>
            </CardContent>
          </Card>

          {/* Why Choose Section */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-orange-600" />
                কেন আপনি প্যাসিভ ইনকাম টি নিবে নিবেন?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-slate-600 leading-relaxed">
                যদিও এখন সম্পূর্ণ ১৫% ইনকাম হিসেবে রেফারেল বিজনেসে ব্যাপক জনপ্রিয়তা অর্জন করেছে।
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="border-slate-200 bg-gradient-to-r from-emerald-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              সেলার কমিশন রেট
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600 leading-relaxed">
              আপনি যদি সাধারণ ড্রপ শিপার হন তাহলে আপনার গড়ে ৫০ টাকা পর্যন্ত লেনদেন অনুযায়ী একটি কমিশন আছে। এবং আপনার অতিরিক্ত আয়ের জন্য
              ৫০ টাকা কমিশন পাবেন।
            </p>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-2">গুরুত্বপূর্ণ তথ্য:</h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>আপনার নেটওয়ার্ক বিল্ডিং এর কাজ থেকে ইনকাম পাবেন</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>রেগুলার ইনকাম এর সুযোগ</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>উচ্চ বিক্রয় ভলিউমে বেশি কমিশন</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-800 font-medium mb-1">বিশেষ নোট:</p>
                <p className="text-amber-700 text-sm leading-relaxed">
                  আপনার সেলার হিসেবে নিবন্ধিত হওয়ার পর ৩০০ - ৫০০ টাকা পর্যন্ত লেনদেন অনুযায়ী একটি কমিশন আছে। এবং আপনার অতিরিক্ত আয়ের
                  জন্য ৫০০ অর্ডার কমপ্লিট হলে ৫০০ অর্ডার কমপ্লিট হওয়ার পর আপনি যদি রেগুলার ইনকাম করতে চান, আপনি যদি গ্রহণ করেন অর্ডার
                  ভিত্তিক আপনার ইনকাম এক হবে আপনার ইনকাম এক হবে।
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
