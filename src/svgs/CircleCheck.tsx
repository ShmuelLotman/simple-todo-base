import { TSVGProps } from './types'

export const CircleCheck = ({
  width = 16,
  height = 16,
  viewBox = '0 0 16 16',
  fill,
}: TSVGProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.99992 2.66683C5.0544 2.66683 2.66659 5.05464 2.66659 8.00016C2.66659 10.9457 5.0544 13.3335 7.99992 13.3335C10.9454 13.3335 13.3333 10.9457 13.3333 8.00016C13.3333 5.05464 10.9454 2.66683 7.99992 2.66683ZM1.33325 8.00016C1.33325 4.31826 4.31802 1.3335 7.99992 1.3335C11.6818 1.3335 14.6666 4.31826 14.6666 8.00016C14.6666 11.6821 11.6818 14.6668 7.99992 14.6668C4.31802 14.6668 1.33325 11.6821 1.33325 8.00016ZM10.4713 6.19543C10.7317 6.45577 10.7317 6.87788 10.4713 7.13823L7.80466 9.8049C7.54431 10.0653 7.1222 10.0653 6.86185 9.8049L5.52851 8.47157C5.26816 8.21122 5.26816 7.78911 5.52851 7.52876C5.78886 7.26841 6.21097 7.26841 6.47132 7.52876L7.33325 8.39069L9.52851 6.19543C9.78886 5.93508 10.211 5.93508 10.4713 6.19543Z"
        fill={fill ?? 'white'}
      />
    </svg>
  )
}
