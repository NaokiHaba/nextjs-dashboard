'use client'

import { useEffect } from "react"

export default function Error(
    {
        error,
        reset
    }: {
        error: Error & { digest?: string },
        reset: () => void
    }) {
    // 他の場所に影響を及ぼす副作用を扱うための Hook
    // error が変更されたときに実行される
    useEffect(() => {
        console.error(error)
    }, [ error ])

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-center">Something went wrong!</h2>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
    );

}