import { TableProps, TableRow } from './interface'

import { ListIcon, SaleIcon, HandIcon, SwapIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { CLUBRARE_NETWORKS, convertTimeToAgo, formatUnits, getTokenKey, shortWalletAddress } from 'utils'

export const Table: React.FC<TableProps> = ({
  className = '',
  headers,
  rowData,
  networkId = CLUBRARE_NETWORKS.ETHEREUM,
}) => {
  const getFromAddress = (row: TableRow) => {
    if (row.type === 'BID') return row.bidder
    else if (row.type === 'LISTED') return row.seller
    else if (row.type === 'TRANSFER') return row.from
    else if (row.type === 'PURCHASED') return row.seller
  }

  const getToAddress = (row: TableRow) => {
    if (row.type === 'BID') return ''
    else if (row.type === 'LISTED') return ''
    else if (row.type === 'TRANSFER') return row.to
    else if (row.type === 'PURCHASED') return row.buyer
  }

  const getEventIcon = (event: string) => {
    if (event == 'LISTED') return <ListIcon />
    else if (event == 'Sale') return <SaleIcon />
    else if (event == 'Offer' || event == 'BID') return <HandIcon />
    else if (event == 'Transfer') return <SwapIcon />
  }
  return (
    <div className={`w-full overflow-auto ${className}`}>
      <table className="w-full table-auto whitespace-nowrap bg-neutral-800 dark:bg-neutral-300">
        <thead>
          <tr>
            {headers?.map((head, i) => (
              <th className="p-5 text-left" key={i}>
                <Typography
                  className="text-body font-normal leading-paragraph tracking-subtitle text-neutral-400 dark:text-neutral-600"
                  variant="condensed"
                >
                  {' '}
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full">
          {rowData?.map((row, i) => (
            <tr
              className="text-paragraph font-normal leading-paragraph tracking-subtitle text-neutral-100 dark:text-neutral-600"
              key={i}
            >
              <td className="flex p-5">
                {getEventIcon(row?.type)}
                <Typography className="ml-2" variant="condensed">
                  {row?.type}
                </Typography>
              </td>
              <td className="p-5">
                {row.amount && row.erc20Address ? (
                  <Typography variant="condensed">
                    {`${formatUnits(row.amount, getTokenKey(networkId, row.erc20Address))} ${getTokenKey(
                      networkId,
                      row.erc20Address
                    )}`}
                  </Typography>
                ) : (
                  ''
                )}
              </td>
              <td className="p-5">
                <Typography variant="condensed">{shortWalletAddress(getFromAddress(row))}</Typography>
              </td>
              <td className="p-5">
                <Typography variant="condensed">
                  {getToAddress(row) ? shortWalletAddress(getToAddress(row)) : '-'}
                </Typography>
              </td>
              <td className="p-5">
                <Typography variant="condensed">{convertTimeToAgo(new Date(row.time).getTime())}</Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
