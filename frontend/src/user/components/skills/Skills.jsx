import React from "react";
import SectionHeaders from "../sectionHeaders/SectionHeaders";
import useGetAllSkills from "../../../hooks/skill/useGetAllSkills";

const Skills = () => {
  // Get all skills from the API
  const { skills, loading, error } = useGetAllSkills();

  const rearrangeSkillsData = (skills) => {
    const skillsData = [];
  
    skills.forEach((skill) => {
      const sectionIndex = skillsData.findIndex(
        (s) => s.section === skill.section
      );
  
      if (sectionIndex === -1) {
        // If the section does not exist, create a new one
        skillsData.push({
          section: skill.section,
          categories: [
            {
              category: skill.category,
              skills: [
                { name: skill.name, icon: skill.image }, // Use the image URL as the icon
              ],
            },
          ],
        });
      } else {
        // If the section exists, find or add the category
        const categoryIndex = skillsData[sectionIndex].categories.findIndex(
          (c) => c.category === skill.category
        );
  
        if (categoryIndex === -1) {
          // If the category does not exist, create a new one
          skillsData[sectionIndex].categories.push({
            category: skill.category,
            skills: [{ name: skill.name, icon: skill.image }],
          });
        } else {
          // If the category exists, add the skill to the category
          skillsData[sectionIndex].categories[categoryIndex].skills.push({
            name: skill.name,
            icon: skill.image,
          });
        }
      }
    });
  
    return skillsData;
  };
  
  // Example usage:=
    const skillsData = rearrangeSkillsData(skills);

  return (
    <>
      <SectionHeaders section="Skills" />
      <div className="p-5 sm:p-10 lg:p-14 mx-auto bg-[url('./src/assets/bg.png')]">
        {skillsData.map((techSection, index) => (
          <div key={index}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-6 underline">
              {techSection.section}
            </h2>

            {techSection.categories.map((category, idx) => (
              <div key={idx} className="w-full bg-white rounded-lg shadow-lg p-6 mb-8">
                <h4 className="text-xl md:text-2xl text-yellow-950 font-medium mb-4">
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
                        className="max-w-16 w-auto h-12 mb-2"
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
