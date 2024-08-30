function App() {

  return (
    <div className="flex flex-col gap-4 mt-8">
      <textarea className="border" name="rawText" id="rawText" rows="7" placeholder="Enter your raw text"></textarea>
      <button className="bg-gray-200" type="button">Process</button>
      <textarea className="border" name="invalidSentences" id="invalidSentences"></textarea>
      <textarea className="border" name="validSentences" id="validSentences"></textarea>
    </div>
  )
}

export default App
