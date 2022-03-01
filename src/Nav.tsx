import React, { useContext } from 'react';
import { UserContext } from './App';

const Nav = () => {
    const user = useContext(UserContext);

    if (!user) {
        return null;
    }

    return (
        <nav className="flex justify-between flex-wrap bg-purple-600 p-4">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Smarter Carrots</span>
            </div>
            <div className="w-auto flex-grow flex items-center">
                <div className="flex-grow">
                    {/* Eventually, put some links here */}
                </div>
                <div className="flex flex-row items-center hover:cursor-pointer">
                    <img
                        src={user.photoURL!}
                        alt={user.displayName!}
                        className="rounded-full h-8 w-8 mr-2"
                    />
                    {user.displayName}
                </div>
            </div>
        </nav>
    )
}

export default Nav;