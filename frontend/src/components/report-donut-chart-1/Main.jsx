import { Chart } from "@/base-components";
import { colors } from "@/utils";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { colorScheme as colorSchemeStore } from "@/stores/color-scheme";
import { darkMode as darkModeStore } from "@/stores/dark-mode";
import { useMemo } from "react";

function Main({
  width = "auto",
  height = "auto",
  className = "",
}) {
  const darkMode = useRecoilValue(darkModeStore);
  const colorScheme = useRecoilValue(colorSchemeStore);

  const chartData = [15, 10, 65];
  const chartColors = () => [
    colors.pending(0.9),
    colors.warning(0.9),
    colors.primary(0.9),
  ];
  
  const data = useMemo(() => ({
    labels: ["Yellow", "Dark"],
    datasets: [
      {
        data: chartData,
        backgroundColor: colorScheme ? chartColors() : "",
        hoverBackgroundColor: colorScheme ? chartColors() : "",
        borderWidth: 2,
        borderColor: darkMode ? colors.darkmode[700]() : colors.white,
      },
    ],
  }), [colorScheme, darkMode]);

  const options = useMemo(() => ({
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "83%",
  }), []);

  return (
    <Chart
      type="doughnut"
      width={width}
      height={height}
      data={data}
      options={options}
      className={className}
    />
  );
}

Main.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

export default Main;
