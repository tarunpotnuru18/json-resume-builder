import type { TAwardsSchema } from "../Schema";
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
    },
    date: {
      as: "input",
      type: "date",
    },
    awarder: {
      as: "input",
      type: "text",
    },
    summary: {
      as: "textarea",
      type: "text",
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
      <div className="flex flex-col gap-[15px] ">
        <h1 className="font-bold text-2xl text-white">Awards section</h1>

        {intialAwardsData?.map((awardsItem, index) => {
          return (
            <div
              className="flex flex-col gap-[10px] border border-white p-[10px]"
              key={index}
            >
              <div className="flex ">
                <button
                  onClick={() => {
                    deleteAwards(index);
                  }}
                  className="justify-end"
                >
                  delete
                </button>
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

        <button
          className="border border-white"
          onClick={() => {
            addAwards();
          }}
        >
          add
        </button>
      </div>
    </>
  );
}
