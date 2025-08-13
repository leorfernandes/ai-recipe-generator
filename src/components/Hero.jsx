/**
 * Hero Component
 * 
 * Main landing section with compelling headlines and hero image.
 * Features responsive typography and full-width image design with animations.
 */

import AnimatedSection from './AnimatedSection';

function Hero() {
    return(
        <section id="hero" className="self-center w-full items-center cursor-default">
            {/* Headlines with responsive padding container */}
            <div className="px-4">
                {/* Main headline - emotional hook */}
                <AnimatedSection>
                    <h1 className="text-orange-500 text-center font-heading max-w-4xl mx-auto pt-12 pb-6 md:pt-16 text-3xl md:text-5xl leading-tight">
                        Turn What You Have Into What You Crave
                    </h1>
                </AnimatedSection>
                
                {/* Subheadline - explains the value proposition */}
                <AnimatedSection delay="delay-200">
                    <h2 className="text-orange-800 text-center font-heading max-w-2xl mx-auto pt-6 pb-12 md:pb-16 text-lg md:text-3xl leading-tight">
                        Smart Recipe Creation, Tailored to Your Kitchen
                    </h2>
                </AnimatedSection>
            </div>
            
            {/* Full-width hero image with responsive height */}
            <AnimatedSection delay="delay-400">
                <div className="max-h-64 md:max-h-screen overflow-hidden">
                    <img 
                        src="/img/hero-image.jpg" 
                        alt="Image of a person cooking and a cookbook" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </AnimatedSection>
        </section>
    );
}

export default Hero;