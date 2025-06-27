import AllResellersPage from "@/components/admin/resellres/allResellers";
import { getAllResellers } from "@/lib/data layer/admin/admin-DL";
import db from "@/lib/db";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const search = params.search || "";
  const level = params.level || "";
  const status = params.status || "";
  const page = params.page || "0";
  const currentPage = parseInt(page);

  const allResellers = await getAllResellers({
    search,
    level,
    status,
    currentPage,
  });

  const totalResellerCount = await db.user.count();

  return (
    <div>
      <AllResellersPage
        allResellers={allResellers}
        totalResellerCount={totalResellerCount}
      />
    </div>
  );
};

export default Page;
