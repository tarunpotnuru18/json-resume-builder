import { Plus } from "lucide-react";
import DeleteBtn from "./Buttons/Delete";
export default function Highlights({
  intialData = [],
  onAdd,
  OnDelete,
  onChange,
  placeholder,
  btnName,
}) {
  return (
    <>
      <div className="font-inter  text-slate-300 flex flex-col gap-[10px]">
        {intialData.map((value, index) => {
          return (
            <div className="flex gap-[10px] ">
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value, index);
                }}
                placeholder={placeholder}
                className="flex text-[12px] md:text-[14px] h-10 px-[5px] md:px-3 py-2 rounded-md border-2 border-slate-600 bg-slate-700/95  flex-1 focus:ring-orange-500/20 transition-colors"
              />

              <DeleteBtn
                onclick={() => {
                  OnDelete(index);
                }}
              ></DeleteBtn>
            </div>
          );
        })}

        <div className="w-full mt-[10px]">
          <button
            onClick={() => {
              onAdd();
            }}
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-black transition-colors flex items-center p-[5px] rounded-md outline active:bg-slate-700 text-[14px]"
          >
            <Plus className="h-4 w-4 mr-2" />
            {btnName}
          </button>
        </div>
      </div>
    </>
  );
}
