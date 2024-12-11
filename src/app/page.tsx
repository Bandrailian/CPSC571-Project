import AnxietyForm from '@/components/AnxietyForm/AnxietyForm';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Mental Health Assessment Platform</h1>
        <p>Complete this confidential assessment to understand your anxiety levels</p>
      </header>
      <main>
        <AnxietyForm />
      </main>
    </div>
  );
}
