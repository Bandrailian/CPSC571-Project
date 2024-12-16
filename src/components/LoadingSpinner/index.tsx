import styles from './LoadingSpinner.module.scss';

export function LoadingSpinner() {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.text}>Processing your results...</p>
        </div>
    );
} 