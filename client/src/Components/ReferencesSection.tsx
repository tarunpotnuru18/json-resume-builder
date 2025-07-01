import type { TReferencesSchema } from "../Schema";
import CustomField from "./CustomField";

export default function ReferencesSection({
  intialReferencesData,
  setReferencesData,
}: {
  intialReferencesData: TReferencesSchema;
  setReferencesData: React.Dispatch<React.SetStateAction<TReferencesSchema>>;
}) {
  let ReferencesFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    name: {
      as: "input",
      type: "text",
    },
    reference: {
      placeholder: "Reference description",
      as: "textarea",
      type: "text",
    },
  };
  function handleReferencesData(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) {
    setReferencesData((prev) => {
      let newReferences = prev?.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: e.target.value };
        }
        return item;
      });
      return newReferences;
    });
  }
  function addReference() {
    setReferencesData((prev) => {
      return [
        ...(prev ? prev : []),
        {
          name: "",
          reference: "",
        },
      ];
    });
  }

  function deleteReference(index) {
    setReferencesData((prev) => {
      let newReferences = prev?.filter((_, i) => i !== index);
      return newReferences;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-[15px] ">
        <h1 className="font-bold text-2xl text-white">References section</h1>

        {intialReferencesData?.map((referenceItem, index) => {
          return (
            <div
              className="flex flex-col gap-[10px] border border-white p-[10px]"
              key={index}
            >
              <div className="flex ">
                <button
                  onClick={() => {
                    deleteReference(index);
                  }}
                  className="justify-end"
                >
                  delete
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(["name"] as ("name" | "reference")[]).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={referenceItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleReferencesData(e, index, field);
                      }}
                      key={index + field}
                      as={ReferencesFields[field]?.as}
                      placeholder={ReferencesFields[field]?.placeholder}
                      type={ReferencesFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div>
                {(["reference"] as ("name" | "reference")[]).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={referenceItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleReferencesData(e, index, field);
                      }}
                      key={index + field}
                      as={ReferencesFields[field]?.as}
                      placeholder={ReferencesFields[field]?.placeholder}
                      type={ReferencesFields[field]?.type}
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
            addReference();
          }}
        >
          add
        </button>
      </div>
    </>
  );
}
