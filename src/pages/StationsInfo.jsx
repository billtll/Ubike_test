import { useEffect, useState } from "react";
import axios from "axios";
import DropDownMenu from "../components/DropDownMenu";
import CheckboxStyle from "../components/CheckboxStyle";
import MainIllustration from "../svgComponents/MainIllustration";
import Table from "../components/Table";
import { fakeData } from "../fakeData";

const StationsInfo = () => {
  const [cityValue, setCityValue] = useState("");
  const [conditionalValue, setConditionalValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [hasValidInputValue, setHasValidInputValue] = useState(false);

  const [selectAll, setSelectAll] = useState(true);

  const [areas, setAreas] = useState([]);
  const [stationsData, setStationsData] = useState([]);
  const [cityDataList, setCityDataList] = useState([]);
  const [filteredStationsData, setFilteredStationsData] = useState([]);

  const handleCityValueChange = (value) => {
    setCityValue(value);

    if (conditionalValue !== "") {
      setConditionalValue("");
    }
  };

  const handleConditionalValueChange = (value) => {
    setConditionalValue(value);
  };

  const handleSelectedCity = (value) => {
    setSelectedCity(value);
  };

  const merge = (originalData, data, cityName) => {
    const extractData = data.map((item) => {
      const { sno, sarea, sna, sbi, bemp } = item;
      return { sno, sarea, sna, sbi, bemp };
    });

    const area = extractData.reduce((acc, cur) => {
      const { sarea } = cur;
      const existingArea = acc.find((item) => item.name === sarea);
      if (!existingArea) {
        acc.push({
          id: `area${
            originalData.length + 1 < 10
              ? `0${originalData.length + 1}`
              : originalData.length + 1
          }${acc.length + 1 < 10 ? `0${acc.length + 1}` : acc.length + 1}`,
          name: sarea,
          checked: true,
        });
      }
      return acc;
    }, []);

    const organizedData = {
      id: originalData.length + 1,
      city: cityName,
      area,
      data: extractData,
    };

    return [...originalData, organizedData];
  };

  const extractCity = (data) => {
    return data.reduce((acc, cur) => {
      const { city } = cur;
      const existingCity = acc.find((item) => item.name === city);

      if (!existingCity) {
        acc.push({
          id: `city${
            acc.length + 1 < 10 ? `0${acc.length + 1}` : acc.length + 1
          }`,
          name: city,
        });
      }

      return acc;
    }, []);
  };

  const handleCheckboxChange = (itemId) => {
    const updatedChecked = areas.map((area) => {
      if (area.id === itemId) {
        return { ...area, checked: !area.checked };
      }
      return area;
    });

    setAreas(updatedChecked);
  };

  const handleSelectAllChange = () => {
    const updatedChecked = areas.map((area) => ({
      ...area,
      checked: !selectAll,
    }));

    setAreas(updatedChecked);
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    const handleCityList = async () => {
      const res = await axios.get(
        "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
      );
      const mergeData = merge(fakeData, res.data, "台北市");
      const cityList = extractCity(mergeData);

      const lastItem = cityList.pop();
      cityList.unshift(lastItem);
      setCityDataList(cityList);
    };

    handleCityList();
  }, []);

  useEffect(() => {
    const filteredCity = (data) => {
      return data.filter((item) => item.city === selectedCity);
    };

    const handleCheckboxList = async () => {
      const res = await axios.get(
        "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
      );
      const mergeData = merge(fakeData, res.data, "台北市");
      const filteredCityData = filteredCity(mergeData);

      if (filteredCityData.length > 0) {
        setAreas(filteredCityData[0].area);
        setStationsData(filteredCityData[0].data);
        setFilteredStationsData(filteredCityData[0].data);
      }
    };

    handleCheckboxList();
  }, [selectedCity]);

  useEffect(() => {
    const hasUnchecked = areas.some((item) => !item.checked);
    hasUnchecked ? setSelectAll(false) : setSelectAll(true);
  }, [areas]);

  useEffect(() => {
    const filteredAreasData = stationsData.reduce((acc, cur) => {
      const matchingArea = areas.find((item) => item.name === cur.sarea);
      if (!matchingArea || matchingArea.checked) {
        acc.push(cur);
      }
      return acc;
    }, []);

    const underAllConditionStationsData = conditionalValue
      ? filteredAreasData.filter((item) => item.sna.includes(conditionalValue))
      : filteredAreasData;

    setFilteredStationsData(underAllConditionStationsData);
  }, [areas, stationsData, conditionalValue]);

  const downArrowSvg = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 7.5L9 11.25L12.75 7.5H5.25Z"
        fill={cityValue ? "#323232" : "#AEAEAE"}
      />
    </svg>
  );

  const searchSvg = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.07 9.9525L15.3675 14.25L14.25 15.3675L9.9525 11.07C9.15 11.6475 8.1825 12 7.125 12C4.4325 12 2.25 9.8175 2.25 7.125C2.25 4.4325 4.4325 2.25 7.125 2.25C9.8175 2.25 12 4.4325 12 7.125C12 8.1825 11.6475 9.15 11.07 9.9525ZM7.125 3.75C5.2575 3.75 3.75 5.2575 3.75 7.125C3.75 8.9925 5.2575 10.5 7.125 10.5C8.9925 10.5 10.5 8.9925 10.5 7.125C10.5 5.2575 8.9925 3.75 7.125 3.75Z"
        fill={conditionalValue ? "#B5CC22" : "#AEAEAE"}
      />
    </svg>
  );

  return (
    <>
      <div className="px-8 mx-auto max-w-[1440px] pt-[calc(72px+24px)] pb-[34px] xl:px-[124px] xl:pt-[calc(104px+32px)] xl:pb-11">
        <h1 className="mb-4 text-primary noto-sans-tc-700 text-[18px] leading-6 tracking-[0.18em] xl:mb-8 lg:text-[24px]">
          站點資訊
        </h1>
        <div className="flex flex-col xl:flex-row">
          <DropDownMenu
            placeholder="選擇縣市"
            frameSize="xl:w-[175px]"
            textColor="text-primaryGray"
            svgPicture={downArrowSvg}
            text={cityValue}
            onSetHasValidInputValue={setHasValidInputValue}
            onTextChange={handleCityValueChange}
            onSelect={handleSelectedCity}
            dataList={cityDataList}
            isForSearch={false}
          />
          {hasValidInputValue && (
            <DropDownMenu
              placeholder="搜尋站點"
              frameSize="xl:w-[277px]"
              textColor="text-primary"
              svgPicture={searchSvg}
              text={conditionalValue}
              onSetHasValidInputValue={setHasValidInputValue}
              onTextChange={handleConditionalValueChange}
              onSelect={handleConditionalValueChange}
              dataList={filteredStationsData}
              isForSearch={true}
            />
          )}
        </div>
        {areas.length > 0 && hasValidInputValue && (
          <>
            <div className="mt-4 xl:mt-6">
              <CheckboxStyle
                id="checked_all"
                checked={selectAll}
                checkboxName="全部勾選"
                onHandleCheckboxChange={handleSelectAllChange}
              />
            </div>
            <div className="flex items-center">
              <div className="self-start w-full xl:w-[468px]">
                <div className="mt-2 grid grid-cols-3 gap-x-[15px] gap-y-[5px] xl:mt-[15px] md:grid-cols-4 max-[372px]:grid-cols-2">
                  {areas?.map((area) => (
                    <div key={area.id}>
                      <CheckboxStyle
                        id={area.id}
                        checked={area.checked}
                        checkboxName={area.name}
                        onHandleCheckboxChange={() => {
                          handleCheckboxChange(area.id);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden xl:grow xl:flex xl:justify-center min-[1440px]:ml-[150px] min-[1440px]:block">
                <MainIllustration />
              </div>
            </div>
            <div className="mt-6 xl:mt-10">
              <Table stationInfo={filteredStationsData} city={selectedCity} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default StationsInfo;
