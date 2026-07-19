// 14 and 16 -> Presentation controls
import React from 'react';
import { useRef } from 'react';
import gsap from "gsap";
import {PresentationControls} from "@react-three/drei";
import MacbookModel16 from "../models/Macbook-16.jsx";
import MacbookModel14 from "../models/Macbook-14.jsx";
import {useGSAP} from "@gsap/react";



const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5.54;

const fadeMeshes = (group, opacity) => {
    if (!group ) return;

    group.traverse((child) => {
        if(child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, { opacity, duration: ANIMATION_DURATION})
        }
    })
}

const moveGroup =(group,x) => {
    if(!group) return;
    gsap.to(group.position, { x, duration: ANIMATION_DURATION })
}

const ModelSwitcher = ({scale, isMobile}) => {
    const smallMacbookRef = useRef();
    const largeMacbookRef = useRef();

    const showLargeMacBook = scale === 0.08 || scale === 0.05;

    useGSAP(() => {
        if(showLargeMacBook) {
            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacbookRef.current, 0);
            fadeMeshes(smallMacbookRef.current, 0);
            fadeMeshes(largeMacbookRef.current, 1);
        } else {
            moveGroup(smallMacbookRef.current, 0);
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);
            fadeMeshes(smallMacbookRef.current, 1);
            fadeMeshes(largeMacbookRef.current, 0);
        }

    },[scale])

    const controlConfig = {
        snap: true,
        speed: 0.8,
        zoom: 10,
        polar: [-Math.PI,Math.PI],
        //azimuth:[-Infinity,Infinity],
        config: {mass:1, tension: 0, friction: 26}
        //enableZoom: true,
        /*zoomSpeed={1}
        minZoom={0.5}
        maxZoom={20} */
    }

    return (
        <>
            <PresentationControls {...controlConfig} enableZoom={true} >
                <group ref={largeMacbookRef}>
                    <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />

                </group>

            </PresentationControls>


            <PresentationControls {...controlConfig}>
                <group ref={smallMacbookRef}>
                    <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
                </group>
            </PresentationControls>
        </>
    )
}
export default ModelSwitcher
