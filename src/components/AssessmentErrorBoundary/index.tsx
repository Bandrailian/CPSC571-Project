'use client';

import { Component, ReactNode } from 'react';
import styles from './index.module.scss';
import { ErrorInfo } from '@/types/common';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: string;
}

export class AssessmentErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: '',
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
            errorInfo: error.message,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Assessment Error:', error, errorInfo);
        // You could send this to an error reporting service
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: '' });
    };

    handleRestart = () => {
        window.location.href = '/assessment';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.errorContainer}>
                    <h2>Something went wrong with your assessment</h2>
                    <p className={styles.errorMessage}>{this.state.errorInfo}</p>
                    <div className={styles.actions}>
                        <button 
                            onClick={this.handleRetry}
                            className={styles.retryButton}
                        >
                            Try Again
                        </button>
                        <button 
                            onClick={this.handleRestart}
                            className={styles.restartButton}
                        >
                            Restart Assessment
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
} 