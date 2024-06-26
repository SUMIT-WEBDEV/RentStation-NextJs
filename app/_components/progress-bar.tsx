"use client"

import React from 'react'
// import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';
// import NextNProgress from 'nextjs-progressbar';
import { Next13ProgressBar } from 'next13-progressbar';



const ProgressBar = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-full flex flex-col '>
            <Next13ProgressBar height="2px" color="#FFEB3B" options={{ showSpinner: true }} showOnShallow />
            {children}
        </div>
    )
}

export default ProgressBar