/**
 * AuthModal Component
 * 
 * A sliding side-panel modal for user authentication (login/register).
 * Features:
 * - Slides in from right with smooth animations
 * - Mode switching between login and register
 * - Form validation and error handling
 * - Responsive design with Tailwind CSS
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
    // ==================== STATE MANAGEMENT ====================
    
    // Modal mode (login or register)
    const [mode, setMode] = useState(initialMode);
    
    // Form data for both login and register
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    // Animation state for smooth closing
    const [closing, setClosing] = useState(false);
    
    // Error state for form validation
    const [error, setError] = useState('');
    
    // Authentication functions from context
    const { login, register } = useAuth();

    // ==================== EFFECTS ====================
    
    // Sync mode with prop changes (when switching via navbar buttons)
    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    // ==================== EVENT HANDLERS ====================
    
    /**
     * Handle modal close with animation
     * Triggers exit animation before actually closing
     */
    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            onClose();
        }, 275); // Match CSS animation duration
    };

    /**
     * Handle form submission for both login and register
     * @param {Event} e - Form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            let result;
            if (mode === 'login') {
                result = await login(formData.email, formData.password);
            } else {
                result = await register(formData.name, formData.email, formData.password);
            }

            if (result.success) {
                // Success: close modal and reset form
                onClose();
                setFormData({ name: '', email: '', password: '' });
            } else {
                // Show error to user
                setError(result.error);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    // ==================== RENDER ====================
    
    // Don't render if modal is closed
    if (!isOpen) return null;
    
    // ==================== LOGIN MODE ====================
    if (mode === 'login') {
        return (
            <div>
                {/* Semi-transparent backdrop */}
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end ${closing ? 'fade-out' : 'fade-in'}`}>
                    
                    {/* Side panel container */}
                    <div className={`bg-white h-full w-96 shadow-lg p-6 relative ${closing ? 'slide-out-right' : 'slide-in-right'}`}>
                        
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-8 cursor-pointer text-2xl text-stone-700 hover:text-red-500 bg-transparent hover:border-transparent transition-colors duration-200 p-0"
                            aria-label="Close modal"
                        >×</button>

                        {/* Modal title */}
                        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Login</h2>

                        {/* Login form */}
                        <form onSubmit={handleSubmit}>
                            {/* Error message display */}
                            {error && (
                                <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">
                                    {error}
                                </div>
                            )}

                            {/* Email field */}
                            <div className="mb-4">
                                <label className="block text-stone-700 text-sm font-bold mb-2">
                                    Email:
                                </label>
                                <input 
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600"
                                    required
                                />
                            </div>

                            {/* Password field */}
                            <div className="mb-6">
                                <label className="block text-stone-700 text-sm font-bold mb-2">
                                    Password:
                                </label>
                                <input 
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600"
                                    required
                                />
                            </div>

                            {/* Submit button */}
                            <input 
                                type="submit"
                                value="Login"
                                className="w-full bg-orange-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-orange-700 transition-colors duration-200"
                            />
                        </form>

                        {/* Mode switch to register */}
                        <p className="text-center mt-4 text-stone-700">
                            Don't have an account?
                            <button
                                onClick={() => setMode('register')}
                                className="text-orange-600 hover:text-orange-700 ml-1 bg-transparent hover:border-transparent p-0 transition-colors duration-200"
                            >
                                Sign Up!
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    
    // ==================== REGISTER MODE ====================
    else {
        return (
            <div>
                {/* Semi-transparent backdrop */}
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end ${closing ? 'fade-out' : 'fade-in'}`}>
                    
                    {/* Side panel container */}
                    <div className={`bg-white h-full w-96 shadow-lg p-6 relative ${closing ? 'slide-out-right' : 'slide-in-right'}`}>
                        
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-8 cursor-pointer text-2xl text-stone-700 hover:text-red-500 bg-transparent hover:border-transparent transition-colors duration-200 p-0"
                            aria-label="Close modal"
                        >×</button>

                        {/* Modal title */}
                        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Sign Up</h2>

                        {/* Register form */}
                        <form onSubmit={handleSubmit}>
                            {/* Error message display */}
                            {error && (
                                <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">
                                    {error}
                                </div>
                            )}

                            {/* Name field */}
                            <div className="mb-4">
                                <label className="block text-stone-700 text-sm font-bold mb-2">
                                    Name:
                                </label>
                                <input 
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600"
                                    required
                                />
                            </div>

                            {/* Email field */}
                            <div className="mb-4">
                                <label className="block text-stone-700 text-sm font-bold mb-2">
                                    Email:
                                </label>
                                <input 
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600"
                                    required
                                />
                            </div>

                            {/* Password field */}
                            <div className="mb-4">
                                <label className="block text-stone-700 text-sm font-bold mb-2">
                                    Password:
                                </label>
                                <input 
                                    type="password" 
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600"
                                    required
                                />
                            </div>

                            {/* Submit button */}
                            <input 
                                type="submit" 
                                value="Sign Up"
                                className="w-full bg-orange-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-orange-700 transition-colors duration-200"
                            />
                        </form>

                        {/* Mode switch to login */}
                        <p className="text-center mt-4 text-stone-700">
                            Already have an account?
                            <button
                                onClick={() => setMode('login')}
                                className="text-orange-600 hover:text-orange-700 ml-1 bg-transparent hover:border-transparent p-0 transition-colors duration-200"
                            >
                                Login!
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    } 
}

export default AuthModal;