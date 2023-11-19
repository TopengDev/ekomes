import * as React from "react"
const CircleX = (props: any) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      height='2em'
      style={{
         fill: "#c00e12",
      }}
      viewBox='0 0 512 512'
      {...props}
   >
      <path d='M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-81-337c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z' />
   </svg>
)
export default CircleX
