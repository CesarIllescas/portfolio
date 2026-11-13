// Edit verified personal links here. Set an unavailable link to null to omit it.
export const profile = {
  name: 'César Joaquín Lares Illescas',
  shortName: 'César Lares',
  specialty: 'Backend & AI Engineer',
  location: { en: 'Puebla, Mexico', es: 'Puebla, México' },
  links: {
    github: 'https://github.com/CesarIllescas',
    linkedin: 'https://linkedin.com/in/cesarjli0120',
    email: 'cesarlaresillescas@gmail.com',
    cv: 'cv/Cesar_Joaquin_Lares_Illescas_CV.pdf',
  } as Record<'github' | 'linkedin' | 'email' | 'cv', string | null>,
  education: {
    institution: 'Universidad Autónoma Chapingo',
    period: '2018–2022',
    degree: { en: 'B.Eng. in Mechatronics', es: 'Ingeniería Mecatrónica' },
  },
};
