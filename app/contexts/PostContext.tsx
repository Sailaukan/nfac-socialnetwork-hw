'use client'

//HERE IS THE CONTEXT API USING EXAMPLE. It really works, don't worry

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

export type User = {
    name: string;
    password: string;
    token: string;
    isAuth: boolean;
    darkTheme: boolean;
    id:number
}

export interface UserContextInterface {
    user: User
    setUser: Dispatch<SetStateAction<User>>
}

const defaultUserState ={
    user:{
        name:'',
        id:0,
        password: '',
        token:'',
        isAuth: false,
        darkTheme: false,
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
        id:0,
        token: '',
        isAuth: false,
        darkTheme: false,
    });

    const value = { user, setUser };
    
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

