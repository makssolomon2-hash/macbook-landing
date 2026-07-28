import { useRef } from 'react';
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import ProductViewer from "./components/ProductViewer.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Showcase from "./components/Showcase.jsx";
import Features from "./components/Features.jsx";
import Highlights from "./components/Highlights.jsx";
import Footer from "./components/Footer.jsx";
import Performance from "./components/Performance.jsx";
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

const PageLoader = () => {
    const loaderRef = useRef(null);

    useGSAP(() => {
        const el = loaderRef.current;
        const tl = gsap.timeline();

        tl
        .to('.pl-bar-fill',
            { scaleX: 1, duration: 1.1, ease: 'power2.inOut',  },
            '-=0.2'
        ).to(".pl-bar",{
            scaleX: 0,
            opacity:0,
            ease: 'power2.inOut',
        })
        .fromTo('.pl-title',
            { autoAlpha: 0, scale:1, },
            { autoAlpha: 1,  duration: 1, ease: 'power2.out', scale:3 },
            '-=0.25'
        )
        .to(el, { yPercent: -100, duration: 0.7, ease: 'power4.inOut',delay:0,  });
    }, { scope: loaderRef });

    return (
        <div ref={loaderRef} className="pl-overlay">
            <img src="/logo.svg" className="pl-title" alt="Apple" />
            {/* {<p className="pl-title">MacBook Pro</p>} */}
            <div className="pl-bar">
                <div className="pl-bar-fill" />
            </div>
        </div>
    );
};



const App = () => {
    return (
        <ReactLenis root
            options={{
            duration: 1.3,          // how long the scroll animation lasts
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // nice easing
            smoothWheel: true,
            // smoothTouch: false,  // usually keep false for better mobile feel
            }}
        >
            <main>  
                <PageLoader />            
                <NavBar />
                <Hero />
                <ProductViewer />
                <Showcase />
                <Performance />
                <Features />
                <Highlights />
                <Footer />              
            </main>          
        </ReactLenis>
    );
};

export default App
