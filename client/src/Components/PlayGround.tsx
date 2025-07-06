import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { ResumeZodSchema } from "../Schema";
import { toast } from "sonner";
import JSON5 from "json5";
export default function PlayGround({ setData, open, setOpen }) {
  let [json, setJson] = useState("//enter your resume in JSON format here");

  function handleClick() {
    try {
      let parsedData = JSON5.parse(json);
      console.log(parsedData);
      let validation = ResumeZodSchema.safeParse(parsedData);
      console.log(validation);
      if (validation.success) {
        setData(parsedData);
        toast.success("Data applied");
      } else {
        console.log(validation);
        throw new Error("invalid data");
      }
    } catch (error) {
      console.log(error);
      toast.error("invalid json");
    }
  }
  function handleChange(value, event) {
    setJson(value);
  }

  return (
    open && (
      <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center pt-[30px] font-inter ">
        <div className=" max-w-4xl bg-slate-800 border-slate-600 p-[12px] md:p-[24px] rounded-lg w-[300px] md:w-[70%] h-[60vh] md:h-[70vh] flex flex-col gap-[25px]  ">
          <div className="w-full justify-between flex">
            <p className="text-md w-[200px] md:w-fit  md:text-md text-slate-400">
              enter your resume json object below, dont worry it can be a js
              object literal
            </p>
            <button
              className="text-white"
              onClick={() => {
                setOpen(false);
              }}
            >
              close
            </button>
          </div>

          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue=""
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              lineNumbersMinChars: 2,
            }}
            onChange={handleChange}
          />
          <div className="w-full flex justify-center ">
            <button
              className="text-white"
              onClick={() => {
                handleClick();
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    )
  );
}
