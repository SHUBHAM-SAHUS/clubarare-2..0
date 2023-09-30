import { IconProps } from '../interface'

export const StackIcon = ({ className = '', ...props }: IconProps) => (
  <svg
    className={className}
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M2 11L8 14.5L14 11" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    <path d="M2 8L8 11.5L14 8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    <path d="M2 5L8 8.5L14 5L8 1.5L2 5Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
)
