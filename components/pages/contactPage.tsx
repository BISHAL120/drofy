"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ChevronRight } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile || !formData.message) {
      toast.error("সকল প্রয়োজনীয় তথ্য পূরণ করুন");
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("আপনার মেসেজ সফলভাবে পাঠানো হয়েছে");
      setFormData({
        name: "",
        mobile: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("মেসেজ পাঠাতে সমস্যা হয়েছে");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-sm my-8">
      {/* Contact Information */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          যোগাযোগের ঠিকানা
        </h2>

        <h3 className="text-xl font-medium mb-2">রিস্টক বিডি</h3>
        <p className="mb-1">Call: 09647300100</p>
        <p className="mb-1">Email: support@drofy.com</p>
        <p className="mb-6">
          House-717, Road-1, Mohammadpur, Dhaka-1207, Bangladesh
        </p>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-orange-500 text-center mb-6">
          মেসেজ পাঠান
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-gray-700">
                আপনার নাম
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block mb-2 text-gray-700">
                মোবাইল নং
              </label>
              <Input
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-gray-700">
                ইমেইল (অপশনাল)
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-gray-700">
                মেসেজ লিখুন
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full min-h-[120px]"
                required
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "পাঠানো হচ্ছে..." : "মেসেজ পাঠান"}
                {!isSubmitting && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
