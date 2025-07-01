import type { TWorkSchema } from "../Schema";
import CustomField from "./CustomField";
import Highlights from "./Highlights";
export default function WorkSection({
  intialWorkData,
  setWorkData,
}: {
  intialWorkData: TWorkSchema;
  setWorkData: React.Dispatch<React.SetStateAction<TWorkSchema>>;
}) {
  let workFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    name: {
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
  function handleWorkData(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) {
    setWorkData((prev) => {
      let newWork = prev?.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: e.target.value };
        }
        return item;
      });
      return newWork;
    });
  }
  function addWork() {
    setWorkData((prev) => {
      return [
        ...(prev ? prev : []),
        {
          name: "",
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
    setWorkData((prev) => {
      let newWork = prev?.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            highlights: [...(item.highlights ? item.highlights : []), ""],
          };
        }
        return item;
      });

      return newWork;
    });
  }
  function deleteHighlights(itemIndex, highIndex) {
    setWorkData((prev) => {
      let newWork = prev?.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            highlights: item.highlights?.filter((_, hi) => hi !== highIndex),
          };
        }
        return item;
      });
      return newWork;
    });
  }
  function changeHighlights(value, itemIndex, highIndex) {
    setWorkData((prev) => {
      let newWork = prev?.map((item, i) => {
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
      return newWork;
    });
  }

  function deleteWork(index) {
    setWorkData((prev) => {
      let newWork = prev?.filter((_, i) => i !== index);
      return newWork;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-[15px] ">
        <h1 className="font-bold text-2xl text-white">Work section</h1>

        {intialWorkData?.map((workItem, index) => {
          return (
            <div
              className="flex flex-col gap-[10px] border border-white p-[10px]"
              key={index}
            >
              <div className="flex ">
                <button
                  onClick={() => {
                    deleteWork(index);
                  }}
                  className="justify-end"
                >
                  delete
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["name", "position"] as (
                    | "name"
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
                      value={workItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleWorkData(e, index, field);
                      }}
                      key={index + field}
                      as={workFields[field]?.as}
                      placeholder={workFields[field]?.placeholder}
                      type={workFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div>
                {(
                  ["url"] as (
                    | "name"
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
                      value={workItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleWorkData(e, index, field);
                      }}
                      key={index + field}
                      as={workFields[field]?.as}
                      placeholder={workFields[field]?.placeholder}
                      type={workFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["startDate", "endDate"] as (
                    | "name"
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
                      value={workItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleWorkData(e, index, field);
                      }}
                      key={index + field}
                      as={workFields[field]?.as}
                      placeholder={workFields[field]?.placeholder}
                      type={workFields[field]?.type}
                    />
                  );
                })}
              </div>
              <div>
                {(
                  ["summary"] as (
                    | "name"
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
                      value={workItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleWorkData(e, index, field);
                      }}
                      key={index + field}
                      as={workFields[field]?.as}
                      placeholder={workFields[field]?.placeholder}
                      type={workFields[field]?.type}
                    />
                  );
                })}
              </div>

              <h1>acheivements</h1>
              <Highlights
                intialData={workItem.highlights}
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
            addWork();
          }}
        >
          add
        </button>
      </div>
    </>
  );
}
