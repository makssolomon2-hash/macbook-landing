import { Html } from '@react-three/drei'

const ModelLoader = () => {
  return (
    <Html center>
      <div className="flex items-center justify-center">

        <div className="absolute w-14 h-14 rounded-full bg-white/20 blur-2xl" />
        
        <div className="relative w-16 h-16">
          <svg
            className="w-full h-full animate-[spin_1.2s_cubic-bezier(0.4,0,0.2,1)_infinite]"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="5"
            />
            {/* Animated arc */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="70 180"
              className="origin-center"
            />
          </svg>
        </div>
      </div>
    </Html>
  )
}

export default ModelLoader