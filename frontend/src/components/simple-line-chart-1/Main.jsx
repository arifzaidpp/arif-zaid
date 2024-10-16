import { Chart } from "@/base-components";
import { colors } from "@/utils";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { colorScheme as colorSchemeStore } from "@/stores/color-scheme";
import { useMemo } from "react";

function Main({
  width = "auto",
  height = "auto",
  lineColor = "",
  className = "",
}) {
  const colorScheme = useRecoilValue(colorSchemeStore);

  const data = useMemo(() => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [0, 200, 250, 200, 500, 450, 850, 1050, 950, 1100, 900, 1200],
        borderWidth: 2,
        borderColor: colorScheme && lineColor.length ? lineColor : colors.primary(0.8),
        backgroundColor: "transparent",
        pointBorderColor: "transparent",
        tension: 0.4,
      },
    ],
  }), [colorScheme, lineColor]);

  const options = useMemo(() => ({
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  }), []);

  return (
    <Chart
      type="line"
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
  lineColor: PropTypes.string,
  className: PropTypes.string,
};

export default Main;
