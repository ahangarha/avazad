import { useState } from "react"
import { validateRawText } from "./utils/validator";

function App() {
  const [rawText, setRawText] = useState('');
  const [validSentences, setValidSentences] = useState([]);
  const [invalidSentences, setInvalidSentences] = useState([]);

  const handleRawTextChange = (e) => setRawText(e.target.value);
  const handleValidSentencesChange = (e) => setValidSentences(e.target.value.split('\n'));
  const handleInvalidSentencesChange = (e) => setInvalidSentences(e.target.value.split('\n'));

  const process = () => {
    const { valids, invalids } = validateRawText(rawText)
    setValidSentences(valids)
    setInvalidSentences(invalids)
  }

  return (
    <div className="flex flex-col gap-4 mt-8">
      <textarea className="border shadow p-2" value={rawText} onChange={handleRawTextChange} name="rawText" id="rawText" rows="7" placeholder="Enter your raw text">
      </textarea>
      <button className="bg-gray-200" type="button" onClick={process}>Process</button>
      <textarea className="border shadow p-2" value={validSentences.join('\n')} onChange={handleValidSentencesChange} name="invalidSentences" id="invalidSentences"></textarea>
      <textarea className="border shadow p-2" value={invalidSentences.join('\n')} onChange={handleInvalidSentencesChange} name="validSentences" id="validSentences"></textarea>
    </div>
  )
}

export default App
