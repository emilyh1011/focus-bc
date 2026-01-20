import React from "react";
import { Link2, X } from "lucide-react";

//Reusuable for both the Hardblocks and Softnudges
const BlockInputSection = ({
  label,
  description,
  placeholder,
  inputValue,
  onChangeInput,
  onSubmit,
  onDelete,
  duplicateMessage,
  entries,
}) => {
  return (
    <label className="flex flex-col w-full p-2 gap-3 relative">
      <div className="flex flex-col">
        <span className="font-medium text-md">{label}</span>
        <span className="text-xs text-slate-500">{description}</span>
      </div>

      <form
        className="flex rounded-lg px-3 py-2 w-full gap-2 items-center bg-slate-50 drop-shadow-md transition duration-150
        hover:bg-slate-100 hover:cursor-pointer focus-within:outline focus-within:outline-blue-500"
        onSubmit={onSubmit}
      >
        <Link2 size={18} />
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          className="w-full text-sm focus:outline-none text-slate-900"
          onChange={onChangeInput}
        />
      </form>

      {duplicateMessage && (
        <span className="text-xs w-full text-red-500">{duplicateMessage}</span>
      )}

      {entries.length > 0 && (
        <div className="w-full flex flex-wrap text-xs text-slate-500 gap-1 max-h-20 overflow-scroll rounded-md">
          {entries.map((link) => (
            <div key={link} className="flex gap-0.5 items-center">
              <X
                size={14}
                className="text-slate-500 hover:cursor-pointer hover:bg-slate-100"
                onClick={() => onDelete(link)}
              />
              <span>{link}</span>
            </div>
          ))}
        </div>
      )}
    </label>
  );
};

export default BlockInputSection;
