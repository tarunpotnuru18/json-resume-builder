import type { TCertificatesSchema } from "../Schema";
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
    },
    date: {
      as: "input",
      type: "date",
    },
    issuer: {
      as: "input",
      type: "text",
    },
    url: {
      as: "input",
      type: "text",
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
      <div className="flex flex-col gap-[15px] ">
        <h1 className="font-bold text-2xl text-white">Certificates section</h1>

        {intialCertificatesData?.map((certificatesItem, index) => {
          return (
            <div
              className="flex flex-col gap-[10px] border border-white p-[10px]"
              key={index}
            >
              <div className="flex ">
                <button
                  onClick={() => {
                    deleteCertificates(index);
                  }}
                  className="justify-end"
                >
                  delete
                </button>
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

        <button
          className="border border-white"
          onClick={() => {
            addCertificates();
          }}
        >
          add
        </button>
      </div>
    </>
  );
}
