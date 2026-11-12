export const shuffleItems = <T,>(
    items: T[]
): T[] => {

    const shuffled = [...items]

    for (
        let index = shuffled.length - 1;
        index > 0;
        index--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (index + 1)
            )

        const temporary =
            shuffled[index]

        shuffled[index] =
            shuffled[randomIndex] as T

        shuffled[randomIndex] =
            temporary as T
    }

    return shuffled
}


export const normalizeVocabularyAnswer = (
    value: string,
    languageCode: string
): string => {

    const locale =
        languageCode === 'pt'
            ? 'pt-PT'
            : 'en-US'

    return value
        .trim()
        .toLocaleLowerCase(locale)
        .replace(/\s+/g, ' ')
}