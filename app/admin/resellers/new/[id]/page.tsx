import UserDetailsPage from "@/components/admin/resellres/new/userDetails";
import {
  getResellerById,
  referredUsers,
} from "@/lib/data layer/admin/admin-DL";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id) {
    throw new Error("Reseller ID not found");
  }

  const resellerDetails = await getResellerById(id);

  const referredUsersCount = await referredUsers(resellerDetails?.referralCode);
  // console.log(referredUsersCount);

  return (
    <div>
      <UserDetailsPage
        referralCount={referredUsersCount}
        user={resellerDetails}
      />
    </div>
  );
};

export default Page;
