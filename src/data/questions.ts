export const questions = [
    // Anxiety questions (GAD-7)
    {
        id: 'anxiety-1',
        text: 'Feeling nervous, anxious, or on edge',
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
        text: 'Not being able to stop or control worrying',
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
        text: 'Worrying too much about different things',
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
        text: 'Trouble relaxing',
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
        text: 'Being so restless that it\'s hard to sit still',
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
        text: 'Becoming easily annoyed or irritable',
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
        text: 'Feeling afraid as if something awful might happen',
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
        text: 'Little interest or pleasure in doing things',
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
        text: 'Feeling down, depressed, or hopeless',
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
        text: 'Trouble falling or staying asleep, or sleeping too much',
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
        text: 'Feeling tired or having little energy',
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
        text: 'Poor appetite or overeating',
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
        text: 'Feeling bad about yourself or that you are a failure',
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
        text: 'Trouble concentrating on things',
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
        text: 'Moving or speaking so slowly that other people could have noticed',
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
        text: 'Thoughts that you would be better off dead or of hurting yourself',
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
        text: 'How many hours of sleep do you typically get?',
        type: 'lifestyle',
        options: [
            { text: 'Less than 5 hours', value: 0 },
            { text: '5-6 hours', value: 1 },
            { text: '7-8 hours', value: 2 },
            { text: 'More than 8 hours', value: 3 },
        ],
    },
    {
        id: 'lifestyle-2',
        text: 'How often do you exercise?',
        type: 'lifestyle',
        options: [
            { text: 'Never', value: 0 },
            { text: '1-2 times per week', value: 1 },
            { text: '3-4 times per week', value: 2 },
            { text: '5 or more times per week', value: 3 },
        ],
    },
    {
        id: 'lifestyle-3',
        text: 'How would you rate your stress levels?',
        type: 'lifestyle',
        options: [
            { text: 'Very high', value: 0 },
            { text: 'High', value: 1 },
            { text: 'Moderate', value: 2 },
            { text: 'Low', value: 3 },
        ],
    },
    {
        id: 'lifestyle-4',
        text: 'How often do you engage in social activities?',
        type: 'lifestyle',
        options: [
            { text: 'Rarely or never', value: 0 },
            { text: 'Once a month', value: 1 },
            { text: 'Weekly', value: 2 },
            { text: 'Multiple times per week', value: 3 },
        ],
    },
    {
        id: 'lifestyle-5',
        text: 'How would you rate your work-life balance?',
        type: 'lifestyle',
        options: [
            { text: 'Poor', value: 0 },
            { text: 'Fair', value: 1 },
            { text: 'Good', value: 2 },
            { text: 'Excellent', value: 3 },
        ],
    }
]; 