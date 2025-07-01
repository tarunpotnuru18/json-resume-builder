import type { TVolunteerSchema } from "../Schema";
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
      as: "input",
      type: "text",
    },
    position: {
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
    summary: {
      as: "textarea",
      type: "text",
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
      <div className="flex flex-col gap-[15px] ">
        <h1 className="font-bold text-2xl text-white">Volunteer section</h1>

        {intialVolunteerData?.map((volunteerItem, index) => {
          return (
            <div
              className="flex flex-col gap-[10px] border border-white p-[10px]"
              key={index}
            >
              <div className="flex ">
                <button
                  onClick={() => {
                    deleteVolunteer(index);
                  }}
                  className="justify-end"
                >
                  delete
                </button>
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

              <h1>acheivements</h1>
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
              />
            </div>
          );
        })}

        <button
          className="border border-white"
          onClick={() => {
            addVolunteer();
          }}
        >
          add
        </button>
      </div>
    </>
  );
}
