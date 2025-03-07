import { TSVGProps } from './types'

export const Plus = ({
  width = 20,
  height = 20,
  viewBox = '0 0 20 20',
  color,
  fill,
}: TSVGProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      color={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 3.3335C10.4603 3.3335 10.8334 3.70659 10.8334 4.16683V9.16683H15.8334C16.2936 9.16683 16.6667 9.53993 16.6667 10.0002C16.6667 10.4604 16.2936 10.8335 15.8334 10.8335H10.8334V15.8335C10.8334 16.2937 10.4603 16.6668 10 16.6668C9.5398 16.6668 9.16671 16.2937 9.16671 15.8335V10.8335H4.16671C3.70647 10.8335 3.33337 10.4604 3.33337 10.0002C3.33337 9.53993 3.70647 9.16683 4.16671 9.16683H9.16671V4.16683C9.16671 3.70659 9.5398 3.3335 10 3.3335Z"
        fill={fill ?? '#14AE65'}
      />
    </svg>
  )
}
