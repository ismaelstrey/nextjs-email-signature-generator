import { z } from 'zod';

export const signatureFormSchema = z.object({
  // Informações pessoais
  name: z.string().min(2, { message: 'Nome é obrigatório' }),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  company: z.string().optional(),
  
  // Contato
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  website: z.string().url({ message: 'URL inválida' }).optional().or(z.literal('')),
  
  // Redes sociais
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  
  // Imagens
  profileImage: z.string().optional(),
  logoImage: z.string().optional(),
  
  // Estilo
  templateId: z.string(),
  primaryColor: z.string().default('#3498db'),
  secondaryColor: z.string().default('#333333'),
  fontFamily: z.string().default('Arial, sans-serif'),
  fontSize: z.string().default('medium'),
  borderStyle: z.string().default('none'),
  showSocialIcons: z.boolean().default(true),
  showLogo: z.boolean().default(true),
  showProfileImage: z.boolean().default(true),
});

export type SignatureFormValues = z.infer<typeof signatureFormSchema>;

export interface SignatureTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  generateHTML: (values: SignatureFormValues) => string;
}

export interface SocialIcon {
  name: string;
  url: string;
  icon: string;
}

export const fontFamilies = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: '"Helvetica Neue", Helvetica, Arial, sans-serif', label: 'Helvetica' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: '"Times New Roman", Times, serif', label: 'Times New Roman' },
  { value: 'Verdana, Geneva, sans-serif', label: 'Verdana' },
  { value: '"Courier New", Courier, monospace', label: 'Courier New' },
  { value: '"Segoe UI", Tahoma, Geneva, sans-serif', label: 'Segoe UI' },
  { value: '"Trebuchet MS", Helvetica, sans-serif', label: 'Trebuchet MS' },
];

export const fontSizes = [
  { value: 'small', label: 'Pequeno' },
  { value: 'medium', label: 'Médio' },
  { value: 'large', label: 'Grande' },
];

export const borderStyles = [
  { value: 'none', label: 'Nenhuma' },
  { value: 'solid', label: 'Sólida' },
  { value: 'dashed', label: 'Tracejada' },
  { value: 'dotted', label: 'Pontilhada' },
];