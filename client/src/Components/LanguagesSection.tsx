import { Plus } from "lucide-react";
import type { TLanguagesSchema } from "../Schema";
import DeleteBtn from "./Buttons/Delete";
import CustomField from "./CustomField";

export default function LanguagesSection({
  intialLanguagesData,
  setLanguagesData,
}: {
  intialLanguagesData: TLanguagesSchema;
  setLanguagesData: React.Dispatch<React.SetStateAction<TLanguagesSchema>>;
}) {
  let LanguagesFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    language: {
      as: "input",
      type: "text",
    },
    fluency: {
      as: "input",
      type: "text",
      placeholder:"eg: native / moderate"
    },
  };

  function handleLanguagesData(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) {
    setLanguagesData((prev) => {
      let newLanguages = prev?.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: e.target.value };
        }
        return item;
      });
      return newLanguages;
    });
  }

  function addLanguages() {
    setLanguagesData((prev) => {
      return [
        ...(prev ? prev : []),
        {
          language: "",
          fluency: "",
        },
      ];
    });
  }

  function deleteLanguages(index) {
    setLanguagesData((prev) => {
      let newLanguages = prev?.filter((_, i) => i !== index);
      return newLanguages;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-[15px] rounded-lg border border-slate-700/40 bg-slate-800/90 py-[24px] px-[12px] md:px-[24px] ">
        <h1 className="font-bold text-2xl text-white">Languages section</h1>

        {intialLanguagesData?.map((languagesItem, index) => {
          return (
            <div
              className="flex flex-col gap-[15px] w-full border border-slate-600/40 bg-slate-700/20 rounded-lg p-[16px]"
              key={index}
            >
              <div className="flex justify-between ">
                <span className="font-medium text-slate-200">
                  {`Language ${index + 1}`}
                </span>
                <DeleteBtn
                  onclick={() => {
                    deleteLanguages(index);
                  }}
                ></DeleteBtn>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(["language", "fluency"] as ("language" | "fluency")[]).map(
                  (field) => {
                    return (
                      <CustomField
                        fieldName={field}
                        value={languagesItem[field] || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleLanguagesData(e, index, field);
                        }}
                        key={index + field}
                        as={LanguagesFields[field]?.as}
                        placeholder={LanguagesFields[field]?.placeholder}
                        type={LanguagesFields[field]?.type}
                      />
                    );
                  }
                )}
              </div>
            </div>
          );
        })}

        <div className="flex w-full">
          <button
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent transition-colors flex items-center p-[8px] rounded-md outline active:bg-slate-700"
            onClick={() => {
              addLanguages();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </button>
        </div>
      </div>
    </>
  );
}
