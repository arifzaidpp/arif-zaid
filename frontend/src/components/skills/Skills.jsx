import React from "react";
import SectionHeaders from "../sectionHeaders/SectionHeaders";

const Skills = () => {
  const skillsData = [
    {
      section: "Frontend Technologies",
      categories: [
        {
          category: "Markup Languages",
          skills: [
            { name: "HTML5", icon: "./skills/html5.png" },
            { name: "JSX", icon: "./skills/jsx.png" },
            { name: "HAML", icon: "./skills/haml.png" },
            { name: "Jade", icon: "./skills/jade.png" },
            { name: "Jekyll", icon: "./skills/jekyll.png" },
          ],
        },
        {
          category: "Stylesheets",
          skills: [
            { name: "CSS", icon: "./skills/css.png" },
            { name: "CSS3", icon: "./skills/css3.png" },
            { name: "SASS", icon: "./skills/sass.png" },
            { name: "Bootstrap", icon: "./skills/bootstrap.png" },
            { name: "Foundation", icon: "./skills/foundation.png" },
            { name: "Materialize", icon: "./skills/materialize.png" },
          ],
        },
        {
          category: "JavaScript Libraries/Frameworks",
          skills: [
            { name: "JavaScript", icon: "./skills/javascript.png" },
            { name: "React", icon: "./skills/react.png" },
            { name: "jQuery", icon: "./skills/jquery.png" },
            { name: "Angular", icon: "./skills/angular.png" },
            { name: "Ionic", icon: "./skills/ionic.png" },
          ],
        },
      ],
    },
    {
      section: "Backend Technologies",
      categories: [
        {
          category: "Languages and Frameworks",
          skills: [
            { name: "Node.js", icon: "./skills/node.png" },
            { name: "Ruby", icon: "./skills/ruby.png" },
            { name: "Rails", icon: "./skills/rails.png" },
          ],
        },
        {
          category: "Testing Frameworks",
          skills: [{ name: "Minitest", icon: "./skills/minitest.png" }],
        },
        {
          category: "Databases",
          skills: [
            { name: "PostgreSQL", icon: "./skills/postgresql.png" },
            { name: "MongoDB", icon: "./skills/mongodb.png" },
          ],
        },
      ],
    },
    {
      section: "Build Tools",
      categories: [
        {
          category: "Build Tools",
          skills: [
            { name: "Webpack", icon: "./skills/webpack.png" },
            { name: "Gulp", icon: "./skills/gulp.png" },
            { name: "Grunt", icon: "./skills/grunt.png" },
            { name: "Bower", icon: "./skills/bower.png" },
          ],
        },
      ],
    },
    {
      section: "Content Management Systems (CMS)",
      categories: [
        {
          category: "CMS",
          skills: [
            { name: "WordPress", icon: "./skills/wordpress.png" },
            { name: "Tumblr", icon: "./skills/tumblr.png" },
            { name: "Squarespace", icon: "./skills/squarespace.png" },
          ],
        },
      ],
    },
    {
      section: "Other Tools",
      categories: [
        {
          category: "Other Tools",
          skills: [
            { name: "GitHub", icon: "./skills/github.png" },
            { name: "Heroku", icon: "./skills/heroku.png" },
            { name: "Photoshop", icon: "./skills/photoshop.png" },
            { name: "Final Cut Pro", icon: "./skills/finalcutpro.png" },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <SectionHeaders section="Skills" />
      <div className="p-5 sm:p-10 lg:p-14 mx-auto bg-[url('./bg.png')]">
        {skillsData.map((techSection, index) => (
          <div key={index}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-6 underline">
              {techSection.section}
            </h2>

            {techSection.categories.map((category, idx) => (
              <div key={idx} className="w-full bg-white rounded-lg shadow-lg p-6 mb-8">
                <h4 className="text-xl md:text-2xl text-yellow-950 font-semibold mb-4">
                  {category.category}
                </h4>
                <hr className="border-t border-gray-400 my-4 w-[99%] relative mx-auto" />
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-7 gap-6">
                  {category.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg hover:bg-yellow-50 transition-all duration-300"
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-12 h-12 mb-2"
                      />
                      <p className="text-sm sm:text-base md:text-lg xl:text-xl text-gray-700 font-medium">
                        {skill.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Skills;
