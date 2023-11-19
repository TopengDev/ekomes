const LoadingCircle = () => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={128}
      height={128}
      preserveAspectRatio='xMidYMid'
      style={{
         margin: "auto",
         //  background: "#f1f2f3",
         display: "block",
         shapeRendering: "auto",
      }}
      viewBox='0 0 100 100'
      // {...props}
   >
      <circle
         cx={50}
         cy={50}
         r={16}
         fill='none'
         stroke='#689cc5'
         strokeDasharray='75.39822368615503 27.132741228718345'
         strokeWidth={6}
      >
         <animateTransform
            attributeName='transform'
            dur='1s'
            keyTimes='0;1'
            repeatCount='indefinite'
            type='rotate'
            values='0 50 50;360 50 50'
         />
      </circle>
   </svg>
)
export default LoadingCircle
