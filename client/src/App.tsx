import React, { useEffect, useState } from "react";

import type { TResumeSchema } from "./Schema";

type TBasicSchema = TResumeSchema["basics"];

type TWorkSchema = TResumeSchema["work"];

function CustomField({
  fieldName,
  onChange,
  value,
  placeholder = "",
  as = "input",
  type = "text",
}: {
  fieldName: string;
  onChange: any;
  value: string;
  placeholder?: string;
  as?: string;
  type?: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-[5px]">
        <label htmlFor="" className="text-white">
          {fieldName}
        </label>

        {as === "input" ? (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border-white border text-white"
          />
        ) : (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border-white border text-white resize-none min-h-[100px] "
          ></textarea>
        )}
      </div>
    </>
  );
}

function BasicSection({
  initalBasicData,
  setBasicData,
}: {
  initalBasicData: TBasicSchema;
  setBasicData: React.Dispatch<React.SetStateAction<TBasicSchema>>;
}) {
  let basicFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    name: {
      placeholder: " eg: john",
      as: "input",
      type: "text",
    },
    label: {
      placeholder: " eg: programmer",
      as: "input",
      type: "text",
    },
    image: {
      placeholder: "add your image link",
      as: "input",
      type: "text",
    },
    email: {
      placeholder: " eg: john@email.com",
      as: "input",
      type: "text",
    },
    phone: {
      placeholder: " eg:123456755",
      as: "input",
      type: "text",
    },
    url: {
      placeholder: "eg: john@gmail.com",
      as: "input",
      type: "text",
    },
    summary: {
      placeholder: "write a small summary about yourself here",
      as: "textarea",
      type: "text",
    },

    address: {
      placeholder: "eg: 16th sector, rookie inc",
      as: "input",
      type: "text",
    },
    postalCode: {
      placeholder: "eg: 523658",
      as: "input",
      type: "text",
    },
    city: {
      placeholder: "eg: new delhi",
      as: "input",
      type: "text",
    },
    countryCode: {
      placeholder: "eg: IN",
      as: "input",
      type: "text",
    },
    region: {
      placeholder: "eg: noida",
      as: "input",
      type: "text",
    },
  };

  function handleBasicFields(
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) {
    setBasicData((prev) => {
      return { ...prev, [field]: e.target.value };
    });
  }
  function handleLocationFields(
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) {
    setBasicData((prev) => {
      return {
        ...prev,
        location: { ...prev?.location, [field]: e.target.value },
      };
    });
  }

  function addProfileItems() {
    setBasicData((prev) => {
      return {
        ...prev,
        profiles: [
          ...(prev?.profiles ? prev.profiles : []),
          {
            url: "",
            network: "",
            username: "",
          },
        ],
      };
    });
  }

  function handleProfileItems(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "username" | "url" | "network",
    index: number
  ) {
    setBasicData((prev) => {
      return {
        ...prev,
        profiles: prev?.profiles?.map((profile, i) => {
          if (i === index) {
            return { ...profile, [field]: e.target.value };
          }

          return profile;
        }),
      };
    });
  }

  function handleDeleteProfileItems(index: number) {
    setBasicData((prev) => {
      return {
        ...prev,
        profiles: prev?.profiles?.filter((_, i) => {
          return index !== i;
        }),
      };
    });
  }

  return (
    <>
      <div className="flex flex-col gap-[10px] ">
        <h1 className="font-bold text-2xl text-white">Basic section</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
          {" "}
          {["name", "label", "image", "email", "phone", "url"].map(
            (field, index) => {
              const typedField = field as keyof typeof initalBasicData;
              return (
                <>
                  <CustomField
                    fieldName={field}
                    value={
                      (initalBasicData && initalBasicData[typedField]) || ""
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleBasicFields(e, field);
                    }}
                    key={"index" + index + field}
                    as={basicFields[field]?.as}
                    placeholder={basicFields[field]?.placeholder}
                    type={basicFields[field]?.type}
                  />
                </>
              );
            }
          )}
        </div>
        <div>
          {["summary"].map((field, index) => {
            const typedField = field as keyof typeof initalBasicData;
            return (
              <>
                <CustomField
                  fieldName={field}
                  value={(initalBasicData && initalBasicData[typedField]) || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleBasicFields(e, field);
                  }}
                  key={"index" + index + field}
                  as={basicFields[field]?.as}
                  placeholder={basicFields[field]?.placeholder}
                  type={basicFields[field]?.type}
                />
              </>
            );
          })}
        </div>

        <h1 className="text-white font-bold text-2xl">location</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
          {["address", "postalCode", "city", "countryCode", "region"].map(
            (field, index) => {
              if (initalBasicData) {
                let typedField = field as keyof typeof initalBasicData.location;
                return (
                  <>
                    <CustomField
                      fieldName={field}
                      value={
                        (initalBasicData.location &&
                          initalBasicData.location[typedField]) ||
                        ""
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleLocationFields(e, field);
                      }}
                      key={"index" + index + field}
                    />
                  </>
                );
              }
            }
          )}
        </div>
        <div>Profile</div>
        <div className="flex flex-col gap-[20px]">
          {initalBasicData?.profiles?.map((profile, index) => {
            return (
              <div className="w-full border border-white p-[10px]">
                <div className="flex w-full justify-end">
                  <button
                    onClick={() => handleDeleteProfileItems(index)}
                    className="text-white"
                  >
                    delete
                  </button>
                </div>
                <div className="grid md:grid-cols-3 md:gap-[25px]  p-[10px]">
                  {(
                    ["username", "url", "network"] as (
                      | "username"
                      | "url"
                      | "network"
                    )[]
                  ).map((field) => {
                    return (
                      <CustomField
                        value={profile[field]}
                        fieldName={field}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleProfileItems(e, field, index);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => addProfileItems()}
          className="border border-white "
        >
          add
        </button>
      </div>
    </>
  );
}

function ChipCard({ initalData, onAdd, onDelete }) {
  let [currentValue, setCurrent] = useState("");
  function Chip({ value, onDelete, index }) {
    return (
      <>
        <div className="flex gap-[10px] rounded border w-fit p-[5px] border-white">
          <div className="text-amber-300">{value}</div>
          <button
            onClick={() => {
              onDelete(index);
            }}
            className="text-white"
          >
            X
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex gap-[25px]">
        <input
          type="text"
          value={currentValue}
          onChange={(e) => {
            setCurrent(e.target.value);
          }}
          className="border border-white text-white"
        />
        <button
          onClick={() => {
            if (currentValue.trim() === "") {
              return;
            }
            onAdd(currentValue);
            setCurrent("");
          }}
          className="border border-white p-[5px] text-white cursor-pointer"
        >
          add
        </button>
      </div>
      <div className="flex flex-col gap-[5px]">
        {initalData.map((item, index) => {
          return (
            <Chip value={item} index={index} onDelete={onDelete} key={index} />
          );
        })}
      </div>
    </>
  );
}
function Highlights({ intialData, onAdd, OnDelete, onChange }) {
  return (
    <>
      <div>
        {intialData.map((value, index) => {
          <div className="flex justify-between">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                onChange(e.target.value, index);
              }}
            />
            <button
              onClick={() => {
                OnDelete(index);
              }}
            >
              delete
            </button>
          </div>;
        })}
      
        <button
          onClick={() => {
            onAdd();
          }}
        >
          Add
        </button>
      </div>
    </>
  );
}

function WorkSection({
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
  function handleAddHighlights(value, index) {
    setWorkData((prev) => {
      let newWork = prev?.map((item, i) => {
        if (index === i) {
          return {
            ...item,
            highlights: [...(item.highlights ? item.highlights : []), value],
          };
        }
        return item;
      });
      return newWork;
    });
  }
  function addHighlights(index) {
    setWorkData((prev) => {
      let newWork = prev?.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            highlights: [...(item.highlights ? item.highlights : []), "c"],
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
  function handleDeleteHighlights(itemIndex, highIndex) {
    setWorkData((prev) => {
      let newWork = prev?.map((item, i) => {
        if (itemIndex === i) {
          return {
            ...item,
            highlights: [
              ...(item.highlights
                ? item.highlights.filter((_, hi) => hi !== highIndex)
                : []),
            ],
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

              <ChipCard
                initalData={workItem.highlights}
                onAdd={(value) => {
                  handleAddHighlights(value, index);
                }}
                onDelete={(highIndex) => {
                  handleDeleteHighlights(index, highIndex);
                }}
              />

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
function App() {
  const [formData, setFormData] = useState<TResumeSchema>({
    basics: {
      name: "",
      label: "",
      image: "",
      email: "",
      phone: "",
      url: "",
      summary: "",
      location: {
        address: "",
        postalCode: "",
        city: "",
        countryCode: "",
        region: "",
      },
      profiles: [],
    },
    work: [],
    volunteer: [
      {
        organization: "",
        position: "",
        url: "",
        startDate: "",
        endDate: "",
        summary: "",
        highlights: [""],
      },
    ],
    education: [
      {
        institution: "",
        url: "",
        area: "",
        studyType: "",
        startDate: "",
        endDate: "",
        score: "",
        courses: [""],
      },
    ],
    awards: [
      {
        title: "",
        date: "",
        awarder: "",
        summary: "",
      },
    ],
    certificates: [
      {
        name: "",
        date: "",
        issuer: "",
        url: "",
      },
    ],
    publications: [
      {
        name: "",
        publisher: "",
        releaseDate: "",
        url: "",
        summary: "",
      },
    ],
    skills: [
      {
        name: "",
        level: "",
        keywords: [""],
      },
    ],
    languages: [
      {
        language: "",
        fluency: "",
      },
    ],
    interests: [
      {
        name: "",
        keywords: [""],
      },
    ],
    references: [
      {
        name: "",
        reference: "",
      },
    ],
    projects: [
      {
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        highlights: [""],
        url: "",
      },
    ],
  });

  const [basicData, setBasic] = useState<TBasicSchema>(formData.basics);
  const [workData, setWork] = useState<TWorkSchema>(formData.work);

  useEffect(() => {
    console.log("form data from use effect", formData);
  }, [formData]);

  useEffect(() => {
    console.log("changes done on basic Section", basicData);
  }, [basicData]);

  useEffect(() => {
    console.log("changes done on work Section", workData);
  }, [workData]);

  return (
    <div className="w-full  py-[20px] px-[20px] ">
      <div className="max-w-4xl mx-auto">
        <BasicSection initalBasicData={basicData} setBasicData={setBasic} />
        <WorkSection intialWorkData={workData} setWorkData={setWork} />
      </div>
    </div>
  );
}

export default App;
