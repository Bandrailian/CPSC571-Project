'use client';

import { useState } from 'react';
import styles from './AnxietyForm.module.scss';

interface FormData {
  age: number;
  gender: string;
  sleepQuality: number;
  worryLevel: number;
  physicalSymptoms: string[];
  freeformResponse: string;
}

export default function AnxietyForm() {
  const [formData, setFormData] = useState<FormData>({
    age: 0,
    gender: '',
    sleepQuality: 5,
    worryLevel: 5,
    physicalSymptoms: [],
    freeformResponse: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Will implement API call here
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Anxiety Assessment Form</h2>
      
      <div className={styles.formGroup}>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          value={formData.age}
          onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          value={formData.gender}
          onChange={(e) => setFormData({...formData, gender: e.target.value})}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Sleep Quality (1-10)</label>
        <input
          type="range"
          min="1"
          max="10"
          value={formData.sleepQuality}
          onChange={(e) => setFormData({...formData, sleepQuality: parseInt(e.target.value)})}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Daily Worry Level (1-10)</label>
        <input
          type="range"
          min="1"
          max="10"
          value={formData.worryLevel}
          onChange={(e) => setFormData({...formData, worryLevel: parseInt(e.target.value)})}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Please describe how you've been feeling lately:</label>
        <textarea
          value={formData.freeformResponse}
          onChange={(e) => setFormData({...formData, freeformResponse: e.target.value})}
          rows={5}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit Assessment
      </button>
    </form>
  );
} 