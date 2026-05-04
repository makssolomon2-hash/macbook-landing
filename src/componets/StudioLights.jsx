import React from 'react'
import {Environment, Lightformer} from "@react-three/drei";

const StudioLights = () => {
    return (
       <group name={"lights"}>
           <group>
           {/*
           <Environment resolution={256}>

                   <Lightformer
                       form="rect"
                       intensity={10}
                       position={[-10,5,-5]}
                       rotation-y={Math.PI / 2}
                   />
                   <Lightformer
                       form="rect"
                       intensity={10}
                       position={[10,0,1]}
                       rotation-y={Math.PI / 2}
                   />
           </Environment>
           */}
                   <spotLight
                        position={[-2,80,-40]}
                        angle={0.1356}
                        decay={0}
                        intensity={Math.PI * 0.2}
                   />
                   <spotLight
                        position={[1,-50,100]}
                        angle={0.15}
                        decay={0}
                        intensity={Math.PI * 0.15}
                   />
                   <spotLight
                        position={[0,50,5]}
                        angle={0.15}
                        decay={0}
                        intensity={Math.PI * 0.7}
                   />
               </group>
       </group>
    )
}
export default StudioLights
