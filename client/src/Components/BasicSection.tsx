import type { TBasicSchema } from "../Schema";
import CustomField from "./CustomField";

export default function BasicSection({
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
