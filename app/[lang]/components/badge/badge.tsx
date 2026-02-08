import styles from './badge.module.css';

interface BadgeProps {
    hasTextContent: boolean;
    textContent?: string;
    hasIcon: boolean;
    icon?: React.ReactNode;
    backgroundColor: string;
    border?: string;
}

export default function Badge(props: BadgeProps) {
    const {
        hasTextContent,
        textContent,
        hasIcon,
        icon,
        backgroundColor,
        border,
    } = props;

    return (
        <div
            className={`${styles.badgeContainer} flex flex-row justify-center items-center`}
            style={{ backgroundColor: backgroundColor, border: border }}>
            {hasIcon && !hasTextContent && icon}
            {!hasIcon && hasTextContent && <span className='text-white text-xs'>{textContent}</span>}
            {hasIcon && hasTextContent && <span className='text-white flex items-center gap-2 text-xs'>{icon} {textContent}</span>}
        </div>
    )
}