import React, { useEffect, useState } from "react";

import { convert } from "@catalystic/json-to-yaml";
import { ResumeZodSchema } from "./Schema";
import { Toaster } from "sonner";
import { toast } from "sonner";
import Editor from "@monaco-editor/react";
import { z } from "zod";
let milindBro = {
  meta: {
    theme: "jsonresume-theme-stackoverflow",
  },
  basics: {
    name: "Milind Kumar Mishra",
    label: "Product Engineer",
    email: "milindmishra.work@gmail.com",
    phone: "+919631333128",
    url: "https://milindmishra.com",
    summary:
      "Product-focused engineer with full-stack expertise, passionate about building impactful AI, SaaS, and platform products. Proven experience founding and leading technical initiatives, shipping scalable web applications, and optimizing UX for thousands of users. Adept at rapid prototyping, collaborating across disciplines, and taking products from zero-to-one. Skilled in TypeScript, React/Next.js, and cloud infra, with a track record of accelerating hiring, analytics, and real-time systems for startups and global teams.",
    location: {
      address: "Zolo Darren, BTM Layout",
      postalCode: "560034",
      city: "Bengaluru",
      countryCode: "IN",
      region: "Karnataka",
    },
    profiles: [
      {
        network: "LinkedIn",
        username: "mishramilind",
        url: "https://linkedin.com/in/mishramilind",
      },
      {
        network: "GitHub",
        username: "thatbeautifuldream",
        url: "https://github.com/thatbeautifuldream",
      },
      {
        network: "X",
        username: "milindmishra_",
        url: "https://x.com/milindmishra_",
      },
      {
        network: "YouTube",
        username: "milindmishra",
        url: "https://youtube.com/milindmishra",
      },
    ],
  },
  work: [
    {
      name: "Merlin AI by Foyer",
      location: "Bengaluru, Karnataka, India",
      position: "Product Engineer",
      url: "https://getmerlin.in",
      startDate: "2025-02-01",
      summary:
        "Driving product engineering initiatives for Merlin AI, focused on seamless AI integration and next-gen chat experiences.",
      highlights: [
        "Shipped ChatGPT Imports UI, enabling 10,000+ users to migrate chat history smoothly.",
        "Launched project-based chat history pages, improving user navigation and increasing session retention by 15%.",
        "Revamped the Model Selector, boosting model adoption by 80% and improving user satisfaction scores by 30%.",
        "Led development of a prompt enhancement feature, improving real-time UX for 2M+ users by bridging backend streaming with a responsive frontend.",
      ],
    },
    {
      name: "SARAL - The Influencer OS",
      location: "Bengaluru, Karnataka, India",
      position: "Software Engineer",
      url: "https://getsaral.com",
      startDate: "2025-01-01",
      endDate: "2025-02-01",
      summary:
        "Built core features and internal tools improving efficiency and decision-making for influencer campaigns.",
      highlights: [
        "Delivered revamped dashboard—reduced onboarding and insight delivery time by 30%.",
        "Engineered a multi-select drag-and-drop feature for campaign management, increasing ops efficiency by 40% for large-scale campaigns.",
        "Built a content submission system to streamline influencer-brand collaboration, reducing content approval times by 60%.",
        "Enhanced real-time campaign metric tracking, empowering managers with data to improve campaign ROI by up to 20%.",
      ],
    },
    {
      name: "Proof-of-Skill Protocol",
      location: "Bengaluru, Karnataka, India",
      position: "Founding Product Engineer",
      url: "https://proofofskill.org",
      startDate: "2024-06-01",
      endDate: "2024-12-31",
      summary:
        "Architected and launched a decentralized skill validation protocol, revolutionizing unbiased, transparent candidate evaluation for tech hiring.",
      highlights: [
        "Led MVP development for validators, candidates, and recruiters.",
        "Designed and implemented a voting-based consensus algorithm to ensure fair and transparent skill validation across a network of 150+ validators.",
        "Built proctored assessment workflow with real-time streaming, cutting time-to-interview by 50%.",
        "Launched recruiter dashboard with skill heatmaps, driving smarter hiring for 20+ partners.",
        "Scaled cloud infra (EC2, NGINX, PM2, Next.js) to support 5000+ actions on the platform.",
      ],
    },
    {
      name: "Freelance",
      location: "Bengaluru, Karnataka, India",
      position: "Independent Contractor",
      url: "https://milindmishra.com",
      startDate: "2024-02-01",
      endDate: "2024-05-31",
      summary:
        "Delivered AI-powered products for hiring and skills validation as an independent engineer.",
      highlights: [
        "Built recruiter analytics platform with advanced candidate search.",
        "Engineered an AI-powered quiz system with Vercel AI SDK and OpenAI.",
        "Deployed scalable Next.js UIs with AI workflow integration.",
      ],
    },
    {
      name: "StartupHire",
      location: "Remote",
      position: "Software Engineer",
      url: "https://www.linkedin.com/company/startuphire",
      startDate: "2023-08-01",
      endDate: "2024-01-31",
      summary:
        "Prototyped and launched candidate pipeline tools to accelerate startup hiring workflows.",
      highlights: [
        "Led team to prototype recruiting pipeline, reducing manual work for hiring managers by 40%.",
        "Integrated multiple job boards into a unified platform, saving recruiters an average of 5 hours per week.",
      ],
    },
    {
      name: "National Yang Ming Chiao Tung University",
      location: "Hsinchu, Taiwan",
      position: "Research Assistant",
      url: "https://www.nycu.edu.tw/",
      startDate: "2023-02-01",
      endDate: "2023-07-31",
      summary:
        "Built and optimized indoor positioning system interfaces for a cutting-edge IoT research project.",
      highlights: [
        "Developed a frontend for an MQTT-powered indoor positioning platform to visualize real-time data from IoT devices.",
        "Enhanced UWB positioning accuracy from 20cm to under 10cm—significantly improving research outcomes.",
        "Enabled 3D real-time visualization of tracking data for production ready factories and research labs.",
      ],
    },
    {
      name: "Locus Connect",
      location: "Hsinchu, Taiwan",
      position: "Software Engineer",
      url: "https://www.locusconnect.com/",
      startDate: "2022-07-01",
      endDate: "2023-01-31",
      summary:
        "Developed core 3D visualization and internal infra tools for proprietary IoT positioning solutions.",
      highlights: [
        "Produced frontend for 3D positioning platform, supporting live deployments.",
        "Created and maintained the marketing site for B2B outreach.",
        "Dockerized and maintained internal services, achieving 99.9% uptime and cutting deployment times by 80%.",
      ],
    },
    {
      name: "iNeuron.ai",
      location: "Bengaluru, Karnataka, India",
      position: "UX Designer",
      url: "https://www.ineuron.ai/",
      startDate: "2022-05-01",
      endDate: "2022-06-30",
      summary:
        "Designed intuitive user experiences and managed design systems for ed-tech platforms.",
      highlights: [
        "Created user flows for hiring and onboarding.",
        "Managed a scalable design system, increasing developer velocity by 30%.",
        "Crafted marketing collateral for two campaign launches, contributing to a 20% increase in lead generation.",
      ],
    },
    {
      name: "Plusklass",
      location: "Remote",
      position: "Technical Writer",
      url: "https://www.plusklass.com/",
      startDate: "2022-01-01",
      endDate: "2022-04-30",
      summary:
        "Authored and curated technical content for HTML/CSS/JS modules, driving learning impact for novices.",
      highlights: [
        "Created beginner-friendly learning content adopted by 2,000+ new users.",
        "Structured and reviewed curriculum, improving student course completion rates by 40%.",
      ],
    },
  ],
  education: [
    {
      institution: "National Yang Ming Chiao Tung University",
      url: "https://www.nycu.edu.tw/",
      area: "Computer Software Engineering",
      studyType: "Short Term Research Program",
      startDate: "2023-02-01",
      endDate: "2023-07-31",
    },
    {
      institution: "Visvesvaraya Technological University",
      url: "https://www.vtu.ac.in/",
      area: "Electronics and Communication",
      studyType: "Bachelor of Engineering",
      startDate: "2018-08-01",
      endDate: "2022-01-01",
    },
  ],
  certificates: [
    {
      name: "Next.js App Router Fundamentals",
      issuer: "Vercel",
      url: "https://nextjs.org/learn/certificate?course=dashboard-app&user=48654&certId=dashboard-app-48654-1745867386592",
    },
    {
      name: "Animations on the Web",
      issuer: "animations.dev",
      url: "https://animations.dev/certificate/3c66d48d-0d7a-4865-b023-e06ddfd71971",
    },
    {
      name: "AI for React Developers",
      issuer: "LinkedIn Learning",
      url: "https://www.linkedin.com/learning/certificates/28f048356a91802cc20a3af01c9a034faa62ac7628a02631142d2eb78062a781",
    },
    {
      name: "React: Design Patterns",
      issuer: "LinkedIn Learning",
      url: "https://www.linkedin.com/learning/certificates/bbb1d2307524475c1cc86d3c1dd77137a720dcc5f702ee1ee092d13354fa3c40",
    },
    {
      name: "React: State Management",
      issuer: "LinkedIn Learning",
      url: "https://www.linkedin.com/learning/certificates/325849cd7c3d9fc599c2acd78c01b63df82246724b77e4425a89d0c8c92460f4",
    },
    {
      name: "React (Basic)",
      issuer: "HackerRank",
      url: "https://www.hackerrank.com/certificates/57ce647802bb",
    },
  ],
  skills: [
    {
      name: "Frontend Product Engineering",
      level: "Advanced",
      keywords: [
        "React",
        "Next.js",
        "TypeScript",
        "Modern JavaScript",
        "UI Architecture",
        "Component Design",
        "State Management",
        "Performance Optimization",
        "Responsive Design",
        "Accessibility",
      ],
    },
    {
      name: "Product & UX",
      level: "Advanced",
      keywords: [
        "User Experience (UX)",
        "UI/UX Design",
        "Figma",
        "Workflow Optimization",
        "Human-Centered Design",
        "Rapid Prototyping",
        "Usability Testing",
      ],
    },
    {
      name: "AI Product Integration",
      level: "Intermediate",
      keywords: [
        "OpenAI APIs",
        "AI-Driven UX",
        "Prompt Engineering",
        "Conversational Interfaces",
        "Real-time Applications",
      ],
    },
    {
      name: "Cloud & DevOps",
      level: "Intermediate",
      keywords: [
        "AWS Basics (EC2, S3, CloudFront)",
        "GCP",
        "CI/CD Pipelines",
        "Docker",
        "Deployment Automation",
      ],
    },
    {
      name: "Collaboration & Product Delivery",
      level: "Intermediate",
      keywords: [
        "Product Management",
        "Agile Delivery",
        "Team Collaboration",
        "Cross-functional Communication",
        "Documentation",
        "Stakeholder Alignment",
      ],
    },
  ],
  projects: [
    {
      name: "AI Roadmap Generator",
      description:
        "Web app generating personalized and visual learning roadmaps powered by Next.js, React, Canvas, and LLMs. Used by thousands of learners and engineers to break down any tech domain.",
      highlights: [
        "Generated over 250 roadmaps and reached 5,600+ unique visitors within months of launch.",
        "Features real-time topic-to-roadmap generation with highly interactive visualizations, empowering rapid self-learning.",
        "Recognized as a successful project launch on Peerlist; highlighted for exceptional product execution.",
        "Includes privacy-friendly, shareable roadmaps and book recommendations, all built with scalable, privacy-first engineering.",
        "Led frontend, LLM integration, and roadmap visualization; orchestrated team-wide product improvements.",
      ],
      url: "https://airoadmapgenerator.com",
    },
    {
      name: "Sideprojects Directory",
      description:
        "Platform surfacing and auto-profiling open-source side projects from GitHub, growing project visibility and developer collaboration.",
      highlights: [
        "Indexed dozens of unique side projects, driving organic discovery and supporting project-based hiring.",
        "Enabled GitHub-based auto-profile import, reducing project onboarding to seconds.",
        "Facilitated connections between early-stage engineers, makers, and hiring managers.",
        "Improved open-source visibility, with multiple projects receiving new contributors through directory exposure.",
      ],
      url: "https://sideprojects.directory",
    },
    {
      name: "JSON Visualizer",
      description:
        "Interactive tool for tree/grid visualization of complex JSON, built for dev teams to debug and understand frontend/backend data structures.",
      highlights: [
        "Adopted by hundreds of developers for production debugging and API integration.",
        "Supports large dataset rendering and deep tree navigation; praised for performance vs. other online tools.",
        "Open-source and extensible, referenced as a recommended resource in developer forums.",
        "Designed intuitive UI for both technical and non-technical users, reducing time to diagnose data issues.",
      ],
      url: "https://jsonvisualiser.com",
    },
  ],
  talks: [
    {
      event: "React Play x React Bangalore Meetup",
      date: "2025-05-17",
      title: "Building Real-Time Applications with Reactive Databases",
      website: "https://www.meetup.com/reactplay-bengaluru/events/307690438/",
      slides:
        "https://milindmishra.com/slide/building-realtime-applications-with-reactive-databases",
      summary: "Real-time applications with React and Convex.",
    },
    {
      event: "React Bangalore Meetup",
      date: "2025-04-12",
      title: "AI for React Developers",
      website: "https://www.meetup.com/reactjs-bangalore/events/306320480/",
      slides: "https://milindmishra.com/slide/ai-for-react-developers",
      summary: "A deep-dive into Vercel's AI SDK.",
    },
  ],
  references: [
    {
      name: "Akash Bhadange",
      reference:
        "100% AGREE! Also, the way team has launched the project is commendable. This is by far the most successful project launch on Peerlist",
    },
  ],
};
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
import { Check, Link2, SquareArrowOutUpRight } from "lucide-react";
import JsxModal from "./Components/Modals/JsonModal";
import YamlModal from "./Components/Modals/YamlModal";
import PlayGround from "./Components/PlayGround";

let sampleData = {
  meta: {
    theme: "jsonresume-theme-stackoverflow",
  },
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
  education: [
    {
      institution: "University",
      url: "https://institution.com/",
      area: "Software Development",
      studyType: "Bachelor",
      startDate: "2011-01-01",
      endDate: "2013-01-01",
      score: "4.0",
      courses: ["DB1101 - Basic SQL"],
    },
  ],
  awards: [],
  certificates: [],
  publications: [],
  skills: [],
  languages: [],
  interests: [],
  references: [],
  projects: [],
};
function App() {
  const [formData, setFormData] = useState<TResumeSchema>(milindBro);

  const [basicData, setBasic] = useState<TBasicSchema>(formData.basics);

  const [workData, setWork] = useState<TWorkSchema>(formData.work);

  const [volunteerData, setVolunteer] = useState<TVolunteerSchema>(
    formData.volunteer
  );
  const [educationData, setEducation] = useState<TEducationSchema>(
    formData.education
  );
  const [awardsData, setAwards] = useState<TAwardsSchema>(formData.awards);
  const [certificatesData, setCertificates] = useState<TCertificatesSchema>(
    formData.certificates
  );
  const [publicationsData, setPublications] = useState<TPublicationsSchema>(
    formData.publications
  );
  const [skillsData, setSkills] = useState<TSkillsSchema>(formData.skills);
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

  const [jsxOpen, setJsxOpen] = useState<boolean>(false);
  const [YamlOpen, setYamlOpen] = useState<boolean>(false);
  const [playOpen, setPlayOpen] = useState<boolean>(false);

  const handleGenerateResume = async (data: any) => {
    try {
      let ResumeValidation = ResumeZodSchema.safeParse(data);
      if (ResumeValidation.success === true) {
        const response = await fetch("http://localhost:8080/resume", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resumeObject: data }),
        });

        const html = await response.json();

        // Open new tab and write HTML content into it
        const newWindow = window.open("", "_blank");
        if (newWindow) {
          newWindow.document.open();
          newWindow.document.write(html);
          newWindow.document.close();
        } else {
          alert("Popup blocked! Please allow popups for this site.");
        }
      } else {
        console.log(ResumeValidation);
        throw new Error("error while generating resume");
      }
    } catch (error) {
      console.error("Error generating resume:", error);
      toast.error("error while generating resume");
    }
  };
 
  const intializeWithData = (sampleData: any) => {
    setFormData(sampleData);
    setBasic(sampleData.basics);
    setWork(sampleData.work);
    setVolunteer(sampleData.volunteer || []);
    setEducation(sampleData.education);
    setAwards(sampleData.awards || []);
    setCertificates(sampleData.certificates || []);
    setPublications(sampleData.publications || []);
    setSkills(sampleData.skills || []);
    setLanguages(sampleData.languages || []);
    setInterests(sampleData.interests || []);
    setReferences(sampleData.references || []);
    setProjects(sampleData.projects || []);
  };

  useEffect(() => {
    if (jsxOpen || YamlOpen || playOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [jsxOpen, YamlOpen, playOpen]);

  useEffect(() => {
    console.log("changes done on basic Section", basicData);
    setFormData((prev) => {
      return { ...prev, basics: basicData };
    });
  }, [basicData]);

  useEffect(() => {
    console.log("changes done on work Section", workData);
    setFormData((prev) => {
      return { ...prev, work: workData };
    });
  }, [workData]);

  useEffect(() => {
    console.log("changes done on volunteer Section", volunteerData);
    setFormData((prev) => {
      return { ...prev, volunteer: volunteerData };
    });
  }, [volunteerData]);

  useEffect(() => {
    console.log("changes done on education Section", educationData);
    setFormData((prev) => {
      return { ...prev, education: educationData };
    });
  }, [educationData]);

  useEffect(() => {
    console.log("changes done on awards Section", awardsData);
    setFormData((prev) => {
      return { ...prev, awards: awardsData };
    });
  }, [awardsData]);

  useEffect(() => {
    console.log("changes done on certificates Section", certificatesData);
    setFormData((prev) => {
      return { ...prev, certificates: certificatesData };
    });
  }, [certificatesData]);

  useEffect(() => {
    console.log("changes done on publications Section", publicationsData);
    setFormData((prev) => {
      return { ...prev, publications: publicationsData };
    });
  }, [publicationsData]);

  useEffect(() => {
    console.log("changes done on skills Section", skillsData);
    setFormData((prev) => {
      return { ...prev, skills: skillsData };
    });
  }, [skillsData]);

  useEffect(() => {
    console.log("changes done on languages Section", languagesData);
    setFormData((prev) => {
      return { ...prev, languages: languagesData };
    });
  }, [languagesData]);

  useEffect(() => {
    console.log("changes done on interests Section", interestsData);
    setFormData((prev) => {
      return { ...prev, interests: interestsData };
    });
  }, [interestsData]);

  useEffect(() => {
    console.log("changes done on references Section", referencesData);
    setFormData((prev) => {
      return { ...prev, references: referencesData };
    });
  }, [referencesData]);

  useEffect(() => {
    console.log("changes done on projects Section", projectsData);
    setFormData((prev) => {
      return { ...prev, projects: projectsData };
    });
  }, [projectsData]);

  return (
    <>
      <div className="w-full  pt-[0px] bg-slate-900 font-inter pb-[10px] ">
        <div className="sticky z-[10] w-full  top-[0px] left-0 right-0    bg-slate-900 border-b border-slate-700/60 ">
          <header className="max-w-4xl mx-auto px-4 md:px-8 py-4 flex justify-between">
            <div className="">
              <h1 className="text-xl md:text-2xl font-bold text-slate-200">
                Resume Builder
              </h1>
              <p className="text-sm text-slate-400">
                A JSON based resume builder
              </p>
            </div>
            <div className="flex items-center gap-[10px]">
              <button
                onClick={() => {
                  setPlayOpen(true);
                }}
                className="bg-blue-500 p-[5px] rounded text-white hover:bg-blue-400 cursor-pointer text-sm"
              >
                Set JSON
              </button>
              <button
                onClick={() => {
                  intializeWithData(sampleData);
                }}
                className="bg-blue-500 p-[5px] rounded text-white hover:bg-blue-400 cursor-pointer text-sm"
              >
                Reset form
              </button>
            </div>
          </header>
        </div>
        <div className="max-w-4xl flex flex-col gap-[30px] mx-auto p-[12px] ">
          <div className="flex flex-col gap-[15px] rounded-lg border border-slate-700/40 bg-slate-800/90 py-[24px] px-[12px] md:px-[24px]">
            <h1 className="font-bold text-2xl text-white">Theme</h1>
            <p className="text-[15px]  text-white">
              Choose a theme for your resume layout and styling
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-400">
              {[
                {
                  name: "stackoverflow",
                  themeName: "jsonresume-theme-stackoverflow",
                },
                {
                  name: "even",
                  themeName: "jsonresume-theme-even",
                },
               
              ].map((themeItem) => {
                return (
                  <div
                    onClick={() => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          meta: { ...prev.meta, theme: themeItem.themeName },
                        };
                      });
                    }}
                    className={`flex flex-col p-[10px] gap-[10px] border-2 rounded-md cursor-pointer transition-all  ${
                      formData.meta?.theme === themeItem.themeName
                        ? "border-purple-500 bg-purple-900/20"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                  >
                    <div className="flex gap-[20px] justify-between">
                      <p className="font-medium text-slate-200">
                        {themeItem.name}
                      </p>
                      {formData.meta?.theme === themeItem.themeName && (
                        <Check className="h-4 w-4 text-purple-400" />
                      )}
                    </div>
                    <div className=" flex justify-between items-center">
                      <p>Preview</p>
                      <button className="hover:text-white ">
                        <a
                          href={`https://registry.jsonresume.org/thomasdavis?theme=${themeItem.name}`}
                          target="_blank"
                        >
                          <SquareArrowOutUpRight className="h-4 w-4" />
                        </a>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

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

          <div className="p-[10px] flex justify-center">
            <button
              onClick={() => {
                handleGenerateResume(formData);
              }}
              className="bg-blue-500 p-[10px] rounded text-white hover:bg-blue-400 cursor-pointer"
            >
              Generate Resume
            </button>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center gap-[30px] ">
            <button
              onClick={() => {
                setJsxOpen(true);
              }}
              className="bg-blue-500 p-[5px] rounded text-white hover:bg-blue-400 cursor-pointer text-sm"
            >
              Get JSON
            </button>
            <button
              onClick={() => {
                setYamlOpen(true);
              }}
              className="bg-blue-500 p-[5px] rounded text-white hover:bg-blue-400 cursor-pointer text-sm"
            >
              Get YAML
            </button>
          </div>
          <JsxModal open={jsxOpen} setOpen={setJsxOpen} jsonData={formData} />
          <YamlModal
            open={YamlOpen}
            setOpen={setYamlOpen}
            jsonData={formData}
          />
          <PlayGround
            setData={intializeWithData}
            setOpen={setPlayOpen}
            open={playOpen}
          />
        </div>
        <Toaster richColors />
      </div>
    </>
  );
}

export default App;
