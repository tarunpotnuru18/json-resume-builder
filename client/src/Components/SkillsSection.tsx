import type { TSkillsSchema } from "../Schema";
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
    },
    level: {
      as: "input",
      type: "text",
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
      <div className="flex flex-col gap-[15px] ">
        <h1 className="font-bold text-2xl text-white">Skills section</h1>

        {intialSkillsData?.map((skillsItem, index) => {
          return (
            <div
              className="flex flex-col gap-[10px] border border-white p-[10px]"
              key={index}
            >
              <div className="flex ">
                <button
                  onClick={() => {
                    deleteSkills(index);
                  }}
                  className="justify-end"
                >
                  delete
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["name", "level"] as (
                    | "name"
                    | "level"
                  )[]
                ).map((field) => {
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

              <h1>keywords</h1>
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
              />
            </div>
          );
        })}

        <button
          className="border border-white"
          onClick={() => {
            addSkills();
          }}
        >
          add
        </button>
      </div>
    </>
  );
}