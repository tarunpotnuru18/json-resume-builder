import { Plus } from "lucide-react";
import type { TVolunteerSchema } from "../Schema";
import DeleteBtn from "./Buttons/Delete";
import CustomField from "./CustomField";
import Highlights from "./Highlights";

export default function VolunteerSection({
  intialVolunteerData,
  setVolunteerData,
}: {
  intialVolunteerData: TVolunteerSchema;
  setVolunteerData: React.Dispatch<React.SetStateAction<TVolunteerSchema>>;
}) {
  let VolunteerFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    organization: {
      placeholder:"organization name",
      as: "input",
      type: "text",
    },
    position: {
      placeholder: " eg: lead",
      as: "input",
      type: "text",
    },
    url: {
      as: "input",
      type: "text",
      placeholder:"organization url"
    },
    startDate: {
      as: "input",
      type: "date",
    },
    endDate: {
      as: "input",
      type: "date",
    },
    summary: {
      as: "textarea",
      type: "text",
      placeholder:"summary about the experience"
    },
  };
  function handleVolunteerData(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) {
    setVolunteerData((prev) => {
      let newWork = prev?.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: e.target.value };
        }
        return item;
      });
      return newWork;
    });
  }
  function addVolunteer() {
    setVolunteerData((prev) => {
      return [
        ...(prev ? prev : []),
        {
          organization: "",
          position: "",
          url: "",
          startDate: "",
          endDate: "",
          summary: "",
          highlights: [],
        },
      ];
    });
  }

  function addHighlights(index) {
    setVolunteerData((prev) => {
      let newVolunteer = prev?.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            highlights: [...(item.highlights ? item.highlights : []), ""],
          };
        }
        return item;
      });

      return newVolunteer;
    });
  }
  function deleteHighlights(itemIndex, highIndex) {
    setVolunteerData((prev) => {
      let newVolunteer = prev?.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            highlights: item.highlights?.filter((_, hi) => hi !== highIndex),
          };
        }
        return item;
      });
      return newVolunteer;
    });
  }
  function changeHighlights(value, itemIndex, highIndex) {
    setVolunteerData((prev) => {
      let newVolunteer = prev?.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            highlights: item.highlights?.map((val, hi) => {
              if (hi === highIndex) {
                return value;
              }
              return val;
            }),
          };
        }
        return item;
      });
      return newVolunteer;
    });
  }

  function deleteVolunteer(index) {
    setVolunteerData((prev) => {
      let newVolunteer = prev?.filter((_, i) => i !== index);
      return newVolunteer;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-[15px] rounded-lg border border-slate-700/40 bg-slate-800/90 py-[24px] px-[12px] md:px-[24px] ">
        <h1 className="font-bold text-2xl text-white">Volunteer section</h1>

        {intialVolunteerData?.map((volunteerItem, index) => {
          return (
            <div
              className="flex flex-col gap-[15px] w-full border border-slate-600/40 bg-slate-700/20 rounded-lg p-[16px]"
              key={index}
            >
              <div className="flex justify-between ">
                <span className="font-medium text-slate-200">
                  {`Activity ${index + 1}`}
                </span>
                <DeleteBtn
                  onclick={() => {
                    deleteVolunteer(index);
                  }}
                ></DeleteBtn>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["organization", "position"] as (
                    | "organization"
                    | "position"
                    | "url"
                    | "startDate"
                    | "endDate"
                    | "summary"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={volunteerItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleVolunteerData(e, index, field);
                      }}
                      key={index + field}
                      as={VolunteerFields[field]?.as}
                      placeholder={VolunteerFields[field]?.placeholder}
                      type={VolunteerFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div>
                {(
                  ["url"] as (
                    | "organization"
                    | "position"
                    | "url"
                    | "startDate"
                    | "endDate"
                    | "summary"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={volunteerItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleVolunteerData(e, index, field);
                      }}
                      key={index + field}
                      as={VolunteerFields[field]?.as}
                      placeholder={VolunteerFields[field]?.placeholder}
                      type={VolunteerFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["startDate", "endDate"] as (
                    | "organization"
                    | "position"
                    | "url"
                    | "startDate"
                    | "endDate"
                    | "summary"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={volunteerItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleVolunteerData(e, index, field);
                      }}
                      key={index + field}
                      as={VolunteerFields[field]?.as}
                      placeholder={VolunteerFields[field]?.placeholder}
                      type={VolunteerFields[field]?.type}
                    />
                  );
                })}
              </div>
              <div>
                {(
                  ["summary"] as (
                    | "organization"
                    | "position"
                    | "url"
                    | "startDate"
                    | "endDate"
                    | "summary"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={volunteerItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleVolunteerData(e, index, field);
                      }}
                      key={index + field}
                      as={VolunteerFields[field]?.as}
                      placeholder={VolunteerFields[field]?.placeholder}
                      type={VolunteerFields[field]?.type}
                    />
                  );
                })}
              </div>

              <h1 className="font-medium text-slate-300">Acheivements</h1>
              <Highlights
                intialData={volunteerItem.highlights}
                onAdd={() => {
                  addHighlights(index);
                }}
                onChange={(value, highIndex) => {
                  changeHighlights(value, index, highIndex);
                }}
                OnDelete={(highIndex) => {
                  deleteHighlights(index, highIndex);
                }}
                placeholder={"describe your acheivement"}
                btnName={"Add Acheivement"}
              />
            </div>
          );
        })}

        <div className="w-full">
          <button
            onClick={() => {
              addVolunteer();
            }}
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent transition-colors flex items-center p-[8px] rounded-md outline active:bg-slate-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Volunteer Experience
          </button>
        </div>
      </div>
    </>
  );
}
