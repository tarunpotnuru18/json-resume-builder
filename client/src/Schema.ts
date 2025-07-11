// export interface TJsonResume {
//   basics: {
//     name: string;
//     label: string;
//     image: string;
//     email: string;
//     phone: string;
//     url: string;
//     summary: string;
//     location: {
//       address: string;
//       postalCode: string;
//       city: string;
//       countryCode: string;
//       region: string;
//     };
//     profiles: {
//       network: string;
//       username: string;
//       url: string;
//     }[];
//   };
//   work: {
//     name: string;
//     position: string;
//     url: string;
//     startDate: string;
//     endDate: string;
//     summary: string;
//     highlights: string[];
//   }[];
//   volunteer: {
//     organization: string;
//     position: string;
//     url: string;
//     startDate: string;
//     endDate: string;
//     summary: string;
//     highlights: string[];
//   }[];
//   education: {
//     institution: string;
//     url: string;
//     area: string;
//     studyType: string;
//     startDate: string;
//     endDate: string;
//     score: string;
//     courses: string[];
//   }[];
//   awards: {
//     title: string;
//     date: string;
//     awarder: string;
//     summary: string;
//   }[];
//   certificates: {
//     name: string;
//     date: string;
//     issuer: string;
//     url: string;
//   }[];
//   publications: {
//     name: string;
//     publisher: string;
//     releaseDate: string;
//     url: string;
//     summary: string;
//   }[];
//   skills: {
//     name: string;
//     level: string;
//     keywords: string[];
//   }[];
//   languages: {
//     language: string;
//     fluency: string;
//   }[];
//   interests: {
//     name: string;
//     keywords: string[];
//   }[];
//   references: {
//     name: string;
//     reference: string;
//   }[];
//   projects: {
//     name: string;
//     startDate: string;
//     endDate: string;
//     description: string;
//     highlights: string[];
//     url: string;
//   }[];
// }
import { z } from "zod";

const iso8601DateSchema = z
  .string()
  .regex(
    /^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$/,
    "Invalid date format. Use YYYY, YYYY-MM, or YYYY-MM-DD"
  )
  .optional();

const MetaSchema = z.object({
  theme: z.string().optional(),
  themeOptions: z
    .object({
      colors: z.object({
        background: z.array(z.string()).optional(),
        dimmed: z.array(z.string()).optional(),
        primary: z.array(z.string()).optional(),
        secondary: z.array(z.string()).optional(),
        accent: z.array(z.string()).optional(),
      }),
    })
    .optional(),
  canonical: z.string().optional(),
  version: z.string().optional(), // e.g., v1.0.0 (SemVer recommended)
  lastModified: z.string().datetime().optional(), // JSON schema doesn't specify time, keep simple string for now
});

const LocationSchema = z.object({
  address: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  countryCode: z.string().optional(), // ISO 3166-1 alpha-2
  region: z.string().optional(),
});

const ProfileSchema = z.object({
  network: z.string().optional(), // e.g., "LinkedIn", "GitHub"
  username: z.string().optional(),
  url: z.string().optional(),
});

const BasicsSchema = z.object({
  name: z.string().optional(),
  label: z.string().optional(), // e.g., "Software Engineer"
  image: z.string().optional(), // URL to profile picture
  email: z.string().optional(),
  phone: z.string().optional(), // E.164 format recommended
  url: z.string().optional(), // Personal website/portfolio
  summary: z.string().optional(), // A brief overview
  location: LocationSchema.optional(),
  profiles: z.array(ProfileSchema).optional(),
});

const WorkSchema = z.object({
  name: z.string().optional(), // Company name
  location: z.string().optional(), // e.g., Menlo Park, CA (Different from Basics location object)
  description: z.string().optional(), // Added field
  position: z.string().optional(),
  url: z.string().optional(),
  startDate: iso8601DateSchema,
  endDate: iso8601DateSchema,
  summary: z.string().optional(), // Describe responsibilities
  highlights: z.array(z.string()).optional(), // List accomplishments
});

const VolunteerSchema = z.object({
  organization: z.string().optional(),
  position: z.string().optional(),
  url: z.string().optional(),
  startDate: iso8601DateSchema,
  endDate: iso8601DateSchema,
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

const EducationSchema = z.object({
  institution: z.string().optional(),
  url: z.string().optional(),
  area: z.string().optional(), // e.g., "Computer Science"
  studyType: z.string().optional(), // e.g., "Bachelor", "Master"
  startDate: iso8601DateSchema,
  endDate: iso8601DateSchema,
  score: z.string().optional(), // e.g., "3.8/4.0 GPA"
  courses: z.array(z.string()).optional(), // Relevant courses
});

const AwardsSchema = z.object({
  title: z.string().optional(),
  date: iso8601DateSchema,
  awarder: z.string().optional(),
  summary: z.string().optional(),
});

const CertificateSchema = z.object({
  name: z.string().optional(),
  date: iso8601DateSchema,
  issuer: z.string().optional(),
  url: z.string().optional(),
});

const PublicationsSchema = z.object({
  name: z.string().optional(),
  publisher: z.string().optional(),
  releaseDate: iso8601DateSchema,
  url: z.string().optional(),
  summary: z.string().optional(),
});

const SkillSchema = z.object({
  name: z.string().optional(), // e.g., "Web Development"
  level: z.string().optional(), // e.g., 'Beginner', 'Intermediate', 'Advanced', 'Master'
  keywords: z.array(z.string()).optional(), // Specific skills/tools
});

const LanguagesSchema = z.object({
  language: z.string().optional(),
  fluency: z.string().optional(), // e.g., 'Native speaker', 'Fluent', 'Beginner'
});
const InterestsSchema = z.object({
  name: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

const ProjectSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  startDate: iso8601DateSchema,
  endDate: iso8601DateSchema,
  url: z.string().optional(),
  roles: z.array(z.string()).optional(),
  entity: z.string().optional(), // e.g., "Independent", "Company X"
  type: z.string().optional(), // e.g., "application", "library"
});

const TalksSchema = z.object({
  event: z.string().optional(),
  date: iso8601DateSchema,
  title: z.string().optional(),
  website: z.string().optional(),
  slides: z.string().optional(),
  recording: z.string().optional(),
  summary: z.string().optional(),
});

const ReferenceSchema = z.object({
  name: z.string().optional(),
  reference: z.string().optional(),
});
export const ResumeZodSchema = z.object({
  $schema: z.string().optional(),
  meta: MetaSchema.optional(),
  basics: BasicsSchema.optional(),
  work: z.array(WorkSchema).optional(),
  volunteer: z.array(VolunteerSchema).optional(),
  education: z.array(EducationSchema).optional(),
  awards: z.array(AwardsSchema).optional(),
  certificates: z.array(CertificateSchema).optional(),
  publications: z.array(PublicationsSchema).optional(),
  skills: z.array(SkillSchema).optional(),
  languages: z.array(LanguagesSchema).optional(),
  interests: z.array(InterestsSchema).optional(),
  projects: z.array(ProjectSchema).optional(),
  talks: z.array(TalksSchema).optional(),
  references: z.array(ReferenceSchema).optional(),
});
export {
  iso8601DateSchema,
  MetaSchema,
  LocationSchema,
  ProfileSchema,
  BasicsSchema,
  WorkSchema,
  VolunteerSchema,
  EducationSchema,
  AwardsSchema,
  CertificateSchema,
  PublicationsSchema,
  SkillSchema,
  LanguagesSchema,
  InterestsSchema,
  ProjectSchema,
  ReferenceSchema,
  TalksSchema,
};

export type TResumeSchema = z.infer<typeof ResumeZodSchema>;
export type TBasicSchema = TResumeSchema["basics"];
export type TWorkSchema = TResumeSchema["work"];
export type TVolunteerSchema = TResumeSchema["volunteer"];
export type TEducationSchema = TResumeSchema["education"];
export type TAwardsSchema = TResumeSchema["awards"];
export type TCertificatesSchema = TResumeSchema["certificates"];
export type TPublicationsSchema = TResumeSchema["publications"];
export type TSkillsSchema = TResumeSchema["skills"];
export type TLanguagesSchema = TResumeSchema["languages"];
export type TInterestsSchema = TResumeSchema["interests"];
export type TReferencesSchema = TResumeSchema["references"];
export type TProjectsSchema = TResumeSchema["projects"];
