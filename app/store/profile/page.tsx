import { auth } from "@/auth";
import ProfilePage from "@/components/store/profile/profilePage";
import { getUserDetails } from "@/lib/data layer/store/store-DL";
import React from "react";

const Page = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  const userDetails = await getUserDetails(userId);

  return (
    <div>
      <ProfilePage initialData={userDetails} />
    </div>
  );
};

export default Page;
