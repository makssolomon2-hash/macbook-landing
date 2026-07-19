import {useMediaQuery} from "react-responsive";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";


const Showcase = () => {
    const isTablet = useMediaQuery({query: '(max-width: 1024px)'});

    useGSAP(() => {
        if (!isTablet) {
            // Set initial hidden state for all text elements before the pinned timeline starts
            gsap.set(['.showcase-word', '#showcase .content p', '#showcase h3'], {
                autoAlpha: 0,
                y: 28,
            });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#showcase',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: true,
                }
            });

            timeline
                .to('.mask img', {
                    transform: 'scale(1.1)',
                })
                .fromTo('#showcase .content',
                    { autoAlpha: 0, y: 40 },
                    { autoAlpha: 1, y: 0, ease: 'power2.out' }
                )
                // h2 words slide up one by one
                .to('.showcase-word', {
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.08,
                    ease: 'power3.out',
                }, '<0.05')
                // paragraphs stagger in
                .to('#showcase .content p', {
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.07,
                    ease: 'power2.out',
                }, '-=0.25')
                // stat headings animate in with a spring bounce
                .to('#showcase h3', {
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.12,
                    ease: 'back.out(1.4)',
                }, '-=0.3');
        } else {
            // Mobile / tablet: individual scroll-triggered animations (no pin)
            gsap.fromTo('.showcase-word',
                { autoAlpha: 0, y: 30 },
                {
                    autoAlpha: 1, y: 0,
                    stagger: 0.08,
                    ease: 'power3.out',
                    duration: 0.8,
                    scrollTrigger: { trigger: '#showcase h2', start: 'top 85%' },
                }
            );
            gsap.fromTo('#showcase .content p',
                { autoAlpha: 0, y: 20 },
                {
                    autoAlpha: 1, y: 0,
                    stagger: 0.1,
                    ease: 'power2.out',
                    duration: 0.7,
                    scrollTrigger: { trigger: '#showcase .content', start: 'top 80%' },
                }
            );
            gsap.fromTo('#showcase h3',
                { autoAlpha: 0, y: 20 },
                {
                    autoAlpha: 1, y: 0,
                    stagger: 0.15,
                    ease: 'back.out(1.4)',
                    duration: 0.7,
                    scrollTrigger: { trigger: '#showcase .max-w-3xs', start: 'top 85%' },
                }
            );
        }
    }, [isTablet]);

    return (
        <section id="showcase">
            <div className="media">
                <video src="/videos/new-video.mp4" loop muted autoPlay playsInline/>
                <div className="mask">
                    <img src="/mask-logo.svg" />
                </div>
            </div>

            <div className="content">
                <div className="wrapper">
                    <div className="lg:max-w-md">
                        <h2>
                            {'Rocket Chip'.split(' ').map((word, i) => (
                                <span key={i} className="showcase-word inline-block mr-[0.22em] last:mr-0">{word}</span>
                            ))}
                        </h2>

                        <div className="space-y-5 mt-7 pe-10">
                            <p>
                                Introducing {" "}
                                <span className="text-white">
                                    M4, the next generation of Apple silicon
                                </span>
                                . M4 powers
                            </p>
                            <p>
                                It drives Apple Intelligence on iPad Pro, so you can write, create, and accomplish more with ease. All in a design that's unbelievably thin, light, and powerful.
                            </p>
                            <p>
                                A brand-new display engine delivers breathtaking precision, color accuracy, and brightness. And a next-gen GPU with hardware-accelerated ray tracing brings console-level graphics to your fingertips.
                            </p>
                            <p className="text-primary">Learn more about Apple Intelligence</p>
                        </div>
                    </div>

                    <div className="max-w-3xs space-y-14">
                        <div className="space-y-2">
                            <p>Up to</p>
                            <h3>4x faster</h3>
                            <p>pro rendering performance than M2</p>
                        </div>
                        <div className="space-y-2">
                            <p>Up to</p>
                            <h3>1.5x faster</h3>
                            <p>CPU performance than M2</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Showcase
