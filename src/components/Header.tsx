import React, { Component } from 'react'
import { UserIcon } from '@heroicons/react/24/solid'
import Head from 'next/head'

export default class Header extends Component {
    render() {
        return (
            <header className="sticky top-50 z-50 grid grid-cols-3 p-5 md:px-10 items-center">
                <div className="relative flex items-center h-10 cursor-pointer my-auto">

                    LOGO
                </div>
                <nav>
                    <ul className="flex gap-5 items-center justify-center">
                        <li><a href="#">Estimer un bien</a></li>
                        <li><a href="#">Prix de l'immobilier</a></li>
                    </ul>
                </nav>
                <div className="flex items-center space-x-4 justify-end">
                    <div className="flex border-2 p-2 gap-2 rounded-md bg-violet-500">
                        <p className="text-white">Se connecter</p>
                        {/* <UserIcon className="h-6 w-6 text-black" /> */}
                    </div>

                </div>
            </header >
        )
    }
}
