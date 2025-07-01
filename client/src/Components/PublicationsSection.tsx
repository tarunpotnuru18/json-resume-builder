import type { TPublicationsSchema } from "../Schema";
import CustomField from "./CustomField";



export default function PublicationsSection({
  intialPublicationsData,
  setPublicationsData,
}: {
  intialPublicationsData: TPublicationsSchema;
  setPublicationsData: React.Dispatch<React.SetStateAction<TPublicationsSchema>>;
}) {
  let PublicationsFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    name: {
      as: "input",
      type: "text",
    },
    publisher: {
      as: "input",
      type: "text",
    },
    releaseDate: {
      as: "input",
      type: "date",
    },
    url: {
      as: "input",
      type: "text",
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
      <div className="flex flex-col gap-[15px] ">
        <h1 className="font-bold text-2xl text-white">Publications section</h1>

        {intialPublicationsData?.map((publicationsItem, index) => {
          return (
            <div
              className="flex flex-col gap-[10px] border border-white p-[10px]"
              key={index}
            >
              <div className="flex ">
                <button
                  onClick={() => {
                    deletePublications(index);
                  }}
                  className="justify-end"
                >
                  delete
                </button>
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

        <button
          className="border border-white"
          onClick={() => {
            addPublications();
          }}
        >
          add
        </button>
      </div>
    </>
  );
}