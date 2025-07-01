export default function Highlights({ intialData=[], onAdd, OnDelete, onChange }) {
  return (
    <>
      <div>
        {intialData.map((value, index) => {
          return (
            <div className="flex justify-between ">
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value, index);
                }}
              />
              <button
                onClick={() => {
                  OnDelete(index);
                }}
              >
                delete
              </button>
            </div>
          );
        })}

        <button
          onClick={() => {
            onAdd();
          }}
        >
          Add
        </button>
      </div>
    </>
  );
}