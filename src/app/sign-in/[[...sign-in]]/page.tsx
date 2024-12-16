'use client';

import { SignIn } from "@clerk/nextjs";
import styles from './page.module.scss';

export default function SignInPage() {
    return (
        <div className={styles.container}>
            <SignIn 
                appearance={{
                    elements: {
                        rootBox: styles.signInBox,
                        card: styles.card
                    }
                }}
                routing="path"
                path="/sign-in"
            />
        </div>
    );
} 