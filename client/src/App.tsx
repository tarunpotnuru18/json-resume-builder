import React, { useEffect, useState } from "react";

import type {
  TResumeSchema,
  TBasicSchema,
  TWorkSchema,
  TEducationSchema,
  TVolunteerSchema,
} from "./Schema";
import BasicSection from "./Components/BasicSection";
import WorkSection from "./Components/WorkSection";
import VolunteerSection from "./Components/VolunteerSection";

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
    volunteer: [
      {
        organization: "",
        position: "",
        url: "",
        startDate: "",
        endDate: "",
        summary: "",
        highlights: [""],
      },
    ],
    education: [
      {
        institution: "",
        url: "",
        area: "",
        studyType: "",
        startDate: "",
        endDate: "",
        score: "",
        courses: [""],
      },
    ],
    awards: [
      {
        title: "",
        date: "",
        awarder: "",
        summary: "",
      },
    ],
    certificates: [
      {
        name: "",
        date: "",
        issuer: "",
        url: "",
      },
    ],
    publications: [
      {
        name: "",
        publisher: "",
        releaseDate: "",
        url: "",
        summary: "",
      },
    ],
    skills: [
      {
        name: "",
        level: "",
        keywords: [""],
      },
    ],
    languages: [
      {
        language: "",
        fluency: "",
      },
    ],
    interests: [
      {
        name: "",
        keywords: [""],
      },
    ],
    references: [
      {
        name: "",
        reference: "",
      },
    ],
    projects: [
      {
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        highlights: [""],
        url: "",
      },
    ],
  });

  const [basicData, setBasic] = useState<TBasicSchema>(formData.basics);
  const [workData, setWork] = useState<TWorkSchema>(formData.work);
  const [volunteerData, setVolunteer] = useState<TVolunteerSchema>(
    formData.volunteer
  );
  const [educationData, setEducation] = useState<TEducationSchema>(
    formData.education
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

  return (
    <div className="w-full  py-[20px] px-[20px] ">
      <div className="max-w-4xl mx-auto">
        <BasicSection initalBasicData={basicData} setBasicData={setBasic} />
        <WorkSection intialWorkData={workData} setWorkData={setWork} />
        <VolunteerSection
          intialVolunteerData={volunteerData}
          setVolunteerData={setVolunteer}
        />
      </div>
    </div>
  );
}

export default App;
