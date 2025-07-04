import { Calendar } from "lucide-react";
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
  let place = fieldName.charAt(0).toLocaleUpperCase() + fieldName.substring(1);
  return (
    <>
      <div className="flex flex-col gap-[10px] text-white font-medium text-[14px]">
        <label
          htmlFor={fieldName}
          className=" text-sm text-slate-300 font-medium flex gap-[10px] items-center"
        >
          {type === "date" && <Calendar className="h-4 w-4 text-orange-400" />}{" "}
          {place}
        </label>

        {as === "input" ? (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            
            className="flex items-center h-8 md:h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background   placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-slate-600 bg-slate-700/95 focus:border-blue-500 focus:ring-blue-500/20 transition-colors"
          />
        ) : (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            
            className="flex w-full rounded-md border px-3 py-2 text-sm ring-offset-background     border-slate-600 bg-slate-700/95  focus:ring-blue-500/20 min-h-[100px] resize-none transition-colors"
          ></textarea>
        )}
      </div>
    </>
  );
}
