import PropTypes from 'prop-types'


const Batch = PropTypes.shape({
  id: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  source: PropTypes.string.isRequired,
  rationale: PropTypes.string.isRequired,
  domain: PropTypes.string,
})

function Batches({ batches }) {
  return(
    <div className="flex flex-col gap-4 text-sm text-slate-400 overflow-auto">
      {batches.map((batch) => <SingleBatch batch={batch} key={batch.id} />)}
    </div>
  )
}

Batches.propTypes = {
  batches: PropTypes.arrayOf(Batch).isRequired,
}

function SingleBatch({ batch }) {
  return (
    <div className="flex justify-stretch w-full border border-slate-700 rounded-xl bg-white/5 shadow">
      <div className="grid place-content-center text-center w-20 p-2 border-e border-e-slate-700">
        <span>تعداد</span>
        <span className="text-3xl">{batch.data.length}</span>
      </div>
      <div className="flex flex-col flex-grow gap-1 p-2">
        <p className="overflow-hidden bg-black/10 p-1 rounded w-full">منبع: {batch.source || 'وارد نشده!'}</p>
        <p className="overflow-hidden bg-black/10 p-1 rounded w-full">پروانه: {batch.rationale || 'وارد نشده!'}</p>
        <p className="overflow-hidden bg-black/10 p-1 rounded w-full">موضوع: {batch.domain || 'وارد نشده!'}</p>
      </div>
    </div>
  )
}

SingleBatch.propTypes = {
  batch: Batch
}

export default Batches
