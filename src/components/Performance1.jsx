import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Performance() {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Existing scroll-triggered timeline (preserved structure)
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top center',
                end: 'bottom center',
                scrub: true,
            }
        });

        // Example of existing scroll animation
        scrollTl.fromTo('.performance-item',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1 }
        );

        // NEW: Breathing animation timeline
        // Excludes p5 by targeting a specific class (.breathing-target)
        const breathingTl = gsap.timeline({
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        // Set initial state for the breathing animation
        gsap.set('.breathing-target', {
            scale: 0.95,
            opacity: 0.8,
            x: -2,
            y: -2
        });

        // Animate to the max values
        // Duration 1.5s with yoyo: true creates a 3-second full cycle
        breathingTl.to('.breathing-target', {
            scale: 1.05,
            opacity: 1,
            x: 2,
            y: 2,
            duration: 1.5
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance" style={{letterSpacing: '-0.02em'}}>
                        Uncompromising Performance
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Experience the next generation of speed and efficiency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* p1 to p4: Include breathing-target class */}
                    {[1, 2, 3, 4].map((num) => (
                        <div key={`p${num}`} className="performance-item relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-sm">
                            <img
                                src={`https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop&q=80&sig=${num}`}
                                alt={`Performance metric ${num}`}
                                className="breathing-target w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                <span className="text-white font-medium">Metric p{num}</span>
                            </div>
                        </div>
                    ))}

                   {/* <div className="performance-item">
                        {performanceImages.map((item, index ) => (
                            <img
                                key={index}
                                src={item.src}
                                className={item.id}
                                alt={item.alt || `Performance Image #${index + 1}`}
                            />
                        ))}
                    </div>*/}

                    {/* p5: Excluded from breathing animation (no breathing-target class) */}
                    <div className="performance-item relative aspect-[2/1] md:aspect-auto lg:col-span-4 rounded-2xl overflow-hidden bg-muted shadow-md h-64 lg:h-80">
                        <img
                            src=""
                            alt="Performance metric 5 (Static)"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                            <span className="text-white font-bold text-2xl mb-2">Core Architecture (p5)</span>
                            <span className="text-white/80">Stable foundation without breathing effect</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}