import type { TBasicSchema } from "../Schema";
import DeleteBtn from "./Buttons/Delete";
import CustomField from "./CustomField";
import { Plus, Trash2 } from "lucide-react";
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
      placeholder: "eg: john",
      as: "input",
      type: "text",
    },
    label: {
      placeholder: " eg: programmer",
      as: "input",
      type: "text",
    },
    image: {
      placeholder: "add your image url",
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
      placeholder: "eg: add your portfolio url",
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
  let profileFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    network: {
      placeholder: "eg: github",
      as: "input",
      type: "text",
    },
    username: {
      placeholder: "eg: john",
      as: "input",
      type: "text",
    },
    url: {
      placeholder: "eg: github.com/john",
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
      <div className="flex flex-col gap-[15px] rounded-lg border border-slate-700/40 bg-slate-800/90 py-[24px] px-[12px] md:px-[24px] ">
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
                      placeholder={basicFields[field]?.placeholder}
                    />
                  </>
                );
              }
            }
          )}
        </div>
        <div className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2 text-slate-200">
          Social Profiles
        </div>
        <div className="flex flex-col gap-[20px]">
          {initalBasicData?.profiles?.map((profile, index) => {
            return (
              <div className="w-full border border-slate-600/40 bg-slate-700/20 rounded-lg p-[16px]">
                <div className="flex w-full justify-between">
                  <span className="font-medium text-slate-200">{`Profile ${
                    index + 1
                  }`}</span>

                  <DeleteBtn
                    onclick={() => handleDeleteProfileItems(index)}
                  ></DeleteBtn>
                </div>
                <div className="grid md:grid-cols-3 md:gap-[25px] gap-[10px]  p-[10px]">
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
                        placeholder={profileFields[field].placeholder}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full">
          <button
            onClick={() => addProfileItems()}
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent transition-colors flex items-center p-[8px] rounded-md outline active:bg-slate-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Social Profile
          </button>
        </div>
      </div>
    </>
  );
}
