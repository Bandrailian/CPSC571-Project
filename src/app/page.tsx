'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
    const { isSignedIn, user } = useUser();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Mental Health Assessment Platform</h1>
                <p>Track your mental well-being with professional assessment tools</p>
            </header>

            <main className={styles.main}>
                {isSignedIn ? (
                    <div className={styles.dashboard}>
                        <div className={styles.welcomeSection}>
                            <h2>Welcome back, {user.firstName || 'User'}</h2>
                            <p>Continue monitoring your mental health journey</p>
                        </div>
                        <div className={styles.actions}>
                            <Link href="/assessment" className={styles.primaryButton}>
                                Start New Assessment
                            </Link>
                            <Link href="/history" className={styles.secondaryButton}>
                                View History
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className={styles.landing}>
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <h3>Professional Tools</h3>
                                <p>Using standardized GAD-7 and PHQ-9 assessments</p>
                            </div>
                            <div className={styles.feature}>
                                <h3>AI-Enhanced Analysis</h3>
                                <p>Advanced insights powered by artificial intelligence</p>
                            </div>
                            <div className={styles.feature}>
                                <h3>Private & Secure</h3>
                                <p>Your data is protected and confidential</p>
                            </div>
                        </div>
                        <div className={styles.cta}>
                            <Link href="/sign-up" className={styles.primaryButton}>
                                Get Started
                            </Link>
                            <Link href="/sign-in" className={styles.secondaryButton}>
                                Sign In
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}