import { useEffect, useState, useCallback } from "react"
import starkString from "starkstring"
import { validateRawText } from "./utils/textProcessor";
import { generateTsvFile, downloadBlob } from "./utils/tsvGenerator";
import AppInfoHeader from "./AppInfoHeader";
import { MIN_EXPRESSIONS_NO } from "./constants";

import Batches from "./Batches"
import Button from "./Button";

function createBatch(validSentences, source, rationale, domain) {
  const data = []

  validSentences.forEach((sentence) => {
    data.push([
      sentence,
      source,
      rationale,
      '',
      domain
    ])
  })

  const id = Date.now()

  return {
    id,
    data,
    source,
    rationale,
    domain
  }
}

function App() {
  const [rawText, setRawText] = useState('');
  const [validSentences, setValidSentences] = useState([]);
  const [source, setSource] = useState('')
  const [rationale, setRationale] = useState('')
  const [domain, setDomain] = useState('')
  const [isValidForm, setIsValidForm] = useState(false)
  const [batches, setBatches] = useState([])
  const [totalValidSentences, setTotalValidSentences] = useState(0)

  const handleRawTextChange = useCallback(
    (e) => setRawText(e.target.value),
    [setRawText]
  );
  const handleValidSentencesChange = useCallback(
    (e) => setValidSentences(e.target.value.split('\n')),
    [setValidSentences]
  );
  const handleSourceChange = (e) => setSource(e.target.value);
  const handleRationaleChange = useCallback(
    (e) => setRationale(e.target.value),
    [setRationale]
  );
  const handleDomainChange = useCallback(
    (e) => setDomain(e.target.value),
    [setDomain]
  );

  const isPresent = (input) => {
    if (input instanceof Array) return input.length > 0
    if (typeof input === 'string') return input.replace(/\s/g, '').length > 0
  }
  
  const handleSaveBatchButtonClick = useCallback(
  () => {
    const newBatch = createBatch(
      validSentences,
      source,
      rationale,
      domain
    )

    setBatches([...batches, newBatch])
    setValidSentences([])
  },
  [
    setBatches,
    setValidSentences,
    batches,
    validSentences,
    source,
    rationale,
    domain
  ]
  );

  const handleExportbuttonClick = useCallback(() => {
    const tsvBlob = generateTsvFile(batches)
    const timestamp = Date.now()
    const filename = `mcv-bulk-text-${timestamp}.tsv`
    downloadBlob(tsvBlob, filename)
  }, [batches]);

  useEffect(() => {
    setIsValidForm(isPresent(source) && isPresent(rationale) && isPresent(validSentences))
  }, [source, rationale, validSentences]);

  useEffect(() => {
    const numberOfValidSentences = batches.reduce((previousSum, currentBatch) => {
      return previousSum + currentBatch.data.length
    }, 0)
    setTotalValidSentences(numberOfValidSentences)
  },
  [batches]);

  const process = useCallback(() => {
    const { valids, invalids } = validateRawText(rawText)
    setValidSentences(validSentences.concat(valids))
    setRawText(invalids.join('\n'))
  }, [rawText, validSentences]);

  return (
      <div className="flex flex-col lg:grid lg:grid-cols-3 min-h-screen lg:max-h-screen">
        <section className="flex flex-col justify-between overflow-hidden m-2 border-2 border-rose-800 bg-rose-800/15 rounded-xl">
          <AppInfoHeader />
          <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto overflow-auto">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">متن ورودی</h3>
              <textarea
                className="p-2 bg-slate-900/50 border border-slate-700 rounded-xl"
                value={rawText}
                onChange={handleRawTextChange}
                name="rawText"
                id="rawText"
                rows="7"
                placeholder="متنی رو که می‌خوای پردازش بشه، اینجا وارد کن!"
                dir="auto"
              ></textarea>
            </div>

            <div className="flex flex-col gap-1">
              <Button
                classNames="bg-sky-700 hover:bg-sky-800"
                onClick={process}
              >
                تبدیل و استخراج عبارات معتبر
              </Button>
              <div className="flex gap-2 text-sm text-slate-500">
                <span>
                  🛈
                </span>
                <div>
                  <p>
                    در پردازش اولیه، متون معتبر استخراج و به مرحله بعد فرستاده می‌شن!
                  </p>
                  <p>
                    جاهایی که بشه، عبارات ورودی رو تغییر می‌دیم که شرایط معتبر بودن رو پیدا کنن!
                  </p>
                  <p>
                    آخرش هم عبارات نامعتبر، در همین قسمت باقی می‌مونن تا بتونید دستی تغییرشون بدی.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <footer className="bg-black/30 text-slate-400 text-center text-sm px-4 py-4">
            <a href="https://framagit.org/ahangarha/mcv-bulk-text/" className="underline" target="_blank">کد منبع</a>
            &nbsp;
            تحت پروانهٔ AGPL 3.0
          </footer>
        </section>

        <section className="overflow-auto m-2 p-4 border-2 border-yellow-800 bg-yellow-800/15 rounded-xl">
          <div className="flex flex-col gap-4 p-4 my-8 max-w-2xl mx-auto">

          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <h3 className="font-semibold">عبارات معتبر</h3>
              <span className="text-sm opacity-75">
                {starkString(validSentences.length).persianNumber().toString()}
                &nbsp;
                عبارت
              </span>
            </div>
            <textarea
              className="p-2 bg-slate-900/50 border border-slate-700 rounded-xl"
              value={validSentences.join('\n')}
              onChange={handleValidSentencesChange}
              rows="7"
              name="validSentences"
              id="validSentences"
              dir="auto"
              readOnly
            />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">اطلاعات دیگر</h3>
            <p>مقادیر زیر روی تمام عبارات معتبر فوق اعمال می‌شن.</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="source">منبع <span className="text-red-500">*</span></label>
            <input
              className="p-2 bg-slate-900/50 border border-slate-700 rounded-xl grow"
              value={source}
              onChange={handleSourceChange}
              type="text"
              name="source"
              id="source"
              required placeholder="مثلا: Mostafa Ahangarha (self)"
            />
            {!isPresent(source) ? <p className="text-red-500 text-sm">منبع ضروریه!</p> : '' }
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="rationale">توضیحات بیشتر در خصوص پروانهٔ آزاد <span className="text-red-500">*</span></label>
            <input
              className="p-2 bg-slate-900/50 border border-slate-700 rounded-xl grow"
              value={rationale}
              onChange={handleRationaleChange}
              type="text"
              name="rationale"
              id="rationale"
              required placeholder="مثلا: My own submission, copyright waived" />
            {!isPresent(rationale) ? <p className="text-red-500 text-sm">این توضیحات ضروریه!</p> : '' }
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="domain">موضوع (انتخابی و یکی از موارد زیر)</label>
            <div className="text-xs font-semibold text-slate-400">
              <ul className="flex flex-wrap gap-2">
                <li className="bg-slate-100/10 px-2 py-1 rounded-lg">Agriculture and Food</li>
                <li className="bg-slate-100/10 px-2 py-1 rounded-lg">Automotive and Transport</li>
                <li className="bg-slate-100/10 px-2 py-1 rounded-lg">Finance</li>
                <li className="bg-slate-100/10 px-2 py-1 rounded-lg">Ganeral</li>
                <li className="bg-slate-100/10 px-2 py-1 rounded-lg">Healthcare</li>
                <li className="bg-slate-100/10 px-2 py-1 rounded-lg">History, Law and Government</li>
                <li className="bg-slate-100/10 px-2 py-1 rounded-lg">Language Fundamentals (e.g. Digits, Letters, Money)</li>
              </ul>
            </div>
            <input
              className="p-2 bg-slate-900/50 border border-slate-700 rounded-xl grow"
              value={domain}
              onChange={handleDomainChange}
              type="text"
              name="domain"
              id="domain"
              required
              placeholder="مثلا: General" />
          </div>
          <div className="flex flex-col gap-1">
              <Button
                classNames="bg-sky-700 disabled:text-slate-300 hover:bg-sky-800"
                onClick={handleSaveBatchButtonClick}
                disabled={!isValidForm}
              >
                ساخت دسته
              </Button>
              <div className="flex gap-2 text-sm text-slate-500">
                <span>
                  🛈
                </span>
                <div>
                  <p>
                    این عبارات معتبر را موقتا به صورت یک دسته ذخیره کن.
                  </p>
                  <p>
                    بعدا می‌تونی همهٔ دسته‌ها رو که روی هم حداقل هزار عبارت معتبر دارند رو خروجی بگیری.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8 justify-between overflow-auto m-2 p-4 border-2 border-green-800 bg-green-800/15 rounded-xl">
          <Batches batches={batches} />
          <div className="flex items-center justify-between">
            <div>
              مجموعه عبارات: {totalValidSentences}/{MIN_EXPRESSIONS_NO}
            </div>
            <Button
              className="rounded bg-green-700 hover:bg-green-800"
              onClick={handleExportbuttonClick}
              disabled={totalValidSentences < MIN_EXPRESSIONS_NO}
            >
              ساخت پروندهٔ TSV
            </Button>
          </div>
        </section>
      </div>
  )
}

export default App;
