'use client'

import { FiBell } from "react-icons/fi";
import { usePathname } from 'next/navigation'
import Button from '../button/button';
import Link from "next/link";
import type { Dictionary } from "@dictionary";
import "./navbar.css";

export default function Navbar({ dict }: { dict: Dictionary }) {

    const pathname = usePathname();

    const navlinks = [
        {
            id: 1,
            label: dict.navbar.feature,
            path: "/features",
        },
        {
            id: 2,
            label: dict.navbar.pricing,
            path: "/pricing",
        },
        {
            id: 3,
            label: dict.navbar.howItWorks,
            path: "/how-it-works",
        },
    ]

    return (
        <div className="navbar-container flex flex-row justify-between items-center">
            <div className="logo-container flex items-center">
                <Button
                    buttonType="button"
                    hasTextContent={false}
                    hasIcon={true}
                    icon={<FiBell color="#f5f9ff" />}
                    backgroundColor="var(--primary-color)"
                    hoverBackgroundColor="var(--primary-dark-color)"
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
                <h2 className="text-white signin">{dict.authentication.signin}</h2>
                <Button
                    buttonType="button"
                    hasTextContent={true}
                    textContent={dict.authentication.signup}
                    hasIcon={false}
                    backgroundColor="var(--primary-color)"
                    hoverBackgroundColor="var(--primary-dark-color)"
                />
            </div>

        </div>
    )
}