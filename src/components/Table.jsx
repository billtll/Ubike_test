const Table = ({ stationInfo, city }) => {
  return (
    <div className="border-[0.5px] border-secondaryGray rounded-[8px] overflow-auto xl:rounded-[28px]">
      <table className="w-full text-center">
        <thead className="h-[66px] noto-sans-tc-500 text-[16px] leading-6 text-white bg-primary xl:text-[18px]">
          <tr>
            <th>縣市</th>
            <th>區域</th>
            <th>站點名稱</th>
            <th>可借車輛</th>
            <th>可還車位</th>
          </tr>
        </thead>
        <tbody className="noto-sans-tc-400 text-[14px] leading-6 text-primaryGray lg:text-[16px]">
          {stationInfo.map((item) => (
            <tr key={item.sno} className="even:bg-tertiaryGray">
              <td className="min-w-[80px] px-2 lg:px-[20px] xl:px-[30px] 2xl:px-[40px] h-[72px]">
                {city}
              </td>
              <td className="min-w-[80px] px-2 lg:px-[40px] xl:px-[60px] 2xl:px-[80px] h-[72px]">
                {item.sarea}
              </td>
              <td className="min-w-[132px] min-[370px]:min-w-[142px] min-[380px]:min-w-[158px] min-[400px]:min-w-[180px] min-[500px]:min-w-[142px] px-2 lg:px-[20px] xl:px-[30px] 2xl:px-[40px] h-[72px] text-justify">
                {item.sna.split("_")[1]}
              </td>
              <td className="min-w-[80px] px-2 lg:px-[20px] xl:px-[30px] 2xl:px-[40px] h-[72px] noto-sans-tc-700 text-[16px] text-primary lg:text-[18px] relative hover:before:absolute hover:before:bottom-[6%] hover:before:left-[50%] hover:before:-translate-x-1/2 hover:before:content-['可借車輛'] hover:before:w-16 hover:before:text-secondary hover:before:text-xs lg:hover:before:text-sm">
                {item.sbi}
              </td>
              <td className="min-w-[80px] px-2 lg:px-[60px] xl:px-[90px] 2xl:px-[120px] h-[72px] noto-sans-tc-700 text-[16px] text-primary lg:text-[18px] relative hover:before:absolute hover:before:bottom-[6%] hover:before:left-[50%] hover:before:-translate-x-1/2 hover:before:content-['可還車輛'] hover:before:w-16 hover:before:text-secondary hover:before:text-xs lg:hover:before:text-sm">
                {item.bemp}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
