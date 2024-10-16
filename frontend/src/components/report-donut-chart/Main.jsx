import { Chart } from "@/base-components";
import { colors } from "@/utils";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { colorScheme as colorSchemeStore } from "@/stores/color-scheme";
import { darkMode as darkModeStore } from "@/stores/dark-mode";
import { useMemo } from "react";

function ProjectsReportDonutChart({
  width = "auto",
  height = "auto",
  className = "",
}) {
  const darkMode = useRecoilValue(darkModeStore);
  const colorScheme = useRecoilValue(colorSchemeStore);

  const chartData = [50, 30, 20]; // Adjusted percentages for each project type

  const chartColors = () => [
    colors.primary(0.9),  // Web Development
    colors.pending(0.9),  // Mobile Development
    colors.warning(0.9),  // Data Science
  ];

  const data = useMemo(() => {
    return {
      labels: ["Web Development", "Mobile Development", "Data Science"], // Updated labels
      datasets: [
        {
          data: chartData,
          backgroundColor: colorScheme ? chartColors() : "",
          hoverBackgroundColor: colorScheme ? chartColors() : "",
          borderWidth: 5,
          borderColor: darkMode ? colors.darkmode[700]() : colors.white,
        },
      ],
    };
  }, [colorScheme, darkMode]);

  const options = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      cutout: "80%", // Creates the donut effect
    };
  }, []);

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

ProjectsReportDonutChart.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

export default ProjectsReportDonutChart;
