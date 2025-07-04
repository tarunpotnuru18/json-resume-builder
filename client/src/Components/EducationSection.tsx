import { Plus } from "lucide-react";
import type { TEducationSchema } from "../Schema";
import DeleteBtn from "./Buttons/Delete";
import CustomField from "./CustomField";
import Highlights from "./Highlights";

export default function EducationSection({
  intialEducationData,
  setEducationData,
}: {
  intialEducationData: TEducationSchema;
  setEducationData: React.Dispatch<React.SetStateAction<TEducationSchema>>;
}) {
  let EducationFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    institution: {
      as: "input",
      type: "text",
      placeholder: "eg: indian institute of technology,kanpur",
    },
    area: {
      placeholder: " eg: Computer Science and Engineering/CSE ",
      as: "input",
      type: "text",
    },
    url: {
      as: "input",
      type: "text",
      placeholder:"institute url"
    },
    startDate: {
      as: "input",
      type: "date",
    },
    endDate: {
      as: "input",
      type: "date",
    },
    score: {
      placeholder: "eg: 4.8 or 90%",
      as: "input",
      type: "text",
    },
    studyType: {
      placeholder: "eg: B.TECH",
      as: "input",
      type: "text",
    },
  };
  function handleEducationData(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) {
    setEducationData((prev) => {
      let newWork = prev?.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: e.target.value };
        }
        return item;
      });
      return newWork;
    });
  }
  function addEducation() {
    setEducationData((prev) => {
      return [
        ...(prev ? prev : []),
        {
          institution: "",
          url: "",
          area: "",
          startDate: "",
          endDate: "",
          studyType: "",
          score: "",
          courses: [],
        },
      ];
    });
  }

  function addCourse(index) {
    setEducationData((prev) => {
      let newEducation = prev?.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            courses: [...(item.courses ? item.courses : []), ""],
          };
        }
        return item;
      });

      return newEducation;
    });
  }
  function deleteCourse(itemIndex, highIndex) {
    setEducationData((prev) => {
      let newVolunteer = prev?.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            courses: item.courses?.filter((_, hi) => hi !== highIndex),
          };
        }
        return item;
      });
      return newVolunteer;
    });
  }
  function changeCourse(value, itemIndex, highIndex) {
    setEducationData((prev) => {
      let newEducation = prev?.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            courses: item.courses?.map((val, hi) => {
              if (hi === highIndex) {
                return value;
              }
              return val;
            }),
          };
        }
        return item;
      });
      return newEducation;
    });
  }

  function deleteEducation(index) {
    setEducationData((prev) => {
      let newEducation = prev?.filter((_, i) => i !== index);
      return newEducation;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-[15px] rounded-lg border border-slate-700/40 bg-slate-800/90 py-[24px] px-[12px] md:px-[24px] ">
        <h1 className="font-bold text-2xl text-white">Education section</h1>

        {intialEducationData?.map((EducationItem, index) => {
          return (
            <div
              className="flex flex-col gap-[15px] w-full border border-slate-600/40 bg-slate-700/20 rounded-lg p-[16px]"
              key={index}
            >
              <div className="flex justify-between ">
                <span className="font-medium text-slate-200">
                  {`Education ${index + 1}`}
                </span>
                <DeleteBtn
                  onclick={() => {
                    deleteEducation(index);
                  }}
                ></DeleteBtn>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["studyType", "area"] as (
                    | "institution"
                    | "url"
                    | "area"
                    | "studyType"
                    | "startDate"
                    | "endDate"
                    | "score"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={EducationItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleEducationData(e, index, field);
                      }}
                      key={index + field}
                      as={EducationFields[field]?.as}
                      placeholder={EducationFields[field]?.placeholder}
                      type={EducationFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["startDate", "endDate"] as (
                    | "institution"
                    | "url"
                    | "area"
                    | "studyType"
                    | "startDate"
                    | "endDate"
                    | "score"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={EducationItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleEducationData(e, index, field);
                      }}
                      key={index + field}
                      as={EducationFields[field]?.as}
                      placeholder={EducationFields[field]?.placeholder}
                      type={EducationFields[field]?.type}
                    />
                  );
                })}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["score", "url"] as (
                    | "institution"
                    | "url"
                    | "area"
                    | "studyType"
                    | "startDate"
                    | "endDate"
                    | "score"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={EducationItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleEducationData(e, index, field);
                      }}
                      key={index + field}
                      as={EducationFields[field]?.as}
                      placeholder={EducationFields[field]?.placeholder}
                      type={EducationFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div>
                {(
                  ["institution"] as (
                    | "institution"
                    | "url"
                    | "area"
                    | "studyType"
                    | "startDate"
                    | "endDate"
                    | "score"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={EducationItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleEducationData(e, index, field);
                      }}
                      key={index + field}
                      as={EducationFields[field]?.as}
                      placeholder={EducationFields[field]?.placeholder}
                      type={EducationFields[field]?.type}
                    />
                  );
                })}
              </div>
              <h1 className="font-medium text-slate-300">Courses</h1>
              <Highlights
                intialData={EducationItem.courses}
                onAdd={() => {
                  addCourse(index);
                }}
                onChange={(value, highIndex) => {
                  changeCourse(value, index, highIndex);
                }}
                OnDelete={(highIndex) => {
                  deleteCourse(index, highIndex);
                }}
                placeholder={"add some of technolgies/subjects you learned"}
                btnName={"Add Course"}
              />
            </div>
          );
        })}

        <div className="flex w-full">
          <button
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent transition-colors flex items-center p-[8px] rounded-md outline active:bg-slate-700"
            onClick={() => {
              addEducation();
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
