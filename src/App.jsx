import React from 'react'
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import ProductViewer from "./components/ProductViewer.jsx";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Showcase from "./components/Showcase.jsx";
import Features from "./components/Features.jsx";
import Highlights from "./components/Highlights.jsx";
import Footer from "./components/Footer.jsx";
import Performance from "./components/Performance.jsx";
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import ModelLoader from './components/ModelLoader.jsx';

gsap.registerPlugin(ScrollTrigger)

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
