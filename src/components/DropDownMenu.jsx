import { useEffect, useState } from "react";

const DropDownMenu = ({
  placeholder,
  frameSize,
  textColor,
  svgPicture,
  text,
  onSetHasValidInputValue,
  onTextChange,
  onSelect,
  dataList,
  isForSearch,
}) => {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [filterDataList, setFilterDataList] = useState(dataList);

  const handleInputValue = (e) => {
    const { value } = e.target;
    onTextChange(value);
    onSelect(value);

    if (value === "" && !isForSearch) {
      onSetHasValidInputValue(false);
    }

    if (!isForSearch) {
      const hasValidCityValue = dataList?.some((item) => item.name === value);
      onSetHasValidInputValue(hasValidCityValue);
    }
  };

  const handleClickInput = () => {
    setOpenDropDownMenu((prevState) => !prevState);
  };

  const handleClickButton = () => {
    setOpenDropDownMenu((prevState) => !prevState);
    setFilterDataList(dataList);
  };

  useEffect(() => {
    const filteredList = isForSearch
      ? dataList?.filter((item) => item?.sna?.includes(text))
      : dataList?.filter((item) => item?.name?.includes(text));

    setFilterDataList(filteredList);
  }, [isForSearch, text, dataList]);

  return (
    <>
      <div className="mb-2 last:mb-0 xl:mb-0 xl:mr-4">
        <div
          className={`flex items-center ${frameSize} h-10 pl-1 pr-4 rounded-lg bg-tertiaryGray`}
        >
          <input
            type="text"
            placeholder={placeholder}
            value={text}
            onChange={handleInputValue}
            onClick={handleClickInput}
            className={`w-full noto-sans-tc-500 text-[16px] leading-5 tracking-[0.1px] ${textColor} border-0 bg-tertiaryGray placeholder:text-secondaryGray focus:ring-0 lg:text-[18px]`}
          />
          <button type="button" onClick={handleClickButton}>
            {svgPicture}
          </button>
        </div>
        {openDropDownMenu && (
          <ul
            className={`scrollbar max-h-[232px] ${frameSize} overflow-auto mt-3 p-4 bg-tertiaryGray rounded-lg flex flex-col gap-4`}
          >
            {filterDataList?.map((item) => (
              <li
                key={isForSearch ? item.sno : item.id}
                onClick={() => {
                  setOpenDropDownMenu(false);
                  onSetHasValidInputValue(true);
                  onTextChange(
                    isForSearch ? item.sna.split("_")[1] : item.name
                  );
                  onSelect(isForSearch ? item.sna.split("_")[1] : item.name);
                }}
                className={`text-[16px] leading-5 tracking-[0.1px] cursor-pointer lg:text-[18px] hover:font-bold ${
                  text === (item.name || item.sna.split("_")[1])
                    ? `noto-sans-tc-500 ${textColor}`
                    : "noto-sans-tc-400 text-primaryGray"
                }`}
              >
                {isForSearch ? item.sna.split("_")[1] : item.name}
              </li>
            ))}
            {filterDataList?.length === 0 && (
              <li className="text-[16px] leading-5 tracking-[0.1px] cursor-pointer lg:text-[18px]">
                ! 文字篩選未匹配
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default DropDownMenu;
