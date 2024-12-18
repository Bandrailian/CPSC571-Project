export const questions = [
    // Anxiety questions (GAD-7)
    {
        id: 'anxiety-1',
        text: 'How often have you experienced feeling nervous, anxious, or on edge?',
        type: 'anxiety',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'anxiety-2',
        text: 'How often have you felt unable to stop or control worrying?',
        type: 'anxiety',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'anxiety-3',
        text: 'How often have you been worrying too much about multiple different things?',
        type: 'anxiety',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'anxiety-4',
        text: 'How often have you felt that you\'ve had trouble relaxing?',
        type: 'anxiety',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'anxiety-5',
        text: 'How often have you felt so restless that it\'s hard to sit still?',
        type: 'anxiety',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'anxiety-6',
        text: 'How likely are you to become easily annoyed or irritable?',
        type: 'anxiety',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'anxiety-7',
        text: 'How often have you felt afraid, as if something awful might happen?',
        type: 'anxiety',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },

    // Depression questions (PHQ-9)
    {
        id: 'depression-1',
        text: 'How often have you felt little interest or pleasure in doing things?',
        type: 'depression',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'depression-2',
        text: 'How often have you felt down, depressed, or hopeless?',
        type: 'depression',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'depression-3',
        text: 'How likely are you to experience either having trouble falling/staying asleep, or sleeping too much?',
        type: 'depression',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'depression-4',
        text: 'How often do you feel tired or as if you are low on energy?',
        type: 'depression',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'depression-5',
        text: 'How likely are you to either have a poor appetite or to be overeating?',
        type: 'depression',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'depression-6',
        text: 'How often are you feeling bad about yourself or that you are a failure?',
        type: 'depression',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'depression-7',
        text: 'How often are you having trouble concentrating on things?',
        type: 'depression',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'depression-8',
        text: 'How often have you been moving or speaking either very slowly or quickly, such that other people might have noticed or said something?',
        type: 'depression',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },
    {
        id: 'depression-9',
        text: 'How often have you had thoughts that you would be better off dead, or had thoughts of hurting yourself?',
        type: 'depression',
        options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
        ],
    },

    // Lifestyle questions
    {
        id: 'lifestyle-1',
        text: 'How many hours of sleep did you typically get each night on average?',
        type: 'lifestyle',
        category: 'sleep-hygiene',
        options: [
            { text: 'At least 8 hours', value: 3 },
            { text: 'Between 6 and 8 hours', value: 2 },
            { text: 'Between 4 and 6 hours', value: 1 },
            { text: 'Less than 4 hours', value: 0 },
        ],
    },
    {
        id: 'lifestyle-2',
        text: 'Which of the following best describe how often you wake up in the middle of the night?',
        type: 'lifestyle',
        category: 'sleep-hygiene',
        options: [
            { text: 'I sleep well until the morning', value: 3 },
            { text: 'I might wake up rarely, but can get back to sleep easily', value: 2 },
            { text: 'I wake up often, but can still get back to sleep easily', value: 1 },
            { text: 'I wake up often and struggle to get back to sleep', value: 0 },
        ],
    },
    {
        id: 'lifestyle-3',
        text: 'How many times per week did you exercise?',
        type: 'lifestyle',
        category: 'exercise',
        options: [
            { text: 'Never', value: 0 },
            { text: '1 or 2 times', value: 1 },
            { text: '3 or 4 times', value: 2 },
            { text: '5 or more times', value: 3 },
        ],
    },
    {
        id: 'lifestyle-4',
        text: 'How many hours per week would you say you exercise on average?',
        type: 'lifestyle',
        category: 'exercise',
        options: [
            { text: 'None', value: 0 },
            { text: 'Less than * hours', value: 1 },
            { text: 'Between * and * hours', value: 2 },
            { text: 'At least * hours', value: 3 },
        ],
    },
    {
        id: 'lifestyle-5',
        text: 'How often each week did you engage in social activities with friends or family?',
        type: 'lifestyle',
        category: 'social',
        options: [
            { text: 'Never', value: 0 },
            { text: 'Once', value: 1 },
            { text: 'Twice', value: 2 },
            { text: 'Three or more', value: 3 },
        ],
    },
    {
        id: 'lifestyle-6',
        text: 'How would you rate your work-life balance?',
        type: 'lifestyle',
        category: 'social',
        options: [
            { text: 'Poor', value: 0 },
            { text: 'Fair', value: 1 },
            { text: 'Good', value: 2 },
            { text: 'Excellent', value: 3 },
        ],
    }
]; 