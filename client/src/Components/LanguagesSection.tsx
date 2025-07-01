import type { TLanguagesSchema } from "../Schema";
import CustomField from "./CustomField";

export default function LanguagesSection({
  intialLanguagesData,
  setLanguagesData,
}: {
  intialLanguagesData: TLanguagesSchema;
  setLanguagesData: React.Dispatch<React.SetStateAction<TLanguagesSchema>>;
}) {
  let LanguagesFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    language: {
      as: "input",
      type: "text",
    },
    fluency: {
      as: "input",
      type: "text",
    },
  };

  function handleLanguagesData(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) {
    setLanguagesData((prev) => {
      let newLanguages = prev?.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: e.target.value };
        }
        return item;
      });
      return newLanguages;
    });
  }

  function addLanguages() {
    setLanguagesData((prev) => {
      return [
        ...(prev ? prev : []),
        {
          language: "",
          fluency: "",
        },
      ];
    });
  }

  function deleteLanguages(index) {
    setLanguagesData((prev) => {
      let newLanguages = prev?.filter((_, i) => i !== index);
      return newLanguages;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-[15px] ">
        <h1 className="font-bold text-2xl text-white">Languages section</h1>

        {intialLanguagesData?.map((languagesItem, index) => {
          return (
            <div
              className="flex flex-col gap-[10px] border border-white p-[10px]"
              key={index}
            >
              <div className="flex ">
                <button
                  onClick={() => {
                    deleteLanguages(index);
                  }}
                  className="justify-end"
                >
                  delete
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(["language", "fluency"] as ("language" | "fluency")[]).map(
                  (field) => {
                    return (
                      <CustomField
                        fieldName={field}
                        value={languagesItem[field] || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleLanguagesData(e, index, field);
                        }}
                        key={index + field}
                        as={LanguagesFields[field]?.as}
                        placeholder={LanguagesFields[field]?.placeholder}
                        type={LanguagesFields[field]?.type}
                      />
                    );
                  }
                )}
              </div>
            </div>
          );
        })}

        <button
          className="border border-white"
          onClick={() => {
            addLanguages();
          }}
        >
          add
        </button>
      </div>
    </>
  );
}
