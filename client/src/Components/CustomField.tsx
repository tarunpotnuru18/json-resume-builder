export default function CustomField({
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
