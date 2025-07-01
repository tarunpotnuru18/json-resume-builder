import type { TProjectsSchema } from "../Schema";
import CustomField from "./CustomField";
import Highlights from "./Highlights";

export default function ProjectsSection({
  intialProjectsData,
  setProjectsData,
}: {
  intialProjectsData: TProjectsSchema;
  setProjectsData: React.Dispatch<React.SetStateAction<TProjectsSchema>>;
}) {
  let ProjectsFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    name: {
      as: "input",
      type: "text",
    },
    description: {
      placeholder: "Description of the project",
      as: "textarea",
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
  };
  function handleProjectsData(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) {
    setProjectsData((prev) => {
      let newProjects = prev?.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: e.target.value };
        }
        return item;
      });
      return newProjects;
    });
  }
  function addProject() {
    setProjectsData((prev) => {
      return [
        ...(prev ? prev : []),
        {
          name: "",
          startDate: "",
          endDate: "",
          description: "",
          highlights: [],
          url: "",
        },
      ];
    });
  }

  function addHighlights(index) {
    setProjectsData((prev) => {
      let newProjects = prev?.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            highlights: [...(item.highlights ? item.highlights : []), ""],
          };
        }
        return item;
      });

      return newProjects;
    });
  }
  function deleteHighlights(itemIndex, highIndex) {
    setProjectsData((prev) => {
      let newProjects = prev?.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            highlights: item.highlights?.filter((_, hi) => hi !== highIndex),
          };
        }
        return item;
      });
      return newProjects;
    });
  }
  function changeHighlights(value, itemIndex, highIndex) {
    setProjectsData((prev) => {
      let newProjects = prev?.map((item, i) => {
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
      return newProjects;
    });
  }

  function deleteProject(index) {
    setProjectsData((prev) => {
      let newProjects = prev?.filter((_, i) => i !== index);
      return newProjects;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-[15px] ">
        <h1 className="font-bold text-2xl text-white">Projects section</h1>

        {intialProjectsData?.map((projectItem, index) => {
          return (
            <div
              className="flex flex-col gap-[10px] border border-white p-[10px]"
              key={index}
            >
              <div className="flex ">
                <button
                  onClick={() => {
                    deleteProject(index);
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
                    | "startDate"
                    | "endDate"
                    | "description"
                    | "url"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={projectItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleProjectsData(e, index, field);
                      }}
                      key={index + field}
                      as={ProjectsFields[field]?.as}
                      placeholder={ProjectsFields[field]?.placeholder}
                      type={ProjectsFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div>
                {(
                  ["url"] as (
                    | "name"
                    | "startDate"
                    | "endDate"
                    | "description"
                    | "url"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={projectItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleProjectsData(e, index, field);
                      }}
                      key={index + field}
                      as={ProjectsFields[field]?.as}
                      placeholder={ProjectsFields[field]?.placeholder}
                      type={ProjectsFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["startDate", "endDate"] as (
                    | "name"
                    | "startDate"
                    | "endDate"
                    | "description"
                    | "url"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={projectItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleProjectsData(e, index, field);
                      }}
                      key={index + field}
                      as={ProjectsFields[field]?.as}
                      placeholder={ProjectsFields[field]?.placeholder}
                      type={ProjectsFields[field]?.type}
                    />
                  );
                })}
              </div>
              <div>
                {(
                  ["description"] as (
                    | "name"
                    | "startDate"
                    | "endDate"
                    | "description"
                    | "url"
                  )[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={projectItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleProjectsData(e, index, field);
                      }}
                      key={index + field}
                      as={ProjectsFields[field]?.as}
                      placeholder={ProjectsFields[field]?.placeholder}
                      type={ProjectsFields[field]?.type}
                    />
                  );
                })}
              </div>

              <h1>highlights</h1>
              <Highlights
                intialData={projectItem.highlights}
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
            addProject();
          }}
        >
          add
        </button>
      </div>
    </>
  );
}
