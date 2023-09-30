import { useState } from 'react'
import { Switch } from '@headlessui/react'

import { ToggleProps } from './interface'
import { getClassNames } from './utils'

import { Typography } from 'design-systems/Atoms/Typography'

export const Toggle: React.FC<ToggleProps> = ({
  className,
  defaultCheck = false,
  disabled = false,
  label,
  onChange,
}) => {
  const [toggled, setToggled] = useState<boolean>(defaultCheck)
  const [hovered, setHovered] = useState<boolean>(false)
  const [outerClassName, innerClassName, groupClassName, labelClassName] = getClassNames(
    toggled,
    hovered,
    disabled,
    className
  )

  const onToggle = () => {
    if (!disabled) {
      onChange?.(!toggled)
      setToggled(!toggled)
    }
  }

  return (
    <Switch.Group>
      <div className={groupClassName} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <Switch.Label>
          <Typography className={labelClassName} size="small" variant="condensed">
            {label}
          </Typography>
        </Switch.Label>
        <Switch checked={toggled} className={outerClassName} onChange={onToggle}>
          <span className={innerClassName} />
        </Switch>
      </div>
    </Switch.Group>
  )
}
