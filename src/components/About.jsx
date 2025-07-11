/**
 * About Component
 * 
 * Information section explaining the project, technology stack, and purpose.
 * Provides context for portfolio viewers and potential employers.
 */

import AnimatedSection from './AnimatedSection';

function About() {
    return (
        <section id="about" className="flex flex-col items-center border-t border-stone-100 bg-stone-50">
            <AnimatedSection>
                <div className="flex flex-col justify-around text-center max-w-4xl gap-4 md:gap-6 mx-auto px-4 py-8 md:py-12">
                
                {/* Section heading */}
                <h2 className="text-xl md:text-2xl text-stone-700 font-bold text-heading">
                    About This Project
                </h2>
                
                {/* Project description - what it does */}
                <p className="text-base md:text-xl text-stone-700 text-body leading-relaxed">
                    FlavorCraft AI is a web app that uses OpenAI's GPT 4o mini API to create custom recipes based on user-input ingredients and dietary restrictions.
                </p>
                
                {/* Technology stack and purpose */}
                <p className="text-base md:text-xl text-stone-700 text-body leading-relaxed">
                    Built with React, Vite, and Tailwind CSS, this project was created to explore AI-assisted creativity and showcase practical API integration in modern front-end development.
                </p>
                
                {/* Portfolio context */}
                <p className="text-base md:text-xl text-stone-700 text-body leading-relaxed">
                    Created as a portfolio project to explore how AI can assist with everyday tasks, and to demonstrate practical GPT API integration.
                </p>
                </div>
            </AnimatedSection>
        </section>
    );
}

export default About;