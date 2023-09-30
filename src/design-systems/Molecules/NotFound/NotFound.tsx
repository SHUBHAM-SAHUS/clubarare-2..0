import { Button, ButtonColor, ButtonVariant } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { classNames } from 'utils'
export interface NotFountProps {
  title?: string
  href?: string
  children?: React.ReactNode
  className?: string
  buttonLabel?: string
  buttonVariant?: ButtonVariant
  buttonColor?: ButtonColor
  buttonAction?: () => void
}
export const NotFound: React.FC<NotFountProps> = ({
  className,
  children,
  buttonLabel,
  buttonVariant = 'outlined',
  buttonColor = 'primary',
  buttonAction,
}) => {
  return (
    <div
      className={classNames(
        'flex min-h-[60vh] items-center justify-center rounded text-center sm:min-w-full',
        className
      )}
    >
      <div className="p-8">
        {children ? (
          children
        ) : (
          <>
            <Typography className="text-paragraph text-neutral-400" variant="condensed">
              No Result Found
            </Typography>
            <Typography className="content-center text-caption text-neutral-400" variant="condensed">
              Sorry, we couldn’t find anything. Try amending your search or filters
            </Typography>

            {buttonLabel && buttonAction && (
              <Button
                className="mx-auto mt-2"
                color={buttonColor}
                type="button"
                variant={buttonVariant}
                onClick={buttonAction}
              >
                {buttonLabel}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
