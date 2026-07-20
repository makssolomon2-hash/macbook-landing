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


gsap.registerPlugin(ScrollTrigger)
//UPDATE
const App = () => {
    return (
        <main>
            <NavBar />
            <Hero />
            <ProductViewer />
            <Showcase />
            <Performance />
            {/*<Performance1 />*/}
            <Features />
            <Highlights />
            <Footer />
        </main>

    )
}
export default App
