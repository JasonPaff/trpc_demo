import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import { User } from '../../server/server';
import './App.css';

function App() {
    const [user, setUser] = useState<User>();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {}, []);

    const firstNameInputRef = useRef<HTMLInputElement | null>(null);
    const lastNameInputRef = useRef<HTMLInputElement | null>(null);

    const onCreate = async () => {
        const firstName = firstNameInputRef.current?.value ?? '';
        const lastName = lastNameInputRef.current?.value ?? '';
        if (!firstName || !lastName) return;
    };

    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
            <div className="card">
                <label htmlFor={'firstName'}>First Name</label>
                <input id="firstName" ref={firstNameInputRef} />
                <label htmlFor={'lastName'}>Last Name</label>
                <input ref={lastNameInputRef} />

                <button onClick={onCreate}>Create User</button>
            </div>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{`${user?.firstName} ${user?.lastName}`}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;