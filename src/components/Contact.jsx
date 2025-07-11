/**
 * Contact Component
 * 
 * Simple contact form allowing anonymous feedback via Formspree.
 * Handles form submission and provides user feedback on success/error.
 */

import { useState } from 'react';
import AnimatedSection from './AnimatedSection';

function Contact(){
    // State for the contact message
    const [contact, setContact] = useState('');

    /**
     * Handles form submission to Formspree
     * @param {Event} e - Form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate message is not empty
        if (!contact.trim()) return;

        try {
            // Send message to Formspree endpoint
            const response = await fetch('https://formspree.io/f/mwpbdwnn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: contact
                }),
            });

            // Handle response
            if (response.ok) {
                alert('Thank you! Your message has been sent.');
                setContact(''); // Clear form on success
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch {
            alert('Network error. Please check your connection and try again.');
        }
    };

    return(
    <section id="contact" className="flex flex-col items-center shadow-md bg-stone-50">
        <AnimatedSection>
            <div className="flex flex-col justify-around text-center max-w-2xl gap-4 md:gap-6 mx-auto px-4 py-8 md:py-12">
                
                {/* Section heading */}
                <h3 className="text-lg md:text-xl text-stone-700 text-heading font-bold">
                    Want to say hi or make a suggestion?
                </h3>
                
                {/* Contact form */}
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
                    {/* Message textarea */}
                    <textarea 
                        name="message"
                        rows={4} 
                        placeholder="Type here..." 
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full border p-3 md:p-4 rounded h-24 md:h-32 font-body text-white border-orange-300 focus:ring-2 focus:ring-lime-600 shadow-md text-sm md:text-base" 
                        required
                    />
                    
                    {/* Submit button */}
                    <button 
                        type="submit" 
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 md:py-4 rounded-full shadow-md transition-colors text-sm md:text-base font-medium"
                    >
                        Send
                    </button>
                </form>
            </div>
        </AnimatedSection>
    </section>
    );
}

export default Contact;