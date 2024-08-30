import { useState } from "react"
import { validateRawText } from "./utils/validator";
import { generateTsvFile, downloadBlob } from "./utils/tsvGenerator";

function App() {
  const [rawText, setRawText] = useState('');
  const [validSentences, setValidSentences] = useState([]);
  const [invalidSentences, setInvalidSentences] = useState([]);
  const [source, setSource] = useState('')
  const [rationale, setRationale] = useState('')
  const [domain, setDomain] = useState('')

  const handleRawTextChange = (e) => setRawText(e.target.value);
  const handleValidSentencesChange = (e) => setValidSentences(e.target.value.split('\n'));
  const handleInvalidSentencesChange = (e) => setInvalidSentences(e.target.value.split('\n'));
  const handleSourceChange = (e) => setSource(e.target.value);
  const handleRationaleChange = (e) => setRationale(e.target.value);
  const handleDomainChange = (e) => setDomain(e.target.value);

  const handleExportbuttonClick = () => {
    const tsvBlob = generateTsvFile(validSentences, source, rationale, domain)
    downloadBlob(tsvBlob, 'bulk.tsv')
  }

  const process = () => {
    const { valids, invalids } = validateRawText(rawText)
    setValidSentences(valids)
    setInvalidSentences(invalids)
  }

  return (
    <div className="flex flex-col gap-4 p-4 my-8">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">Input text</h3>
        <textarea className="border shadow p-2" value={rawText} onChange={handleRawTextChange} name="rawText" id="rawText" rows="7" placeholder="Enter your raw text">
        </textarea>
      </div>

      <button className="bg-gray-200" type="button" onClick={process}>Process</button>

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">Valid lines</h3>
        <textarea className="border shadow p-2" value={validSentences.join('\n')} onChange={handleValidSentencesChange} rows="7" name="invalidSentences" id="invalidSentences"></textarea>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">Invalid lines</h3>
        <textarea className="border shadow p-2" value={invalidSentences.join('\n')} onChange={handleInvalidSentencesChange} rows="7" name="validSentences" id="validSentences"></textarea>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">Other information</h3>
        <p>These fields are applied on all valid sentences.</p>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="source">Source <span className="text-red-500">*</span></label>
        <input className="border shadow p-2 grow" value={source} onChange={handleSourceChange} type="text" name="source" id="source" required placeholder="Example: Jane Doe (self)" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="rationale">Additional rationale for open license <span className="text-red-500">*</span></label>
        <input className="border shadow p-2 grow" value={rationale} onChange={handleRationaleChange} type="text" name="rationale" id="rationale" required placeholder="Example: My own submission, copyright waived" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="domain">Domain (optional)</label>
        <div className="text-xs font-semibold text-gray-600">
          <ul className="flex flex-wrap gap-2">
            <li className="bg-gray-100 px-2 py-1 rounded-lg">Agriculture and Food</li>
            <li className="bg-gray-100 px-2 py-1 rounded-lg">Automotive and Transport</li>
            <li className="bg-gray-100 px-2 py-1 rounded-lg">Finance</li>
            <li className="bg-gray-100 px-2 py-1 rounded-lg">Ganeral</li>
            <li className="bg-gray-100 px-2 py-1 rounded-lg">Healthcare</li>
            <li className="bg-gray-100 px-2 py-1 rounded-lg">History, Law and Government</li>
            <li className="bg-gray-100 px-2 py-1 rounded-lg">Language Fundamentals (e.g. Digits, Letters, Money)</li>
          </ul>
        </div>
        <input className="border shadow p-2 grow" value={domain} onChange={handleDomainChange} type="text" name="domain" id="domain" required placeholder="Example: General" />
      </div>

      <button className="bg-gray-200" onClick={handleExportbuttonClick} type="button">Export as TSV file</button>
    </div>
  )
}

export default App
