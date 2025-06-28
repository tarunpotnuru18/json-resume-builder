import React, { useEffect, useState, type ChangeEvent } from "react";

import { z } from "zod";

import type { TResumeSchema } from "./Schema";
import { file, json } from "zod/v4";
type TBasicSchema = TResumeSchema["basics"];

function CustomField({ fieldName, onChange, value }) {
  return (
    <>
      <div className="flex gap-[20px] items-center ">
        <label htmlFor="" className="text-white">
          {fieldName}
        </label>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="border-white border text-white"
        />
      </div>
    </>
  );
}

function CustomChip({ onChange }) {
  let [cardValue, setCardValue] = useState("");
  return (
    <>
      <div className="flex gap-[25px]">
        <input
          type="text"
          name=""
          id=""
          value={cardValue}
          onChange={(e) => {
            setCardValue(e.target.value);
          }}
          className="text-white border border-white"
        />
        <button
          onClick={() => {
            onChange(cardValue);
            setCardValue("");
          }}
        >
          add card
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

  useEffect(() => {
    console.log("form data from use effect", formData);
  }, [formData]);

  function setNestedValue(path, value) {
    let keys = path.split(".");
    let lastKey = keys.pop();

    let newObj = structuredClone(formData);
    let target = keys.reduce((acc, curr) => {
      if (acc[curr]) {
        acc = acc[curr];
      }
      return acc;
    }, newObj);
    target[lastKey] = value;

    setFormData(newObj);
  }

  function getNestedValue(path, obj): any {
    let keys = path.split(".");

    let lastKey = keys.pop();

    let target = keys.reduce((acc, curr) => {
      if (acc[curr]) {
        acc = acc[curr];
      }
      return acc;
    }, obj);

    return target[lastKey];
  } //arrays

  useEffect(() => {
    console.log("changes done on basic Section", basicData);
  }, [basicData]);

  return (
    // <>
    //   <div className="flex flex-col items-center gap-[25px]">
    //     <CustomField
    //       fieldName={"name"}
    //       onChange={(e) => {
    //         // setFormData((prev) => {
    //         //   return {
    //         //     ...prev,
    //         //     basics: { ...prev.basics, name: e.target.value },
    //         //   };
    //         // });
    //         setNestedValue("basics.name", e.target.value);
    //       }}
    //       value={formData.basics?.name}
    //     />
    //     <CustomField
    //       fieldName={"label"}
    //       onChange={(e) => {
    //         setNestedValue("basics.label", e.target.value);
    //       }}
    //       value={formData.basics?.label}
    //     />
    //     <CustomField
    //       fieldName={"image"}
    //       onChange={(e) => {
    //         setNestedValue("basics.image", e.target.value);
    //       }}
    //       value={formData.basics?.image}
    //     />
    //     <CustomField
    //       fieldName={"email"}
    //       onChange={(e) => {
    //         setNestedValue("basics.email", e.target.value);
    //       }}
    //       value={formData.basics?.email}
    //     />
    //     <CustomField
    //       fieldName={"phone"}
    //       onChange={(e) => {
    //         setNestedValue("basics.phone", e.target.value);
    //       }}
    //       value={formData.basics?.phone}
    //     />
    //     <CustomField
    //       fieldName={"url"}
    //       onChange={(e) => {
    //         setNestedValue("basics.url", e.target.value);
    //       }}
    //       value={formData.basics?.url}
    //     />
    //     <CustomField
    //       fieldName={"summary"}
    //       onChange={(e) => {
    //         setNestedValue("basics.summary", e.target.value);
    //       }}
    //       value={formData.basics?.summary}
    //     />
    //     <div>location</div>

    //     <CustomField
    //       fieldName={"address"}
    //       onChange={(e) => {
    //         setNestedValue("basics.location.address", e.target.value);
    //       }}
    //       value={formData.basics?.location?.address}
    //     />
    //     <CustomField
    //       fieldName={"postalCode"}
    //       onChange={(e) => {
    //         setNestedValue("basics.location.postalCode", e.target.value);
    //       }}
    //       value={formData.basics?.location?.postalCode}
    //     />

    //     <CustomField
    //       fieldName={"city"}
    //       onChange={(e) => {
    //         setNestedValue("basics.location.city", e.target.value);
    //       }}
    //       value={formData.basics?.location?.city}
    //     />
    //     <CustomField
    //       fieldName={"countryCode"}
    //       onChange={(e) => {
    //         setNestedValue("basics.location.countryCode", e.target.value);
    //       }}
    //       value={formData.basics?.location?.countryCode}
    //     />
    //     <CustomField
    //       fieldName={"region"}
    //       onChange={(e) => {
    //         setNestedValue("basics.location.region", e.target.value);
    //       }}
    //       value={formData.basics?.location?.region}
    //     />
    //     <div>profiles</div>
    //     {getNestedValue("basics.profiles", formData).map((item, index) => {
    //       return (
    //         <>
    //           {["network", "username", "url"].map((property) => {
    //             return (
    //               <div>
    //                 <CustomField
    //                   value={item[property] || ""}
    //                   fieldName={property}
    //                   onChange={(e) => {
    //                     let newObj = JSON.parse(JSON.stringify(formData));
    //                     let newProfiles: any = formData.basics?.profiles;
    //                     newProfiles[index][property] = e.target.value;
    //                     setFormData((prev) => {
    //                       return {
    //                         ...prev,
    //                         basics: { ...prev.basics, profiles: newProfiles },
    //                       };
    //                     });
    //                   }}
    //                 />
    //                 <button
    //                   onClick={() => {
    //                     // let newObj = JSON.parse(JSON.stringify(formData));
    //                     // let arr = getNestedValue("basics.profiles", newObj);
    //                     // arr.splice(index, 1);

    //                     setFormData((prev) => {
    //                       let newProfiles: any = prev.basics?.profiles;
    //                       newProfiles.splice(index, 1);
    //                       return {
    //                         ...prev,
    //                         basics: { ...prev.basics, profiles: newProfiles },
    //                       };
    //                     });
    //                   }}
    //                 >
    //                   del
    //                 </button>
    //               </div>
    //             );
    //           })}
    //         </>
    //       );
    //     })}
    //     <button
    //       onClick={() => {
    //         let newObj = JSON.parse(JSON.stringify(formData));
    //         let arr = getNestedValue("basics.profiles", newObj);
    //         arr.push({
    //           network: "",
    //           username: "",
    //           url: "",
    //         });
    //         setFormData(newObj);
    //       }}
    //     >
    //       add
    //     </button>

    //     <div>work</div>
    //     <div>
    //       {getNestedValue("work", formData).map((item, index) => {
    //         return (
    //           <div>
    //             {[
    //               "name",
    //               "position",
    //               "url",
    //               "startDate",
    //               "endDate",
    //               "summary",
    //             ].map((field) => {
    //               return (
    //                 <>
    //                   <CustomField
    //                     fieldName={field}
    //                     value={item[field]}
    //                     onChange={(e) => {
    //                       let newObj = JSON.parse(JSON.stringify(formData));
    //                       getNestedValue("work", newObj)[index][field] =
    //                         e.target.value;
    //                       setFormData(newObj);
    //                     }}
    //                   />
    //                 </>
    //               );
    //             })}

    //             <CustomChip
    //               onChange={(value) => {
    //                 // let newObj = JSON.parse(JSON.stringify(formData));
    //                 // newObj.work[index].highlights.push(value);
    //                 // setFormData(newObj);

    //                 setFormData((prev) => {
    //                   let newWork: any = prev.work;

    //                   newWork[index].highlights.push(value);

    //                   return {
    //                     ...prev,
    //                     work: newWork,
    //                   };
    //                 });
    //               }}
    //             ></CustomChip>
    //             {item.highlights &&
    //               item.highlights.map((value, highindex) => {
    //                 return (
    //                   <>
    //                     <div className="flex gap-[25px]">
    //                       <div>{value}</div>
    //                       <button
    //                         onClick={() => {
    //                           let newObj = JSON.parse(JSON.stringify(formData));
    //                           newObj.work[index].highlights.splice(
    //                             highindex,
    //                             1
    //                           );
    //                           setFormData(newObj);
    //                         }}
    //                       >
    //                         X
    //                       </button>
    //                     </div>
    //                   </>
    //                 );
    //               })}

    //             <button
    //               onClick={() => {
    //                 let newObj = JSON.parse(JSON.stringify(formData));
    //                 let arr = getNestedValue("work", newObj);
    //                 arr.splice(index, 1);
    //                 setFormData(newObj);
    //               }}
    //             >
    //               delete
    //             </button>
    //           </div>
    //         );
    //       })}
    //     </div>
    //     <button
    //       onClick={() => {
    //         let newObj = JSON.parse(JSON.stringify(formData));
    //         let arr = getNestedValue("work", newObj);

    //         arr.push({
    //           name: "",
    //           position: "",
    //           url: "",
    //           startDate: "",
    //           endDate: "",
    //           summary: "",
    //           highlights: [],
    //         }),
    //           setFormData(newObj);
    //       }}
    //     >
    //       add work
    //     </button>
    //   </div>
    // </>
    <div className="w-full  py-[20px] px-[20px]">
      <BasicSection initalBasicData={basicData} setBasicData={setBasic} />
    </div>
  );
}

function BasicSection({
  initalBasicData,
  setBasicData,
}: {
  initalBasicData: TBasicSchema;
  setBasicData: React.Dispatch<React.SetStateAction<TBasicSchema>>;
}) {
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
            profile[field] = e.target.value;
            return profile;
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
      <div className="flex flex-col gap-[10px]">
        <h1 className="font-bold text-2xl text-white">Basic section</h1>
        {["name", "label", "image", "email", "phone", "url", "summary"].map(
          (field, index) => {
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
                />
              </>
            );
          }
        )}

        <div>location</div>
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

        <div>Profile</div>
        {initalBasicData?.profiles?.map((profile, index) => {
          return (
            <div>
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

              <button onClick={() => handleDeleteProfileItems(index)}>
                delete
              </button>
            </div>
          );
        })}

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

export default App;
