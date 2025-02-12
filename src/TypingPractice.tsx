import { useState, JSX } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const grayAtomDark = JSON.parse(JSON.stringify(atomDark));
const transparentAtomDark = JSON.parse(JSON.stringify(atomDark));
Object.keys(atomDark).forEach((key) => {
  if (atomDark[key].color) {
    grayAtomDark[key].color = "gray";
  }
  if (atomDark[key].background) {
    transparentAtomDark[key].background = "transparent";
  }
});

export default function TypingPractice(): JSX.Element {
  const [codeString, setCodeString] = useState<string>(`function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('World');`);

  const [index, setIndex] = useState(0);
  const [language, setLanguage] = useState("javascript");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const char = e.key;
    if (char === codeString[index]) {
      let newIndex = index + 1;
      while (codeString[newIndex] === " " || codeString[newIndex] === "\n") {
        newIndex++;
      }
      setIndex(newIndex);
    }
    e.preventDefault();
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCodeString(e.target.value);
    setIndex(0); // Reset index when codeString changes
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <>
      <textarea
        value={codeString}
        onChange={handleTextareaChange}
        placeholder="Paste your code here..."
        style={{
          width: "100%",
          height: "6rem",
          padding: "0.5rem",
          marginBottom: "1rem",
          border: "2px solid",
          borderRadius: "0.25rem",
          backgroundColor: "#2d2d2d",
          color: "white",
          outline: "none",
          //   boxShadow: "0 0 0 2px #2563eb",
        }}
      />
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="language" style={{ marginRight: "0.5rem" }}>
          Select Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          style={{
            padding: "0.5rem",
            border: "2px solid",
            borderRadius: "0.25rem",
            backgroundColor: "#2d2d2d",
            color: "white",
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="ruby">Ruby</option>
          <option value="rust">Rust</option>
        </select>
      </div>
      <div tabIndex={0} onKeyDown={handleKeyDown}>
        <div style={{ position: "absolute", width: "100%", left: 0 }}>
          <SyntaxHighlighter
            language={language}
            style={{ ...grayAtomDark, "*": { wi: "100%" } }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
        <div style={{ position: "absolute", width: "100%", left: 0 }}>
          <SyntaxHighlighter language={language} style={transparentAtomDark}>
            {codeString.slice(0, index)}
          </SyntaxHighlighter>
        </div>
      </div>
    </>
  );
}
