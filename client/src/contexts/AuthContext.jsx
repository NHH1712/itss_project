import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
	user: "",
	isLoggedIn: false,
	login: (values) => Boolean,
	logout: () => {},
});

const AuthProvider = ({ children }) => {
	const localToken = localStorage.getItem('access-token');
	const localUser = JSON.parse(localStorage.getItem('current-user')) || null;

	const [user, setUser] = useState(localUser);
	const [isLoggedIn, setIsLoggedIn] = useState(!!localToken);
	const navigate = useNavigate();

	const login = (values) => {
		const { username, password } = values;
		console.log(values)
		if (username === 'contec' && password === 'contec@123') {
			localStorage.setItem(
				'current-user',
				JSON.stringify({
					name: 'Contec',
					id: 1,
				}),
			);
			setUser({
				name: 'Contec',
				id: 1,
			});
		} else if (username === 'bogo' && password === 'bogo@123') {
            localStorage.setItem(
				'current-user',
				JSON.stringify({
					name: 'Bogo',
					id: 2,
				}),
			);
            setUser({
                name: 'Bogo',
				id: 2,
            })
        }
			
		else return false;
		localStorage.setItem('access-token', 'password');
		setIsLoggedIn(true);
		navigate('/');
		return true;
	};

	const logout = () => {
		localStorage.removeItem('current-user');
		localStorage.removeItem('access-token');
		setUser(null);
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);