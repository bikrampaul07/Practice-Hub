import React from 'react'
import { problemDifficulty } from '../lib/utils'

function ProblemDescription({ problem, problemId, onProblemChange, allProblems }) {
    return (
        <div className="h-full overflow-y-auto bg-base-200">
            {/* HEADER */}
            <div className="sticky top-0 z-10 bg-base-100 border-b border-base-300">
                <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-3xl font-semibold text-base-content leading-tight">
                            {problem.title}
                        </h1>
                        <span className={`badge badge-outline ${problemDifficulty(problem.difficulty)}`}>
                            {problem.difficulty}
                        </span>
                    </div>

                    <p className="text-sm text-primary font-medium">
                        {problem.category}
                    </p>

                    {/* Problem selector */}
                    <select
                        className="select select-sm w-full max-w-md bg-base-200"
                        value={problemId}
                        onChange={(e) => onProblemChange(e.target.value)}
                    >
                        {allProblems.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.title} — {p.difficulty}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* CONTENT */}
            <div className="space-y-6 p-6">
                {/* DESCRIPTION */}
                <section className="bg-base-100 rounded-2xl p-6 border border-base-300">
                    <h2 className="text-xl font-bold text-base-content mb-4">
                        Description
                    </h2>

                    <div className="space-y-4 text-base leading-relaxed text-base-content/90">
                        <p className='text-sm'>{problem.description.text}</p>
                        {problem.description.notes.map((note, idx) => (
                            <p key={idx}>{note}</p>
                        ))}
                    </div>
                </section>

                {/* EXAMPLES */}
                <section className="bg-base-100 rounded-2xl p-6 border border-base-300">
                    <h2 className="text-xl font-bold text-base-content mb-5">
                        Examples
                    </h2>

                    <div className="space-y-6">
                        {problem.examples.map((example, idx) => (
                            <div key={idx} className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="badge badge-sm badge-primary">
                                        {idx + 1}
                                    </span>
                                    <p className="font-semibold text-base-content">
                                        Example {idx + 1}
                                    </p>
                                </div>

                                <div className="bg-base-200 rounded-xl p-4 font-mono text-sm space-y-2">
                                    <div className="flex gap-3">
                                        <span className="text-primary font-bold min-w-[70px]">
                                            Input
                                        </span>
                                        <span>{example.input}</span>
                                    </div>

                                    <div className="flex gap-3">
                                        <span className="text-secondary font-bold min-w-[70px]">
                                            Output
                                        </span>
                                        <span>{example.output}</span>
                                    </div>

                                    {example.explanation && (
                                        <div className="pt-3 mt-3 border-t border-base-300 text-xs text-base-content/70 font-sans">
                                            <span className="font-semibold text-base-content">
                                                Explanation:
                                            </span>{" "}
                                            {example.explanation}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CONSTRAINTS */}
                <section className="bg-base-100 rounded-2xl p-6 border border-base-300">
                    <h2 className="text-xl font-bold text-base-content mb-4">
                        Constraints
                    </h2>

                    <ul className="space-y-3 text-base-content/90">
                        {problem.constraints.map((constraint, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <span className="text-primary text-lg leading-none">•</span>
                                <code className="text-sm bg-base-200 px-2 py-1 rounded">
                                    {constraint}
                                </code>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default ProblemDescription
