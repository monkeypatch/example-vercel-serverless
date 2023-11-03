'use client'

import Image from 'next/image'
import {useState} from "react";
import axios from 'axios';

export default function Home() {
    const [statement, setStatement] = useState<string>("")
    const [evaluation, setEvaluation] = useState<{
        isTrue: 'yes' | 'no' | 'maybe',
        confidence: 'high' | 'medium' | 'low',
        explanation: string,
    } | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isFetching, setIsFetching] = useState(false)
    const fetchResults = () => {
        setIsFetching(true)
        setEvaluation(null)
        setError(null)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL

        // Make the request
        axios.get<null, Number>(`${apiUrl}?statement=${statement}`)
            .then(response => {
                if (Number.isNaN(response)) {
                    setError("An error occurred. Check the URL and verify it's a valid Yelp URL and try again.")
                } else {
                    if ((response as any).data) {
                        setEvaluation({
                            isTrue: (response as any).data.is_true,
                            confidence: (response as any).data.confidence,
                            explanation: (response as any).data.explanation,
                        })
                    }
                }
            })
            .catch(error => {
                setError("An error occurred. Check the URL and verify it's a valid Yelp URL and try again.")
            }).finally(() => {
            setIsFetching(false)
        });

    }

    return (
        <main className="flex min-h-screen flex-col items-center max-w-[1200px] m-auto mt-8">
            <h1 className={'text-lg font-bold'}>
                Evaluate the truthfulness of a statement!
            </h1>
            <div className={'flex gap-3'}>

                <textarea
                    placeholder={'Type your statement here...'}
                       className={'p-2 rounded-xl w-full max-w-120'}
                       value={statement}
                       onChange={(e) => setStatement(e.target.value)}
                />
                <button
                    disabled={isFetching}
                    onClick={fetchResults}
                    className={'border-2 p-2 rounded-xl bg-gray-300 hover:bg-gray-400 active:bg-gray-100'}
                >
                    Is it logically true?
                </button>

            </div>
            <div>
                {isFetching ? "I'm thinking..." : null}
                {error ? <div className={'text-red-500'}>{error}</div> : null}
                {evaluation ? <div className={'flex flex-col gap-2'}>
                    <div className={'flex flex-row gap-2'}>
                        <div className={'w-24'}>Is it true?</div>
                        <div className={'flex flex-row gap-2'}>
                            <div className={'w-24'}>{evaluation.isTrue}</div>
                            <div className={'flex flex-col'}>
                                <div className={'w-24 h-2 bg-gray-200 rounded-full'}>
                                    <div className={'h-2 bg-green-500 rounded-full'}
                                         style={{width: `${evaluation.isTrue === 'yes' ? 100 : evaluation.isTrue === 'maybe' ? 50 : 0}%`}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : null}
            </div>
        </main>
    )
}
