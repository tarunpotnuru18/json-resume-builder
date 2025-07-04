import { Plus } from "lucide-react";
import type { TPublicationsSchema } from "../Schema";
import DeleteBtn from "./Buttons/Delete";
import CustomField from "./CustomField";

export default function PublicationsSection({
  intialPublicationsData,
  setPublicationsData,
}: {
  intialPublicationsData: TPublicationsSchema;
  setPublicationsData: React.Dispatch<
    React.SetStateAction<TPublicationsSchema>
  >;
}) {
  let PublicationsFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    name: {
      as: "input",
      type: "text",
      placeholder:" publication name"
    },
    publisher: {
      as: "input",
      type: "text",
      placeholder:"publisher name"
    },
    releaseDate: {
      as: "input",
      type: "date",
    },
    url: {
      as: "input",
      type: "text",
      placeholder:"url of the publication"
    },
    summary: {
      as: "textarea",
      type: "text",
    },
  };

  function handlePublicationsData(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) {
    setPublicationsData((prev) => {
      let newPublications = prev?.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: e.target.value };
        }
        return item;
      });
      return newPublications;
    });
  }

  function addPublications() {
    setPublicationsData((prev) => {
      return [
        ...(prev ? prev : []),
        {
          name: "",
          publisher: "",
          releaseDate: "",
          url: "",
          summary: "",
        },
      ];
    });
  }

  function deletePublications(index) {
    setPublicationsData((prev) => {
      let newPublications = prev?.filter((_, i) => i !== index);
      return newPublications;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-[15px] rounded-lg border border-slate-700/40 bg-slate-800/90 py-[24px] px-[12px] md:px-[24px]">
        <h1 className="font-bold text-2xl text-white">Publications section</h1>

        {intialPublicationsData?.map((publicationsItem, index) => {
          return (
            <div
              className="flex flex-col gap-[15px] w-full border border-slate-600/40 bg-slate-700/20 rounded-lg p-[16px]"
              key={index}
            >
              <div className="flex justify-between ">
                <span className="font-medium text-slate-200">
                  {`Publication ${index + 1}`}
                </span>
                <DeleteBtn
                  onclick={() => {
                    deletePublications(index);
                  }}
                ></DeleteBtn>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["name", "publisher"] as (
                    | "name"
                    | "publisher"
                    | "releaseDate"
                    | "url"
                    | "summary"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={publicationsItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handlePublicationsData(e, index, field);
                      }}
                      key={index + field}
                      as={PublicationsFields[field]?.as}
                      placeholder={PublicationsFields[field]?.placeholder}
                      type={PublicationsFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div>
                {(
                  ["url"] as (
                    | "name"
                    | "publisher"
                    | "releaseDate"
                    | "url"
                    | "summary"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={publicationsItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handlePublicationsData(e, index, field);
                      }}
                      key={index + field}
                      as={PublicationsFields[field]?.as}
                      placeholder={PublicationsFields[field]?.placeholder}
                      type={PublicationsFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div>
                {(
                  ["releaseDate"] as (
                    | "name"
                    | "publisher"
                    | "releaseDate"
                    | "url"
                    | "summary"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={publicationsItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handlePublicationsData(e, index, field);
                      }}
                      key={index + field}
                      as={PublicationsFields[field]?.as}
                      placeholder={PublicationsFields[field]?.placeholder}
                      type={PublicationsFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div>
                {(
                  ["summary"] as (
                    | "name"
                    | "publisher"
                    | "releaseDate"
                    | "url"
                    | "summary"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={publicationsItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handlePublicationsData(e, index, field);
                      }}
                      key={index + field}
                      as={PublicationsFields[field]?.as}
                      placeholder={PublicationsFields[field]?.placeholder}
                      type={PublicationsFields[field]?.type}
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
              addPublications();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Publication
          </button>
        </div>
        
      </div>
    </>
  );
}
