function CheckboxStyle({ id, checked, checkboxName, onHandleCheckboxChange }) {
  return (
    <>
      <div className="flex items-center gap-[5px]">
        <div className="flex-none w-10 h-10 flex items-center justify-center">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onHandleCheckboxChange}
            className="w-[18px] h-[18px] text-primary border-2 border-secondaryGray rounded-sm focus:ring-transparent focus:ring-0 focus:outline-none"
          />
        </div>
        <label
          htmlFor={id}
          className="noto-sans-tc-400 text-primaryGray text-[16px] leading-6 lg:text-[18px]"
        >
          {checkboxName}
        </label>
      </div>
    </>
  );
}

export default CheckboxStyle;
