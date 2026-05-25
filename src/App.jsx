import React from 'react'
import NawBar from "./componets/NawBar.jsx";
import Hero from "./componets/Hero.jsx";
import ProductViewer from "./componets/ProductViewer.jsx";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Showcase from "./componets/Showcase.jsx";

gsap.registerPlugin(ScrollTrigger)

const App = () => {
    return (
        <main>
            <NawBar />
            <Hero />
            <ProductViewer />
            <Showcase />
        </main>

    )
}
export default App
