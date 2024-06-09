'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

export type User = {
    name: string;
    password: string;
    token: string;
    isAuth: boolean;
}

export interface UserContextInterface {
    user: User
    setUser: Dispatch<SetStateAction<User>>
}

const defaultUserState ={
    user:{
        name:'',
        password: '',
        token:'',
        isAuth: false
    },
    setUser: (user: User) => {}
} as UserContextInterface 

export const UserContext = createContext(defaultUserState)

type UserProvideProps = {
    children: ReactNode
}

export default function UserProvider({children}: UserProvideProps) {

    const[user, setUser]= useState<User>({
        name: '',
        password: '',
        token: '',
        isAuth: false,
    });

    const value = { user, setUser };
    
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

