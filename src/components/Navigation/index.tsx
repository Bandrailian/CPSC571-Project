'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import styles from './Navigation.module.scss';

export function Navigation() {
    const { isSignedIn } = useUser();

    return (
        <nav className={styles.navigation}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    MH Assessment
                </Link>

                <div className={styles.links}>
                    {isSignedIn ? (
                        <>
                            <Link href="/assessment">Assessment</Link>
                            <Link href="/history">History</Link>
                            <UserButton afterSignOutUrl="/" />
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in">Sign In</Link>
                            <Link href="/sign-up" className={styles.signUp}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
} 