import {
  Lucide,
  Tippy,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Litepicker,
  TinySlider,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import ReportLineChart from "@/components/report-line-chart/Main";
import ReportPieChart from "@/components/report-pie-chart/Main";
import ReportDonutChart from "@/components/report-donut-chart/Main";
import ReportDonutChart1 from "@/components/report-donut-chart-1/Main";
import SimpleLineChart1 from "@/components/simple-line-chart-1/Main";
import { useRef, useState } from "react";

function Main() {
  const [visitorsReportFilter, setVisitorsReportFilter] = useState();
  const importantNotesRef = useRef();
  const prevImportantNotes = () => {
    importantNotesRef.current.tns.goTo("prev");
  };
  const nextImportantNotes = () => {
    importantNotesRef.current.tns.goTo("next");
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 2xl:col-span-9">
        <div className="grid grid-cols-12 gap-6">
          {/* BEGIN: General Report */}
          <div className="col-span-12 mt-8">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                General Report
              </h2>
              <a href="" className="ml-auto flex items-center text-primary">
                <Lucide icon="RefreshCcw" className="w-4 h-4 mr-3" /> Reload
                Data
              </a>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="Waypoints"
                        className="report-box__icon text-primary"
                      />
                      <div className="ml-auto">
                        <Tippy
                          tag="div"
                          className="report-box__indicator bg-success cursor-pointer"
                          content="33% Higher than last month"
                        >
                          33%
                          <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      4.710
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Projects Completed
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="ChartColumn"
                        className="report-box__icon text-pending"
                      />
                      <div className="ml-auto">
                        <Tippy
                          tag="div"
                          className="report-box__indicator bg-danger cursor-pointer"
                          content="2% Lower than last month"
                        >
                          2%
                          <Lucide
                            icon="ChevronDown"
                            className="w-4 h-4 ml-0.5"
                          />
                        </Tippy>
                      </div>
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      3.721
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Skills Acquired
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="Medal"
                        className="report-box__icon text-warning"
                      />
                      <div className="ml-auto">
                        <Tippy
                          tag="div"
                          className="report-box__indicator bg-success cursor-pointer"
                          content="12% Higher than last month"
                        >
                          12%{" "}
                          <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      2.149
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Certificates Received
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="User"
                        className="report-box__icon text-success"
                      />
                      <div className="ml-auto">
                        <Tippy
                          tag="div"
                          className="report-box__indicator bg-success cursor-pointer"
                          content="22% Higher than last month"
                        >
                          22%{" "}
                          <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      152.040
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Unique Visitor
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report */}
          {/* BEGIN: Unique Visitors Report */}
<div className="col-span-12 lg:col-span-6 mt-8">
  <div className="intro-y block sm:flex items-center h-10">
    <h2 className="text-lg font-medium truncate mr-5">
      Unique Visitors Report
    </h2>
    <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
      <Lucide
        icon="Calendar"
        className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
        aria-hidden="true"
      />
      <Litepicker
        id="visitors-report-picker" // Added id
        name="visitorsReport" // Added name
        value={visitorsReportFilter}
        onChange={setVisitorsReportFilter}
        options={{
          autoApply: false,
          singleMode: false,
          numberOfColumns: 1,
          numberOfMonths: 1,
          showWeekNumbers: true,
          dropdowns: {
            minYear: 1990,
            maxYear: null,
            months: true,
            years: true,
          },
        }}
        className="form-control sm:w-56 box pl-10"
        aria-label="Select date range for unique visitors report" // Added accessibility label
      />
    </div>
  </div>
  <div className="intro-y box p-5 mt-12 sm:mt-5">
    <div className="flex flex-col md:flex-row md:items-center">
      <div className="flex">
        <div>
          <div className="text-primary dark:text-slate-300 text-lg xl:text-xl font-medium">
            120,000
          </div>
          <div className="mt-0.5 text-slate-500">This Month</div>
        </div>
        <div className="w-px h-12 border border-r border-dashed border-slate-200 dark:border-darkmode-300 mx-4 xl:mx-5"></div>
        <div>
          <div className="text-slate-500 text-lg xl:text-xl font-medium">
            90,000
          </div>
          <div className="mt-0.5 text-slate-500">Last Month</div>
        </div>
      </div>
      <Dropdown className="md:ml-auto mt-5 md:mt-0">
        <DropdownToggle className="btn btn-outline-secondary font-normal">
          Filter by Category
          <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
        </DropdownToggle>
        <DropdownMenu className="w-40" aria-label="Category filter options"> {/* Added aria-label */}
          <DropdownContent className="overflow-y-auto h-32">
            <DropdownItem>All Visitors</DropdownItem>
            <DropdownItem>Mobile Visitors</DropdownItem>
            <DropdownItem>Desktop Visitors</DropdownItem>
            <DropdownItem>Returning Visitors</DropdownItem>
            <DropdownItem>New Visitors</DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div className="report-chart">
      <ReportLineChart height={275} className="mt-6 -mb-6" />
    </div>
  </div>
</div>
{/* END: Unique Visitors Report */}



          {/* BEGIN: Top Projects */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Top Projects
              </h2>
              <a href="" className="ml-auto text-primary truncate">
                Show More
              </a>
            </div>
            <div className="intro-y box p-5 mt-5">
              <div className="mt-3">
                <ReportPieChart height={213} /> {/* Use the updated chart component */}
              </div>
              <div className="w-52 sm:w-auto mx-auto mt-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="truncate">Web Development</span>
                  <span className="font-medium ml-auto">40%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                  <span className="truncate">Mobile Development</span>
                  <span className="font-medium ml-auto">35%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                  <span className="truncate">Data Science</span>
                  <span className="font-medium ml-auto">25%</span>
                </div>
              </div>
            </div>
          </div>
          {/* END: Top Projects */}


          {/* BEGIN: Projects Report */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Projects Report
              </h2>
              <a href="" className="ml-auto text-primary truncate">
                Show More
              </a>
            </div>
            <div className="intro-y box p-5 mt-5">
              <div className="mt-3">
                <ReportDonutChart height={213} /> {/* Use the updated chart component */}
              </div>
              <div className="w-52 sm:w-auto mx-auto mt-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="truncate">Web Development</span>
                  <span className="font-medium ml-auto">50%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                  <span className="truncate">Mobile Development</span>
                  <span className="font-medium ml-auto">30%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                  <span className="truncate">Data Science</span>
                  <span className="font-medium ml-auto">20%</span>
                </div>
              </div>
            </div>
          </div>
          {/* END: Projects Report */}


          {/* BEGIN: Contact Info */}
          <div className="col-span-12 xl:col-span-8 mt-6">
            <div className="intro-y block sm:flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Contact Info
              </h2>
              <div className="flex items-center sm:ml-auto mt-3 sm:mt-0">
                <button className="btn box flex items-center text-slate-600 dark:text-slate-300">
                  <Lucide
                    icon="Pencil"
                    className="hidden sm:block w-4 h-4 mr-2"
                  />
                  Edit
                </button>
              </div>
            </div>
            <div className="intro-y box p-5 mt-12 sm:mt-5">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex-1">
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <Lucide icon="MapPin" className="w-6 h-6 text-gray-500 mr-3" />
                      <span className="flex-1">Address: 123 Main St, Anytown, USA</span>
                    </li>
                    <li className="flex items-center">
                      <Lucide icon="Phone" className="w-6 h-6 text-gray-500 mr-3" />
                      <span className="flex-1">Phone: (123) 456-7890</span>
                    </li>
                    <li className="flex items-center">
                      <Lucide icon="Mail" className="w-6 h-6 text-gray-500 mr-3" />
                      <span className="flex-1">Email: example@gmail.com</span>
                    </li>
                    <li className="flex items-center">
                      <Lucide icon="Globe" className="w-6 h-6 text-gray-500 mr-3" />
                      <span className="flex-1">Website: www.example.com</span>
                    </li>
                  </ul>
                </div>
                {/* BEGIN: Social Media Links */}
                <div className="mt-5 md:mt-0 md:ml-5 md:w-[40%]">
                  <div className="intro-y mb-3">
                    <a
                      href="https://www.linkedin.com/in/example"
                      className="zoom-in flex items-center p-3 text-base text-[#1e293b] rounded-lg bg-[#f1f5f9] group hover:shadow dark:bg-[#313e5e] dark:text-[#cbd5e1] font-medium mb-2"
                    >
                      <Lucide icon="Linkedin" className="w-6 h-6 text-primary mr-3" />
                      <span className="flex-1 ms-3 whitespace-nowrap">LinkedIn</span>
                    </a>
                  </div>

                  <div className="intro-y mb-3">
                    <a
                      href="https://www.behance.net/example"
                      className="zoom-in flex items-center p-3 text-base text-[#1e293b] rounded-lg bg-[#f1f5f9] group hover:shadow dark:bg-[#313e5e] dark:text-[#cbd5e1] font-medium mb-2"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 576 512"
                        className="text-pending hover:text-blue-500 transition duration-200 w-6 h-6 mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z"></path>
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Behance</span>
                    </a>
                  </div>

                  <div className="intro-y mb-3">
                    <a
                      href="https://github.com/example"
                      className="zoom-in flex items-center p-3 text-base text-[#1e293b] rounded-lg bg-[#f1f5f9] group hover:shadow dark:bg-[#313e5e] dark:text-[#cbd5e1] font-medium mb-2"
                    >
                      <Lucide icon="Github" className="w-6 h-6 text-primary mr-3" />
                      <span className="flex-1 ms-3 whitespace-nowrap">GitHub</span>
                    </a>
                  </div>

                  <div className="intro-y mb-3">
                    <a
                      href="https://www.instagram.com/example"
                      className="zoom-in flex items-center p-3 text-base text-[#1e293b] rounded-lg bg-[#f1f5f9] group hover:shadow dark:bg-[#313e5e] dark:text-[#cbd5e1] font-medium mb-2"
                    >
                      <Lucide icon="Instagram" className="w-6 h-6 text-pink-500 mr-3" />
                      <span className="flex-1 ms-3 whitespace-nowrap">Instagram</span>
                    </a>
                  </div>

                  <div className="intro-y">
                    <a
                      href="https://www.facebook.com/example"
                      className="zoom-in flex items-center p-3 text-base text-[#1e293b] rounded-lg bg-[#f1f5f9] group hover:shadow dark:bg-[#313e5e] dark:text-[#cbd5e1] font-medium"
                    >
                      <Lucide icon="Facebook" className="w-6 h-6 text-blue-600 mr-3" />
                      <span className="flex-1 ms-3 whitespace-nowrap">Facebook</span>
                    </a>
                  </div>
                </div>
                {/* END: Social Media Links */}



              </div>
            </div>
          </div>
          {/* END: Contact Info */}

          {/* BEGIN: New Users */}
          <div className="col-span-12 xl:col-span-4 mt-6">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                New Users
              </h2>
            </div>
            <div className="mt-5">
              {$_.take($f(), 4).map((faker, fakerKey) => (
                <div key={fakerKey} className="intro-y">
                  <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                    <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        src={faker.photos[0]}
                      />
                    </div>
                    <div className="ml-4 mr-auto">
                      <div className="font-medium">{faker.users[0].name}</div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {faker.dates[0]}
                      </div>
                    </div>
                    <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                      1h ago
                    </div>
                  </div>
                </div>
              ))}
              <a
                href=""
                className="intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
              >
                View More
              </a>
            </div>
          </div>
          {/* END: Weekly Best Sellers */}
          {/* BEGIN: General Report */}
          <div className="col-span-12 grid grid-cols-12 gap-6 mt-8">
            <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
              <div className="box p-5 zoom-in">
                <div className="flex items-center">
                  <div className="w-2/4 flex-none">
                    <div className="text-lg font-medium truncate">
                      New Projects
                    </div>
                    <div className="text-slate-500 mt-1">300 Sales</div>
                  </div>
                  <div className="flex-none ml-auto relative">
                    <ReportDonutChart1 width={90} height={90} />
                    <div className="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">
                      20%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
              <div className="box p-5 zoom-in">
                <div className="flex">
                  <div className="text-lg font-medium truncate mr-3">
                    Social Media
                  </div>
                  <div className="py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate">
                    320 Followers
                  </div>
                </div>
                <div className="mt-1">
                  <SimpleLineChart1 height={58} className="-ml-1" />
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
              <div className="box p-5 zoom-in">
                <div className="flex items-center">
                  <div className="w-2/4 flex-none">
                    <div className="text-lg font-medium truncate">
                      New Skills
                    </div>
                    <div className="text-slate-500 mt-1">1450 Products</div>
                  </div>
                  <div className="flex-none ml-auto relative">
                    <ReportDonutChart1 width={90} height={90} />
                    <div className="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">
                      45%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
              <div className="box p-5 zoom-in">
                <div className="flex">
                  <div className="text-lg font-medium truncate mr-3">
                    Posted Ads
                  </div>
                  <div className="py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate">
                    180 Campaign
                  </div>
                </div>
                <div className="mt-1">
                  <SimpleLineChart1 height={58} className="-ml-1" />
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report */}
          {/* BEGIN: Weekly Top Products */}
<div className="col-span-12 mt-6">
  <div className="intro-y block sm:flex items-center h-10">
    <h2 className="text-lg font-medium truncate mr-5">
      Certificates Received
    </h2>
    <div className="flex items-center sm:ml-auto mt-3 sm:mt-0">
      <button className="btn box flex items-center text-slate-600 dark:text-slate-300">
        <Lucide
          icon="Eye"
          className="hidden sm:block w-4 h-4 mr-2"
        />
        View All
      </button>
    </div>
  </div>
  <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
    <table className="table table-report sm:mt-2">
      <thead>
        <tr>
          <th className="whitespace-nowrap uppercase">IMAGE</th>
          <th className="whitespace-nowrap uppercase">Certificate NAME</th>
          <th className="text-center whitespace-nowrap uppercase">Category</th>
          <th className="text-center whitespace-nowrap uppercase">Date</th>
          <th className="text-center whitespace-nowrap uppercase">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {$_.take($f(), 4).map((faker, fakerKey) => (
          <tr key={fakerKey} className="intro-x">
            <td className="w-40">
              <div className="flex">
                <div className="w-10 h-10 image-fit zoom-in">
                  <Tippy
                    tag="img"
                    alt="Midone Tailwind HTML Admin Template"
                    className="rounded-full"
                    src={faker.images[0]}
                    content={`Uploaded at ${faker.dates[0]}`}
                  />
                </div>
              </div>
            </td>
            <td>
              <a href="" className="font-medium whitespace-nowrap">
                {faker.products[0].name}
              </a>
            </td>
            <td className="text-center">{faker.products[0].category}</td>
            <td className="w-40">
              <div
                className="flex items-center justify-center"
              >
                {faker.dates[0]}
              </div>
            </td>
            <td className="table-report__action w-56">
              <div className="flex justify-center items-center">
                <a className="flex items-center mr-3" href="">
                  <Lucide
                    icon="CheckSquare"
                    className="w-4 h-4 mr-1"
                  />
                  Edit
                </a>
                <a className="flex items-center text-danger" href="">
                  <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                  Delete
                </a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3">
    <nav className="w-full sm:w-auto sm:mr-auto">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#">
            <Lucide icon="ChevronsLeft" className="w-4 h-4" />
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            <Lucide icon="ChevronLeft" className="w-4 h-4" />
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            ...
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item active">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            ...
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            <Lucide icon="ChevronRight" className="w-4 h-4" />
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            <Lucide icon="ChevronsRight" className="w-4 h-4" />
          </a>
        </li>
      </ul>
    </nav>
    <select id="certificates-per-page" name="certificatesPerPage" className="w-20 form-select box mt-3 sm:mt-0">
      <option>10</option>
      <option>25</option>
      <option>35</option>
      <option>50</option>
    </select>
  </div>
</div>
{/* END: Weekly Top Products */}

        </div>
      </div>
      <div className="col-span-12 2xl:col-span-3">
        <div className="2xl:border-l -mb-10 pb-10">
          <div className="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
            {/* BEGIN: Transactions */}
            <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3 2xl:mt-8">
              <div className="intro-x flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Transactions
                </h2>
              </div>
              <div className="mt-5">
                {$_.take($f(), 5).map((faker, fakerKey) => (
                  <div key={fakerKey} className="intro-x">
                    <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                      <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                        <img
                          alt="Midone Tailwind HTML Admin Template"
                          src={faker.photos[0]}
                        />
                      </div>
                      <div className="ml-4 mr-auto">
                        <div className="font-medium">{faker.users[0].name}</div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          {faker.dates[0]}
                        </div>
                      </div>
                      <div
                        className={classnames({
                          "text-success": faker.trueFalse[0],
                          "text-danger": !faker.trueFalse[0],
                        })}
                      >
                        {faker.trueFalse[0] ? "+" : "-"}${faker.totals[0]}
                      </div>
                    </div>
                  </div>
                ))}
                <a
                  href=""
                  className="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                >
                  View More
                </a>
              </div>
            </div>
            {/* END: Transactions */}
            {/* BEGIN: Recent Activities */}
            <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
              <div className="intro-x flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Recent Activities
                </h2>
                <a href="" className="ml-auto text-primary truncate">
                  Show More
                </a>
              </div>
              <div className="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5">
                <div className="intro-x relative flex items-center mb-3">
                  <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        src={$f()[9].photos[0]}
                      />
                    </div>
                  </div>
                  <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">{$f()[9].users[0].name}</div>
                      <div className="text-xs text-slate-500 ml-auto">
                        07:00 PM
                      </div>
                    </div>
                    <div className="text-slate-500 mt-1">
                      Has joined the team
                    </div>
                  </div>
                </div>
                <div className="intro-x relative flex items-center mb-3">
                  <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        src={$f()[8].photos[0]}
                      />
                    </div>
                  </div>
                  <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">{$f()[8].users[0].name}</div>
                      <div className="text-xs text-slate-500 ml-auto">
                        07:00 PM
                      </div>
                    </div>
                    <div className="text-slate-500">
                      <div className="mt-1">Added 3 new photos</div>
                      <div className="flex mt-2">
                        <Tippy
                          tag="div"
                          className="w-8 h-8 image-fit mr-1 zoom-in"
                          content={$f()[0].products[0].name}
                        >
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="rounded-md border border-white"
                            src={$f()[8].images[0]}
                          />
                        </Tippy>
                        <Tippy
                          tag="div"
                          className="w-8 h-8 image-fit mr-1 zoom-in"
                          content={$f()[1].products[0].name}
                        >
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="rounded-md border border-white"
                            src={$f()[8].images[1]}
                          />
                        </Tippy>
                        <Tippy
                          tag="div"
                          className="w-8 h-8 image-fit mr-1 zoom-in"
                          content={$f()[2].products[0].name}
                        >
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="rounded-md border border-white"
                            src={$f()[8].images[2]}
                          />
                        </Tippy>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="intro-x text-slate-500 text-xs text-center my-4">
                  12 November
                </div>
                <div className="intro-x relative flex items-center mb-3">
                  <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        src={$f()[7].photos[0]}
                      />
                    </div>
                  </div>
                  <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">{$f()[7].users[0].name}</div>
                      <div className="text-xs text-slate-500 ml-auto">
                        07:00 PM
                      </div>
                    </div>
                    <div className="text-slate-500 mt-1">
                      Has changed{" "}
                      <a className="text-primary" href="">
                        {$f()[7].products[0].name}
                      </a>{" "}
                      price and description
                    </div>
                  </div>
                </div>
                <div className="intro-x relative flex items-center mb-3">
                  <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        src={$f()[6].photos[0]}
                      />
                    </div>
                  </div>
                  <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">{$f()[6].users[0].name}</div>
                      <div className="text-xs text-slate-500 ml-auto">
                        07:00 PM
                      </div>
                    </div>
                    <div className="text-slate-500 mt-1">
                      Has changed{" "}
                      <a className="text-primary" href="">
                        {$f()[6].products[0].name}
                      </a>{" "}
                      description
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END: Recent Activities */}
            {/* BEGIN: Important Notes */}
            <div className="col-span-12 md:col-span-6 xl:col-span-12 xl:col-start-1 xl:row-start-1 2xl:col-start-auto 2xl:row-start-auto mt-3">
              <div className="intro-x flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-auto">
                  Important Notes
                </h2>
                <button
                  data-carousel="important-notes"
                  data-target="prev"
                  className="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"
                  onClick={prevImportantNotes}
                >
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </button>
                <button
                  data-carousel="important-notes"
                  data-target="next"
                  className="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"
                  onClick={nextImportantNotes}
                >
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-5 intro-x">
                <div className="box zoom-in">
                  <TinySlider
                    getRef={(el) => {
                      importantNotesRef.current = el;
                    }}
                  >
                    <div className="p-5">
                      <div className="text-base font-medium truncate">
                        Lorem Ipsum is simply dummy text
                      </div>
                      <div className="text-slate-400 mt-1">20 Hours ago</div>
                      <div className="text-slate-500 text-justify mt-1">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                      </div>
                      <div className="font-medium flex mt-5">
                        <button
                          type="button"
                          className="btn btn-secondary py-1 px-2"
                        >
                          View Notes
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary py-1 px-2 ml-auto"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-base font-medium truncate">
                        Lorem Ipsum is simply dummy text
                      </div>
                      <div className="text-slate-400 mt-1">20 Hours ago</div>
                      <div className="text-slate-500 text-justify mt-1">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                      </div>
                      <div className="font-medium flex mt-5">
                        <button
                          type="button"
                          className="btn btn-secondary py-1 px-2"
                        >
                          View Notes
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary py-1 px-2 ml-auto"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-base font-medium truncate">
                        Lorem Ipsum is simply dummy text
                      </div>
                      <div className="text-slate-400 mt-1">20 Hours ago</div>
                      <div className="text-slate-500 text-justify mt-1">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                      </div>
                      <div className="font-medium flex mt-5">
                        <button
                          type="button"
                          className="btn btn-secondary py-1 px-2"
                        >
                          View Notes
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary py-1 px-2 ml-auto"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </TinySlider>
                </div>
              </div>
            </div>
            {/* END: Important Notes */}
            {/* BEGIN: Schedules */}
            <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto mt-3">
              <div className="intro-x flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">Schedules</h2>
                <a
                  href=""
                  className="ml-auto text-primary truncate flex items-center"
                >
                  <Lucide icon="Plus" className="w-4 h-4 mr-1" /> Add New
                  Schedules
                </a>
              </div>
              <div className="mt-5">
                <div className="intro-x box">
                  <div className="p-5">
                    <div className="flex">
                      <Lucide
                        icon="ChevronLeft"
                        className="w-5 h-5 text-slate-500"
                      />
                      <div className="font-medium text-base mx-auto">April</div>
                      <Lucide
                        icon="ChevronRight"
                        className="w-5 h-5 text-slate-500"
                      />
                    </div>
                    <div className="grid grid-cols-7 gap-4 mt-5 text-center">
                      <div className="font-medium">Su</div>
                      <div className="font-medium">Mo</div>
                      <div className="font-medium">Tu</div>
                      <div className="font-medium">We</div>
                      <div className="font-medium">Th</div>
                      <div className="font-medium">Fr</div>
                      <div className="font-medium">Sa</div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        29
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        30
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        31
                      </div>
                      <div className="py-0.5 rounded relative">1</div>
                      <div className="py-0.5 rounded relative">2</div>
                      <div className="py-0.5 rounded relative">3</div>
                      <div className="py-0.5 rounded relative">4</div>
                      <div className="py-0.5 rounded relative">5</div>
                      <div className="py-0.5 bg-success/20 dark:bg-success/30 rounded relative">
                        6
                      </div>
                      <div className="py-0.5 rounded relative">7</div>
                      <div className="py-0.5 bg-primary text-white rounded relative">
                        8
                      </div>
                      <div className="py-0.5 rounded relative">9</div>
                      <div className="py-0.5 rounded relative">10</div>
                      <div className="py-0.5 rounded relative">11</div>
                      <div className="py-0.5 rounded relative">12</div>
                      <div className="py-0.5 rounded relative">13</div>
                      <div className="py-0.5 rounded relative">14</div>
                      <div className="py-0.5 rounded relative">15</div>
                      <div className="py-0.5 rounded relative">16</div>
                      <div className="py-0.5 rounded relative">17</div>
                      <div className="py-0.5 rounded relative">18</div>
                      <div className="py-0.5 rounded relative">19</div>
                      <div className="py-0.5 rounded relative">20</div>
                      <div className="py-0.5 rounded relative">21</div>
                      <div className="py-0.5 rounded relative">22</div>
                      <div className="py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative">
                        23
                      </div>
                      <div className="py-0.5 rounded relative">24</div>
                      <div className="py-0.5 rounded relative">25</div>
                      <div className="py-0.5 rounded relative">26</div>
                      <div className="py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative">
                        27
                      </div>
                      <div className="py-0.5 rounded relative">28</div>
                      <div className="py-0.5 rounded relative">29</div>
                      <div className="py-0.5 rounded relative">30</div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        1
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        2
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        3
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        4
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        5
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        6
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        7
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        8
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        9
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-slate-200/60 p-5">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                      <span className="truncate">UI/UX Workshop</span>
                      <span className="font-medium xl:ml-auto">23th</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="truncate">
                        VueJs Frontend Development
                      </span>
                      <span className="font-medium xl:ml-auto">10th</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                      <span className="truncate">Laravel Rest API</span>
                      <span className="font-medium xl:ml-auto">31th</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END: Schedules */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
