import React, { useEffect, useState } from "react";

import type {
  TResumeSchema,
  TBasicSchema,
  TWorkSchema,
  TEducationSchema,
  TVolunteerSchema,
  TAwardsSchema,
  TCertificatesSchema,
  TInterestsSchema,
  TLanguagesSchema,
  TProjectsSchema,
  TPublicationsSchema,
  TReferencesSchema,
  TSkillsSchema,
} from "./Schema";
import BasicSection from "./Components/BasicSection";
import WorkSection from "./Components/WorkSection";
import VolunteerSection from "./Components/VolunteerSection";
import EducationSection from "./Components/EducationSection";
import AwardsSection from "./Components/AwardsSection";
import CertificatesSection from "./Components/CertificatesSection";
import PublicationsSection from "./Components/PublicationsSection";
import SkillsSection from "./Components/SkillsSection";
import LanguagesSection from "./Components/LanguagesSection";
import InterestsSection from "./Components/InterestsSection";
import ReferencesSection from "./Components/ReferencesSection";
import ProjectsSection from "./Components/ProjectsSection";

function App() {
  const [formData, setFormData] = useState<TResumeSchema>({
    basics: {
      name: "",
      label: "",
      image: "",
      email: "",
      phone: "",
      url: "",
      summary: "",
      location: {
        address: "",
        postalCode: "",
        city: "",
        countryCode: "",
        region: "",
      },
      profiles: [],
    },
    work: [],
    volunteer: [],
    education: [],
    awards: [],
    certificates: [],
    publications: [],
    skills: [],
    languages: [],
    interests: [],
    references: [],
    projects: [],
  });

  const [basicData, setBasic] = useState<TBasicSchema>(formData.basics);
  const [workData, setWork] = useState<TWorkSchema>(formData.work);
  const [volunteerData, setVolunteer] = useState<TVolunteerSchema>(
    formData.volunteer
  );
  const [educationData, setEducation] = useState<TEducationSchema>(
    formData.education
  );
  const [awardsData, setAwards] = useState<TAwardsSchema>(
    formData.awards
  );
  const [certificatesData, setCertificates] = useState<TCertificatesSchema>(
    formData.certificates
  );
  const [publicationsData, setPublications] = useState<TPublicationsSchema>(
    formData.publications
  );
  const [skillsData, setSkills] = useState<TSkillsSchema>(
    formData.skills
  );
  const [languagesData, setLanguages] = useState<TLanguagesSchema>(
    formData.languages
  );
  const [interestsData, setInterests] = useState<TInterestsSchema>(
    formData.interests
  );
  const [referencesData, setReferences] = useState<TReferencesSchema>(
    formData.references
  );
  const [projectsData, setProjects] = useState<TProjectsSchema>(
    formData.projects
  );

  useEffect(() => {
    console.log("form data from use effect", formData);
  }, [formData]);

  useEffect(() => {
    console.log("changes done on basic Section", basicData);
  }, [basicData]);

  useEffect(() => {
    console.log("changes done on work Section", workData);
  }, [workData]);

  useEffect(() => {
    console.log("changes done on volunteer Section", volunteerData);
  }, [volunteerData]);

  useEffect(() => {
    console.log("changes done on education Section", educationData);
  }, [educationData]);

  useEffect(() => {
    console.log("changes done on awards Section", awardsData);
  }, [awardsData]);

  useEffect(() => {
    console.log("changes done on certificates Section", certificatesData);
  }, [certificatesData]);

  useEffect(() => {
    console.log("changes done on publications Section", publicationsData);
  }, [publicationsData]);

  useEffect(() => {
    console.log("changes done on skills Section", skillsData);
  }, [skillsData]);

  useEffect(() => {
    console.log("changes done on languages Section", languagesData);
  }, [languagesData]);

  useEffect(() => {
    console.log("changes done on interests Section", interestsData);
  }, [interestsData]);

  useEffect(() => {
    console.log("changes done on references Section", referencesData);
  }, [referencesData]);

  useEffect(() => {
    console.log("changes done on projects Section", projectsData);
  }, [projectsData]);

  return (
    <div className="w-full  py-[20px] px-[20px] ">
      <div className="max-w-4xl mx-auto">
        <BasicSection initalBasicData={basicData} setBasicData={setBasic} />
        <WorkSection intialWorkData={workData} setWorkData={setWork} />
        <VolunteerSection
          intialVolunteerData={volunteerData}
          setVolunteerData={setVolunteer}
        />
        <EducationSection
          intialEducationData={educationData}
          setEducationData={setEducation}
        />
        <AwardsSection
          intialAwardsData={awardsData}
          setAwardsData={setAwards}
        />
        <CertificatesSection
          intialCertificatesData={certificatesData}
          setCertificatesData={setCertificates}
        />
        <PublicationsSection
          intialPublicationsData={publicationsData}
          setPublicationsData={setPublications}
        />
        <SkillsSection
          intialSkillsData={skillsData}
          setSkillsData={setSkills}
        />
        <LanguagesSection
          intialLanguagesData={languagesData}
          setLanguagesData={setLanguages}
        />
        <InterestsSection
          intialInterestsData={interestsData}
          setInterestsData={setInterests}
        />
        <ReferencesSection
          intialReferencesData={referencesData}
          setReferencesData={setReferences}
        />
        <ProjectsSection
          intialProjectsData={projectsData}
          setProjectsData={setProjects}
        />
      </div>
    </div>
  );
}

export default App;