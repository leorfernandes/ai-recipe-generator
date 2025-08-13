import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
    const [mode, setMode] = useState(initialMode);

    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [closing, setClosing] = useState(false);
    
    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            onClose();
        }, 275);
    }

    const [error, setError] = useState('');

    const { login, register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page refresh
        setError(''); // Clear any previous errors

        try {
            let result;
            if (mode === 'login') {
                result = await login(formData.email, formData.password);
            } else {
                result = await register(formData.name, formData.email, formData.password);
            }

            if (result.success) {
                // Success! Close modal and clear form
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


    // Don't show modal if not open
    if (!isOpen) return null;
    
    if (mode === 'login'){
        return (
            <div>
                {/* Backdrop */}
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end ${closing ? 'fade-out' : 'fade-in'}`}>
                    {/* Side Panel */}
                    <div className={`bg-white h-full w-96 shadow-lg p-6 relative ${closing ? 'slide-out-right' : 'slide-in-right'}`}>     
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-8 cursor-pointer text-2xl text-stone-700 hover:text-red-500 bg-transparent hover:border-transparent transition-colors duration-200 p-0"
                        >×</button>

                        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Login</h2>

                    <form onSubmit={handleSubmit}>
                        {error && <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</div>}

                        <div className="mb-4">                        
                            <label className="block text-stone-700 text-sm font-bold mb-2">Email:</label>
                            <input 
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-stone-700 text-sm font-bold mb-2">Password:</label>
                            <input 
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600"
                                required
                            />
                        </div>

                        <input 
                            type="submit"
                            value="Login"
                            className="w-full bg-orange-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-orange-700 transition-colors duration-200"
                        />
                    </form>

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
    else {
        return (
            <div>
                {/* Backdrop */}
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end ${closing ? 'fade-out' : 'fade-in'}`}>
                    {/* Side Panel */}
                    <div className={`bg-white h-full w-96 shadow-lg p-6 relative ${closing ? 'slide-out-right' : 'slide-in-right'}`}>    
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-8 cursor-pointer text-2xl text-stone-700 hover:text-red-500 bg-transparent hover:border-transparent transition-colors duration-200 p-0"
                        >×</button>

                        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</div>}
                        <div className="mb-4">                        
                            <label className="block text-stone-700 text-sm font-bold mb-2">Name:</label>
                            <input 
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600"
                                required
                            />
                        </div>

                        <div className="mb-4">                        
                            <label className="block text-stone-700 text-sm font-bold mb-2">Email:</label>
                            <input 
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600"
                                required
                            />
                        </div>

                        <div className="mb-4">                        
                            <label className="block text-stone-700 text-sm font-bold mb-2">Password:</label>
                        <input 
                            type="password" 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600"
                            required
                        />
                        </div>

                    <input 
                        type="submit" 
                        value="Sign Up"
                        className="w-full bg-orange-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-orange-700 transition-colors duration-200"
                    />
                </form>

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