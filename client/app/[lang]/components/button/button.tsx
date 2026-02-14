'use client'

import { useState } from 'react';
import styles from './button.module.css';

interface Buttonprops {
    buttonType: 'button' | 'submit' | 'reset';
    hasTextContent: boolean;
    textContent?: string;
    hasIcon: boolean;
    icon?: React.ReactNode;
    backgroundColor: string;
    hoverBackgroundColor?: string;
    border?: string;
    href?: string;
}

export default function Button(props: Buttonprops) {
    const {
        buttonType,
        hasTextContent,
        textContent,
        hasIcon,
        icon,
        backgroundColor,
        hoverBackgroundColor,
        border,
        href
    } = props;

    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            type={buttonType}
            className={`${styles.buttonContainer} flex flex-row justify-center items-center`}
            style={{ backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor, border: border  || 'none' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>

            {hasIcon && !hasTextContent && icon}
            {!hasIcon && hasTextContent && !href && <span className='px-3 text-white'>{textContent}</span>}
            {!hasIcon && hasTextContent && href && <a href={href} target='_blank' className='px-3 text-white'>{textContent}</a>}
            
        </button>
    )
}