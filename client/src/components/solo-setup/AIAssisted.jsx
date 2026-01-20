function AIAssisted({config, setConfig}) {
    return (
        <div className="flex flex-col px-4">
            <label className="inline-flex gap-1 font-semibold">
                <input
                    type="checkbox"
                    checked={config.isAI}
                    onChange={() => {
                        setConfig({ ...config, isAI: !config.isAI })
                    }}
                    className="hover:cursor-pointer" />
                AI Assistance
            </label>
            <span className="text-sm text-slate-500">Stay on track with our AI Agent. </span>

        </div>
    )
}
export default AIAssisted;