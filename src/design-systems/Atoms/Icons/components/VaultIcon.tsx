import { IconProps } from '../interface'

export const VaultIcon: React.FC<IconProps> = ({
  className = '',
  fill = 'none',
  width = '40',
  height = '40',
  stroke = 'black',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 32 32"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M24 25V28" stroke="#141414" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M8 25V28" stroke="#141414" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M27 6H5C4.44772 6 4 6.44772 4 7V24C4 24.5523 4.44772 25 5 25H27C27.5523 25 28 24.5523 28 24V7C28 6.44772 27.5523 6 27 6Z"
        stroke="#141414"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M19 18C20.1046 18 21 17.1046 21 16C21 14.8954 20.1046 14 19 14C17.8954 14 17 14.8954 17 16C17 17.1046 17.8954 18 19 18Z"
        fill="#141414"
      />
      <path d="M19 16H28" stroke="#141414" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M19 21C21.7614 21 24 18.7614 24 16C24 13.2386 21.7614 11 19 11C16.2386 11 14 13.2386 14 16C14 18.7614 16.2386 21 19 21Z"
        stroke="#141414"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}
