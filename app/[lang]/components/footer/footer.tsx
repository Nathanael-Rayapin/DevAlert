import type { Dictionary } from "@dictionary";
import "./footer.css";

export default function Footer({ dict }: { dict: Dictionary }) {

    const socialLinks = [
        {
            label: "Github",  
            href: process.env.NEXT_PUBLIC_GITHUB_URL
        }
    ]

    return (
        <div className="footer-container flex flex-row justify-between items-center w-full">
            <p className="copyright">{dict.home.footer.copyright}</p>
            <ul>
                {socialLinks.map((link) => {
                    return <li key={link.label}>
                        <a href={link.href} target="_blank">{link.label}</a>
                    </li>
                })}
            </ul>
        </div>
    )
}