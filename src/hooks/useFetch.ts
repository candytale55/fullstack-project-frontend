import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'


type UseFetchOptions<T> = {
    initialData: T
    errorMessage?: string
}


export default function useFetch<T>(
    fetcher: () => Promise<T>,
    {
        initialData,
        errorMessage = 'Failed to load data',
    }: UseFetchOptions<T>
) {
    const [data, setData] =
        useState<T>(initialData)
    const [loading, setLoading] =
        useState(true)
    const [error, setError] =
        useState('')

    const isMounted = useRef(false)
    const requestId = useRef(0)

    useEffect(() => {
        isMounted.current = true

        return () => {
            isMounted.current = false
        }
    }, [])

    const refetch = useCallback(async () => {
        const currentRequestId =
            ++requestId.current

        if (isMounted.current) {
            setLoading(true)
            setError('')
        }

        try {
            const result = await fetcher()

            if (
                isMounted.current &&
                currentRequestId === requestId.current
            ) {
                setData(result)
            }
        } catch (error) {
            if (
                isMounted.current &&
                currentRequestId === requestId.current
            ) {
                setError(
                    error instanceof Error
                        ? error.message
                        : errorMessage
                )
            }
        } finally {
            if (
                isMounted.current &&
                currentRequestId === requestId.current
            ) {
                setLoading(false)
            }
        }
    }, [errorMessage, fetcher])

    useEffect(() => {
        const currentRequestId =
            ++requestId.current

        const load = async () => {
            try {
                const result = await fetcher()

                if (
                    isMounted.current &&
                    currentRequestId === requestId.current
                ) {
                    setData(result)
                }
            } catch (error) {
                if (
                    isMounted.current &&
                    currentRequestId === requestId.current
                ) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : errorMessage
                    )
                }
            } finally {
                if (
                    isMounted.current &&
                    currentRequestId === requestId.current
                ) {
                    setLoading(false)
                }
            }
        }

        void load()

        return () => {
            requestId.current += 1
        }
    }, [errorMessage, fetcher])

    return {
        data,
        loading,
        error,
        refetch,
    }
}
