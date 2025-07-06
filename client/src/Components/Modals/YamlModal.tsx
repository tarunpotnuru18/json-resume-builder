import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { convert } from "@catalystic/json-to-yaml";
export default function YamlModal({ setOpen, jsonData, open }) {
  let [Copied, setCopied] = useState<boolean>(false);
  let [data, setData] = useState("");
  useEffect(() => {
    let yaml = convert(jsonData);
    setData(yaml);
  }, [jsonData]);

  async function handleCopy() {
    await navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    open && (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-[10px]">
        <div className="max-w-4xl max-h-[80vh] overflow-hidden bg-slate-800 border-slate-600 p-[12px] md:p-[24px] rounded-lg">
          <div className="w-full flex items-center justify-end mb-2">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="text-white"
            >
              close
            </button>
          </div>
          <div className="w-full flex md:flex-row md:items-center md:gap-[24px] md:justify-between mb-[10px]">
            <div className="flex flex-col justify-center mb-4">
              <h1 className="text-md lg:text-xl font-semibold mb-[10px] md:mb-2 text-white">
                Resume Data (YAMl Preview)
              </h1>
              <p className="text-xs w-[200px] md:w-fit  md:text-md text-slate-400">
                Copy this YAML data to use with other resume builders
              </p>
            </div>

            <div className="w-full md:w-fit md:block flex justify-end items-center ">
              <button
                onClick={() => {
                  handleCopy();
                }}
                className={`
                    flex items-center   gap-2 text-sm cursor-pointer rounded-md px-[5px] md:px-[12px] py-[8px]
                    ${
                      Copied
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-slate-600 hover:bg-slate-700 text-white"
                    }`}
              >
                {Copied ? (
                  <>
                    <Check className="h-4 w-4 md:mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:block">Copy YAML</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-600 rounded-lg p-4 overflow-auto max-h-96">
            <pre className="text-sm text-slate-200 whitespace-pre-wrap font-mono  py-[5px]">
              {data}
            </pre>
          </div>
        </div>
      </div>
    )
  );
}
