import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');    
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        // Get stored data
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        // If both exist, restore login state
        if (token && userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                // If user data is corrupted, clear it
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // 1. Make API call
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // 2. SUCCESS
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                setIsAuthenticated(true);
                return { success: true };
            } else {
                // 3. FAILURE
                return { success: false, error: data.message || 'Login failed' };
            }
        } catch (error) {
            // 4. NETWORK ERROR
            return { success: false, error: error.message || 'Network error' };
        }
    }

    const register = async (name, email, password) => {
        try {
            // 1. Make API call
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // 2. SUCCESS - Auto login after registration
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                setIsAuthenticated(true);
                return { success: true };
            } else {
                // 3. FAILURE
                return { success: false, error: data.message || 'Registration failed' };
            }
        } catch (error) {
            // 4. NETWORK ERROR
            return { success: false, error: error.message || 'Network error' };
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };
    
    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            login,
            register,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}