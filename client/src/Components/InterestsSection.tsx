import type { TInterestsSchema } from "../Schema";
import CustomField from "./CustomField";
import ChipCard from "./ChipCard";
import DeleteBtn from "./Buttons/Delete";
import Highlights from "./Highlights";
import { Plus } from "lucide-react";

export default function InterestsSection({
  intialInterestsData,
  setInterestsData,
}: {
  intialInterestsData: TInterestsSchema;
  setInterestsData: React.Dispatch<React.SetStateAction<TInterestsSchema>>;
}) {
  let InterestsFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    name: {
      as: "input",
      type: "text",
    },
  };
  function handleInterestsData(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) {
    setInterestsData((prev) => {
      let newInterests = prev?.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: e.target.value };
        }
        return item;
      });
      return newInterests;
    });
  }
  function addInterest() {
    setInterestsData((prev) => {
      return [
        ...(prev ? prev : []),
        {
          name: "",
          keywords: [],
        },
      ];
    });
  }

  function handleAddKeyWord(index) {
    setInterestsData((prev) => {
      let newData = prev?.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            keywords: [...(item.keywords ? item.keywords : []), ""],
          };
        }
        return item;
      });
      return newData;
    });
  }

  function handlechangeKeyword(index, highIndex, value) {
    setInterestsData((prev) => {
      let newData = prev?.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            keywords: [
              ...(item.keywords
                ? item.keywords.map((key, hi) => {
                    if (hi === highIndex) {
                      return value;
                    }
                    return key;
                  })
                : []),
            ],
          };
        }
        return item;
      });

      return newData;
    });
  }
  function handleDeleteKeyword(index, highIndex) {
    setInterestsData((prev) => {
      let newData = prev?.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            keywords: [
              ...(item.keywords
                ? item.keywords.filter((key, hi) => hi === highIndex)
                : []),
            ],
          };
        }
        return item;
      });

      return newData;
    });
  }

  function deleteInterest(index) {
    setInterestsData((prev) => {
      let newInterests = prev?.filter((_, i) => i !== index);
      return newInterests;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-[15px] rounded-lg border border-slate-700/40 bg-slate-800/90 py-[24px] px-[12px] md:px-[24px] ">
        <h1 className="font-bold text-2xl text-white">Interests section</h1>

        {intialInterestsData?.map((interestItem, index) => {
          return (
            <div
              className="flex flex-col gap-[15px] w-full border border-slate-600/40 bg-slate-700/20 rounded-lg p-[16px]"
              key={index}
            >
              <div className="flex justify-between ">
                <span className="font-medium text-slate-200">
                  {`Intrest ${index + 1}`}
                </span>
                <DeleteBtn
                  onclick={() => {
                    deleteInterest(index);
                  }}
                ></DeleteBtn>
              </div>

              <div className="grid grid-cols-1  gap-[25px]">
                {(["name"] as "name"[]).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={interestItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleInterestsData(e, index, field);
                      }}
                      key={index + field}
                      as={InterestsFields[field]?.as}
                      placeholder={InterestsFields[field]?.placeholder}
                      type={InterestsFields[field]?.type}
                    />
                  );
                })}
              </div>

              <h1 className="font-medium text-slate-300">keywords</h1>

              <Highlights
                intialData={interestItem?.keywords}
                onAdd={() => {
                  handleAddKeyWord(index);
                }}
                OnDelete={(highIndex) => {
                  handleDeleteKeyword(index, highIndex);
                }}
                onChange={(value, highIndex) => {
                  handlechangeKeyword(value, index, highIndex);
                }}
                placeholder={
                  "keywords related to your intrest eg: for forest, lion,deer..etc"
                }
                btnName={"Add keyword"}
              />
            </div>
          );
        })}

        <div className="flex w-full">
          <button
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent transition-colors flex items-center p-[8px] rounded-md outline active:bg-slate-700"
            onClick={() => {
              addInterest();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </button>
        </div>
      </div>
    </>
  );
}
