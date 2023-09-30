import { ListItemProps } from './interface'

import { Typography } from 'design-systems/Atoms/Typography'

export const ListItem: React.FC<ListItemProps> = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between">
      <Typography size="caption" variant="condensed">
        {label}
      </Typography>
      <Typography size="caption" variant="condensed">
        {value}
      </Typography>
    </div>
  )
}
