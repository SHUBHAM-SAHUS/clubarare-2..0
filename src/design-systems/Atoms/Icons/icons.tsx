import { CheckIconProps, IconProps, TokenIconProps } from './interface'

export const InfoIcon: React.FC<IconProps> = ({
  className = '',
  fill = 'fill-error-800',
  stroke = 'stroke-error-800',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill="none"
      height="12"
      viewBox="0 0 12 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className={stroke}
        d="M6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path className={stroke} d="M5.625 5.625H6V8.25H6.375" strokeLinecap="round" strokeLinejoin="round" />
      <path
        className={fill}
        d="M5.90625 4.5C6.21691 4.5 6.46875 4.24816 6.46875 3.9375C6.46875 3.62684 6.21691 3.375 5.90625 3.375C5.59559 3.375 5.34375 3.62684 5.34375 3.9375C5.34375 4.24816 5.59559 4.5 5.90625 4.5Z"
      />
    </svg>
  )
}

export const BadgeIcon: React.FC<IconProps> = ({ className, width = '18', height = '18', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      viewBox="0 0 18 18"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.34615 14.6538C2.63846 13.9462 3.10769 12.4615 2.74615 11.5923C2.38462 10.7231 1 9.96154 1 9C1 8.03846 2.36923 7.30769 2.74615 6.40769C3.12308 5.50769 2.63846 4.05385 3.34615 3.34615C4.05385 2.63846 5.53846 3.10769 6.40769 2.74615C7.27692 2.38462 8.03846 1 9 1C9.96154 1 10.6923 2.36923 11.5923 2.74615C12.4923 3.12308 13.9462 2.63846 14.6538 3.34615C15.3615 4.05385 14.8923 5.53846 15.2538 6.40769C15.6154 7.27692 17 8.03846 17 9C17 9.96154 15.6308 10.6923 15.2538 11.5923C14.8769 12.4923 15.3615 13.9462 14.6538 14.6538C13.9462 15.3615 12.4615 14.8923 11.5923 15.2538C10.7231 15.6154 9.96154 17 9 17C8.03846 17 7.30769 15.6308 6.40769 15.2538C5.50769 14.8769 4.05385 15.3615 3.34615 14.6538Z"
        fill="#EAFB06"
        stroke="#EAFB06"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path d="M12.1875 7L8.06016 10.9375L6 8.96875" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
    </svg>
  )
}

export const DefaultProfileIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="38"
      viewBox="0 0 40 38"
      width="40"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 24.5C26.4721 24.5 31.7188 19.2533 31.7188 12.7812C31.7188 6.30916 26.4721 1.0625 20 1.0625C13.5279 1.0625 8.28125 6.30916 8.28125 12.7812C8.28125 19.2533 13.5279 24.5 20 24.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M1.19189 36.0448C2.9553 32.5714 5.64607 29.6541 8.96594 27.6164C12.2858 25.5787 16.1051 24.5 20.0005 24.5C23.8959 24.5 27.7152 25.5787 31.035 27.6164C34.3549 29.6541 37.0457 32.5714 38.8091 36.0448"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const CheckIcon: React.FC<CheckIconProps> = ({
  className = '',
  fill = 'fill-neutral-100',
  border = 'stroke-neutral-100',
  check = 'fill-neutral-800',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect className={fill} height="16" rx="2" width="16" />
      <rect className={border} height="15" rx="1.5" width="15" x="0.5" y="0.5" />
      <mask
        height="10"
        id="mask0_584_68498"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'alpha' }}
        width="12"
        x="2"
        y="3"
      >
        <path
          className={check}
          d="M5.86337 10.5833L3.55004 8.26999C3.42548 8.14516 3.25638 8.075 3.08004 8.075C2.90369 8.075 2.73459 8.14516 2.61004 8.26999C2.35004 8.52999 2.35004 8.94999 2.61004 9.20999L5.39671 11.9967C5.65671 12.2567 6.07671 12.2567 6.33671 11.9967L13.39 4.94332C13.65 4.68332 13.65 4.26332 13.39 4.00332C13.2655 3.87849 13.0964 3.80833 12.92 3.80833C12.7437 3.80833 12.5746 3.87849 12.45 4.00332L5.86337 10.5833Z"
        />
      </mask>
      <g mask="url(#mask0_584_68498)">
        <rect className={check} height="16" width="16" />
      </g>
    </svg>
  )
}

export const PhygitalIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <>
      <svg
        className={className}
        fill="none"
        height="18"
        viewBox="0 0 18 18"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect fill="#0809EC" height="18" rx="9" width="18" />
        <path
          d="M13.7249 11.4267V6.57375C13.7245 6.50365 13.7057 6.43489 13.6702 6.3744C13.6348 6.31391 13.5841 6.26383 13.5231 6.22922L9.19186 3.79289C9.13349 3.75919 9.06729 3.74146 8.9999 3.74146C8.93251 3.74146 8.86631 3.75919 8.80795 3.79289L4.4767 6.22922C4.41574 6.26383 4.36499 6.31391 4.32956 6.3744C4.29413 6.43489 4.27528 6.50365 4.2749 6.57375V11.4267C4.27528 11.4968 4.29413 11.5656 4.32956 11.6261C4.36499 11.6866 4.41574 11.7366 4.4767 11.7712L8.80795 14.2076C8.86631 14.2413 8.93251 14.259 8.9999 14.259C9.06729 14.259 9.13349 14.2413 9.19186 14.2076L13.5231 11.7712C13.5841 11.7366 13.6348 11.6866 13.6702 11.6261C13.7057 11.5656 13.7245 11.4968 13.7249 11.4267V11.4267Z"
          stroke="#E2E2E1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.9"
        />
        <path
          d="M13.6708 6.37201L9.04426 9.00029L4.3291 6.37201"
          stroke="#E2E2E1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.9"
        />
        <path
          d="M9.0443 8.99915L9 14.2557"
          stroke="#E2E2E1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.9"
        />
      </svg>
    </>
  )
}

export const AuthenticationIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <>
      <svg
        className={`${className} stroke-neutral-100 dark:stroke-neutral-800`}
        fill="none"
        height="20"
        viewBox="0 0 16 16"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M2.5 7.16875V3.5C2.5 3.36739 2.55268 3.24021 2.64645 3.14645C2.74021 3.05268 2.86739 3 3 3H13C13.1326 3 13.2598 3.05268 13.3536 3.14645C13.4473 3.24021 13.5 3.36739 13.5 3.5V7.16875C13.5 12.4187 9.04375 14.1562 8.15625 14.45C8.05543 14.4873 7.94457 14.4873 7.84375 14.45C6.95625 14.1562 2.5 12.4187 2.5 7.16875Z"
          fill="#EAFB06"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path d="M10.75 6.5L7.08125 10L5.25 8.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </>
  )
}

export const AuthenticationFailedIcon: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.09375 1.5L13.9062 14.5"
      stroke="#F35858"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M11.7188 12.0938C10.375 13.6313 8.66875 14.2812 8.15625 14.45C8.05543 14.4873 7.94457 14.4873 7.84375 14.45C6.95625 14.1562 2.5 12.4187 2.5 7.16875V3.5C2.5 3.36739 2.55268 3.24021 2.64645 3.14645C2.74021 3.05268 2.86739 3 3 3H3.45625"
      stroke="#F35858"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M6.15625 3H13C13.1326 3 13.2598 3.05268 13.3536 3.14645C13.4473 3.24021 13.5 3.36739 13.5 3.5V7.16875C13.5 8.425 13.2438 9.475 12.8438 10.3562"
      stroke="#F35858"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
)

export const DigitalIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <>
      <svg
        className={className}
        fill="none"
        height="18"
        viewBox="0 0 18 18"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect fill="#EBA013" height="18" rx="9" width="18" />
        <path
          d="M12.9377 4.6687H5.0627C4.84523 4.6687 4.66895 4.84499 4.66895 5.06245V12.9375C4.66895 13.1549 4.84523 13.3312 5.0627 13.3312H12.9377C13.1552 13.3312 13.3314 13.1549 13.3314 12.9375V5.06245C13.3314 4.84499 13.1552 4.6687 12.9377 4.6687Z"
          stroke="#F6F6F6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.75"
        />
        <path
          d="M13.3314 10.5749L11.2495 8.49295C11.2129 8.45575 11.1692 8.42621 11.121 8.40604C11.0729 8.38587 11.0212 8.37549 10.9689 8.37549C10.9167 8.37549 10.865 8.38587 10.8169 8.40604C10.7687 8.42621 10.725 8.45575 10.6884 8.49295L8.49324 10.6881C8.4566 10.7253 8.41293 10.7549 8.36477 10.775C8.3166 10.7952 8.26491 10.8056 8.2127 10.8056C8.16048 10.8056 8.10879 10.7952 8.06062 10.775C8.01246 10.7549 7.96879 10.7253 7.93215 10.6881L6.91824 9.6742C6.8816 9.637 6.83793 9.60746 6.78977 9.58729C6.7416 9.56712 6.68991 9.55674 6.6377 9.55674C6.58548 9.55674 6.53379 9.56712 6.48562 9.58729C6.43746 9.60746 6.39379 9.637 6.35715 9.6742L4.66895 11.3624"
          stroke="#F6F6F6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.75"
        />
        <path
          d="M7.62188 7.8187C7.94807 7.8187 8.2125 7.55427 8.2125 7.22808C8.2125 6.90188 7.94807 6.63745 7.62188 6.63745C7.29568 6.63745 7.03125 6.90188 7.03125 7.22808C7.03125 7.55427 7.29568 7.8187 7.62188 7.8187Z"
          fill="#F6F6F6"
        />
      </svg>
    </>
  )
}

export const PlusIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="32"
      viewBox="0 0 33 32"
      width="33"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5.5 16H27.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M16.5 5V27" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

export const CircleIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-100', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 25 24"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.25 3.81567C18.1168 4.67133 19.6349 6.13967 20.5522 7.97696C21.4695 9.81426 21.7309 11.91 21.293 13.9163C20.8551 15.9227 19.7443 17.7189 18.1448 19.0069C16.5454 20.2949 14.5536 20.9972 12.5 20.9972C10.4464 20.9972 8.45464 20.2949 6.8552 19.0069C5.25577 17.7189 4.14491 15.9227 3.70701 13.9163C3.26911 11.91 3.53051 9.81426 4.44783 7.97696C5.36514 6.13967 6.8832 4.67133 8.75001 3.81567"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const EthereumIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_589_12736)">
        <path
          className="fill-neutral-400 dark:fill-neutral-600"
          d="M9.99819 0L9.86401 0.455773V13.6801L9.99819 13.8139L16.1366 10.1855L9.99819 0Z"
        />
        <path
          className="fill-neutral-500 dark:fill-neutral-600"
          d="M9.9982 0L3.85959 10.1855L9.9982 13.8139V7.39524V0Z"
        />
        <path
          className="fill-neutral-400 dark:fill-neutral-500"
          d="M9.9982 14.9762L9.92258 15.0684V19.7791L9.9982 19.9998L16.1404 11.3495L9.9982 14.9762Z"
        />
        <path
          className="fill-neutral-500 dark:fill-neutral-600"
          d="M9.9982 19.9998V14.9762L3.85959 11.3495L9.9982 19.9998Z"
          fill="#B4B4B4"
        />
        <path
          className="fill-neutral-100 dark:fill-neutral-600"
          d="M9.99826 13.8142L16.1367 10.1857L9.99826 7.39551V13.8142Z"
          fill="#141414"
        />
        <path
          className="fill-neutral-400 dark:fill-neutral-600"
          d="M3.85959 10.1857L9.9982 13.8142V7.39551L3.85959 10.1857Z"
          fill="#595959"
        />
      </g>
      <defs>
        <clipPath id="clip0_589_12736">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const TwitterIcon: React.FC<IconProps> = ({
  className = '',
  width = '24',
  height = '24',
  fill = 'fill-neutral-800 dark:fill-neutral-100',
  rectFill = 'fill-neutral-100 dark:fill-neutral-800',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect className={rectFill} height="24" rx="12" width="24" />
      <path
        className={fill}
        d="M18.3601 8.94005C17.9401 9.12005 17.4601 9.24005 16.9801 9.30005C17.4601 9.00005 17.8801 8.52005 18.0601 7.98005C17.5801 8.28005 17.1001 8.46005 16.5001 8.58005C16.0801 8.10005 15.4201 7.80005 14.7601 7.80005C13.4401 7.80005 12.3601 8.88005 12.3601 10.2C12.3601 10.38 12.3601 10.56 12.4201 10.74C10.4401 10.62 8.64009 9.66005 7.44009 8.22005C7.26009 8.58005 7.14009 9.00005 7.14009 9.42005C7.14009 10.26 7.5601 10.98 8.2201 11.4C7.8001 11.4 7.44009 11.28 7.14009 11.1C7.14009 12.24 7.98009 13.26 9.06009 13.44C8.88009 13.5 8.6401 13.5 8.4001 13.5C8.2201 13.5 8.1001 13.5 7.9201 13.44C8.2201 14.4 9.1201 15.12 10.2001 15.12C9.3601 15.78 8.3401 16.14 7.2001 16.14C7.0201 16.14 6.8401 16.1401 6.6001 16.0801C7.6801 16.7401 8.9401 17.1601 10.3201 17.1601C14.7601 17.1601 17.1601 13.5 17.1601 10.32V10.02C17.6401 9.84005 18.0601 9.42005 18.3601 8.94005Z"
      />
    </svg>
  )
}

export const TelegramIcon: React.FC<IconProps> = ({
  className = '',
  height = '40',
  fill = 'fill-neutral-800 dark:fill-neutral-100',
  rectFill = 'fill-neutral-100 dark:fill-neutral-700',
  width = '41',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      viewBox="0 0 41 40"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect className={rectFill} height="40" rx="20" width="40" x="0.5" />
      <path
        className={fill}
        d="M28.5 12.6022L25.4946 28.2923C25.4946 28.2923 25.0741 29.3801 23.9189 28.8584L16.9846 23.3526L16.9524 23.3364C17.8891 22.4654 25.1524 15.7027 25.4698 15.3961C25.9613 14.9214 25.6562 14.6387 25.0856 14.9974L14.3568 22.053L10.2176 20.6108C10.2176 20.6108 9.56626 20.3708 9.50359 19.8491C9.4401 19.3265 10.2391 19.0439 10.2391 19.0439L27.1131 12.1889C27.1131 12.1889 28.5 11.5579 28.5 12.6022Z"
      />
    </svg>
  )
}

export const LinkedInIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="40"
      viewBox="0 0 41 40"
      width="41"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect className="fill-neutral-100 dark:fill-neutral-700" height="40" rx="20" width="40" x="0.25" />
      <path
        className="fill-neutral-800 dark:fill-neutral-100"
        d="M28.25 20.7444V26.2601H25.0213V21.0807C25.0213 19.8027 24.5504 18.9283 23.407 18.9283C22.5325 18.9283 21.9944 19.5336 21.7926 20.0718C21.7253 20.2735 21.6581 20.5426 21.6581 20.8789V26.2601H18.4294C18.4294 26.2601 18.4966 17.5157 18.4294 16.6413H21.6581V17.9865C22.0617 17.3139 22.8688 16.3722 24.5504 16.3722C26.6356 16.3722 28.25 17.7848 28.25 20.7444ZM15.0661 12C13.9899 12 13.25 12.7399 13.25 13.6816C13.25 14.6233 13.9226 15.3632 14.9989 15.3632C16.1424 15.3632 16.815 14.6233 16.815 13.6816C16.8823 12.6726 16.2096 12 15.0661 12ZM13.4518 26.2601H16.6805V16.6413H13.4518V26.2601Z"
      />
    </svg>
  )
}

export const DiscordIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect className="fill-neutral-100 dark:fill-neutral-700" height="24" rx="12" width="24" />
      <path
        className="fill-neutral-800 dark:fill-neutral-100"
        d="M17.4163 8.41595C16.4255 7.64794 15.2365 7.26396 13.9815 7.19995L13.7833 7.39197C14.9062 7.64794 15.8971 8.15993 16.8218 8.86394C15.6989 8.28794 14.4438 7.90396 13.1227 7.77595C12.7264 7.71194 12.3961 7.71194 11.9998 7.71194C11.6035 7.71194 11.2732 7.71194 10.8769 7.77595C9.55577 7.90396 8.30071 8.28794 7.17778 8.86394C8.10253 8.15993 9.09339 7.64794 10.2163 7.39197L10.0181 7.19995C8.76309 7.26396 7.5741 7.64794 6.58329 8.41595C5.46036 10.464 4.86586 12.768 4.7998 15.1359C5.79061 16.1599 7.17778 16.8 8.63101 16.8C8.63101 16.8 9.09339 16.288 9.42364 15.8399C8.56495 15.648 7.77228 15.1999 7.24384 14.496C7.70622 14.7519 8.16859 15.0079 8.63101 15.1999C9.22551 15.4559 9.82001 15.5839 10.4145 15.712C10.9429 15.7759 11.4714 15.8399 11.9998 15.8399C12.5282 15.8399 13.0567 15.7759 13.5851 15.712C14.1796 15.5839 14.7741 15.4559 15.3686 15.1999C15.831 15.0079 16.2934 14.7519 16.7558 14.496C16.2273 15.1999 15.4347 15.648 14.576 15.8399C14.9062 16.288 15.3686 16.8 15.3686 16.8C16.8218 16.8 18.209 16.1599 19.1998 15.1359C19.1337 12.768 18.5393 10.464 17.4163 8.41595ZM9.82 13.9839C9.15945 13.9839 8.56496 13.4079 8.56496 12.704C8.56496 12 9.15945 11.424 9.82 11.424C10.4806 11.424 11.0751 12 11.0751 12.704C11.0751 13.4079 10.4806 13.9839 9.82 13.9839ZM14.1796 13.9839C13.519 13.9839 12.9246 13.4079 12.9246 12.704C12.9246 12 13.519 11.424 14.1796 11.424C14.8402 11.424 15.4347 12 15.4347 12.704C15.4347 13.4079 14.8402 13.9839 14.1796 13.9839Z"
      />
    </svg>
  )
}

export const MediumIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="fill-neutral-100 dark:fill-neutral-700"
        d="M24 12C24 5.37258 18.6274 0 12 0V0C5.37258 0 0 5.37258 0 12V12C0 18.6274 5.37258 24 12 24V24C18.6274 24 24 18.6274 24 12V12Z"
      />
      <path
        className="fill-neutral-800 dark:fill-neutral-100"
        d="M7.425 9.14995C7.425 8.99995 7.35 8.84995 7.275 8.77495L6.15 7.42495V7.19995H9.6L12.3 13.125L14.7 7.19995H18V7.42495L17.025 8.32495C16.95 8.39995 16.875 8.47495 16.95 8.62495V15.375C16.95 15.45 16.95 15.6 17.025 15.675L17.925 16.575V16.8H13.2V16.575L14.175 15.6C14.25 15.525 14.25 15.45 14.25 15.3V9.82495L11.55 16.65H11.25L8.1 9.82495V14.4C8.1 14.625 8.175 14.775 8.25 14.925L9.525 16.425V16.65H6V16.425L7.275 14.925C7.425 14.775 7.5 14.625 7.425 14.4V9.14995Z"
      />
    </svg>
  )
}

export const ClubrareIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="30"
      viewBox="0 0 30 30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        className="stroke-neutral-100 dark:stroke-neutral-700"
        height="28.4043"
        rx="7.53546"
        strokeWidth="1.59575"
        width="28.4043"
        x="0.797873"
        y="0.797873"
      />
      <path
        className="fill-neutral-100 dark:fill-neutral-700"
        d="M8.12646 12.7098C8.12646 10.1767 10.1799 8.12329 12.713 8.12329V8.12329C13.4729 8.12329 14.089 8.73933 14.089 9.49925V19.0949C14.089 20.7414 12.7542 22.0761 11.1077 22.0761V22.0761C9.46122 22.0761 8.12646 20.7414 8.12646 19.0949V12.7098Z"
      />
      <path
        className="fill-neutral-100 dark:fill-neutral-700"
        d="M15.7163 9.98342C15.7163 12.5679 17.8115 14.6631 20.396 14.6631V14.6631C21.1713 14.6631 21.7999 14.0345 21.7999 13.2592V11.1976C21.7999 9.51765 20.438 8.15579 18.7581 8.15579H17.218C16.3886 8.15579 15.7163 8.82812 15.7163 9.65748V9.98342Z"
      />
      <circle
        className="fill-neutral-100 dark:fill-neutral-700"
        r="3.05691"
        transform="matrix(1 0 0 -1 18.9812 19.0157)"
      />
    </svg>
  )
}

export const ArrowDownIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-100', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="30"
      viewBox="0 0 30 30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M24.375 11.25L15 20.625L5.625 11.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

export const ArrowUpIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-100', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="30"
      viewBox="0 0 30 30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5.625 18.75L15 9.375L24.375 18.75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

export const ArrowLeftIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-100', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M27 16H5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M14 7L5 16L14 25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

export const ArrowRightIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-100', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3.75 12H20.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M13.5 5.25L20.25 12L13.5 18.75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

export const ChartLineUpIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-100', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M21 19.5H3V4.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M19.5 6L12 13.5L9 10.5L3 16.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M19.5 9.75V6H15.75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

export const PencilIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-100', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.5875 27H6.00001C5.73479 27 5.48044 26.8947 5.2929 26.7071C5.10536 26.5196 5.00001 26.2652 5.00001 26V20.4125C4.99955 20.2827 5.02471 20.154 5.07404 20.0339C5.12338 19.9138 5.19591 19.8046 5.28751 19.7125L20.2875 4.71251C20.3806 4.61803 20.4915 4.54299 20.6138 4.49178C20.7361 4.44056 20.8674 4.41418 21 4.41418C21.1326 4.41418 21.2639 4.44056 21.3862 4.49178C21.5085 4.54299 21.6195 4.61803 21.7125 4.71251L27.2875 10.2875C27.382 10.3806 27.457 10.4915 27.5082 10.6138C27.5595 10.7361 27.5858 10.8674 27.5858 11C27.5858 11.1326 27.5595 11.2639 27.5082 11.3862C27.457 11.5086 27.382 11.6195 27.2875 11.7125L12.2875 26.7125C12.1955 26.8041 12.0863 26.8766 11.9661 26.926C11.846 26.9753 11.7174 27.0005 11.5875 27V27Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M17 8L24 15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M20.5 11.5L8.5 23.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M11.9375 26.9375L5.0625 20.0625" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

export const InstagramIcon: React.FC<IconProps> = ({
  className,
  height = '24',
  width = '24',
  fill = 'fill-neutral-100 dark:fill-neutral-800',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 30 30"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect className="fill-neutral-100 dark:fill-neutral-800" height="30" rx="15" width="30" />
      <path
        className="fill-neutral-800 dark:fill-neutral-100"
        d="M15 8.85542C16.988 8.85542 17.259 8.85542 18.0723 8.85542C18.7952 8.85542 19.1566 9.03614 19.4277 9.12651C19.7892 9.30723 20.0602 9.39759 20.3313 9.66868C20.6024 9.93976 20.7831 10.2108 20.8735 10.5723C20.9639 10.8434 21.0542 11.2048 21.1446 11.9277C21.1446 12.741 21.1446 12.9217 21.1446 15C21.1446 17.0783 21.1446 17.259 21.1446 18.0723C21.1446 18.7952 20.9639 19.1566 20.8735 19.4277C20.6928 19.7892 20.6024 20.0602 20.3313 20.3313C20.0602 20.6024 19.7892 20.7831 19.4277 20.8735C19.1566 20.9639 18.7952 21.0542 18.0723 21.1446C17.259 21.1446 17.0783 21.1446 15 21.1446C12.9217 21.1446 12.741 21.1446 11.9277 21.1446C11.2048 21.1446 10.8434 20.9639 10.5723 20.8735C10.2108 20.6928 9.93976 20.6024 9.66868 20.3313C9.39759 20.0602 9.21687 19.7892 9.12651 19.4277C9.03614 19.1566 8.94578 18.7952 8.85542 18.0723C8.85542 17.259 8.85542 17.0783 8.85542 15C8.85542 12.9217 8.85542 12.741 8.85542 11.9277C8.85542 11.2048 9.03614 10.8434 9.12651 10.5723C9.30723 10.2108 9.39759 9.93976 9.66868 9.66868C9.93976 9.39759 10.2108 9.21687 10.5723 9.12651C10.8434 9.03614 11.2048 8.94578 11.9277 8.85542C12.741 8.85542 13.012 8.85542 15 8.85542ZM15 7.5C12.9217 7.5 12.741 7.5 11.9277 7.5C11.1145 7.5 10.5723 7.68072 10.1205 7.86145C9.66868 8.04217 9.21687 8.31325 8.76506 8.76506C8.31325 9.21687 8.13253 9.57831 7.86145 10.1205C7.68072 10.5723 7.59036 11.1145 7.5 11.9277C7.5 12.741 7.5 13.012 7.5 15C7.5 17.0783 7.5 17.259 7.5 18.0723C7.5 18.8855 7.68072 19.4277 7.86145 19.8795C8.04217 20.3313 8.31325 20.7831 8.76506 21.2349C9.21687 21.6867 9.57831 21.8675 10.1205 22.1386C10.5723 22.3193 11.1145 22.4096 11.9277 22.5C12.741 22.5 13.012 22.5 15 22.5C16.988 22.5 17.259 22.5 18.0723 22.5C18.8855 22.5 19.4277 22.3193 19.8795 22.1386C20.3313 21.9578 20.7831 21.6867 21.2349 21.2349C21.6867 20.7831 21.8675 20.4217 22.1386 19.8795C22.3193 19.4277 22.4096 18.8855 22.5 18.0723C22.5 17.259 22.5 16.988 22.5 15C22.5 13.012 22.5 12.741 22.5 11.9277C22.5 11.1145 22.3193 10.5723 22.1386 10.1205C21.9578 9.66868 21.6867 9.21687 21.2349 8.76506C20.7831 8.31325 20.4217 8.13253 19.8795 7.86145C19.4277 7.68072 18.8855 7.59036 18.0723 7.5C17.259 7.5 17.0783 7.5 15 7.5Z"
      />
      <path
        className="fill-neutral-800 dark:fill-neutral-100"
        d="M15 11.1145C12.8313 11.1145 11.1145 12.8313 11.1145 15C11.1145 17.1687 12.8313 18.8855 15 18.8855C17.1687 18.8855 18.8855 17.1687 18.8855 15C18.8855 12.8313 17.1687 11.1145 15 11.1145ZM15 17.5301C13.6446 17.5301 12.4699 16.4458 12.4699 15C12.4699 13.6446 13.5542 12.4699 15 12.4699C16.3554 12.4699 17.5301 13.5542 17.5301 15C17.5301 16.3554 16.3554 17.5301 15 17.5301Z"
      />
      <path
        className="fill-neutral-800 dark:fill-neutral-100"
        d="M18.9759 11.9277C19.475 11.9277 19.8795 11.5231 19.8795 11.0241C19.8795 10.525 19.475 10.1205 18.9759 10.1205C18.4769 10.1205 18.0723 10.525 18.0723 11.0241C18.0723 11.5231 18.4769 11.9277 18.9759 11.9277Z"
      />
    </svg>
  )
}

export const YoutubeIcon: React.FC<IconProps> = ({
  className,
  width = '24',
  height = '24',
  fill = 'fill-neutral-800 dark:fill-neutral-100',
  ...props
}) => {
  return (
    <svg
      fill={fill}
      height={height}
      viewBox="0 0 30 30"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className}
    >
      <rect className="fill-neutral-100 dark:fill-neutral-800" height="30" rx="15" width="30" />
      <path
        className={fill}
        clipRule="evenodd"
        d="M8.44687 20.2926C8.15267 20.2056 7.88424 20.0507 7.66422 19.8411C7.4442 19.6316 7.27905 19.3734 7.18271 19.0884C6.63219 17.6155 6.46907 11.4652 7.52933 10.2511C7.88221 9.85609 8.38042 9.61291 8.91583 9.57432C11.7602 9.27576 20.5481 9.31557 21.5574 9.67384C21.8413 9.76374 22.1006 9.91519 22.316 10.1168C22.5314 10.3185 22.6973 10.5651 22.8012 10.8382C23.4027 12.3609 23.423 17.8942 22.7196 19.3571C22.533 19.7379 22.2206 20.0464 21.8327 20.2329C20.7724 20.7504 9.85375 20.7405 8.44687 20.2926ZM12.9632 17.4065L18.0606 14.819L12.9632 12.2116V17.4065Z"
        fillRule="evenodd"
      />
    </svg>
  )
}

export const EyeIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-400', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 4.375C3.75 4.375 1.25 10 1.25 10C1.25 10 3.75 15.625 10 15.625C16.25 15.625 18.75 10 18.75 10C18.75 10 16.25 4.375 10 4.375Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M10 13.125C11.7259 13.125 13.125 11.7259 13.125 10C13.125 8.27411 11.7259 6.875 10 6.875C8.27411 6.875 6.875 8.27411 6.875 10C6.875 11.7259 8.27411 13.125 10 13.125Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export const HeartIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-400', fill = 'none', ...props }) => {
  return (
    <svg className={className} fill={fill} viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9 14.875C9 14.875 1.1875 10.5 1.1875 5.18751C1.1875 4.24836 1.51289 3.33821 2.1083 2.61193C2.70371 1.88564 3.53236 1.38808 4.45328 1.2039C5.37419 1.01971 6.33047 1.16029 7.15943 1.6017C7.98838 2.04311 8.63879 2.7581 9 3.62501V3.62501C9.36121 2.7581 10.0116 2.04311 10.8406 1.6017C11.6695 1.16029 12.6258 1.01971 13.5467 1.2039C14.4676 1.38808 15.2963 1.88564 15.8917 2.61193C16.4871 3.33821 16.8125 4.24836 16.8125 5.18751C16.8125 10.5 9 14.875 9 14.875Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export const CaretDoubleDownIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-400', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13 8L8 13L3 8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M13 3L8 8L3 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

export const CaretDoubleUpIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-400', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 13L8 8L13 13" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M3 8L8 3L13 8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

export const SearchIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="22"
      viewBox="0 0 22 22"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14.2083 12.8333H13.4842L13.2275 12.5858C14.1258 11.5408 14.6667 10.1842 14.6667 8.70833C14.6667 5.4175 11.9992 2.75 8.70833 2.75C5.4175 2.75 2.75 5.4175 2.75 8.70833C2.75 11.9992 5.4175 14.6667 8.70833 14.6667C10.1842 14.6667 11.5408 14.1258 12.5858 13.2275L12.8333 13.4842V14.2083L17.4167 18.7825L18.7825 17.4167L14.2083 12.8333ZM8.70833 12.8333C6.42583 12.8333 4.58333 10.9908 4.58333 8.70833C4.58333 6.42583 6.42583 4.58333 8.70833 4.58333C10.9908 4.58333 12.8333 6.42583 12.8333 8.70833C12.8333 10.9908 10.9908 12.8333 8.70833 12.8333Z" />
    </svg>
  )
}

export const CopyIcon: React.FC<IconProps> = ({ className, width = '24', height = '24', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15.75 15.75H20.25V3.75H8.25V8.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M15.75 8.25H3.75V20.25H15.75V8.25Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

export const RewardsCoinsIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-400', ...props }) => {
  return (
    <svg
      className={`h-5 w-5 ${className} `}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.5 9.375C10.9518 9.375 13.75 8.1158 13.75 6.5625C13.75 5.0092 10.9518 3.75 7.5 3.75C4.04822 3.75 1.25 5.0092 1.25 6.5625C1.25 8.1158 4.04822 9.375 7.5 9.375Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M1.25 6.5625V9.6875C1.25 11.2422 4.04687 12.5 7.5 12.5C10.9531 12.5 13.75 11.2422 13.75 9.6875V6.5625"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M5 9.14062V12.2656"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M13.75 7.55469C16.6016 7.82031 18.75 8.95313 18.75 10.3125C18.75 11.8672 15.9531 13.125 12.5 13.125C10.9687 13.125 9.5625 12.875 8.47656 12.4688"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M6.25 12.4453V13.4375C6.25 14.9922 9.04687 16.25 12.5 16.25C15.9531 16.25 18.75 14.9922 18.75 13.4375V10.3125"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M15 12.8906V16.0156"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M10 9.14062V16.0156"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export const BinocularsIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-400', ...props }) => {
  return (
    <svg
      className={`h-5 w-5 ${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.125 7.1875H11.875"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M17.9375 12.0547L14.5234 4.29693C14.1709 3.94818 13.6951 3.75256 13.1992 3.75256C12.7033 3.75256 12.2275 3.94818 11.875 4.29693V13.1251"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M8.125 13.1251V4.29693C7.7725 3.94818 7.29665 3.75256 6.80078 3.75256C6.30491 3.75256 5.82906 3.94818 5.47656 4.29693L2.0625 12.0547"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M5 16.25C6.72589 16.25 8.125 14.8509 8.125 13.125C8.125 11.3991 6.72589 10 5 10C3.27411 10 1.875 11.3991 1.875 13.125C1.875 14.8509 3.27411 16.25 5 16.25Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M15 16.25C16.7259 16.25 18.125 14.8509 18.125 13.125C18.125 11.3991 16.7259 10 15 10C13.2741 10 11.875 11.3991 11.875 13.125C11.875 14.8509 13.2741 16.25 15 16.25Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export const DotsThreeVerticalIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M16 17.5C16.8284 17.5 17.5 16.8284 17.5 16C17.5 15.1716 16.8284 14.5 16 14.5C15.1716 14.5 14.5 15.1716 14.5 16C14.5 16.8284 15.1716 17.5 16 17.5Z" />
      <path d="M16 9.5C16.8284 9.5 17.5 8.82843 17.5 8C17.5 7.17157 16.8284 6.5 16 6.5C15.1716 6.5 14.5 7.17157 14.5 8C14.5 8.82843 15.1716 9.5 16 9.5Z" />
      <path d="M16 25.5C16.8284 25.5 17.5 24.8284 17.5 24C17.5 23.1716 16.8284 22.5 16 22.5C15.1716 22.5 14.5 23.1716 14.5 24C14.5 24.8284 15.1716 25.5 16 25.5Z" />
    </svg>
  )
}

export const ThemeIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M27 14V8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M30 11H24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M21 3V7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M23 5H19" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M27.0877 19.0746C25.1243 19.6252 23.0498 19.6432 21.0772 19.1269C19.1046 18.6106 17.305 17.5785 15.8631 16.1366C14.4213 14.6948 13.3892 12.8952 12.8729 10.9226C12.3566 8.94994 12.3746 6.87545 12.9252 4.91211C10.9895 5.45087 9.22875 6.48739 7.81833 7.9184C6.40791 9.34942 5.39704 11.125 4.88639 13.0683C4.37574 15.0115 4.38315 17.0547 4.90787 18.9942C5.43259 20.9337 6.45631 22.7019 7.87706 24.1227C9.29781 25.5435 11.066 26.5672 13.0055 27.0919C14.9451 27.6166 16.9882 27.624 18.9315 27.1134C20.8748 26.6027 22.6503 25.5918 24.0814 24.1814C25.5124 22.771 26.5489 21.0103 27.0877 19.0746V19.0746Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const AGOVIcon: React.FC<TokenIconProps> = ({ className = '', isActive = false, ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12.5064 10.0391C12.3742 10.0391 12.267 10.1462 12.267 10.2785V14.1583C12.267 14.2905 12.3742 14.3977 12.5064 14.3977H17.8994C17.9011 14.3977 17.9022 14.3994 17.9015 14.4009C17.901 14.4019 17.9013 14.4029 17.9019 14.4035C17.9025 14.404 17.9033 14.4043 17.9042 14.4041L17.9142 14.4011C17.9188 14.3998 17.9233 14.4029 17.9232 14.4077C17.8852 16.0518 16.7139 19.6015 12.3657 20.9989C12.2141 21.0477 12.06 20.9332 12.06 20.7739V18.3734C12.06 18.2412 11.9523 18.1345 11.8202 18.1297C8.37779 18.0035 5.62578 15.1731 5.62578 11.6998C5.62578 8.14632 8.50647 5.26562 12.06 5.26562C14.9301 5.26562 17.3613 7.14486 18.1903 9.74C18.2381 9.88982 18.1236 10.0391 17.9663 10.0391H12.5064Z"
        fill="url(#paint0_linear_566_10840)"
        fillRule="evenodd"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_566_10840"
          x1="3.83042"
          x2="18.9726"
          y1="2.75312"
          y2="21.5461"
        >
          <stop stopColor={isActive ? '#10B2F0' : '#C4C4C4'} />
          <stop offset="0.0625" stopColor={isActive ? '#1EA8EC' : '#C4C4C4'} />
          <stop offset="0.125" stopColor={isActive ? '#2D9EE9' : '#C4C4C4'} />
          <stop offset="0.1875" stopColor={isActive ? '#3B94E5' : '#C4C4C4'} />
          <stop offset="0.25" stopColor={isActive ? '#498BE1' : '#C4C4C4'} />
          <stop offset="0.3125" stopColor={isActive ? '#5881DD' : '#C4C4C4'} />
          <stop offset="0.375" stopColor={isActive ? '#6677DA' : '#C4C4C4'} />
          <stop offset="0.4375" stopColor={isActive ? '#746DD6' : '#C4C4C4'} />
          <stop offset="0.5" stopColor={isActive ? '#8363D2' : '#C4C4C4'} />
          <stop offset="0.5625" stopColor={isActive ? '#9159CE' : '#C4C4C4'} />
          <stop offset="0.625" stopColor={isActive ? '#9F4FCB' : '#C4C4C4'} />
          <stop offset="0.6875" stopColor={isActive ? '#AD45C7' : '#C4C4C4'} />
          <stop offset="0.75" stopColor={isActive ? '#BC3CC3' : '#C4C4C4'} />
          <stop offset="0.8125" stopColor={isActive ? '#CA32BF' : '#C4C4C4'} />
          <stop offset="0.875" stopColor={isActive ? '#D828BC' : '#C4C4C4'} />
          <stop offset="0.9375" stopColor={isActive ? '#E71EB8' : '#C4C4C4'} />
          <stop offset="1" stopColor={isActive ? '#F514B4' : '#C4C4C4'} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const MPWRIcon: React.FC<TokenIconProps> = ({ className = '', isActive = false, ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="26"
      viewBox="0 0 26 26"
      width="26"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="12.9821"
        cy="13.028"
        fill={isActive ? '#141414' : '#B4B4B4'}
        r="11.43"
        stroke={isActive ? '#141414' : '#B4B4B4'}
        strokeWidth="1.2"
      />
      <path
        d="M18.2968 13.3428C18.2968 12.9739 17.9978 12.6749 17.629 12.6749H14.0111C13.4319 12.6749 12.9624 13.1445 12.9624 13.7237V14.2426C12.9624 14.8218 13.4319 15.2914 14.0111 15.2914H14.8206C14.9969 15.2914 15.127 15.3814 15.1847 15.4812C15.2359 15.5698 15.2383 15.6727 15.1414 15.7759C15.1195 15.7993 15.0973 15.8222 15.0747 15.8449C14.7965 16.1231 14.4662 16.3437 14.1028 16.4943C13.7393 16.6448 13.3497 16.7223 12.9563 16.7223C12.5629 16.7223 12.1733 16.6448 11.8099 16.4943C11.4464 16.3437 11.1162 16.1231 10.838 15.8449C10.5598 15.5667 10.3391 15.2364 10.1886 14.873C10.1274 14.7254 10.0783 14.5734 10.0416 14.4187C9.92305 13.9196 9.50261 13.4425 8.91175 13.4425H8.65845C8.09311 13.4425 7.57639 13.9124 7.67056 14.5311C7.7353 14.9564 7.85128 15.3733 8.01667 15.7726C8.28536 16.4213 8.67919 17.0107 9.17567 17.5072C9.67215 18.0036 10.2616 18.3975 10.9102 18.6662C11.5589 18.9349 12.2542 19.0732 12.9563 19.0732C13.6584 19.0732 14.3537 18.9349 15.0024 18.6662C15.6511 18.3975 16.2405 18.0036 16.737 17.5072C17.2334 17.0107 17.6273 16.4213 17.896 15.7726C18.1642 15.1249 18.3025 14.4308 18.3029 13.7298C18.303 13.7094 18.3008 13.6894 18.2968 13.6702V13.3428ZM18.0158 14.0106C18.0142 14.0106 18.0126 14.0106 18.0109 14.0105L18.0158 14.0106Z"
        fill={isActive ? '#0EB3F1' : '#F6F6F6'}
        stroke={isActive ? '#0EB3F1' : '#F6F6F6'}
        strokeWidth="0.568081"
      />
      <path
        d="M8.89894 8.0051C9.20711 7.78928 9.59224 8.03251 9.59224 8.38747V9.10445C9.59224 9.36792 9.37866 9.5815 9.11519 9.5815H8.30123C8.11957 9.5815 7.9702 9.48376 7.89595 9.34685C7.82088 9.20843 7.82403 9.03155 7.94218 8.8864C8.1632 8.61485 8.42383 8.36331 8.7193 8.13675C8.77795 8.09178 8.83785 8.04788 8.89894 8.0051Z"
        fill={isActive ? '#0EB3F1' : '#F6F6F6'}
        stroke={isActive ? '#0EB3F1' : '#F6F6F6'}
        strokeWidth="0.18936"
      />
      <path
        d="M14.1055 8.11532C14.1055 7.69297 14.4479 7.35059 14.8702 7.35059H15.4797C15.9021 7.35059 16.2445 7.69297 16.2445 8.11532V9.91778C16.2445 10.3401 15.9021 10.6825 15.4797 10.6825H14.8702C14.4479 10.6825 14.1055 10.3401 14.1055 9.91778V8.11532Z"
        fill={isActive ? '#0EB3F1' : '#F6F6F6'}
      />
      <path
        clipRule="evenodd"
        d="M14.8701 7.16113H15.4797C16.0066 7.16113 16.4337 7.58829 16.4337 8.11522V9.91768C16.4337 10.4446 16.0066 10.8718 15.4797 10.8718H14.8701C14.3432 10.8718 13.916 10.4446 13.916 9.91768V8.11522C13.916 7.58829 14.3432 7.16113 14.8701 7.16113ZM14.8701 7.35049C14.4478 7.35049 14.1054 7.69288 14.1054 8.11522V9.91768C14.1054 10.34 14.4478 10.6824 14.8701 10.6824H15.4797C15.902 10.6824 16.2444 10.34 16.2444 9.91768V8.11522C16.2444 7.69288 15.902 7.35049 15.4797 7.35049H14.8701Z"
        fill={isActive ? '#0EB3F1' : '#F6F6F6'}
        fillRule="evenodd"
      />
      <path
        d="M11.5719 7.25591C11.0972 7.25591 10.7124 7.64068 10.7124 8.11532V8.72487C10.7124 9.19951 11.0972 9.58428 11.5719 9.58428H12.0169C12.4915 9.58428 12.8763 9.19951 12.8763 8.72487V8.11532C12.8763 7.64068 12.4915 7.25591 12.0169 7.25591H11.5719Z"
        fill={isActive ? '#0EB3F1' : '#F6F6F6'}
        stroke={isActive ? '#0EB3F1' : '#F6F6F6'}
        strokeWidth="0.18936"
      />
    </svg>
  )
}

export const ClubrareNavBarIcon: React.FC<IconProps> = ({
  className = 'stroke-brand-800 fill-brand-800 dark:stroke-neutral-100 dark:fill-neutral-100',
  ...props
}) => {
  return (
    <svg
      className={`sm:h-8 sm:w-8 ${className}`}
      fill="none"
      height="30"
      viewBox="0 0 30 30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        className="stroke-neutral-100 dark:stroke-neutral-700"
        fill="currentColor"
        height="28.4043"
        rx="7.53546"
        strokeWidth="1.59575"
        width="28.4043"
        x="0.797873"
        y="0.797873"
      />
      <path
        className={className}
        d="M8.12646 12.7098C8.12646 10.1767 10.1799 8.12329 12.713 8.12329V8.12329C13.4729 8.12329 14.089 8.73933 14.089 9.49925V19.0949C14.089 20.7414 12.7542 22.0761 11.1077 22.0761V22.0761C9.46122 22.0761 8.12646 20.7414 8.12646 19.0949V12.7098Z"
        fill="currentColor"
        stroke="currentColor"
      />
      <path
        className={className}
        d="M15.7163 9.98342C15.7163 12.5679 17.8115 14.6631 20.396 14.6631V14.6631C21.1713 14.6631 21.7999 14.0345 21.7999 13.2592V11.1976C21.7999 9.51765 20.438 8.15579 18.7581 8.15579H17.218C16.3886 8.15579 15.7163 8.82812 15.7163 9.65748V9.98342Z"
        fill="currentColor"
        stroke="currentColor"
      />
      <circle
        className={className}
        fill="currentColor"
        r="3.05691"
        stroke="currentColor"
        transform="matrix(1 0 0 -1 18.9812 19.0157)"
      />
    </svg>
  )
}

export const TickIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="12"
      viewBox="0 0 16 12"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="stroke-neutral-100 dark:stroke-neutral-700"
        d="M14.875 1.625L6.125 10.375L1.75 6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const SliderHorizontalIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M18.5 21.5H5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M27 21.5H23.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M21 24C22.3807 24 23.5 22.8807 23.5 21.5C23.5 20.1193 22.3807 19 21 19C19.6193 19 18.5 20.1193 18.5 21.5C18.5 22.8807 19.6193 24 21 24Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M10.5 10.5H5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M27 10.5H15.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M13 13C14.3807 13 15.5 11.8807 15.5 10.5C15.5 9.11929 14.3807 8 13 8C11.6193 8 10.5 9.11929 10.5 10.5C10.5 11.8807 11.6193 13 13 13Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const PowerIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="stroke-neutral-400 dark:stroke-neutral-600"
        d="M12 4.5V11.625"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="stroke-neutral-400 dark:stroke-neutral-600"
        d="M16.5 5.08008C17.9906 6.05015 19.1278 7.47593 19.7422 9.14492C20.3565 10.8139 20.4151 12.6367 19.9091 14.3417C19.4032 16.0467 18.3598 17.5425 16.9346 18.6063C15.5093 19.67 13.7785 20.2447 12 20.2447C10.2215 20.2447 8.49069 19.67 7.06543 18.6063C5.64017 17.5425 4.59682 16.0467 4.09088 14.3417C3.58494 12.6367 3.6435 10.8139 4.25784 9.14492C4.87218 7.47593 6.0094 6.05015 7.5 5.08008"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export const USDTIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_757_9700)">
        <path
          className="fill-neutral-100 dark:fill-neutral-700"
          d="M10 0C15.5226 0 20 4.4774 20 10C20 15.5226 15.5224 20 10 20C4.4776 20 0 15.5238 0 10C0 4.4762 4.4768 0 10 0Z"
        />
        <path
          className="fill-neutral-700 dark:fill-neutral-100"
          d="M11.2342 8.6676V7.18H14.636V4.9134H5.3728V7.18H8.775V8.6664C6.01 8.7934 3.931 9.341 3.931 9.997C3.931 10.653 6.011 11.2006 8.775 11.3284V16.0934H11.235V11.328C13.995 11.2006 16.0698 10.6534 16.0698 9.998C16.0698 9.3426 13.995 8.7954 11.235 8.668M11.235 10.9244V10.9232C11.1656 10.9276 10.809 10.949 10.015 10.949C9.3802 10.949 8.9336 10.931 8.7762 10.9228V10.9248C6.3334 10.8166 4.51 10.3912 4.51 9.8822C4.51 9.3732 6.3336 8.9484 8.7762 8.84V10.501C8.9362 10.512 9.3938 10.539 10.0254 10.539C10.784 10.539 11.1654 10.5074 11.2354 10.501V8.84C13.6734 8.9486 15.4926 9.3744 15.4926 9.8816C15.4926 10.3888 13.6726 10.8148 11.2354 10.9234"
        />
      </g>
      <defs>
        <clipPath id="clip0_757_9700">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const WETHIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_2075_10710)">
        <path
          className="fill-neutral-200 dark:fill-neutral-600"
          d="M9.88629 -0.00182915L9.75211 0.453944V13.6783L9.88629 13.8121L16.0247 10.1836L9.88629 -0.00182915Z"
        />
        <path d="M9.88678 -0.00183296L3.74817 10.1836L9.88678 13.8121V7.3934V-0.00183296Z" fill="#ED84B1" />
        <path
          className="fill-neutral-200 dark:fill-neutral-500"
          d="M9.88648 14.9755L9.81085 15.0677V19.7784L9.88648 19.9991L16.0287 11.3489L9.88648 14.9755Z"
        />
        <path d="M9.88669 19.9991V14.9755L3.74808 11.3489L9.88669 19.9991Z" fill="#ED84B1" />
        <path
          className="fill-neutral-100 dark:fill-neutral-600"
          d="M9.8877 13.8125L16.0261 10.184L9.8877 7.39379V13.8125Z"
        />
        <path d="M3.74808 10.184L9.88669 13.8125V7.39379L3.74808 10.184Z" fill="#DD5182" />
      </g>
      <defs>
        <clipPath id="clip0_2075_10710">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const KlayIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="fill-neutral-100 dark:fill-neutral-700"
        d="M10.4739 9.94937L17.3068 16.8182C20.8978 12.961 20.8978 6.93772 17.3068 3.08051"
      />
      <path
        className="fill-neutral-100 dark:fill-neutral-700"
        d="M9.97495 10.4041L3.24203 17.1716L9.97495 20L16.7079 17.1716"
      />
      <path
        className="fill-neutral-100 dark:fill-neutral-700"
        d="M9.72597 9.69722L16.7089 2.67646L10.274 0L3.89005 15.6071L9.72597 9.69722Z"
      />
      <path
        className="fill-neutral-100 dark:fill-neutral-700"
        d="M4.98706e-05 9.94936C-0.00495006 12.5043 0.959037 14.963 2.69301 16.8182L9.37593 0.504303"
      />
    </svg>
  )
}

export const CloseIcon: React.FC<IconProps> = ({ className = '', stroke = '#595959', ...props }) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.8014 5.25L5.43408 18.75"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M18.8014 18.75L5.43408 5.25"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}
export const SwapIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="32"
      viewBox="0 0 33 32"
      width="33"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="stroke-neutral-400 dark:stroke-neutral-500"
        d="M20.5 22L20.5 6C20.5 5.73478 20.3946 5.48043 20.2071 5.29289C20.0196 5.10536 19.7652 5 19.5 5L6.5 5C6.23478 5 5.98043 5.10536 5.79289 5.29289C5.60536 5.48043 5.5 5.73478 5.5 6L5.5 20C5.5 20.2652 5.60536 20.5196 5.79289 20.7071C5.98043 20.8946 6.23478 21 6.5 21L7.5 21"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        className="stroke-neutral-400 dark:stroke-neutral-500"
        d="M17.5 19L20.5 22L23.5 19"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        className="stroke-neutral-400 dark:stroke-neutral-500"
        d="M12.5 10L12.5 26C12.5 26.2652 12.6054 26.5196 12.7929 26.7071C12.9804 26.8946 13.2348 27 13.5 27L26.5 27C26.7652 27 27.0196 26.8946 27.2071 26.7071C27.3946 26.5196 27.5 26.2652 27.5 26L27.5 12C27.5 11.7348 27.3946 11.4804 27.2071 11.2929C27.0196 11.1054 26.7652 11 26.5 11L25.5 11"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        className="stroke-neutral-400 dark:stroke-neutral-500"
        d="M15.5 13L12.5 10L9.5 13"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}
export const SaleIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="stroke-neutral-100 dark:stroke-neutral-600"
        d="M11.503 2.42804L3.93741 3.93741L2.42804 11.503C2.40439 11.6238 2.41083 11.7486 2.4468 11.8663C2.48277 11.984 2.54716 12.0911 2.63429 12.178L12.4218 21.9655C12.4908 22.0361 12.5732 22.0922 12.6641 22.1305C12.7551 22.1688 12.8528 22.1885 12.9515 22.1885C13.0502 22.1885 13.1479 22.1688 13.2388 22.1305C13.3298 22.0922 13.4122 22.0361 13.4812 21.9655L21.9655 13.4812C22.0361 13.4122 22.0922 13.3298 22.1305 13.2388C22.1688 13.1479 22.1885 13.0502 22.1885 12.9515C22.1885 12.8528 22.1688 12.7551 22.1305 12.6641C22.0922 12.5732 22.0361 12.4908 21.9655 12.4218L12.178 2.63429C12.0911 2.54716 11.984 2.48277 11.8663 2.4468C11.7486 2.41083 11.6238 2.40439 11.503 2.42804V2.42804Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        className="fill-neutral-100 dark:fill-neutral-600"
        d="M7.875 9C8.49632 9 9 8.49632 9 7.875C9 7.25368 8.49632 6.75 7.875 6.75C7.25368 6.75 6.75 7.25368 6.75 7.875C6.75 8.49632 7.25368 9 7.875 9Z"
      />
    </svg>
  )
}

export const ListIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={`stroke-neutral-100 dark:stroke-neutral-600 ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 12H20.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M12 6H20.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M12 18H20.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M8.625 4.5L5.37187 7.5L3.75 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M8.625 10.5L5.37187 13.5L3.75 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M8.625 16.5L5.37187 19.5L3.75 18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

export const HandIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={`stroke-neutral-100 dark:stroke-neutral-600 ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.7502 11.25V6.375C15.7502 5.87772 15.9477 5.40081 16.2994 5.04917C16.651 4.69754 17.1279 4.5 17.6252 4.5C18.1225 4.5 18.5994 4.69754 18.951 5.04917C19.3027 5.40081 19.5002 5.87772 19.5002 6.375V14.25C19.5002 15.2349 19.3062 16.2102 18.9293 17.1201C18.5524 18.0301 17.9999 18.8569 17.3035 19.5533C16.6071 20.2497 15.7803 20.8022 14.8703 21.1791C13.9604 21.556 12.9851 21.75 12.0002 21.75C7.85645 21.75 6.0002 19.5 2.94395 13.0594C2.69531 12.628 2.62822 12.1155 2.75745 11.6346C2.88667 11.1538 3.20162 10.744 3.63301 10.4953C4.06441 10.2467 4.5769 10.1796 5.05776 10.3088C5.53861 10.438 5.94844 10.753 6.19708 11.1844L8.2502 14.7469V4.875C8.2502 4.37772 8.44775 3.90081 8.79938 3.54917C9.15101 3.19754 9.62792 3 10.1252 3C10.6225 3 11.0994 3.19754 11.451 3.54917C11.8027 3.90081 12.0002 4.37772 12.0002 4.875V11.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M15.75 6.375V3.375C15.75 2.87772 15.5525 2.40081 15.2008 2.04917C14.8492 1.69754 14.3723 1.5 13.875 1.5C13.3777 1.5 12.9008 1.69754 12.5492 2.04917C12.1975 2.40081 12 2.87772 12 3.375V4.875"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const BookIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="32"
      viewBox="0 0 33 32"
      width="33"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.5 11C16.5 9.93913 16.9214 8.92172 17.6716 8.17157C18.4217 7.42143 19.4391 7 20.5 7H28.5C28.7652 7 29.0196 7.10536 29.2071 7.29289C29.3946 7.48043 29.5 7.73478 29.5 8V24C29.5 24.2652 29.3946 24.5196 29.2071 24.7071C29.0196 24.8946 28.7652 25 28.5 25H20.5C19.4391 25 18.4217 25.4214 17.6716 26.1716C16.9214 26.9217 16.5 27.9391 16.5 29"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M3.5 24C3.5 24.2652 3.60536 24.5196 3.79289 24.7071C3.98043 24.8946 4.23478 25 4.5 25H12.5C13.5609 25 14.5783 25.4214 15.3284 26.1716C16.0786 26.9217 16.5 27.9391 16.5 29V11C16.5 9.93913 16.0786 8.92172 15.3284 8.17157C14.5783 7.42143 13.5609 7 12.5 7H4.5C4.23478 7 3.98043 7.10536 3.79289 7.29289C3.60536 7.48043 3.5 7.73478 3.5 8V24Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const SliderIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={`stroke-neutral-100 dark:stroke-neutral-600 ${className}`}
      {...props}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 10.125V20.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M12 3.75V6.375" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path
        d="M12 10.125C13.0355 10.125 13.875 9.28553 13.875 8.25C13.875 7.21447 13.0355 6.375 12 6.375C10.9645 6.375 10.125 7.21447 10.125 8.25C10.125 9.28553 10.9645 10.125 12 10.125Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M18.75 17.625V20.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M18.75 3.75V13.875" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path
        d="M18.75 17.625C19.7855 17.625 20.625 16.7855 20.625 15.75C20.625 14.7145 19.7855 13.875 18.75 13.875C17.7145 13.875 16.875 14.7145 16.875 15.75C16.875 16.7855 17.7145 17.625 18.75 17.625Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M5.25 14.625V20.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M5.25 3.75V10.875" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path
        d="M5.25 14.625C6.28553 14.625 7.125 13.7855 7.125 12.75C7.125 11.7145 6.28553 10.875 5.25 10.875C4.21447 10.875 3.375 11.7145 3.375 12.75C3.375 13.7855 4.21447 14.625 5.25 14.625Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export const ActivityIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      className={`stroke-neutral-100 dark:stroke-neutral-600 ${className}`}
      {...props}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.3164 19.155L16.3163 19.1548L7.17567 6.49857L7.125 6.42842L7.07433 6.49857L2.80873 12.4048C2.75568 12.4782 2.68869 12.5404 2.61159 12.5879C2.5345 12.6353 2.44881 12.6672 2.35941 12.6815C2.27001 12.6959 2.17866 12.6925 2.09057 12.6716C2.00248 12.6507 1.91937 12.6126 1.846 12.5595C1.77262 12.5065 1.71042 12.4395 1.66294 12.3624C1.61545 12.2853 1.58361 12.1996 1.56925 12.1102C1.54023 11.9297 1.58412 11.745 1.69127 11.5968L1.69129 11.5968L6.56578 4.84746C6.56587 4.84735 6.56595 4.84723 6.56603 4.84712C6.63084 4.76007 6.71509 4.68936 6.81206 4.64062C6.90916 4.59182 7.01633 4.56641 7.125 4.56641C7.23367 4.56641 7.34084 4.59182 7.43794 4.64062C7.53491 4.68936 7.61916 4.76007 7.68397 4.84712C7.68405 4.84723 7.68414 4.84735 7.68422 4.84746L16.8243 17.503L16.875 17.5732L16.9257 17.503L21.1913 11.5968C21.2984 11.4486 21.46 11.3491 21.6406 11.32C21.8211 11.291 22.0058 11.3349 22.154 11.4421C22.3022 11.5492 22.4017 11.7108 22.4308 11.8914C22.4598 12.0719 22.4159 12.2566 22.3087 12.4048L22.3087 12.4048L17.4337 19.1548L17.4336 19.155C17.3701 19.2436 17.2863 19.3156 17.1892 19.3649C17.0921 19.4142 16.9845 19.4394 16.8756 19.4383L16.8744 19.4383C16.7655 19.4394 16.6579 19.4142 16.5608 19.3649C16.4637 19.3156 16.3799 19.2436 16.3164 19.155Z"
        fill="#141414"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.125"
      />
    </svg>
  )
}

export const TruckIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-400', ...props }) => {
  return (
    <svg
      className={`stroke-neutral-100 dark:stroke-neutral-600 ${className}`}
      {...props}
      fill="none"
      height="30"
      viewBox="0 0 30 30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.625 9.37502H25.6172C25.804 9.3738 25.9868 9.42911 26.1415 9.53369C26.2963 9.63826 26.4158 9.78721 26.4844 9.96096L28.125 14.0625"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M1.875 16.875H20.625" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M22.0312 25.3125C23.5846 25.3125 24.8438 24.0533 24.8438 22.5C24.8438 20.9467 23.5846 19.6875 22.0312 19.6875C20.4779 19.6875 19.2188 20.9467 19.2188 22.5C19.2188 24.0533 20.4779 25.3125 22.0312 25.3125Z"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M7.96875 25.3125C9.52205 25.3125 10.7812 24.0533 10.7812 22.5C10.7812 20.9467 9.52205 19.6875 7.96875 19.6875C6.41545 19.6875 5.15625 20.9467 5.15625 22.5C5.15625 24.0533 6.41545 25.3125 7.96875 25.3125Z"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path d="M19.2188 22.5H10.7812" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M5.15625 22.5H2.8125C2.56386 22.5 2.3254 22.4012 2.14959 22.2254C1.97377 22.0496 1.875 21.8111 1.875 21.5625V8.4375C1.875 8.18886 1.97377 7.9504 2.14959 7.77459C2.3254 7.59877 2.56386 7.5 2.8125 7.5H20.625V20.0625"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M20.625 14.0625H28.125V21.5625C28.125 21.8111 28.0262 22.0496 27.8504 22.2254C27.6746 22.4012 27.4361 22.5 27.1875 22.5H24.8438"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const QuestionIcon: React.FC<IconProps> = ({ className = 'stroke-neutral-400', ...props }) => {
  return (
    <svg
      className={`stroke-neutral-100 dark:stroke-neutral-600 ${className}`}
      {...props}
      fill="none"
      height="30"
      viewBox="0 0 30 30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 26.25C21.2132 26.25 26.25 21.2132 26.25 15C26.25 8.7868 21.2132 3.75 15 3.75C8.7868 3.75 3.75 8.7868 3.75 15C3.75 21.2132 8.7868 26.25 15 26.25Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M15 22.5C15.7767 22.5 16.4062 21.8704 16.4062 21.0938C16.4062 20.3171 15.7767 19.6875 15 19.6875C14.2233 19.6875 13.5938 20.3171 13.5938 21.0938C13.5938 21.8704 14.2233 22.5 15 22.5Z"
        fill="#595959"
      />
      <path
        d="M15 16.875V15.9375C15.649 15.9375 16.2834 15.7451 16.823 15.3845C17.3626 15.024 17.7831 14.5115 18.0315 13.9119C18.2798 13.3124 18.3448 12.6526 18.2182 12.0161C18.0916 11.3796 17.7791 10.7949 17.3202 10.3361C16.8613 9.87717 16.2766 9.56466 15.6401 9.43805C15.0036 9.31144 14.3439 9.37642 13.7443 9.62477C13.1448 9.87312 12.6323 10.2937 12.2717 10.8333C11.9112 11.3729 11.7188 12.0073 11.7188 12.6563"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const ShareIcon: React.FC<IconProps> = ({ className, width = '23', height = '22', fill = 'none', ...props }) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 23 22"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.625 13.0625L19.75 8.9375L15.625 4.8125"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M17 18.5625H3.9375C3.75516 18.5625 3.5803 18.4901 3.45136 18.3611C3.32243 18.2322 3.25 18.0573 3.25 17.875V7.5625"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M6.94531 15.125C7.40407 13.3541 8.43781 11.7857 9.88431 10.6658C11.3308 9.54596 13.1082 8.93805 14.9375 8.9375H19.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const DeleteIcon: React.FC<IconProps> = ({
  className,
  width = '24',
  height = '25',
  fill = 'none',
  stroke = '#B4B4B4',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 24 25"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M20.25 5.87109H3.75" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M9.75 10.3711V16.3711" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M14.25 10.3711V16.3711" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M18.75 5.87109V20.1211C18.75 20.32 18.671 20.5108 18.5303 20.6514C18.3897 20.7921 18.1989 20.8711 18 20.8711H6C5.80109 20.8711 5.61032 20.7921 5.46967 20.6514C5.32902 20.5108 5.25 20.32 5.25 20.1211V5.87109"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M15.75 5.87109V4.37109C15.75 3.97327 15.592 3.59174 15.3107 3.31043C15.0294 3.02913 14.6478 2.87109 14.25 2.87109H9.75C9.35218 2.87109 8.97064 3.02913 8.68934 3.31043C8.40804 3.59174 8.25 3.97327 8.25 4.37109V5.87109"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const SpaceIcon: React.FC<IconProps> = ({
  className,
  width = '41',
  height = '41',
  fill = 'none',
  stroke = '#B4B4B4',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 41 41"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect fill={fill} height="40" rx="20" width="40" x="0.5" y="0.5" />
      <path
        d="M10.375 28.75H17.125C18.0892 28.75 19.0317 28.4641 19.8334 27.9284C20.6351 27.3927 21.2599 26.6314 21.6289 25.7406C21.9979 24.8498 22.0944 23.8696 21.9063 22.9239C21.7182 21.9783 21.2539 21.1096 20.5721 20.4279C19.8904 19.7461 19.0217 19.2818 18.0761 19.0937C17.1304 18.9056 16.1502 19.0021 15.2594 19.3711C14.3686 19.7401 13.6073 20.3649 13.0716 21.1666C12.5359 21.9683 12.25 22.9108 12.25 23.875C12.25 27.25 10.375 28.75 10.375 28.75Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M19.0366 19.3937C20.8366 16.9656 25.4116 11.4062 29.5929 11.4062C29.5929 15.5875 24.0335 20.1625 21.6054 21.9625"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M20.9688 16.9951C22.239 17.712 23.2893 18.7623 24.0062 20.0326"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export const ThumbIcon: React.FC<IconProps> = ({ className, width = '18', height = '18', fill = 'none', ...props }) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 18 18"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.0997 16.852C10.8563 16.8426 8.99051 16.7966 7.15496 16.6344C5.8914 16.5223 4.58605 16.3452 3.59479 15.8182C3.31528 15.6695 3.00984 15.633 2.73897 15.6019C2.62371 15.5884 2.51565 15.5763 2.42344 15.556C1.72034 15.4006 1.22903 14.8303 1.22615 14.1694L1.21607 9.74349C1.21463 9.13129 1.68 8.6191 2.32403 8.5245C2.33555 8.52315 2.34564 8.52045 2.35716 8.51774C2.43641 8.49342 4.32959 7.91501 5.75596 6.869C6.42737 6.37708 7.00224 5.61892 7.29471 4.84185C7.58575 4.06748 7.58431 3.22283 7.58287 2.54442C7.58287 2.10655 7.58143 1.56193 7.70822 1.48219C8.01654 1.29164 8.35657 1.19434 8.7182 1.19434C9.83049 1.19434 10.9658 2.1471 11.0105 3.11742C11.0422 3.79044 10.8016 4.58508 10.5696 5.35269C10.2959 6.2622 10.0581 7.04739 10.2728 7.5812C10.3045 7.66094 10.3852 7.71229 10.4745 7.71229C10.4774 7.71229 11.5248 7.6785 11.5248 7.6785H11.5349C12.7106 7.6785 13.6673 8.57586 13.6687 9.67727L13.6759 15.3817C13.6759 15.7749 13.5146 16.1439 13.2178 16.4209C12.9224 16.698 12.5291 16.852 12.1098 16.852H12.0997Z"
        fill="url(#paint0_radial_3040_20866)"
      />
      <path
        d="M8.71826 1.39713C9.70663 1.39713 10.7541 2.27015 10.7944 3.12561C10.8247 3.76619 10.5898 4.54461 10.3622 5.29736C10.0769 6.24066 9.83198 7.05557 10.0711 7.65155C10.1345 7.80967 10.2959 7.91373 10.476 7.91373H10.4919L11.5292 7.87995H11.5379C12.594 7.87995 13.4541 8.6854 13.4555 9.67735L13.4627 15.3817C13.4627 15.7196 13.323 16.0385 13.068 16.2777C12.813 16.5169 12.4744 16.6494 12.1127 16.6494H12.1012C10.8621 16.6399 9.00209 16.594 7.17518 16.4332C5.93611 16.3237 4.6567 16.1507 3.70146 15.6426C3.38449 15.4736 3.04159 15.4344 2.7664 15.402C2.6569 15.3899 2.5546 15.3777 2.47392 15.3588C1.86879 15.225 1.4452 14.7358 1.44376 14.1695L1.43224 9.74357C1.4308 9.23273 1.81981 8.80433 2.35722 8.72594C2.37883 8.72324 2.40188 8.71783 2.42205 8.71108C2.50274 8.68675 4.4305 8.09617 5.88713 7.02854C6.58879 6.51365 7.19103 5.72171 7.49648 4.9095C7.80048 4.10269 7.79904 3.23913 7.7976 2.54449C7.7976 2.21474 7.79616 1.76877 7.85667 1.63363C8.12177 1.47551 8.41137 1.39713 8.71826 1.39713ZM8.71826 0.991699C8.33645 0.991699 7.95032 1.089 7.58869 1.31334C7.12187 1.60255 7.62759 3.34319 7.09018 4.77301C6.76744 5.63116 6.15223 6.32039 5.62202 6.70825C4.21006 7.74345 2.29094 8.32457 2.29094 8.32457C1.54606 8.43403 0.998562 9.03677 1 9.74492L1.01153 14.1709C1.01441 14.9331 1.58352 15.5777 2.37451 15.7534C2.69436 15.8237 3.13092 15.8047 3.48823 15.9953C4.44346 16.5034 5.66813 16.7061 7.13484 16.8359C8.95022 16.9967 10.7944 17.044 12.0983 17.0548H12.1127C13.0968 17.0548 13.8964 16.3061 13.895 15.3817L13.8878 9.67735C13.8863 8.45971 12.8331 7.47587 11.5379 7.47587H11.5206L10.4774 7.50965C10.1173 6.6123 11.2973 4.59326 11.2281 3.10804C11.1777 2.05257 9.9775 0.991699 8.71826 0.991699Z"
        fill="#EDA600"
      />
      <path
        d="M9.30451 8.85568C9.57537 9.5314 9.57825 10.5855 9.30451 11.2369C8.90829 12.1775 7.93865 13.0005 6.81916 13.1451C6.54541 13.1803 6.70822 13.4168 6.98053 13.3816C8.19222 13.2249 9.83183 12.764 10.2583 11.7437C11.4282 8.93947 10.0595 7.47046 9.44858 7.90833C9.15466 8.12185 9.15178 8.47323 9.30451 8.85568Z"
        fill="#EDA600"
      />
      <path
        d="M12.2091 9.85794C11.0047 9.85794 9.55667 9.64847 9.49472 8.64706C9.47743 8.36055 9.56964 8.12 9.77711 7.91323C10.3232 7.36996 11.6645 7.07129 13.5548 7.07129C14.2406 7.07129 14.7406 7.11318 14.7464 7.11318C14.7521 7.11318 14.7593 7.11453 14.7651 7.11453H14.7781C14.7982 7.11318 14.817 7.11318 14.8371 7.11318C15.4495 7.11318 15.9609 7.63078 16.0027 8.29163C16.0459 8.97546 15.5662 9.55927 14.9337 9.59306C14.9236 9.59306 14.912 9.59441 14.902 9.59711C14.889 9.59847 13.5548 9.85794 12.2091 9.85794Z"
        fill="url(#paint1_radial_3040_20866)"
      />
      <path
        d="M13.5563 7.27457C14.2306 7.27457 14.7233 7.31511 14.7276 7.31511C14.7406 7.31646 14.7536 7.31646 14.7665 7.31646C14.7752 7.31646 14.7838 7.31646 14.791 7.31511C14.8069 7.31376 14.8227 7.31376 14.8371 7.31376C15.3342 7.31376 15.752 7.74757 15.7866 8.30031C15.8039 8.58681 15.7175 8.85845 15.5431 9.06657C15.3803 9.26117 15.1584 9.3747 14.9207 9.38821C14.8991 9.38956 14.8775 9.39226 14.8573 9.39632C14.8443 9.39902 13.5289 9.65444 12.2092 9.65444C11.4427 9.65444 10.8347 9.57065 10.4039 9.40578C9.8117 9.17874 9.72382 8.8571 9.71085 8.63546C9.69644 8.40437 9.76848 8.21922 9.93561 8.05164C10.4327 7.55837 11.7524 7.27457 13.5563 7.27457ZM13.5563 6.86914C11.9109 6.86914 9.18208 7.10294 9.27862 8.65979C9.34921 9.78418 10.7958 10.0612 12.2092 10.0612C13.5937 10.0612 14.9466 9.79499 14.9466 9.79499C15.6987 9.7531 16.2693 9.07468 16.2188 8.27868C16.1713 7.50837 15.5604 6.90968 14.8386 6.90968C14.8141 6.90968 14.791 6.90968 14.7665 6.91104C14.7665 6.91104 14.2608 6.86914 13.5563 6.86914Z"
        fill="#EDA600"
      />
      <path
        d="M13.1126 12.4302C11.5407 12.4302 9.66772 12.1829 9.66772 11.0017C9.66772 9.82055 11.5407 9.57324 13.1126 9.57324C14.4453 9.57324 15.6599 9.75569 15.6715 9.75704C15.683 9.75839 15.6945 9.75974 15.706 9.75974C16.3414 9.75974 16.7837 10.3895 16.7837 10.9544C16.7837 11.5504 16.3126 12.2423 15.706 12.2423C15.6945 12.2423 15.683 12.2437 15.6715 12.245C15.6585 12.2477 14.4439 12.4302 13.1126 12.4302Z"
        fill="url(#paint2_radial_3040_20866)"
      />
      <path
        d="M13.1127 9.7775C14.4267 9.7775 15.6254 9.95724 15.6369 9.95859C15.66 9.96265 15.683 9.964 15.7061 9.964C16.1988 9.964 16.5677 10.4884 16.5677 10.9559C16.5677 11.4438 16.17 12.0411 15.7061 12.0411C15.683 12.0411 15.66 12.0425 15.6369 12.0466C15.6254 12.0479 14.4252 12.2276 13.1127 12.2276C12.1286 12.2276 11.3463 12.1303 10.7858 11.9371C9.97754 11.6587 9.88389 11.2695 9.88389 11.0019C9.88389 10.733 9.97754 10.3451 10.7858 10.0667C11.3448 9.8748 12.1286 9.7775 13.1127 9.7775ZM13.1127 9.37207C11.3938 9.37207 9.45166 9.66803 9.45166 11.0032C9.45166 12.3385 11.3924 12.6344 13.1127 12.6344C14.48 12.6344 15.7061 12.4479 15.7061 12.4479C16.4495 12.4479 16.9999 11.6492 16.9999 10.9573C16.9999 10.2654 16.4495 9.55992 15.7061 9.55992C15.7061 9.55857 14.4785 9.37207 13.1127 9.37207Z"
        fill="#EDA600"
      />
      <path
        d="M14.3101 16.9222C13.7035 16.9222 10.6303 16.8776 9.69959 16.0032C9.53679 15.8505 9.45898 15.6856 9.45898 15.4991C9.46187 14.7896 10.7571 14.3828 13.0119 14.3828C13.8159 14.3828 14.4383 14.4369 14.4455 14.4369C14.4513 14.4369 14.4585 14.4382 14.4643 14.4382C14.8014 14.4396 15.1198 14.568 15.3575 14.8018C15.5981 15.0369 15.7293 15.3504 15.7293 15.6829C15.7264 16.3654 15.1573 16.9194 14.4599 16.9194C14.4498 16.9222 14.3994 16.9222 14.3101 16.9222Z"
        fill="url(#paint3_radial_3040_20866)"
      />
      <path
        d="M13.013 14.5876C13.804 14.5876 14.4192 14.6403 14.4249 14.6416C14.4379 14.643 14.4509 14.643 14.4638 14.643C14.7419 14.6443 15.0041 14.7511 15.2015 14.9443C15.4032 15.1416 15.5142 15.4052 15.5127 15.6849C15.5113 16.2552 15.0387 16.7201 14.4552 16.7201H14.4538H14.4451C14.4422 16.7201 14.3932 16.7215 14.3082 16.7215C11.6932 16.7215 10.2726 16.2579 9.85047 15.862C9.69054 15.7119 9.67326 15.5849 9.67326 15.5025C9.67758 14.9376 10.9555 14.5876 13.013 14.5876ZM13.013 14.1821C11.4685 14.1821 9.24678 14.3767 9.2439 15.4998C9.23814 17.0485 13.4654 17.1255 14.3097 17.1255C14.4033 17.1255 14.4552 17.1242 14.4552 17.1242H14.4595C15.2779 17.1242 15.9421 16.4809 15.945 15.6849C15.9478 14.8876 15.2851 14.2389 14.4653 14.2362C14.4653 14.2375 13.8357 14.1821 13.013 14.1821Z"
        fill="#EDA600"
      />
      <path
        d="M13.7711 14.7778C12.4758 14.7778 9.4646 14.64 9.4646 13.3629C9.4646 12.2898 11.6359 12.1304 12.9311 12.1304C14.0765 12.1304 15.0635 12.2493 15.0736 12.2506C15.0822 12.252 15.0923 12.252 15.1009 12.252C15.7017 12.252 16.402 12.5304 16.402 13.3156C16.402 14.0589 15.7824 14.7346 15.1009 14.7346H15.0836C15.0779 14.7359 14.5232 14.7778 13.7711 14.7778Z"
        fill="url(#paint4_radial_3040_20866)"
      />
      <path
        d="M12.9321 11.9287V12.3341C14.0603 12.3341 15.0371 12.4517 15.0458 12.4531C15.0645 12.4558 15.0832 12.4558 15.102 12.4558C15.6264 12.4558 16.1869 12.6815 16.1869 13.3166C16.1869 13.9423 15.6595 14.5329 15.102 14.5329C15.0904 14.5329 15.0789 14.5329 15.0659 14.5343C15.0602 14.5343 14.5141 14.5762 13.7707 14.5762C12.9855 14.5762 11.8631 14.5289 10.9741 14.3072C10.1169 14.0924 9.68175 13.7748 9.68175 13.3653C9.68175 13.2396 9.68174 12.8571 10.5952 12.5882C11.1643 12.4206 11.9495 12.3355 12.9307 12.3355L12.9321 11.9287ZM12.9321 11.9287C11.2666 11.9287 9.24951 12.1747 9.24951 13.3639C9.24951 14.7654 12.0446 14.9816 13.7721 14.9816C14.5444 14.9816 15.102 14.9383 15.102 14.9383C15.9146 14.9383 16.6191 14.1505 16.6191 13.3166C16.6191 12.4828 15.9146 12.0503 15.102 12.0503C15.102 12.0503 14.1035 11.9287 12.9321 11.9287Z"
        fill="#EDA600"
      />
      <path d="M3.78298 15.9375L3.09284 13.3833L2.80469 15.6807L3.78298 15.9375Z" fill="#EDA600" />
      <defs>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(7.23695 4.6528) rotate(90.1332) scale(11.7628 9.87307)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_3040_20866"
          r="1"
        >
          <stop offset="0.6" stopColor="#FFCA28" />
          <stop offset="1" stopColor="#FFB300" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(14.6113 8.34667) rotate(176.929) scale(4.07252 1.8699)"
          gradientUnits="userSpaceOnUse"
          id="paint1_radial_3040_20866"
          r="1"
        >
          <stop offset="0.5993" stopColor="#FFCA28" />
          <stop offset="1" stopColor="#FFB300" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(15.2547 10.9661) rotate(-179.94) scale(4.5843 1.72437)"
          gradientUnits="userSpaceOnUse"
          id="paint2_radial_3040_20866"
          r="1"
        >
          <stop offset="0.5993" stopColor="#FFCA28" />
          <stop offset="1" stopColor="#FFB300" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(14.361 15.6256) rotate(-179.743) scale(3.84993 1.88008)"
          gradientUnits="userSpaceOnUse"
          id="paint3_radial_3040_20866"
          r="1"
        >
          <stop offset="0.5993" stopColor="#FFCA28" />
          <stop offset="1" stopColor="#FFB300" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(14.9088 13.4219) rotate(-179.938) scale(4.38629 1.71131)"
          gradientUnits="userSpaceOnUse"
          id="paint4_radial_3040_20866"
          r="1"
        >
          <stop offset="0.5993" stopColor="#FFCA28" />
          <stop offset="1" stopColor="#FFB300" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export const SmilingFaceIcon: React.FC<IconProps> = ({
  className,
  width = '16',
  height = '16',
  fill = 'none',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 16 16"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.99995 15.4206C4.1517 15.4206 0 13.0068 0 7.7103C0 2.41378 4.1517 0 7.99995 0C10.1379 0 12.1103 0.703444 13.5723 1.98619C15.1585 3.39308 15.9999 5.37928 15.9999 7.7103C15.9999 10.0413 15.1585 12.0137 13.5723 13.4206C12.1103 14.7034 10.1241 15.4206 7.99995 15.4206Z"
        fill="url(#paint0_radial_3040_20851)"
      />
      <path
        d="M14.6054 3.12695C15.3406 4.31315 15.724 5.72556 15.724 7.29658C15.724 9.6276 14.8827 11.6 13.2965 13.0069C11.8344 14.2896 9.84822 15.0069 7.72409 15.0069C5.23307 15.0069 2.62067 13.9931 1.07861 11.8428C2.56274 14.2786 5.35445 15.4207 7.99995 15.4207C10.1241 15.4207 12.1103 14.7034 13.5723 13.4207C15.1585 12.0138 15.9999 10.0414 15.9999 7.71037C15.9999 5.95314 15.5213 4.39177 14.6054 3.12695Z"
        fill="#EB8F00"
      />
      <path
        d="M8.11011 10.5238C7.61632 10.5238 7.12667 10.441 6.66185 10.2755C6.08944 10.0783 5.46737 10.3831 5.27013 10.9541C5.15841 11.2769 5.20392 11.6327 5.39289 11.9169C5.98599 12.8272 6.92391 13.3238 8.11011 13.3238C9.29631 13.3238 10.2342 12.8272 10.8273 11.9169C11.1625 11.4134 11.0246 10.7334 10.5211 10.3983C10.237 10.2093 9.88114 10.1638 9.55838 10.2755C9.09356 10.441 8.6039 10.5238 8.11011 10.5238Z"
        fill="#422B0D"
      />
      <path
        d="M3.94478 11.3378C5.27788 11.3378 6.35856 10.3189 6.35856 9.06198C6.35856 7.80506 5.27788 6.78613 3.94478 6.78613C2.61169 6.78613 1.53101 7.80506 1.53101 9.06198C1.53101 10.3189 2.61169 11.3378 3.94478 11.3378Z"
        fill="url(#paint1_radial_3040_20851)"
        opacity="0.8"
      />
      <path
        d="M12.2758 11.3378C13.6089 11.3378 14.6896 10.3189 14.6896 9.06198C14.6896 7.80506 13.6089 6.78613 12.2758 6.78613C10.9427 6.78613 9.86206 7.80506 9.86206 9.06198C9.86206 10.3189 10.9427 11.3378 12.2758 11.3378Z"
        fill="url(#paint2_radial_3040_20851)"
        opacity="0.8"
      />
      <path
        d="M14.0676 3.77513C12.9352 3.45651 12.1034 4.38202 12.1034 4.38202C12.1034 4.38202 12.0069 3.33237 11.0386 3.00272C9.87726 2.6041 8.65106 3.23858 8.57795 4.88409C8.4952 6.75856 10.9752 9.21923 10.9752 9.21923C10.9752 9.21923 14.0538 8.39165 15.0621 6.63718C15.8827 5.2096 14.9241 4.01513 14.0676 3.77513Z"
        fill="#F44336"
      />
      <path
        d="M14.0673 3.77447C13.928 3.73723 13.7846 3.72068 13.6411 3.72344C14.0466 3.99516 14.368 4.37447 14.568 4.81861C14.7625 5.28619 14.8135 5.89032 14.4439 6.6117C13.6425 8.17996 11.1749 9.15099 10.9956 9.21858C11.2204 9.15513 14.0977 8.32755 15.0673 6.64066C15.8825 5.20895 14.9239 4.01447 14.0673 3.77447Z"
        fill="#C62828"
      />
      <path
        d="M12.1018 4.55171C12.0935 4.40826 12.0714 4.26481 12.0383 4.12412C11.9583 3.71861 11.7073 3.36689 11.3487 3.15861C11.1031 3.01516 10.8314 2.92413 10.55 2.88965C10.55 2.88965 10.9638 3.01516 11.259 3.58758C11.4094 3.88826 11.499 4.21654 11.5211 4.55171C11.5197 4.67447 11.5418 4.79446 11.5859 4.90895C11.6356 5.02343 11.7569 5.09101 11.8811 5.0717C12.07 5.02343 12.1114 4.78757 12.1018 4.55171Z"
        fill="#C62828"
      />
      <path
        d="M9.42045 3.89344C9.67838 3.57344 10.1018 3.26861 10.5073 3.54999C10.7225 3.70033 10.7253 4.12654 10.4618 4.31826C10.0177 4.64378 9.997 4.85757 9.94734 5.03688C9.88665 5.25067 9.84803 5.50584 9.65355 5.61343C9.45907 5.72101 9.28803 5.61343 9.18597 5.30584C9.01217 4.82584 9.10045 4.29068 9.42045 3.89344Z"
        fill="#FF847A"
      />
      <path
        d="M4.84423 2.97493C3.72562 3.33769 3.54631 4.56941 3.54631 4.56941C3.54631 4.56941 2.88424 3.74182 1.89114 4.00941C0.706324 4.32113 0.0373631 5.5294 0.882875 6.93767C1.86218 8.55145 5.28837 9.22041 5.28837 9.22041C5.28837 9.22041 7.3918 6.82594 7.25939 4.80665C7.15042 3.16252 5.68974 2.70045 4.84423 2.97493Z"
        fill="#F44336"
      />
      <path
        d="M4.84388 2.97494C4.70733 3.01908 4.5763 3.08253 4.4563 3.16252C4.94457 3.1639 5.42181 3.30183 5.8356 3.56114C6.25767 3.837 6.63422 4.317 6.72801 5.12389C6.93077 6.87423 5.41353 9.04939 5.29629 9.20801C5.4494 9.03146 7.38456 6.74733 7.25766 4.80527C7.15008 3.16252 5.6894 2.70046 4.84388 2.97494Z"
        fill="#C62828"
      />
      <path
        d="M3.64097 4.71422C3.55545 4.59698 3.4589 4.48939 3.35131 4.39284C3.06166 4.09767 2.66028 3.94043 2.24787 3.9625C1.96511 3.97905 1.68787 4.05215 1.43408 4.18043C1.43408 4.18043 1.84787 4.05491 2.41063 4.36939C2.70442 4.53904 2.95959 4.76663 3.16373 5.03697C3.22993 5.14042 3.31545 5.2287 3.41614 5.29904C3.52097 5.36663 3.6589 5.35421 3.75131 5.27007C3.87407 5.12111 3.7789 4.90318 3.64097 4.71422Z"
        fill="#C62828"
      />
      <path
        d="M1.04799 5.65495C1.0535 5.53909 1.07419 5.42461 1.10867 5.31427C1.16523 5.08254 1.32936 4.89082 1.54867 4.79841C1.75971 4.7322 2.05212 4.7791 2.16522 4.99013C2.26591 5.17771 2.19281 5.40392 2.13763 5.61082C2.08798 5.84806 2.06039 6.09081 2.05488 6.33357C2.05626 6.53219 1.89764 6.69357 1.69902 6.69633C1.51143 6.69633 1.36522 6.53357 1.2604 6.37771C1.11419 6.1653 1.03971 5.91288 1.04799 5.65495Z"
        fill="#FF847A"
      />
      <defs>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(7.99995 7.7103) scale(7.85646)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_3040_20851"
          r="1"
        >
          <stop offset="0.5" stopColor="#FDE030" />
          <stop offset="0.92" stopColor="#F7C02B" />
          <stop offset="1" stopColor="#F4A223" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(3.94478 8.01517) scale(2.63059 2.36216)"
          gradientUnits="userSpaceOnUse"
          id="paint1_radial_3040_20851"
          r="1"
        >
          <stop stopColor="#ED7770" />
          <stop offset="0.9" stopColor="#ED7770" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(16.2096 347.665) scale(2.68412)"
          gradientUnits="userSpaceOnUse"
          id="paint2_radial_3040_20851"
          r="1"
        >
          <stop stopColor="#ED7770" />
          <stop offset="0.9" stopColor="#ED7770" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export const ClappingHandsIcon: React.FC<IconProps> = ({
  className,
  width = '15',
  height = '17',
  fill = 'none',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 15 17"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.18592 16.0689C7.5426 16.0689 6.90961 15.8403 6.30504 15.3895C5.80124 15.0135 0.641741 10.3268 0.588776 10.2803C0.338165 10.0465 -0.0248344 9.58922 0.371752 9.16292C0.521602 9.00144 0.710207 8.91618 0.914313 8.91618C1.14426 8.91618 1.38324 9.02082 1.58735 9.21072L3.71884 11.1187C3.7563 11.1523 3.80151 11.1678 3.84802 11.1678C3.89969 11.1678 3.95136 11.1471 3.99012 11.1058C4.06246 11.0283 4.05858 10.9082 3.98237 10.8345L0.571983 7.55461C0.378211 7.37376 0.258072 7.15674 0.232236 6.93971C0.205108 6.7201 0.276158 6.5147 0.436342 6.34289C0.586193 6.18142 0.774797 6.09616 0.980195 6.09616C1.21014 6.09616 1.44912 6.20079 1.65323 6.39069L5.13595 9.55434C5.17342 9.58792 5.21992 9.60472 5.26643 9.60472C5.3181 9.60472 5.36977 9.58405 5.40853 9.54271C5.48087 9.4652 5.47699 9.34377 5.40077 9.27014L1.20885 5.2694C1.01507 5.08984 0.896227 4.87152 0.869099 4.65579C0.841971 4.43618 0.913021 4.23078 1.07321 4.05897C1.22306 3.89749 1.41166 3.81223 1.61706 3.81223C1.847 3.81223 2.08599 3.91687 2.29009 4.10677L6.55695 7.9822C6.59441 8.01579 6.64091 8.03258 6.68742 8.03258C6.73909 8.03258 6.79076 8.01191 6.82952 7.97058C6.90186 7.89307 6.89798 7.77164 6.82177 7.698L3.71496 4.72555C3.37651 4.41034 3.20469 3.91558 3.57932 3.51383C3.72917 3.35235 3.91778 3.26709 4.12317 3.26709C4.35312 3.26709 4.5921 3.37173 4.79621 3.56162C5.93171 4.60024 8.89771 7.31821 8.99976 7.42026C9.07856 7.50811 9.16511 7.52748 9.22325 7.52748C9.44931 7.52748 9.56041 7.26525 9.56945 7.00689C9.58108 6.69039 9.49711 6.29639 9.41573 5.9153C9.32659 5.49676 9.23358 5.06271 9.27492 4.76818C9.35759 4.17136 9.89886 3.79027 10.2334 3.79027C10.2748 3.79027 10.311 3.79673 10.3381 3.80836C10.8548 4.02926 10.8471 4.33671 10.7747 5.07433L10.7605 5.21643C10.6933 5.93597 11.015 6.59609 11.3263 7.23424C11.4658 7.51973 11.6092 7.81427 11.7177 8.11138C11.7694 8.25348 11.8417 8.41367 11.9257 8.60098C12.4928 9.85662 13.441 11.9571 11.0796 14.5136C10.1262 15.5458 9.15349 16.0689 8.18592 16.0689Z"
        fill="url(#paint0_radial_3040_20840)"
      />
      <path
        d="M4.12185 3.46225C4.3027 3.46225 4.49518 3.5488 4.6657 3.7064C6.2753 5.17907 8.70391 7.40486 8.85892 7.556C8.99456 7.70198 9.14441 7.72394 9.22322 7.72394C9.53067 7.72394 9.74898 7.43974 9.76319 7.01602C9.77482 6.67499 9.68827 6.26936 9.6043 5.87665C9.51775 5.4736 9.42861 5.05764 9.46478 4.79669C9.53842 4.27222 10.0099 3.98543 10.2321 3.98543C10.2515 3.98543 10.2605 3.98802 10.2618 3.98802C10.6365 4.1482 10.6545 4.30839 10.5809 5.05635L10.5667 5.19974C10.4944 5.97353 10.8276 6.65819 11.1506 7.32089C11.2875 7.60122 11.4283 7.89187 11.533 8.17995C11.5872 8.32851 11.6609 8.49257 11.7474 8.68246C12.2939 9.89418 13.2097 11.921 10.9349 14.3832C10.0203 15.3728 9.09532 15.874 8.1846 15.874C7.58391 15.874 6.99096 15.6582 6.41998 15.2319C6.00789 14.9245 2.16476 11.4482 0.721801 10.1383C0.544823 9.97298 0.42856 9.79988 0.396265 9.65261C0.376888 9.56477 0.373012 9.44463 0.51382 9.29349C0.627499 9.17077 0.763139 9.10876 0.915573 9.10876C1.09643 9.10876 1.28891 9.19531 1.45684 9.35162C1.45813 9.35291 1.46072 9.3555 1.46201 9.35679L3.59092 11.2622C3.66455 11.3281 3.75756 11.3604 3.84928 11.3604C3.95391 11.3604 4.05726 11.319 4.13348 11.2364C4.27687 11.0814 4.27041 10.8398 4.11797 10.6938L0.701132 7.41003C0.543531 7.26276 0.444062 7.08707 0.423393 6.91526C0.404016 6.7525 0.455688 6.60394 0.575827 6.47346C0.689506 6.35074 0.825146 6.28873 0.97758 6.28873C1.15843 6.28873 1.35091 6.37529 1.52272 6.53418L5.00416 9.69524C5.07779 9.76242 5.17209 9.796 5.2651 9.796C5.36845 9.796 5.47308 9.75467 5.5493 9.67199C5.69398 9.51697 5.68623 9.27411 5.5338 9.12814L1.33929 5.12352C1.09384 4.89487 0.912989 4.5112 1.21527 4.18825C1.32895 4.06553 1.46459 4.00352 1.61703 4.00352C1.79788 4.00352 1.99036 4.09007 2.16088 4.24896L6.42644 8.12311C6.50008 8.19028 6.59438 8.22387 6.68739 8.22387C6.79073 8.22387 6.89408 8.18253 6.97029 8.10115C7.11498 7.94613 7.10852 7.70327 6.95479 7.55729L3.8454 4.58225C3.6878 4.43498 3.58833 4.2593 3.56766 4.08749C3.54829 3.92472 3.59996 3.77616 3.7201 3.64569C3.83507 3.52426 3.97071 3.46225 4.12185 3.46225ZM4.12185 3.07471C3.87511 3.07471 3.63354 3.17159 3.43719 3.38216C3.01864 3.83171 3.12974 4.44532 3.58058 4.86516L6.6861 7.83762L2.42053 3.96347C2.18155 3.74128 1.89477 3.61727 1.61574 3.61727C1.369 3.61727 1.12743 3.71415 0.931075 3.92472C0.512528 4.37427 0.623623 4.98788 1.07447 5.40772L5.2651 9.40846L1.78367 6.24869C1.54469 6.0265 1.2579 5.90248 0.978872 5.90248C0.732136 5.90248 0.490567 5.99937 0.294212 6.20993C-0.124335 6.65949 -0.0132396 7.2731 0.437603 7.69293L3.84928 10.9728L1.72037 9.06871C1.48139 8.84652 1.1946 8.72251 0.915573 8.72251C0.668837 8.72251 0.427268 8.81939 0.230913 9.02996C-0.187634 9.47951 0.00742941 10.0027 0.459564 10.4225C0.459564 10.4225 5.67332 15.1583 6.19004 15.5433C6.61892 15.8624 7.31133 16.2615 8.18718 16.2615C9.04882 16.2615 10.0861 15.8753 11.2229 14.6455C14.0352 11.602 12.2809 9.09197 11.9011 8.0456C11.5472 7.07286 10.8651 6.20606 10.9555 5.23462C11.0279 4.46082 11.1286 3.93376 10.4156 3.63019C10.3626 3.60693 10.3006 3.5966 10.2347 3.5966C9.81357 3.5966 9.18188 4.03323 9.0837 4.74114C8.99844 5.35217 9.40019 6.36495 9.37823 6.99923C9.37307 7.15683 9.31364 7.33381 9.22451 7.33381C9.19867 7.33381 9.17025 7.3196 9.14054 7.28601C9.0837 7.22271 4.92923 3.41962 4.92923 3.41962C4.68766 3.19743 4.40088 3.07471 4.12185 3.07471Z"
        fill="#875334"
      />
      <path
        d="M8.02569 16.3079C6.07763 16.3079 5.0894 14.9967 4.67343 14.2152C4.37761 13.6597 1.81982 7.60886 1.79399 7.54685C1.69064 7.28591 1.65705 7.04563 1.70098 6.85702C1.7449 6.66325 1.86891 6.5289 2.07818 6.44623C2.17636 6.40747 2.27454 6.3881 2.37013 6.3881C2.70213 6.3881 3.00312 6.62708 3.15556 7.01204L4.26264 9.64992C4.29364 9.72356 4.36598 9.76877 4.44091 9.76877C4.46545 9.76877 4.48871 9.76489 4.51325 9.75456C4.61143 9.7158 4.66052 9.60471 4.62305 9.50653L2.94887 5.08078C2.77835 4.65061 2.83648 4.13001 3.34545 3.9272C3.44363 3.88844 3.54181 3.86906 3.6374 3.86906C3.9694 3.86906 4.27039 4.10805 4.42282 4.49301L6.21198 8.84512C6.24299 8.92005 6.31533 8.96526 6.39154 8.96526C6.4148 8.96526 6.43934 8.96139 6.46259 8.95105C6.56077 8.9123 6.60986 8.8012 6.5724 8.70173L4.50421 3.28904C4.33369 2.86016 4.39182 2.33827 4.90209 2.13674C5.00026 2.09799 5.09844 2.07861 5.19403 2.07861C5.52603 2.07861 5.82702 2.3176 5.97946 2.70256L8.17037 8.03387C8.20137 8.10879 8.27371 8.154 8.34993 8.154C8.37318 8.154 8.39773 8.15013 8.42098 8.13979C8.51916 8.10104 8.56825 7.98994 8.53078 7.89047L7.00128 3.87294C6.83076 3.44406 6.88889 2.92217 7.39787 2.72064C7.49604 2.68189 7.59422 2.66251 7.68981 2.66251C8.02181 2.66251 8.3228 2.9015 8.47524 3.28646C9.05655 4.71391 10.5693 8.44079 10.6171 8.57643C10.6765 8.77924 10.838 8.79474 10.8858 8.79474C11.117 8.79474 11.2785 8.50538 11.3095 8.44725C11.4387 8.19922 11.4735 7.91502 11.511 7.61403C11.5665 7.17223 11.6234 6.71622 11.9838 6.32221C12.2835 5.99409 12.6672 5.80549 13.0379 5.80549C13.2149 5.80549 13.3751 5.84941 13.4978 5.93209C13.8065 6.13878 13.8233 6.33901 13.7975 6.50824C13.7536 6.80406 13.5223 7.18256 13.3014 7.51327C12.8545 8.18242 12.8015 9.20166 12.7563 10.1008C12.7421 10.3669 12.7292 10.6188 12.7072 10.8513C12.6891 11.0425 12.6956 11.2724 12.7046 11.5398C12.7253 12.2142 12.7511 13.0538 12.4023 13.869C11.9903 14.8314 11.1532 15.5199 9.84327 15.9733C9.20123 16.1955 8.59021 16.3079 8.02569 16.3079Z"
        fill="url(#paint1_radial_3040_20840)"
      />
      <path
        d="M5.1941 2.27231C5.44471 2.27231 5.67724 2.46479 5.80125 2.7787L7.99087 8.10742C8.05288 8.25727 8.19627 8.3477 8.35 8.3477C8.39779 8.3477 8.44559 8.33866 8.4921 8.32057C8.68974 8.24306 8.78663 8.02087 8.7117 7.82193L7.18091 3.80052C7.10081 3.60029 7.0879 3.39877 7.14215 3.23471C7.19382 3.07969 7.30492 2.9673 7.47027 2.90142C7.5452 2.87171 7.62012 2.85621 7.69117 2.85621C7.94178 2.85621 8.17431 3.04869 8.29703 3.36131C9.11862 5.38299 10.3575 8.43683 10.4337 8.63707C10.5022 8.85151 10.6791 8.98844 10.8871 8.98844C11.2217 8.98844 11.4271 8.64223 11.4826 8.5363C11.6273 8.25727 11.6674 7.94207 11.7048 7.6385C11.7591 7.20832 11.8095 6.80269 12.1285 6.45261C12.3921 6.16454 12.7241 5.99919 13.0393 5.99919C13.1762 5.99919 13.3015 6.03277 13.3919 6.0922C13.6335 6.25367 13.8247 6.38027 13.1426 7.40468C12.6659 8.11905 12.613 9.16542 12.5639 10.0904C12.5497 10.3539 12.5368 10.6032 12.5161 10.8331C12.4967 11.036 12.5045 11.2724 12.5122 11.5449C12.5523 12.8445 12.613 14.8093 9.78132 15.7885C9.15867 16.0043 8.56831 16.1128 8.02704 16.1128C6.18104 16.1128 5.24061 14.8662 4.84531 14.1234C4.60374 13.67 2.69315 9.17446 1.97491 7.47573C1.70879 6.8014 2.04079 6.66964 2.15059 6.62701C2.22552 6.59729 2.30044 6.58179 2.37149 6.58179C2.6221 6.58179 2.85463 6.77427 2.97606 7.08302C2.97735 7.0856 2.97864 7.08818 2.97864 7.09077L4.08443 9.72477C4.14644 9.87333 4.28983 9.96246 4.44227 9.96246C4.49006 9.96246 4.53915 9.95342 4.58566 9.93534C4.78201 9.85654 4.8789 9.63564 4.80397 9.43799L3.1272 5.00707C3.04711 4.80684 3.03419 4.60532 3.08845 4.44126C3.14012 4.28624 3.25122 4.17386 3.41657 4.10797C3.49149 4.07826 3.56642 4.06276 3.63747 4.06276C3.88808 4.06276 4.1206 4.25524 4.24462 4.56915L6.03249 8.91868C6.09449 9.06853 6.23788 9.15896 6.39161 9.15896C6.43941 9.15896 6.4872 9.14991 6.53371 9.13183C6.73136 9.05303 6.82824 8.83084 6.75332 8.63319L4.68383 3.21662C4.55982 2.90401 4.56111 2.48158 4.9732 2.31752C5.04813 2.28781 5.12176 2.27231 5.1941 2.27231ZM5.1941 1.88477C5.07655 1.88477 4.95382 1.90802 4.82981 1.95711C4.25883 2.18317 4.09606 2.78516 4.32342 3.35872L6.39161 8.77141L4.60374 4.42188C4.42547 3.97363 4.06118 3.67522 3.63876 3.67522C3.5212 3.67522 3.39848 3.69847 3.27447 3.74756C2.70349 3.97363 2.54072 4.57561 2.76808 5.14917L4.44227 9.57621L3.33648 6.94221C3.15821 6.49395 2.79391 6.19554 2.37149 6.19554C2.25394 6.19554 2.13121 6.21879 2.0072 6.26788C1.43622 6.49395 1.38842 7.05072 1.61578 7.62429C1.61578 7.62429 4.1994 13.7384 4.50298 14.3081C4.98483 15.2137 6.06349 16.5016 8.02575 16.5016C8.57994 16.5016 9.20518 16.3996 9.90792 16.1554C13.6064 14.8752 12.7964 11.9764 12.901 10.8693C12.9992 9.83845 12.923 8.43296 13.4643 7.62041C14.0327 6.76652 14.251 6.20071 13.6064 5.77054C13.4527 5.66848 13.255 5.61164 13.038 5.61164C12.6543 5.61164 12.2099 5.78733 11.8418 6.19167C11.1881 6.90862 11.431 7.7948 11.1377 8.35803C11.0731 8.48205 10.9659 8.60089 10.8858 8.60089C10.8497 8.60089 10.8186 8.57635 10.8006 8.51434C10.776 8.43296 8.65486 3.21404 8.65486 3.21404C8.47659 2.76578 8.1123 2.46737 7.68988 2.46737C7.57233 2.46737 7.4496 2.49063 7.32559 2.53971C6.75461 2.76578 6.59184 3.36777 6.8192 3.94133L8.34871 7.95886L6.15908 2.63143C5.98211 2.18317 5.61781 1.88477 5.1941 1.88477Z"
        fill="#875334"
      />
      <path
        d="M11.6594 4.41443L13.8413 3.56055"
        stroke="#B0BEC5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="0.569004"
      />
      <path
        d="M9.62105 3.08628L9.43115 1"
        stroke="#B0BEC5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="0.569004"
      />
      <path
        d="M11.0176 3.33822L12.4657 1.18994"
        stroke="#B0BEC5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="0.569004"
      />
      <defs>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(3.52938 6.42586) rotate(-47.026) scale(11.1324)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_3040_20840"
          r="1"
        >
          <stop offset="0.1797" stopColor="#8D5738" />
          <stop offset="1" stopColor="#A56C43" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(6.19943 5.35852) rotate(-21.6163) scale(11.3141)"
          gradientUnits="userSpaceOnUse"
          id="paint1_radial_3040_20840"
          r="1"
        >
          <stop offset="0.3533" stopColor="#A56C43" />
          <stop offset="0.8723" stopColor="#8D5738" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export const FireIcon: React.FC<IconProps> = ({ className, width = '13', height = '16', fill = 'none', ...props }) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 13 16"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.48277 4.89754C2.40677 5.7082 2.35343 7.14285 2.8321 7.75351C2.8321 7.75351 2.60677 6.17752 4.62675 4.20021C5.44007 3.40422 5.62807 2.32156 5.34407 1.50957C5.18274 1.04957 4.88808 0.669574 4.63208 0.404243C4.48275 0.248245 4.59741 -0.00908624 4.81475 0.000247007C6.1294 0.0589131 8.26005 0.424243 9.16537 2.69622C9.5627 3.69355 9.59204 4.7242 9.4027 5.7722C9.2827 6.44152 8.85604 7.92951 9.82937 8.11217C10.524 8.24284 10.86 7.69084 11.0107 7.29352C11.0734 7.12818 11.2907 7.08685 11.408 7.21885C12.5813 8.5535 12.6813 10.1255 12.4387 11.4788C11.9693 14.0948 9.32004 15.9988 6.68806 15.9988C3.40009 15.9988 0.782782 14.1175 0.104121 10.7122C-0.16921 9.3375 -0.030544 6.61752 2.08944 4.69754C2.24677 4.55354 2.5041 4.68154 2.48277 4.89754Z"
        fill="url(#paint0_radial_3040_20836)"
      />
      <defs>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(6.03688 16.0402) rotate(-179.751) scale(9.4116 15.4426)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_3040_20836"
          r="1"
        >
          <stop offset="0.3144" stopColor="#FF9800" />
          <stop offset="0.6616" stopColor="#FF6D00" />
          <stop offset="0.9715" stopColor="#F44336" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export const SaveIcon: React.FC<IconProps> = ({
  className,
  width = '40',
  height = '40',
  fill = 'none',
  stroke = 'black',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 40 40"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <rect height="40" rx="20" width="40" />
        <path
          d="M28.75 16.5594V27.5C28.75 27.6989 28.671 27.8897 28.5303 28.0303C28.3897 28.171 28.1989 28.25 28 28.25H13C12.8011 28.25 12.6103 28.171 12.4697 28.0303C12.329 27.8897 12.25 27.6989 12.25 27.5V12.5C12.25 12.3011 12.329 12.1103 12.4697 11.9697C12.6103 11.829 12.8011 11.75 13 11.75H23.9406C24.038 11.7497 24.1345 11.7685 24.2246 11.8055C24.3147 11.8425 24.3966 11.8969 24.4656 11.9656L28.5344 16.0344C28.6031 16.1034 28.6575 16.1853 28.6945 16.2754C28.7315 16.3655 28.7503 16.462 28.75 16.5594Z"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
        <path
          d="M16 28.25V22.25C16 22.0511 16.079 21.8603 16.2197 21.7197C16.3603 21.579 16.5511 21.5 16.75 21.5H24.25C24.4489 21.5 24.6397 21.579 24.7803 21.7197C24.921 21.8603 25 22.0511 25 22.25V28.25"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
        <path d="M22.75 14.75H17.5" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      </g>
    </svg>
  )
}

export const FacebookIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 40 40"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect fill="#595959" height={height} rx="20" width={width} />
      <path
        d="M21.6571 20.3648H25.3793L25.9637 16.5605H21.6563V14.4813C21.6563 12.901 22.1696 11.4996 23.6389 11.4996H26V8.17974C25.5852 8.12338 24.7078 8 23.05 8C19.5882 8 17.5587 9.8393 17.5587 14.0297V16.5605H14V20.3648H17.5587V30.821C18.2634 30.9276 18.9773 31 19.7101 31C20.3724 31 21.0189 30.9391 21.6571 30.8522V20.3648Z"
        fill="white"
      />
    </svg>
  )
}

export const FileTextIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 20 21"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.625 18H4.375C4.20924 18 4.05027 17.9342 3.93306 17.8169C3.81585 17.6997 3.75 17.5408 3.75 17.375V3.625C3.75 3.45924 3.81585 3.30027 3.93306 3.18306C4.05027 3.06585 4.20924 3 4.375 3H11.875L16.25 7.375V17.375C16.25 17.5408 16.1842 17.6997 16.0669 17.8169C15.9497 17.9342 15.7908 18 15.625 18Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M11.875 3V7.375H16.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M7.5 11.125H12.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M7.5 13.625H12.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

export const BackgroundTabIcon: React.FC<IconProps> = ({
  className = '',
  fill = 'none',
  width = '20',
  height = '20',
  stroke = 'black',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 21 20"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.75 3.125H4.25C3.90482 3.125 3.625 3.40482 3.625 3.75V16.25C3.625 16.5952 3.90482 16.875 4.25 16.875H16.75C17.0952 16.875 17.375 16.5952 17.375 16.25V3.75C17.375 3.40482 17.0952 3.125 16.75 3.125Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M17.375 12.4999L14.0703 9.19524C14.0122 9.13619 13.9428 9.08929 13.8664 9.05728C13.7899 9.02527 13.7079 9.00879 13.625 9.00879C13.5421 9.00879 13.4601 9.02527 13.3836 9.05728C13.3072 9.08929 13.2378 9.13619 13.1797 9.19524L9.69531 12.6796C9.63716 12.7387 9.56784 12.7856 9.49139 12.8176C9.41494 12.8496 9.33288 12.8661 9.25 12.8661C9.16712 12.8661 9.08506 12.8496 9.00861 12.8176C8.93216 12.7856 8.86284 12.7387 8.80469 12.6796L7.19531 11.0702C7.13716 11.0112 7.06784 10.9643 6.99139 10.9323C6.91494 10.9003 6.83288 10.8838 6.75 10.8838C6.66712 10.8838 6.58506 10.9003 6.50861 10.9323C6.43216 10.9643 6.36284 11.0112 6.30469 11.0702L3.625 13.7499"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.3125 8.125C8.83027 8.125 9.25 7.70527 9.25 7.1875C9.25 6.66973 8.83027 6.25 8.3125 6.25C7.79473 6.25 7.375 6.66973 7.375 7.1875C7.375 7.70527 7.79473 8.125 8.3125 8.125Z" />
    </svg>
  )
}

export const NFTTabIcon: React.FC<IconProps> = ({
  className = '',
  fill = 'none',
  width = '20',
  height = '20',
  stroke = 'black',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 21 20"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.8984 12.7735L11.0859 17.7579C11.0415 17.8775 10.9616 17.9806 10.8568 18.0535C10.7521 18.1263 10.6276 18.1654 10.5 18.1654C10.3724 18.1654 10.2479 18.1263 10.1431 18.0535C10.0384 17.9806 9.95844 17.8775 9.91404 17.7579L8.10154 12.7735C8.06988 12.6876 8.01996 12.6095 7.95522 12.5448C7.89048 12.4801 7.81245 12.4301 7.72654 12.3985L2.74216 10.586C2.62255 10.5416 2.5194 10.4616 2.44655 10.3569C2.3737 10.2522 2.33466 10.1276 2.33466 10C2.33466 9.87245 2.3737 9.74792 2.44655 9.64318C2.5194 9.53844 2.62255 9.4585 2.74216 9.4141L7.72654 7.6016C7.81245 7.56994 7.89048 7.52002 7.95522 7.45528C8.01996 7.39054 8.06988 7.31251 8.10154 7.2266L9.91404 2.24223C9.95844 2.12262 10.0384 2.01946 10.1431 1.94661C10.2479 1.87376 10.3724 1.83472 10.5 1.83472C10.6276 1.83472 10.7521 1.87376 10.8568 1.94661C10.9616 2.01946 11.0415 2.12262 11.0859 2.24223L12.8984 7.2266C12.9301 7.31251 12.98 7.39054 13.0447 7.45528C13.1095 7.52002 13.1875 7.56994 13.2734 7.6016L18.2578 9.4141C18.3774 9.4585 18.4806 9.53844 18.5534 9.64318C18.6263 9.74792 18.6653 9.87245 18.6653 10C18.6653 10.1276 18.6263 10.2522 18.5534 10.3569C18.4806 10.4616 18.3774 10.5416 18.2578 10.586L13.2734 12.3985C13.1875 12.4301 13.1095 12.4801 13.0447 12.5448C12.98 12.6095 12.9301 12.6876 12.8984 12.7735V12.7735Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export const BorderTabIcon: React.FC<IconProps> = ({
  className = '',
  fill = 'none',
  width = '20',
  height = '20',
  stroke = 'black',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 21 20"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13 6.25H15.5V8.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 13.75H5.5V11.25" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M17.375 3.75H3.625C3.27982 3.75 3 4.02982 3 4.375V15.625C3 15.9702 3.27982 16.25 3.625 16.25H17.375C17.7202 16.25 18 15.9702 18 15.625V4.375C18 4.02982 17.7202 3.75 17.375 3.75Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export const ElementTabIcon: React.FC<IconProps> = ({
  className = '',
  fill = 'none',
  width = '20',
  height = '20',
  stroke = 'black',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={height}
      viewBox="0 0 21 20"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.4375 8.75C7.9908 8.75 9.25 7.4908 9.25 5.9375C9.25 4.3842 7.9908 3.125 6.4375 3.125C4.8842 3.125 3.625 4.3842 3.625 5.9375C3.625 7.4908 4.8842 8.75 6.4375 8.75Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M14.5625 8.75C16.1158 8.75 17.375 7.4908 17.375 5.9375C17.375 4.3842 16.1158 3.125 14.5625 3.125C13.0092 3.125 11.75 4.3842 11.75 5.9375C11.75 7.4908 13.0092 8.75 14.5625 8.75Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M6.4375 16.875C7.9908 16.875 9.25 15.6158 9.25 14.0625C9.25 12.5092 7.9908 11.25 6.4375 11.25C4.8842 11.25 3.625 12.5092 3.625 14.0625C3.625 15.6158 4.8842 16.875 6.4375 16.875Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M14.5625 11.875V16.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M16.75 14.0625H12.375" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}
export const ShadowIcon: React.FC<IconProps> = ({
  className = '',
  fill = '#595959',
  width = '20',
  height = '20',
  stroke = '#595959',
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 20 20"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className}
    >
      <path
        d="M12.5 18.125C15.6066 18.125 18.125 15.6066 18.125 12.5C18.125 9.3934 15.6066 6.875 12.5 6.875C9.3934 6.875 6.875 9.3934 6.875 12.5C6.875 15.6066 9.3934 18.125 12.5 18.125Z"
        fill="#595959"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 13.125C10.6066 13.125 13.125 10.6066 13.125 7.5C13.125 4.3934 10.6066 1.875 7.5 1.875C4.3934 1.875 1.875 4.3934 1.875 7.5C1.875 10.6066 4.3934 13.125 7.5 13.125Z"
        fill="#F6F6F6"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}
export const TransparencyIcon: React.FC<IconProps> = ({
  className = 'stroke-neutral-400',
  fill = 'none',
  width = '20',
  height = '20',
  stroke = '#595959',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill="none"
      height={width}
      viewBox="0 0 20 20"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.5 13.125C10.6066 13.125 13.125 10.6066 13.125 7.5C13.125 4.3934 10.6066 1.875 7.5 1.875C4.3934 1.875 1.875 4.3934 1.875 7.5C1.875 10.6066 4.3934 13.125 7.5 13.125Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M12.5 18.125C15.6066 18.125 18.125 15.6066 18.125 12.5C18.125 9.3934 15.6066 6.875 12.5 6.875C9.3934 6.875 6.875 9.3934 6.875 12.5C6.875 15.6066 9.3934 18.125 12.5 18.125Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M9.57031 7.69531L12.3047 10.4297" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M7.69531 9.57031L10.4297 12.3047" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}
export const ArrowLineUp: React.FC<IconProps> = ({
  className = 'stroke-neutral-400',
  fill = 'none',
  width = '20',
  height = '20',
  stroke = '#595959',
  ...props
}) => {
  return (
    <svg
      height={height}
      width={width}
      {...props}
      className={className}
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 17.5V5.625" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M4.375 11.25L10 5.625L15.625 11.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M3.125 3.125H16.875" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}
export const ArrowLineDown: React.FC<IconProps> = ({
  className = 'stroke-neutral-400',
  fill = 'none',
  width = '20',
  height = '20',
  stroke = '#595959',
  ...props
}) => {
  return (
    <svg
      height={height}
      width={width}
      {...props}
      className={className}
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 2.5V14.375" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M4.375 8.75L10 14.375L15.625 8.75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M3.125 16.875H16.875" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

export const WarningIcon: React.FC<IconProps> = ({
  className = 'stroke-neutral-100 dark:stroke-neutral-800 fill-neutral-100 dark:fill-neutral-800',
  fill = 'none',
  width = '20',
  height = '20',
  stroke = '#595959',
  ...props
}) => {
  return (
    <svg
      height={height}
      width={width}
      {...props}
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 9.75V13.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M10.7063 3.74999L2.45634 18C2.32491 18.2276 2.2556 18.4858 2.25537 18.7487C2.25514 19.0115 2.32398 19.2698 2.45501 19.4977C2.58604 19.7256 2.77465 19.915 3.00194 20.0471C3.22923 20.1791 3.48723 20.2491 3.75009 20.25H20.2501C20.5129 20.2491 20.7709 20.1791 20.9982 20.0471C21.2255 19.915 21.4141 19.7256 21.5452 19.4977C21.6762 19.2698 21.745 19.0115 21.7448 18.7487C21.7446 18.4858 21.6753 18.2276 21.5438 18L13.2938 3.74999C13.1634 3.52206 12.975 3.33263 12.7479 3.20088C12.5207 3.06914 12.2627 2.99976 12.0001 2.99976C11.7375 2.99976 11.4795 3.06914 11.2523 3.20088C11.0251 3.33263 10.8368 3.52206 10.7063 3.74999V3.74999Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M13.0625 16.875C13.0625 17.4618 12.5868 17.9375 12 17.9375C11.4132 17.9375 10.9375 17.4618 10.9375 16.875C10.9375 16.2882 11.4132 15.8125 12 15.8125C12.5868 15.8125 13.0625 16.2882 13.0625 16.875Z"
        strokeWidth="0.125"
      />
    </svg>
  )
}

export const CircleCheckIcon: React.FC<IconProps> = ({
  className = 'stroke-neutral-100 dark:stroke-neutral-800',
  fill = 'none',
  width = '20',
  height = '20',
  stroke = '#595959',
  ...props
}) => {
  return (
    <svg
      height={height}
      width={width}
      {...props}
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.125 9.75L10.6219 15L7.875 12.375" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const DownloadSimpleIcon: React.FC<IconProps> = ({
  className = 'stroke-neutral-100 dark:stroke-neutral-800',
  fill = 'none',
  width = '32',
  height = '32',
  stroke = '#141414',
  ...props
}) => {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      viewBox="0 0 32 32"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.75 13.75L16 19L21.25 13.75"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M16 5V19" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M27 19V26C27 26.2652 26.8946 26.5196 26.7071 26.7071C26.5196 26.8946 26.2652 27 26 27H6C5.73478 27 5.48043 26.8946 5.29289 26.7071C5.10536 26.5196 5 26.2652 5 26V19"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}
export const RightAnnouncementIcon: React.FC<IconProps> = ({
  className = 'stroke-neutral-100 dark:stroke-neutral-800',
  height = '32',
  fill = 'none',
  stroke = '#141414',
  width = '32',
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
      {' '}
      <path
        d="M9.74997 7.5V19.0969C9.75111 19.2215 9.72078 19.3444 9.66179 19.4542C9.60279 19.564 9.51704 19.6572 9.41247 19.725L8.38122 20.4094C8.28131 20.4761 8.16685 20.5178 8.04746 20.531C7.92807 20.5443 7.80724 20.5287 7.69515 20.4855C7.58306 20.4423 7.48297 20.3728 7.40333 20.2829C7.32368 20.193 7.2668 20.0852 7.23747 19.9688L5.99997 15"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M6 14.9987C5.00544 14.9987 4.05161 14.6037 3.34835 13.9004C2.64509 13.1971 2.25 12.2433 2.25 11.2487C2.25 10.2542 2.64509 9.30036 3.34835 8.59709C4.05161 7.89383 5.00544 7.49874 6 7.49874H9.75C9.75 7.49874 14.8594 7.49874 19.7719 3.38312C19.8811 3.2927 20.0138 3.23512 20.1545 3.21705C20.2951 3.19898 20.4381 3.22117 20.5666 3.28104C20.6952 3.3409 20.8041 3.436 20.8809 3.55529C20.9576 3.67458 20.9989 3.81317 21 3.95499V18.5425C20.9989 18.6843 20.9576 18.8229 20.8809 18.9422C20.8041 19.0615 20.6952 19.1566 20.5666 19.2165C20.4381 19.2763 20.2951 19.2985 20.1545 19.2804C20.0138 19.2624 19.8811 19.2048 19.7719 19.1144C14.8594 14.9987 9.75 14.9987 9.75 14.9987H6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}
export const LeftAnnouncementIcon: React.FC<IconProps> = ({
  className = 'stroke-neutral-100 dark:stroke-neutral-800',
  height = '32',
  fill = 'none',
  stroke = '#141414',
  width = '32',
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
      {' '}
      <path
        d="M14.25 7.5V19.0969C14.2489 19.2215 14.2792 19.3444 14.3382 19.4542C14.3972 19.564 14.483 19.6572 14.5875 19.725L15.6188 20.4094C15.7187 20.4761 15.8331 20.5178 15.9525 20.531C16.0719 20.5443 16.1928 20.5287 16.3049 20.4855C16.4169 20.4423 16.517 20.3728 16.5967 20.2829C16.6763 20.193 16.7332 20.0852 16.7625 19.9688L18 15"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M18 15.0007C18.9946 15.0007 19.9484 14.6056 20.6517 13.9023C21.3549 13.1991 21.75 12.2453 21.75 11.2507C21.75 10.2561 21.3549 9.30231 20.6517 8.59905C19.9484 7.89579 18.9946 7.5007 18 7.5007H14.25C14.25 7.5007 9.14062 7.5007 4.22812 3.38507C4.11886 3.29465 3.9862 3.23707 3.84553 3.219C3.70486 3.20093 3.56195 3.22312 3.43338 3.28299C3.30481 3.34286 3.19585 3.43795 3.11914 3.55724C3.04244 3.67653 3.00112 3.81513 3 3.95695V18.5444C3.00112 18.6863 3.04244 18.8249 3.11914 18.9442C3.19585 19.0634 3.30481 19.1585 3.43338 19.2184C3.56195 19.2783 3.70486 19.3005 3.84553 19.2824C3.9862 19.2643 4.11886 19.2067 4.22812 19.1163C9.14062 15.0007 14.25 15.0007 14.25 15.0007H18Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}
export const LazyLeoIcon: React.FC<IconProps> = ({
  className = 'fill-neutral-100 dark:fill-neutral-800',
  height = '24',
  fill = 'fill-neutral-100 dark:fill-neutral-800',
  width = '24',
  ...props
}) => {
  return (
    <svg className={className} fill={fill} height={height} viewBox="0 0 24 24" width={width} {...props}>
      <path
        d="M12.4219 22.4473C11.9567 22.4473 11.5192 22.4995 11.1006 22.4347C10.5072 22.3429 9.92325 22.1814 9.34306 22.0198C8.86281 21.8859 8.3788 21.7439 7.92495 21.5427C7.44471 21.3296 6.98709 21.0593 6.53954 20.7821C6.02849 20.4653 5.52122 20.1359 5.04726 19.767C4.65565 19.4627 4.31118 19.0975 3.95414 18.7499C3.76745 18.5682 3.56756 18.3872 3.42864 18.1703C2.93017 17.3896 2.43044 16.6077 1.98162 15.798C1.73647 15.3568 1.54475 14.8721 1.41526 14.3843C1.26251 13.806 1.22228 13.1988 1.09908 12.6117C0.868386 11.5123 1.04439 10.4217 1.16571 9.33549C1.216 8.88479 1.41337 8.44855 1.55669 8.00979C1.65287 7.71561 1.76727 7.42708 1.87979 7.13919C2.18654 6.35345 2.58884 5.6136 3.1112 4.95609C3.42864 4.55631 3.62099 4.15589 3.70082 3.64422C3.84225 2.74093 4.5645 1.83451 5.67208 1.83891C5.75568 1.83891 5.84369 1.81691 5.92289 1.83451C6.44148 1.95017 6.87835 1.73016 7.31271 1.5045C8.01924 1.1374 8.79618 0.986536 9.54358 0.743271C10.7863 0.33783 12.0359 0.566008 13.278 0.547151C13.8381 0.538979 14.4051 0.799216 14.9639 0.956363C15.2914 1.04877 15.6133 1.16568 15.9294 1.29266C16.2513 1.42215 16.5605 1.5837 16.8799 1.7201C17.0012 1.77165 17.1344 1.81313 17.2652 1.82193C17.4733 1.83576 17.6857 1.83639 17.8925 1.81188C18.7631 1.70627 19.3188 2.25629 19.8506 2.79374C20.0291 2.97414 20.1083 3.3073 20.1272 3.57822C20.1643 4.11189 20.4553 4.48213 20.7752 4.86117C21.2876 5.46776 21.7232 6.1259 22.0305 6.86449C22.2493 7.38937 22.507 7.89727 22.7189 8.42466C22.837 8.71947 22.9489 9.03439 22.9715 9.34743C23.0482 10.3834 23.426 11.396 23.211 12.4564C23.1281 12.8644 23.1224 13.29 23.0187 13.6916C22.8509 14.341 22.6485 14.9828 22.4266 15.6164C22.2895 16.0074 22.1148 16.3902 21.9136 16.7522C21.6414 17.2413 21.3523 17.7259 21.0223 18.1773C20.7036 18.6135 20.3491 19.0303 19.9644 19.4087C19.5658 19.8009 19.1359 20.1724 18.6764 20.4898C17.8152 21.0851 16.8742 21.5654 15.8835 21.8822C14.7565 22.2424 13.6099 22.6252 12.4225 22.4485L12.4219 22.4473ZM2.50775 11.5645C2.93268 11.7744 2.95845 11.8341 2.82331 12.2358C2.79062 12.3339 2.76547 12.4388 2.7617 12.5413C2.74662 12.9493 2.76485 13.3597 2.7265 13.7652C2.65107 14.5673 2.94022 15.3128 3.07663 16.079C3.15017 16.4939 3.39595 16.8811 3.58202 17.2721C3.65242 17.4204 3.76305 17.5524 3.87117 17.6782C4.24455 18.1113 4.62171 18.5418 5.00829 18.9624C5.05795 19.0164 5.18681 19.0447 5.25407 19.0196C5.3031 19.0007 5.31127 18.8744 5.33767 18.7958C5.36219 18.7235 5.36784 18.6135 5.41687 18.589C5.47533 18.5594 5.59665 18.5739 5.64568 18.6185C5.78963 18.7512 5.90906 18.9102 6.04232 19.0554C6.54142 19.6016 6.97955 20.229 7.561 20.6652C8.02616 21.0141 8.65726 21.1587 9.2318 21.3384C9.73467 21.4956 10.2602 21.588 10.78 21.6848C11.044 21.7338 11.3325 21.7923 11.584 21.7351C12.2497 21.583 12.9072 21.3875 13.5578 21.1756C14.0235 21.0241 14.4724 20.8186 14.9287 20.6382C15.167 20.5439 15.4046 20.5232 15.6082 20.7067C15.8678 20.9412 16.1406 20.8997 16.426 20.7771C16.5505 20.7237 16.6894 20.6916 16.7982 20.6156C17.2646 20.2906 17.8045 20.0498 18.1056 19.5281C18.3225 19.1522 18.5437 18.7776 18.7399 18.3903C18.9856 17.907 19.1987 17.4066 19.4445 16.9232C19.5388 16.7372 19.6846 16.5775 19.8072 16.4059C19.9436 16.5517 20.0813 16.6963 20.2152 16.844C20.2422 16.8742 20.2529 16.9194 20.2774 16.9521C20.4144 17.1357 20.63 17.1476 20.7394 16.9509C20.9368 16.5957 21.1845 16.2412 21.2681 15.8559C21.4196 15.155 21.4654 14.4315 21.5553 13.7174C21.5566 13.7073 21.5541 13.6967 21.5528 13.686C21.4485 12.7519 21.3554 11.8159 21.2322 10.8837C21.1989 10.631 21.0675 10.3921 20.9978 10.1426C20.9751 10.0609 21.0053 9.96471 21.0116 9.87482C21.0933 9.89368 21.2121 9.88425 21.2517 9.93579C21.4315 10.1715 21.6232 10.4091 21.7427 10.6763C21.8256 10.863 21.8923 11.0717 22.0997 11.0195C22.1934 10.9962 22.2298 10.7297 22.2839 10.5707C22.2952 10.5367 22.2663 10.4908 22.26 10.4494C22.2235 10.2143 22.1852 9.97979 22.1531 9.74407C22.1217 9.51652 22.133 9.2764 22.0626 9.06205C21.8677 8.46615 21.6201 7.88721 21.4315 7.28942C21.2341 6.66209 20.8922 6.11961 20.5383 5.5784C20.1328 4.95672 20.1435 4.96615 19.513 5.37913C19.41 5.44639 19.2019 5.38731 19.0579 5.33827C19.0152 5.32382 18.9919 5.13335 19.0227 5.04598C19.09 4.85363 19.1975 4.67574 19.288 4.49156C19.5772 3.90509 19.403 3.35507 19.024 2.92008C18.6676 2.51024 18.1157 2.46813 17.6027 2.5907C17.2558 2.67368 16.9371 2.86854 16.5976 2.99174C16.514 3.02192 16.3544 3.00243 16.3104 2.9446C16.25 2.86414 16.2217 2.70951 16.2563 2.61522C16.4003 2.22863 16.3393 2.0564 15.9395 1.93319C15.6038 1.83011 15.2392 1.79993 14.9237 1.65724C14.2674 1.36181 13.5571 1.38632 12.8751 1.25117C12.178 1.11351 11.4878 1.29643 10.7913 1.38381C9.98988 1.48438 9.22677 1.6805 8.47434 1.94828C8.26062 2.02434 8.06073 2.14189 7.84512 2.21229C7.5434 2.31035 7.45917 2.51716 7.63077 2.78808C7.6842 2.87231 7.72883 2.9622 7.77723 3.0502C7.75335 3.07346 7.73009 3.09735 7.7062 3.1206C7.51763 3.02066 7.32716 2.92448 7.1411 2.82014C6.21707 2.30406 5.53693 2.35687 4.82348 3.14135C4.31558 3.69954 4.35015 4.3891 4.55256 5.07112C4.60096 5.2333 4.69902 5.38102 4.77382 5.53502C4.75371 5.55451 4.73359 5.57337 4.71348 5.59285C4.63051 5.54508 4.54627 5.49919 4.46393 5.44954C4.16661 5.27039 3.9114 5.31376 3.74042 5.61108C3.40852 6.18562 3.07788 6.76266 2.78245 7.35668C2.63221 7.65903 2.55867 8.00036 2.45306 8.32534C2.30849 8.7685 2.1174 9.20411 2.03631 9.65858C1.93385 10.2325 1.90493 10.8215 1.8823 11.4061C1.87665 11.5513 1.97911 11.7581 2.09791 11.8379C2.28775 11.9649 2.34746 11.7405 2.43169 11.6173C2.44804 11.5934 2.48135 11.5808 2.50524 11.5645H2.50775Z"
        fill={fill}
      />
      <path
        d="M11.8192 3.05959C13.5101 3.0181 14.9176 3.50086 16.1483 4.50472C16.3011 4.62981 16.5054 4.70021 16.6374 4.84102C17.0328 5.2628 17.2867 5.77573 17.5752 6.2742C17.8663 6.77708 17.6771 7.15297 17.5734 7.60179C17.4382 8.18701 17.3647 8.78668 17.2641 9.38007C17.2521 9.45236 17.2572 9.53722 17.2201 9.59379C16.8775 10.1092 17.1905 10.5172 17.4168 10.9516C17.5683 11.2413 17.6695 11.5575 17.7984 11.8592C17.9071 12.1138 18.0316 12.3615 18.1359 12.6179C18.2799 12.9712 18.4169 13.3283 18.547 13.6872C18.7268 14.1838 18.5074 14.6018 18.2189 14.9639C17.4206 15.9646 16.3828 16.6598 15.2092 17.1369C14.7661 17.3173 14.2764 17.4066 13.8112 17.5291C13.0921 17.719 12.385 17.7246 11.6709 17.7095C11.1781 17.6989 10.6897 17.5455 10.195 17.5046C9.4331 17.4411 8.77245 17.1099 8.13632 16.7415C7.294 16.2537 6.48501 15.6936 6.01231 14.8067C5.81241 14.4321 5.70995 13.9977 5.61504 13.5784C5.58235 13.4339 5.7043 13.2528 5.76087 13.09C5.77784 13.0416 5.81933 13.0014 5.83504 12.9524C6.00225 12.4451 6.15374 11.9322 6.33603 11.4305C6.45735 11.0968 6.61198 10.773 6.77039 10.4543C6.91559 10.1614 6.92816 9.87855 6.77856 9.58814C6.74524 9.52402 6.69621 9.46242 6.68238 9.3939C6.57489 8.86777 6.47935 8.33913 6.36746 7.81425C6.3266 7.62253 6.22854 7.44275 6.19334 7.25103C6.06448 6.54701 6.24677 5.94105 6.69747 5.36777C7.1708 4.76621 7.71202 4.25517 8.3865 3.92013C8.91263 3.65926 9.50665 3.53857 10.0409 3.29154C10.6538 3.00804 11.2918 3.10045 11.8192 3.05959ZM15.9396 11.3916C16.0704 11.3205 16.1106 11.2853 16.1565 11.2759C16.6531 11.1734 16.6349 11.1772 16.4758 10.6844C16.369 10.3525 16.2615 9.99672 16.2722 9.65477C16.2973 8.85394 16.5802 8.09272 16.7373 7.31138C16.8159 6.92102 17.0252 6.53193 16.6537 6.17803C16.6399 6.16483 16.6349 6.14031 16.6311 6.1202C16.545 5.67013 16.2665 5.32566 15.9585 5.02331C15.2759 4.3526 14.4317 4.01505 13.4913 3.83841C12.2523 3.6052 11.0568 3.72589 9.88317 4.13196C9.51104 4.26083 9.15589 4.4538 8.81708 4.6581C8.213 5.02268 7.7227 5.51927 7.32983 6.10386C7.206 6.28803 7.08845 6.5005 7.05137 6.71485C6.91559 7.49367 7.0916 8.26181 7.34492 8.97778C7.50898 9.44105 7.5731 9.88546 7.54607 10.3487C7.5291 10.6479 7.39395 10.9384 7.33989 11.2382C7.3248 11.3224 7.38578 11.4494 7.45304 11.5129C7.58441 11.6367 7.7447 11.7297 7.91757 11.853C7.6259 12.066 7.37195 12.2458 7.12365 12.4338C6.95079 12.5645 6.93005 12.684 7.14 12.8204C7.26697 12.9033 7.35812 13.0416 7.43921 13.1277C7.15194 13.4464 6.91245 13.7205 6.66227 13.9851C6.51204 14.1442 6.52146 14.2906 6.63587 14.4629C6.76284 14.654 6.87159 14.8564 6.99165 15.0519C7.34303 15.627 7.85911 16.0098 8.45753 16.2933C8.56062 16.3424 8.67753 16.3618 8.77937 16.4115C9.23887 16.6359 9.69459 16.8597 10.2276 16.8452C10.4357 16.8396 10.6457 16.8697 10.8537 16.8899C11.9424 16.9967 13.0186 16.9483 14.0696 16.6158C14.3864 16.5158 14.7208 16.4429 15.01 16.2883C15.6574 15.9407 16.3181 15.5981 16.9027 15.1587C17.2729 14.8802 17.5281 14.4415 17.8041 14.0524C17.8669 13.9638 17.8512 13.7519 17.7852 13.6551C17.684 13.5068 17.5143 13.4005 17.3634 13.2912C17.1025 13.1026 16.831 12.9291 16.5708 12.7399C16.5092 12.6946 16.4746 12.6117 16.4274 12.5463C16.5745 12.4979 16.6726 12.5161 16.7713 12.5325C17.0422 12.5765 17.1453 12.4872 17.1195 12.2119C17.0906 11.9014 16.8486 11.797 16.6009 11.6958C16.3985 11.6135 16.2024 11.5135 15.9396 11.3916Z"
        fill={fill}
      />
      <path
        d="M11.8517 8.58055C12.4652 8.40391 12.9417 8.82318 13.4307 9.19971C13.6564 9.3732 13.608 9.60138 13.4615 9.78304C13.1611 10.1552 12.8172 10.4934 12.5249 10.8718C12.4011 11.0321 12.303 11.2546 12.2949 11.4532C12.2641 12.1943 12.2716 12.9373 12.2735 13.6797C12.2747 14.1511 12.8222 14.4554 13.3169 14.263C13.53 14.18 13.7331 14.0675 13.9506 14.0009C14.0354 13.9751 14.1756 14.0097 14.2372 14.0707C14.2869 14.1197 14.2969 14.3014 14.2536 14.3359C14.0555 14.4943 13.8487 14.6942 13.6162 14.7439C13.1717 14.8388 12.7034 14.8809 12.3244 14.4987C12.2798 14.4541 12.1006 14.483 12.0258 14.5371C11.484 14.9249 10.9025 14.9017 10.3311 14.6691C10.0382 14.5496 9.78741 14.3234 9.52717 14.1323C9.47688 14.0952 9.4706 13.9984 9.44357 13.9286C9.52717 13.9361 9.62586 13.9179 9.69249 13.9556C10.1652 14.2259 10.6699 14.2385 11.1672 14.0964C11.3947 14.0317 11.5462 13.8129 11.5317 13.5338C11.489 12.7098 11.4331 11.8857 11.4167 11.0603C11.4098 10.7196 11.3312 10.4588 11.049 10.2488C10.8755 10.12 10.7353 9.9427 10.5951 9.77487C10.4198 9.56429 10.2758 9.28583 10.4499 9.06142C10.6146 8.84958 10.89 8.69621 11.1477 8.59438C11.3287 8.52272 11.5607 8.58055 11.8517 8.58055Z"
        fill={fill}
      />
      <path
        d="M8.64162 7.66466C8.64162 7.46602 8.61522 7.26299 8.6523 7.07126C8.67242 6.96755 8.78305 6.82989 8.88048 6.80097C9.17781 6.71234 9.56062 7.06435 9.54553 7.3755C9.52479 7.79226 9.51787 8.20902 9.48833 8.62514C9.48016 8.74018 9.44056 8.92247 9.36953 8.94761C9.26832 8.98407 9.11746 8.92309 9.00243 8.87092C8.73276 8.74772 8.64036 8.51262 8.64413 8.22913C8.64665 8.04118 8.64413 7.85323 8.64413 7.66528L8.64162 7.66466Z"
        fill={fill}
      />
      <path
        d="M14.9586 7.78848C14.9586 7.98649 14.9844 8.18953 14.9504 8.38187C14.9228 8.54028 14.8253 8.81435 14.7574 8.81435C14.5425 8.8156 14.2583 8.76406 14.2187 8.49188C14.1546 8.05375 14.1062 7.60493 14.1295 7.16492C14.1653 6.49421 14.198 6.48918 14.7694 6.82485C14.8643 6.8808 14.9479 7.02034 14.9636 7.13161C14.9944 7.34658 14.9724 7.56911 14.9724 7.78786C14.9674 7.78786 14.9636 7.78848 14.9586 7.78848Z"
        fill={fill}
      />
    </svg>
  )
}

export const StarIcon: React.FC<IconProps> = ({
  className = 'fill-neutral-100 dark:fill-neutral-800',
  height = '20',
  fill = '#595959',
  width = '20',
  ...props
}) => {
  return (
    <svg
      fill={fill}
      className={className}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.27528 4.92061C6.61264 4.84584 6.87611 4.58236 6.95088 4.24501L7.73954 0.696968C7.94605 -0.232323 9.27055 -0.232323 9.47706 0.696968L10.2657 4.24501C10.3405 4.58236 10.604 4.84584 10.9413 4.92061L14.4894 5.70926C15.4186 5.91577 15.4186 7.24028 14.4894 7.44679L10.9413 8.23544C10.604 8.31021 10.3405 8.57369 10.2657 8.91104L9.47706 12.4591C9.27055 13.3884 7.94605 13.3884 7.73954 12.4591L6.95088 8.91104C6.87611 8.57369 6.61264 8.31021 6.27528 8.23544L2.72724 7.44679C1.79795 7.24028 1.79795 5.91577 2.72724 5.70926L6.27528 4.92061Z" />
      <path d="M1.62836 12.7356C1.96572 12.6608 2.22919 12.3974 2.30396 12.06L2.54519 10.974C2.63153 10.5842 3.18697 10.5842 3.27331 10.974L3.51453 12.06C3.5893 12.3974 3.85278 12.6608 4.19014 12.7356L5.27609 12.9768C5.66597 13.0632 5.66597 13.6186 5.27609 13.705L4.19014 13.9462C3.85278 14.0209 3.5893 14.2844 3.51453 14.6218L3.27331 15.7077C3.18697 16.0976 2.63153 16.0976 2.54519 15.7077L2.30396 14.6218C2.22919 14.2844 1.96572 14.0209 1.62836 13.9462L0.542406 13.705C0.152531 13.6186 0.152531 13.0632 0.542406 12.9768L1.62836 12.7356Z" />
    </svg>
  )
}

export const ItemsTabIcon: React.FC<IconProps> = ({
  className = 'stroke-neutral-100 dark:stroke-neutral-800',
  height = '20',
  width = '20',
  ...props
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M17.1875 13.6949V6.3043C17.1869 6.19303 17.157 6.08388 17.1007 5.98787C17.0445 5.89186 16.9639 5.81237 16.8672 5.75742L10.3047 2.04648C10.2121 1.993 10.107 1.96484 10 1.96484C9.89303 1.96484 9.78795 1.993 9.69531 2.04648L3.13281 5.75742C3.03606 5.81237 2.9555 5.89186 2.89926 5.98787C2.84302 6.08388 2.8131 6.19303 2.8125 6.3043V13.6949C2.8131 13.8062 2.84302 13.9153 2.89926 14.0113C2.9555 14.1074 3.03606 14.1868 3.13281 14.2418L9.69531 17.9527C9.78795 18.0062 9.89303 18.0344 10 18.0344C10.107 18.0344 10.2121 18.0062 10.3047 17.9527L16.8672 14.2418C16.9639 14.1868 17.0445 14.1074 17.1007 14.0113C17.157 13.9153 17.1869 13.8062 17.1875 13.6949V13.6949Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const UploadItemIcon: React.FC<IconProps> = ({
  className = ' fill-[#F6F6F6]',
  stroke = 'black',
  height = '41',
  width = '41',
  ...props
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 41 41"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.686523" y="0.695312" width="40" height="40" rx="20" />
      <path
        d="M16.749 16.3828L20.6865 12.4453L24.624 16.3828"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.6865 22.9453V12.4453"
        strokeWidth="1.4"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.9365 22.9453V28.1953C28.9365 28.3942 28.8575 28.585 28.7169 28.7256C28.5762 28.8663 28.3854 28.9453 28.1865 28.9453H13.1865C12.9876 28.9453 12.7968 28.8663 12.6562 28.7256C12.5155 28.585 12.4365 28.3942 12.4365 28.1953V22.9453"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={stroke}
      />
    </svg>
  )
}

export const WalletIcon: React.FC<IconProps> = ({
  className = '',
  height = '24',
  fill = 'black',
  width = '24',
  stroke = 'black',
  ...props
}) => {
  return (
    <svg className={className} fill="none" height={height} viewBox="0 0 19 20" width={width} {...props}>
      <path
        d="M2.96875 5V15C2.96875 15.3315 3.09386 15.6495 3.31656 15.8839C3.53926 16.1183 3.84131 16.25 4.15625 16.25H16.0312C16.1887 16.25 16.3397 16.1842 16.4511 16.0669C16.5624 15.9497 16.625 15.7908 16.625 15.625V6.875C16.625 6.70924 16.5624 6.55027 16.4511 6.43306C16.3397 6.31585 16.1887 6.25 16.0312 6.25H4.15625C3.84131 6.25 3.53926 6.1183 3.31656 5.88388C3.09386 5.64946 2.96875 5.33152 2.96875 5ZM2.96875 5C2.96875 4.66848 3.09386 4.35054 3.31656 4.11612C3.53926 3.8817 3.84131 3.75 4.15625 3.75H14.25"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3594 12.1875C13.8513 12.1875 14.25 11.7678 14.25 11.25C14.25 10.7322 13.8513 10.3125 13.3594 10.3125C12.8675 10.3125 12.4688 10.7322 12.4688 11.25C12.4688 11.7678 12.8675 12.1875 13.3594 12.1875Z"
        fill={fill}
      />
    </svg>
  )
}
