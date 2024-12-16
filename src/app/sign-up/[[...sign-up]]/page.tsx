'use client';

import { SignUp } from "@clerk/nextjs";
import styles from './page.module.scss';

export default function SignUpPage() {
    return (
        <div className={styles.container}>
            <SignUp 
                appearance={{
                    elements: {
                        rootBox: styles.signUpBox,
                        card: styles.card
                    }
                }}
                routing="path"
                path="/sign-up"
            />
        </div>
    );
} 