import type { TEducationSchema } from "../Schema";
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
    },
    area: {
      placeholder: " eg: programmer",
      as: "input",
      type: "text",
    },
    url: {
      as: "input",
      type: "text",
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
      as: "textarea",
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
      <div className="flex flex-col gap-[15px] ">
        <h1 className="font-bold text-2xl text-white">Volunteer section</h1>

        {intialEducationData?.map((EducationItem, index) => {
          return (
            <div
              className="flex flex-col gap-[10px] border border-white p-[10px]"
              key={index}
            >
              <div className="flex ">
                <button
                  onClick={() => {
                    deleteEducation(index);
                  }}
                  className="justify-end"
                >
                  delete
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["institution", "area"] as (
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
                  ["url"] as (
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
              <div>
                {(
                  ["score"] as (
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

              <h1>acheivements</h1>
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
              />
            </div>
          );
        })}

        <button
          className="border border-white"
          onClick={() => {
            addEducation();
          }}
        >
          add
        </button>
      </div>
    </>
  );
}
