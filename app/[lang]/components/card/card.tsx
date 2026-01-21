import styles from './card.module.css';

interface CardProps {
    icon: React.ReactNode;
    titleContent: string;
    descriptionContent: string;
    backgroundColor: string;
    border?: string;
}

export default function Card(props: CardProps) {
    const {
        icon,
        titleContent,
        descriptionContent,
        backgroundColor,
        border
    } = props;

    return (
        <div
            className={`${styles.cardContainer} flex flex-col gap-y-3`}
            style={{ backgroundColor: backgroundColor, border: border }}>
            <div className={`${styles.icon} flex items-center justify-center`}>
                {icon}
            </div>
            <h2 className={`${styles.title}`}>{titleContent}</h2>
            <p className={`${styles.description}`}>{descriptionContent}</p>
        </div>
    )
}