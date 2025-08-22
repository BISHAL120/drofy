import AllWithdrawalsPage from '@/components/admin/withdrawals/allWithdrawals'
import { getPendingRequest, getWithdrawRequests } from '@/lib/data layer/admin/admin-DL'

const Page = async () => {
  const allrequests = await getWithdrawRequests()
  const pendingRequests = await getPendingRequest()
  

  return (
    <div>
      <AllWithdrawalsPage pendingRequests={pendingRequests} requests={allrequests} />
    </div>
  )
}

export default Page