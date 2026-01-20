function Cancel({setShowFilters}) {
    return (
        //Cancel button: doesn't revert filters, just closes popup 
        <div className="flex justify-end">
            <button className="inline-flex items-center justify-center gap-2 border border-slate-300 rounded-full px-4 py-2 text-sm font-medium transition  text-slate-900 hover:cursor-pointer hover:bg-slate-50 duration-150 active:bg-slate-100 active:duration-150"
                onClick={() => {
                    setShowFilters(false);
                }}>
                Cancel
            </button>
        </div>
    )
}
export default Cancel;