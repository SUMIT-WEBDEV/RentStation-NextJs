import { GitHubLogoIcon, InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import { FaFacebook } from 'react-icons/fa'

const DesktopFooter = () => {
    return (
        <footer className="p-4 bg-black text-white sm:p-6 dark:bg-gray-800 lg:block hidden w-full mt-auto">
            <div className="mx-auto max-w-screen-xl">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0 space-y-3">
                        <Link href="/" className="flex items-center">
                            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-8" alt="FlowBite Logo" /> */}
                            <span className="text-xl text-yellow-500 font-extrabold tracking-normal lg:tracking-wider"
                            >RentStation</span>
                        </Link>
                        <p className='w-96 text-gray-600 dark:text-gray-400 text-base'>RentStation is a user-to-user platform designed to streamline product rentals within local their localities.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">Quick Links</h2>
                            <ul className="text-gray-600 dark:text-gray-400">
                                <li className="mb-4">
                                    <Link href="/" className="hover:underline">help</Link>
                                </li>
                                <li>
                                    <Link href="/" className="hover:underline">blog</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">Follow us</h2>
                            <ul className="text-gray-600 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="https://github.com/SUMIT-WEBDEV/RentStation-NextJs" target="_blank" className="hover:underline ">Github</a>
                                </li>
                                <li>
                                    <a href="/" className="hover:underline">Discord</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-white">Legal</h2>
                            <ul className="text-gray-600 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://github.com/SUMIT-WEBDEV/RentStation-NextJs"
                        target="_blank" className="hover:underline">RentStation</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">

                        <Link
                            href="#"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        >
                            <FaFacebook />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        >
                            <InstagramLogoIcon />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        >
                            <TwitterLogoIcon />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        >
                            <GitHubLogoIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default DesktopFooter