import styles from './button.module.css';

interface Buttonprops {
    buttonType: 'button' | 'submit' | 'reset';
    hasTextContent: boolean;
    textContent?: string;
    hasIcon: boolean;
    icon?: React.ReactNode;
    backgroundColor: string;
    customClasses?: string;
}

export default function Button(props: Buttonprops) {
    const { 
        buttonType, 
        hasTextContent, 
        textContent, 
        hasIcon, 
        icon, 
        backgroundColor,
        customClasses,
    } = props;

    return (
        <button
            type={buttonType}
            className={`${styles.buttonContainer} ${customClasses} flex flex-row justify-center items-center`}
            style={{backgroundColor: backgroundColor}}
            >
            {hasIcon && !hasTextContent && icon}
            {!hasIcon && hasTextContent && <span className='px-3 text-white'>{textContent}</span>}
        </button>
    )
}