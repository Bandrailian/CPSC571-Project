'use client';

import { Component, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.errorContainer}>
                    <h2>Something went wrong</h2>
                    <p>{this.state.error?.message}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className={styles.retryButton}
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
} 