'use client'

import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { usePathname } from 'next/navigation'
import Button from '../button/button';
import Link from "next/link";
import "./navbar.css";

export default function Navbar() {

    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);

    const navlinks = [
        {
            id: 1,
            label: "Features",
            path: "/features",
        },
        {
            id: 2,
            label: "Pricing",
            path: "/pricing",
        },
        {
            id: 3,
            label: "How it works",
            path: "/how-it-works",
        },
    ]

    return (
        <div className="navbar-container flex flex-row justify-between items-center">
            <div className="logo-container flex items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <Button
                    buttonType="button"
                    hasTextContent={false}
                    hasIcon={true}
                    icon={<FiBell color="#f5f9ff" />}
                    backgroundColor={isHovered ? "var(--primary-dark-color)" : "var(--primary-color)"}
                />
                <h1 className="text-white">DevAlert</h1>
            </div>

            <div className="navlink-container flex items-center">
                <ul className="flex flex-row gap-8">
                    {navlinks.map((link) => {
                        return <li key={link.id} className="text-white">
                            <Link
                                href={link.path}
                                className={pathname === link.path ? 'active' : ''}>
                                {link.label}
                            </Link>
                        </li>
                    })}
                </ul>
            </div>

            <div className="cta-container flex items-center">
                <h2 className="text-white">Sign in</h2>
                <Button
                    buttonType="button"
                    hasTextContent={true}
                    textContent="Get started"
                    hasIcon={false}
                    backgroundColor={isHovered ? "var(--primary-dark-color)" : "var(--primary-color)"}
                />
            </div>

        </div>
    )
}