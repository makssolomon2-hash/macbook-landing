import React from 'react'
import NawBar from "./components/NawBar.jsx";
import Hero from "./components/Hero.jsx";
import ProductViewer from "./components/ProductViewer.jsx";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Showcase from "./components/Showcase.jsx";
import Features from "./components/Features.jsx";
import Highligths from "./components/Highligths.jsx";
import Footer from "./components/Footer.jsx";
import Performance from "./components/Performance.jsx";
import Performance1 from "./components/Performance1.jsx";


gsap.registerPlugin(ScrollTrigger)

const App = () => {
    return (
        <main>
            <NawBar />
            <Hero />
            <ProductViewer />
            <Showcase />
            <Performance />
            {/*<Performance1 />*/}
            <Features />
            <Highligths />
            <Footer />
        </main>

    )
}
export default App
