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

gsap.registerPlugin(ScrollTrigger)

const PageLoader = () => {
    const loaderRef = useRef(null);

    useGSAP(() => {
        const el = loaderRef.current;
        const tl = gsap.timeline();

        tl.fromTo('.pl-logo',
            { autoAlpha: 0, scale: 0.7 },
            { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }
        )
        .fromTo('.pl-title',
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            '-=0.25'
        )
        .to('.pl-bar-fill',
            { scaleX: 1, duration: 1.1, ease: 'power2.inOut' },
            '-=0.2'
        )
        .to(el, { yPercent: -100, duration: 0.7, ease: 'power4.inOut', delay: 0.25 });
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
        <main>
            <PageLoader />
            <NavBar />
            <Hero />
            <ProductViewer />
            <Showcase />
            <Performance />
           {/*  <Performance1 /> */}
            <Features />
            <Highlights />
            <Footer />
        </main>
    )
}
export default App
