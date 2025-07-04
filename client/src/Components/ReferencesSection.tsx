import { Plus } from "lucide-react";
import type { TReferencesSchema } from "../Schema";
import DeleteBtn from "./Buttons/Delete";
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
      <div className="flex flex-col gap-[15px] rounded-lg border border-slate-700/40 bg-slate-800/90 py-[24px] px-[12px] md:px-[24px] ">
        <h1 className="font-bold text-2xl text-white">References section</h1>

        {intialReferencesData?.map((referenceItem, index) => {
          return (
            <div
              className="flex flex-col gap-[15px] w-full border border-slate-600/40 bg-slate-700/20 rounded-lg p-[16px]"
              key={index}
            >
              <div className="flex justify-between ">
                <span className="font-medium text-slate-200">
                  {`Reference ${index + 1}`}
                </span>
                <DeleteBtn
                  onclick={() => {
                    deleteReference(index);
                  }}
                ></DeleteBtn>
              </div>

              <div className="grid grid-cols-1  gap-[25px]">
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

        <div className="flex w-full">
          <button
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent transition-colors flex items-center p-[8px] rounded-md outline active:bg-slate-700"
            onClick={() => {
              addReference();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Reference
          </button>
        </div>
      </div>
    </>
  );
}
