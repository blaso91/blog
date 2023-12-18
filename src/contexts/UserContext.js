import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}