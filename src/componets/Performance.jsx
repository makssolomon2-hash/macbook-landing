
import {useMediaQuery} from "react-responsive";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {    ScrollTrigger  } from "gsap/ScrollTrigger";
import {performanceImages, performanceImgPositions} from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
        /*const isMobile = useMediaQuery("(max-width: 1024px)");*/
        const sectionRef = useRef(null);

        useGSAP(() =>{
            gsap.fromTo(
            ".content p",
            { autoAlpha: 0, y: 24 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger:{
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions:"play none none reverse",
                    invalidateOnRefresh: true,
                },
            }
        )
        })

    return (
        <section id="performance">
            <h2>Next-level graphics.Game on.</h2>

            <div className="wrapper">
                {performanceImages.map(({ id, src }) => (
                    <img key={id} src={src} alt={id} />
                ))}
            </div>
            <p>
                Run graphics-intensive workflows with a responsiveness that keeps up with your imagination. The M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing engine that renders images faster, so
                <span className="text-white"> gaming feels more immersive and realistic than ever. </span>
                And Dynamic Caching optimizes fast on-chip memory to dramatically increase average GPU utilization — driving a huge performance boost for the most demanding pro apps and games.
            </p>
        </section>
    )
}
export default Performance
