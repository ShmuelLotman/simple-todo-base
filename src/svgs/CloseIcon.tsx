import { TSVGProps } from './types'

export const CloseIcon = ({
  width = 20,
  height = 20,
  viewBox = '0 0 20 20',
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
        d="M4.41058 4.41058C4.73602 4.08514 5.26366 4.08514 5.58909 4.41058L9.99984 8.82133L14.4106 4.41058C14.736 4.08514 15.2637 4.08514 15.5891 4.41058C15.9145 4.73602 15.9145 5.26366 15.5891 5.58909L11.1783 9.99984L15.5891 14.4106C15.9145 14.736 15.9145 15.2637 15.5891 15.5891C15.2637 15.9145 14.736 15.9145 14.4106 15.5891L9.99984 11.1783L5.58909 15.5891C5.26366 15.9145 4.73602 15.9145 4.41058 15.5891C4.08514 15.2637 4.08514 14.736 4.41058 14.4106L8.82133 9.99984L4.41058 5.58909C4.08514 5.26366 4.08514 4.73602 4.41058 4.41058Z"
        fill={fill ?? '00152E'}
      />
    </svg>
  )
}
