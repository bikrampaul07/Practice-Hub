import React from 'react'
import Navbar from '../components/Navbar'
import { PROBLEMS } from "../Data/problems.js"
import { FileCodeCorner  } from "lucide-react"
import { problemDifficulty } from "../lib/utils.js"
import { Link } from 'react-router'

function ProblemsPage() {
  const problems = Object.values(PROBLEMS)

  return (
    <div className="bg-base-200">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-6 px-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-4">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Problems</h2>
              <div className="badge badge-outline">
                {problems.length} Total
              </div>
            </div>

            {/* Problems List */}
            <div className="space-y-3">
              {problems.map((problem) => (
                <Link
                  key={problem.id}
                  to={`/problems/${problem.id}`}
                  className="card bg-base-200 hover:bg-base-300 transition-all duration-200"
                >
                  <div className="card-body p-4">

                    {/* Top Row */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <FileCodeCorner  className="size-8 text-primary" />
                        <h3 className="font-medium">{problem.title}</h3>

                        <div className={`badge badge-sm ${problemDifficulty(problem.difficulty)}`}>
                          {problem.difficulty}
                        </div>
                      </div>

                      <button className="btn btn-sm btn-primary btn-outline">
                        Solve
                      </button>
                    </div>

                    {/* Category */}
                    <p className="text-xs text-primary/70">
                      {problem.category}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-base-content/80 mt-1">
                      {problem.description.text}
                    </p>

                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemsPage
