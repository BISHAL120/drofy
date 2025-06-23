import NewResellerPage from "@/components/admin/resellres/new/newReseller";
import { getNewResellers } from "@/lib/data layer/admin/admin-DL";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const search = params.search || "";

  const newResellers = await getNewResellers({ search });

  return (
    <div>
      <NewResellerPage resellers={newResellers} />
    </div>
  );
};

export default Page;
