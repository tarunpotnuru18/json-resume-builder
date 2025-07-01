import { useState } from "react";

export default function ChipCard({ initalData, onAdd, onDelete }) {
  let [currentValue, setCurrent] = useState("");
  function Chip({ value, onDelete, index }) {
    return (
      <>
        <div className="flex gap-[10px] rounded border w-fit p-[5px] border-white">
          <div className="text-amber-300">{value}</div>
          <button
            onClick={() => {
              onDelete(index);
            }}
            className="text-white"
          >
            X
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex gap-[25px]">
        <input
          type="text"
          value={currentValue}
          onChange={(e) => {
            setCurrent(e.target.value);
          }}
          className="border border-white text-white"
        />
        <button
          onClick={() => {
            if (currentValue.trim() === "") {
              return;
            }
            onAdd(currentValue);
            setCurrent("");
          }}
          className="border border-white p-[5px] text-white cursor-pointer"
        >
          add
        </button>
      </div>
      <div className="flex flex-col gap-[5px]">
        {initalData.map((item, index) => {
          return (
            <Chip value={item} index={index} onDelete={onDelete} key={index} />
          );
        })}
      </div>
    </>
  );
}