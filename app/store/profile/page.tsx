import { auth } from "@/auth";
import ProfilePage from "@/components/store/profile/profilePage";
import { getUserDetails } from "@/lib/data layer/store/store-DL";
import React from "react";

const Page = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Access Denied
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to view your profile
            </p>
            <div className="mt-8">
              <a
                href="/auth/signin"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userDetails = await getUserDetails(userId);

  return (
    <div>
      <ProfilePage initialData={userDetails} />
    </div>
  );
};

export default Page;
