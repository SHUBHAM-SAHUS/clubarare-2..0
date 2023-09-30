import { Overlay } from '../Overlay'

import { Link } from 'design-systems/Atoms/Link'

export const AdminOverlay: React.FC = () => {
  return (
    <Overlay>
      <div className="mt-3 flex flex-col gap-3 pl-4 text-neutral-100 dark:text-neutral-600 sm:mt-2">
        <Link href="">Whitelist Seller</Link>
        <Link href="">Category</Link>
        <Link href="">Warehouse</Link>
        <Link href="">Redeem List</Link>
        <Link href="">Reports</Link>
        <Link href="">Approval List</Link>
        <Link href="">Stats Report</Link>
        <Link href="">Sells Report</Link>
        <Link href="">All Items Report</Link>
      </div>
    </Overlay>
  )
}
