import type { TInterestsSchema } from "../Schema";
import CustomField from "./CustomField";
import ChipCard from "./ChipCard";

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

  function addKeyword(keyword, index) {
    setInterestsData((prev) => {
      let newInterests = prev?.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            keywords: [...(item.keywords ? item.keywords : []), keyword],
          };
        }
        return item;
      });
      return newInterests;
    });
  }
  function deleteKeyword(itemIndex, keywordIndex) {
    setInterestsData((prev) => {
      let newInterests = prev?.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            keywords: item.keywords?.filter((_, ki) => ki !== keywordIndex),
          };
        }
        return item;
      });
      return newInterests;
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
      <div className="flex flex-col gap-[15px] ">
        <h1 className="font-bold text-2xl text-white">Interests section</h1>

        {intialInterestsData?.map((interestItem, index) => {
          return (
            <div
              className="flex flex-col gap-[10px] border border-white p-[10px]"
              key={index}
            >
              <div className="flex ">
                <button
                  onClick={() => {
                    deleteInterest(index);
                  }}
                  className="justify-end"
                >
                  delete
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["name"] as (
                    | "name"
                  )[]
                ).map((field) => {
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

              <h1>keywords</h1>
              <ChipCard
                initalData={interestItem.keywords}
                onAdd={(keyword) => {
                  addKeyword(keyword, index);
                }}
                onDelete={(keywordIndex) => {
                  deleteKeyword(index, keywordIndex);
                }}
              />
            </div>
          );
        })}

        <button
          className="border border-white"
          onClick={() => {
            addInterest();
          }}
        >
          add
        </button>
      </div>
    </>
  );
}