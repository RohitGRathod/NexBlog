import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../index'

function Footer() {
    return (
        <section className="bg-gray-900 text-gray-300 border-t border-gray-700 h-64 ">
            <div className="max-w-7xl mx-auto px-4 py-12 ">
                <div className="flex flex-wrap -m-6">
                    {/* Logo + Copyright */}
                    <div className="w-full md:w-1/2 lg:w-5/12 p-6 ">
                        <div className="flex flex-col h-full justify-between">
                            <div className="mb-6">
                                <Logo width="100px" />
                            </div>
                            <p className="text-sm text-gray-400 mt-6">
                                &copy; {new Date().getFullYear()} DevUI. All rights reserved.
                            </p>
                        </div>
                    </div>

                    {/* Reusable Link Section */}
                    {[
                        { title: "Company", links: ["Features", "Pricing", "Affiliate Program", "Press Kit"] },
                        { title: "Support", links: ["Account", "Help", "Contact Us", "Customer Support"] },
                        { title: "Legals", links: ["Terms & Conditions", "Privacy Policy", "Licensing"] },
                    ].map((section, idx) => (
                        <div key={idx} className="w-full md:w-1/2  lg:w-2/12 p-6r">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">
                                {section.title}
                            </h3>
                            <ul>
                                {section.links.map((text, i) => (
                                    <li key={i} className="mb-4">
                                        <Link
                                            to="/"
                                            className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                                        >
                                            {text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}

export default Footer
