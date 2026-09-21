const API_URL = import.meta.env.VITE_API_URL


type StudySessionData = {
    questionsAnswered: number
    correctAnswers: number
}


/* ---------------------------------- */
/* Save completed study session       */
/* ---------------------------------- */

export async function saveStudySession(
    courseId: string,
    sessionData: StudySessionData
) {

    const token =
        localStorage.getItem('authToken')


    if (!token) {
        throw new Error(
            'User is not authenticated'
        )
    }

    // Send PATCH request to save study session
    const response = await fetch(
        `${API_URL}/api/v1/progress/me/course/${courseId}/session`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type':
                    'application/json',
                Authorization:
                    `Bearer ${token}`,
            },
            body: JSON.stringify(
                sessionData
            ),
        }
    )

    const data =
        await response.json()

    if (!response.ok) {
        throw new Error(
            data.error ||
            'Failed to save progress'
        )
    }

    return data
}