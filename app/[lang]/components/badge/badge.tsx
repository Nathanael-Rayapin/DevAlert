import styles from './badge.module.css';

interface BadgeProps {
    hasTextContent: boolean;
    textContent?: string;
    hasIcon: boolean;
    icon?: React.ReactNode;
    backgroundColor: string;
}

export default function Badge(props: BadgeProps) {
    const {
        hasTextContent,
        textContent,
        hasIcon,
        icon,
        backgroundColor
    } = props;

    return (
        <div
            className={`${styles.badgeContainer} flex flex-row justify-center items-center`}
            style={{ backgroundColor: backgroundColor }}>
            {hasIcon && !hasTextContent && icon}
            {!hasIcon && hasTextContent && <span className='px-3 text-white'>{textContent}</span>}
            {hasIcon && hasTextContent && <span className='px-8 text-white flex items-center gap-2'>{icon} {textContent}</span>}
        </div>
    )
}