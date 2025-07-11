/**
 * AnimatedSection Component
 * 
 * A wrapper component that adds smooth fade-in-up animation when the section
 * scrolls into view. Uses Intersection Observer for performance.
 * 
 * Props:
 * - children: React components to animate
 * - delay: Animation delay class (delay-100, delay-200, etc.)
 * - className: Additional CSS classes
 */

import { useScrollAnimation } from '../hooks/useScrollAnimation';

function AnimatedSection({ children, delay = '', className = '' }) {
  const [elementRef, isVisible] = useScrollAnimation();

  return (
    <div
      ref={elementRef}
      className={`fade-in-up ${delay} ${isVisible ? 'animate' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export default AnimatedSection;
