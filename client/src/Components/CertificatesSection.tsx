import { Plus } from "lucide-react";
import type { TCertificatesSchema } from "../Schema";
import DeleteBtn from "./Buttons/Delete";
import CustomField from "./CustomField";

export default function CertificatesSection({
  intialCertificatesData,
  setCertificatesData,
}: {
  intialCertificatesData: TCertificatesSchema;
  setCertificatesData: React.Dispatch<
    React.SetStateAction<TCertificatesSchema>
  >;
}) {
  let CertificatesFields: Record<
    string,
    { placeholder?: string; as?: "textarea" | string; type?: string }
  > = {
    name: {
      as: "input",
      type: "text",
      placeholder:"certficate name"
    },
    date: {
      as: "input",
      type: "date",
    },
    issuer: {
      as: "input",
      type: "text",
      placeholder:"eg: udemy"
    },
    url: {
      as: "input",
      type: "text",
      placeholder:"url of the certificate"
    },
  };

  function handleCertificatesData(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) {
    setCertificatesData((prev) => {
      let newCertificates = prev?.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: e.target.value };
        }
        return item;
      });
      return newCertificates;
    });
  }

  function addCertificates() {
    setCertificatesData((prev) => {
      return [
        ...(prev ? prev : []),
        {
          name: "",
          date: "",
          issuer: "",
          url: "",
        },
      ];
    });
  }

  function deleteCertificates(index) {
    setCertificatesData((prev) => {
      let newCertificates = prev?.filter((_, i) => i !== index);
      return newCertificates;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-[15px] rounded-lg border border-slate-700/40 bg-slate-800/90 py-[24px] px-[12px] md:px-[24px]">
        <h1 className="font-bold text-2xl text-white">Certificates Section</h1>

        {intialCertificatesData?.map((certificatesItem, index) => {
          return (
            <div
              className="flex flex-col gap-[15px] w-full border border-slate-600/40 bg-slate-700/20 rounded-lg p-[16px]"
              key={index}
            >
              <div className="flex justify-between ">
                <span className="font-medium text-slate-200">
                  {`Certificate ${index + 1}`}
                </span>
                <DeleteBtn
                  onclick={() => {
                    deleteCertificates(index);
                  }}
                ></DeleteBtn>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                {(
                  ["name", "issuer"] as ("name" | "date" | "issuer" | "url")[]
                ).map((field) => {
                  return (
                    <CustomField
                      fieldName={field}
                      value={certificatesItem[field] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleCertificatesData(e, index, field);
                      }}
                      key={index + field}
                      as={CertificatesFields[field]?.as}
                      placeholder={CertificatesFields[field]?.placeholder}
                      type={CertificatesFields[field]?.type}
                    />
                  );
                })}
              </div>

              <div>
                {(["url"] as ("name" | "date" | "issuer" | "url")[]).map(
                  (field) => {
                    return (
                      <CustomField
                        fieldName={field}
                        value={certificatesItem[field] || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleCertificatesData(e, index, field);
                        }}
                        key={index + field}
                        as={CertificatesFields[field]?.as}
                        placeholder={CertificatesFields[field]?.placeholder}
                        type={CertificatesFields[field]?.type}
                      />
                    );
                  }
                )}
              </div>

              <div>
                {(["date"] as ("name" | "date" | "issuer" | "url")[]).map(
                  (field) => {
                    return (
                      <CustomField
                        fieldName={field}
                        value={certificatesItem[field] || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleCertificatesData(e, index, field);
                        }}
                        key={index + field}
                        as={CertificatesFields[field]?.as}
                        placeholder={CertificatesFields[field]?.placeholder}
                        type={CertificatesFields[field]?.type}
                      />
                    );
                  }
                )}
              </div>
            </div>
          );
        })}

        <div className="flex w-full">
          <button
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent transition-colors flex items-center p-[8px] rounded-md outline active:bg-slate-700"
            onClick={() => {
              addCertificates();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Certificate
          </button>
        </div>
      </div>
    </>
  );
}
