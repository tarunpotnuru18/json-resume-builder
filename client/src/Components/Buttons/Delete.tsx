import { Trash2 } from "lucide-react";

export default function DeleteBtn({ onclick }) {
  return (
    <>
      <button
        onClick={onclick}
        className="text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors p-[8px] rounded-md"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </>
  );
}
