import { Plus } from "lucide-react";
import type { TSkillsSchema } from "../Schema";
import DeleteBtn from "./Buttons/Delete";
import CustomField from "./CustomField";
import Highlights from "./Highlights";

export default function SkillsSection({
  intialSkillsData,
  setSkillsData,
}: {
  intialSkillsData: TSkillsSchema;
  setSkillsData: React.Dispatch<React.SetStateAction<TSkillsSchema>>;
}) {
  let SkillsFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    name: {
      as: "input",
      type: "text",
      placeholder:"eg:Frontend"
    },
    level: {
      as: "input",
      type: "text",
      placeholder:"eg: beginner  "

    },
  };

  function handleSkillsData(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) {
    setSkillsData((prev) => {
      let newSkills = prev?.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: e.target.value };
        }
        return item;
      });
      return newSkills;
    });
  }

  function addSkills() {
    setSkillsData((prev) => {
      return [
        ...(prev ? prev : []),
        {
          name: "",
          level: "",
          keywords: [],
        },
      ];
    });
  }

  function addKeywords(index) {
    setSkillsData((prev) => {
      let newSkills = prev?.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            keywords: [...(item.keywords ? item.keywords : []), ""],
          };
        }
        return item;
      });

      return newSkills;
    });
  }

  function deleteKeywords(itemIndex, highIndex) {
    setSkillsData((prev) => {
      let newSkills = prev?.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            keywords: item.keywords?.filter((_, hi) => hi !== highIndex),
          };
        }
        return item;
      });
      return newSkills;
    });
  }

  function changeKeywords(value, itemIndex, highIndex) {
    setSkillsData((prev) => {
      let newSkills = prev?.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            keywords: item.keywords?.map((val, hi) => {
              if (hi === highIndex) {
                return value;
              }
              return val;
            }),
          };
        }
        return item;
      });
      return newSkills;
    });
  }

  function deleteSkills(index) {
    setSkillsData((prev) => {
      let newSkills = prev?.filter((_, i) => i !== index);
      return newSkills;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-[15px] rounded-lg border border-slate-700/40 bg-slate-800/90 py-[24px] px-[12px] md:px-[24px]">
        <h1 className="font-bold text-2xl text-white">Skills section</h1>

        {intialSkillsData?.map((skillsItem, index) => {
          return (
            <div
              className="flex flex-col gap-[15px] w-full border border-slate-600/40 bg-slate-700/20 rounded-lg p-[16px]"
              key={index}
            >
              <div className="flex justify-between ">
                <span className="font-medium text-slate-200">
                  {`Skill-Set ${index + 1}`}
                </span>
                <DeleteBtn
                  onclick={() => {
                    deleteSkills(index);
                  }}
                ></DeleteBtn>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(["name", "level"] as ("name" | "level")[]).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={skillsItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleSkillsData(e, index, field);
                      }}
                      key={index + field}
                      as={SkillsFields[field]?.as}
                      placeholder={SkillsFields[field]?.placeholder}
                      type={SkillsFields[field]?.type}
                    />
                  );
                })}
              </div>

              <h1 className="font-medium text-slate-300">Skills</h1>
              <Highlights
                intialData={skillsItem.keywords}
                onAdd={() => {
                  addKeywords(index);
                }}
                onChange={(value, highIndex) => {
                  changeKeywords(value, index, highIndex);
                }}
                OnDelete={(highIndex) => {
                  deleteKeywords(index, highIndex);
                }}
                placeholder={"enter a skill eg: Java"}
                btnName={"Add Skill"}
              />
            </div>
          );
        })}

        <div className="flex w-full">
          <button
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent transition-colors flex items-center p-[8px] rounded-md outline active:bg-slate-700"
            onClick={() => {
              addSkills();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Skill Set
          </button>
        </div>
      </div>
    </>
  );
}
