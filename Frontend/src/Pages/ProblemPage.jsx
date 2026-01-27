import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PROBLEMS } from "../Data/problems";
import Navbar from "../components/Navbar";

import { Panel, PanelResizeHandle, PanelGroup } from "react-resizable-panels";

import ProblemDescription from "../components/ProblemDescription";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import { executeCode } from "../lib/piston";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [codeByLanguage, setCodeByLanguage] = useState(() => ({
    ...PROBLEMS["two-sum"].starterCode,
  }));
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];
  const currentCode = codeByLanguage[selectedLanguage];

  /* -------------------- PROBLEM CHANGE -------------------- */
  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCodeByLanguage({ ...PROBLEMS[id].starterCode });
      setOutput(null);
    }
  }, [id]);

  /* -------------------- HANDLERS -------------------- */

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleProblemChange = (problemId) => {
    navigate(`/problem/${problemId}`);
  };

  const handleCodeChange = (newCode) => {
    setCodeByLanguage((prev) => ({
      ...prev,
      [selectedLanguage]: newCode,
    }));
  };

  /* -------------------- EXECUTION -------------------- */

  const triggerConfetti = () => {
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.2, y: 0.6 } });
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.8, y: 0.6 } });
  };

  const normalizeOutput = (output) =>
    output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ",")
      )
      .filter(Boolean)
      .join("\n");

  const checkIfTestsPassed = (actual, expected) =>
    normalizeOutput(actual) === normalizeOutput(expected);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    try {
      const result = await executeCode(selectedLanguage, currentCode);
      setOutput(result);

      if (result.success) {
        const expected =
          currentProblem.expectedOutput[selectedLanguage];

        if (checkIfTestsPassed(result.output, expected)) {
          triggerConfetti();
          toast.success("All tests passed! 🎉");
        } else {
          toast.error("Tests failed. Check your output.");
        }
      } else {
        toast.error("Code execution failed.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsRunning(false);
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* LEFT: PROBLEM */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              problemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary cursor-col-resize" />

          {/* RIGHT: EDITOR + OUTPUT */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={currentCode}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={handleCodeChange}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary cursor-row-resize" />

              <Panel defaultSize={30} minSize={25}>
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemPage;
