import { Plus } from "lucide-react";
import type { TAwardsSchema } from "../Schema";
import DeleteBtn from "./Buttons/Delete";
import CustomField from "./CustomField";

export default function AwardsSection({
  intialAwardsData,
  setAwardsData,
}: {
  intialAwardsData: TAwardsSchema;
  setAwardsData: React.Dispatch<React.SetStateAction<TAwardsSchema>>;
}) {
  let AwardsFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    title: {
      as: "input",
      type: "text",
      placeholder:"award name"
    },
    date: {
      as: "input",
      type: "date",
    },
    awarder: {
      as: "input",
      type: "text",
      placeholder:"awarder name eg:google"
    },
    summary: {
      as: "textarea",
      type: "text",
      placeholder:"summary about the award"
    },
  };

  function handleAwardsData(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) {
    setAwardsData((prev) => {
      let newAwards = prev?.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: e.target.value };
        }
        return item;
      });
      return newAwards;
    });
  }

  function addAwards() {
    setAwardsData((prev) => {
      return [
        ...(prev ? prev : []),
        {
          title: "",
          date: "",
          awarder: "",
          summary: "",
        },
      ];
    });
  }

  function deleteAwards(index) {
    setAwardsData((prev) => {
      let newAwards = prev?.filter((_, i) => i !== index);
      return newAwards;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-[15px] rounded-lg border border-slate-700/40 bg-slate-800/90 py-[24px] px-[12px] md:px-[24px]">
        <h1 className="font-bold text-2xl text-white">Awards section</h1>

        {intialAwardsData?.map((awardsItem, index) => {
          return (
            <div
              className="flex flex-col gap-[15px] w-full border border-slate-600/40 bg-slate-700/20 rounded-lg p-[16px]"
              key={index}
            >
              <div className="flex justify-between ">
                <span className="font-medium text-slate-200">
                  {`Award ${index + 1}`}
                </span>
                <DeleteBtn
                  onclick={() => {
                    deleteAwards(index);
                  }}
                ></DeleteBtn>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["title", "awarder"] as (
                    | "title"
                    | "date"
                    | "awarder"
                    | "summary"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={awardsItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleAwardsData(e, index, field);
                      }}
                      key={index + field}
                      as={AwardsFields[field]?.as}
                      placeholder={AwardsFields[field]?.placeholder}
                      type={AwardsFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div>
                {(["date"] as ("title" | "date" | "awarder" | "summary")[]).map(
                  (field) => {
                    return (
                      <CustomField
                        fieldName={field}
                        value={awardsItem[field] || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleAwardsData(e, index, field);
                        }}
                        key={index + field}
                        as={AwardsFields[field]?.as}
                        placeholder={AwardsFields[field]?.placeholder}
                        type={AwardsFields[field]?.type}
                      />
                    );
                  }
                )}
              </div>

              <div>
                {(
                  ["summary"] as ("title" | "date" | "awarder" | "summary")[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={awardsItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleAwardsData(e, index, field);
                      }}
                      key={index + field}
                      as={AwardsFields[field]?.as}
                      placeholder={AwardsFields[field]?.placeholder}
                      type={AwardsFields[field]?.type}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="flex w-full">
          <button
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent transition-colors flex items-center p-[8px] rounded-md outline active:bg-slate-700"
            onClick={() => {
              addAwards();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Award
          </button>
        </div>
      </div>
    </>
  );
}
