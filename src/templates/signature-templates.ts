import { SignatureFormValues, SignatureTemplate } from '@/types/signature';

// Função auxiliar para obter o tamanho da fonte com base na preferência
const getFontSize = (size: string): { name: string, job: string, text: string } => {
  switch (size) {
    case 'small':
      return { name: '16px', job: '13px', text: '11px' };
    case 'large':
      return { name: '20px', job: '16px', text: '14px' };
    case 'medium':
    default:
      return { name: '18px', job: '14px', text: '12px' };
  }
};

// Função auxiliar para obter o estilo da borda
const getBorderStyle = (style: string, color: string): string => {
  if (style === 'none') return '';
  return `border-right: 2px ${style} ${color};`;
};

// Função auxiliar para criar links de redes sociais
const getSocialLinks = (values: SignatureFormValues, iconSize: string = '24px'): string => {
  if (!values.showSocialIcons) return '';

  const socialLinks = [];

  if (values.instagram) {
    socialLinks.push(`
      <a href="https://www.instagram.com/${values.instagram.replace('@', '')}" target="_blank" style="text-decoration: none; margin-right: 8px;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" alt="Instagram" style="width: ${iconSize}; height: ${iconSize};">
      </a>
    `);
  }

  if (values.facebook) {
    socialLinks.push(`
      <a href="https://www.facebook.com/${values.facebook}" target="_blank" style="text-decoration: none; margin-right: 8px;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png" alt="Facebook" style="width: ${iconSize}; height: ${iconSize};">
      </a>
    `);
  }

  if (values.linkedin) {
    socialLinks.push(`
      <a href="https://www.linkedin.com/in/${values.linkedin}" target="_blank" style="text-decoration: none; margin-right: 8px;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png" alt="LinkedIn" style="width: ${iconSize}; height: ${iconSize};">
      </a>
    `);
  }

  if (values.twitter) {
    socialLinks.push(`
      <a href="https://twitter.com/${values.twitter.replace('@', '')}" target="_blank" style="text-decoration: none; margin-right: 8px;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png" alt="Twitter" style="width: ${iconSize}; height: ${iconSize};">
      </a>
    `);
  }

  return socialLinks.length > 0 ? `<div style="margin-top: 10px;">${socialLinks.join('')}</div>` : '';
};

// Função auxiliar para criar ícones de redes sociais modernos
const getModernSocialLinks = (values: SignatureFormValues, iconSize: string = '24px', style: 'filled' | 'outline' | 'rounded' | 'gradient' = 'filled'): string => {
  if (!values.showSocialIcons) return '';

  const socialLinks = [];

  // Definição de cores para os ícones
  const iconColors = {
    instagram: style === 'gradient' ? 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' : '#e1306c',
    facebook: '#4267B2',
    linkedin: '#0077B5',
    twitter: '#1DA1F2'
  };

  // Estilos para os ícones
  const iconStyle = {
    filled: {
      borderRadius: '4px',
      padding: '4px',
      display: 'inline-block',
      margin: '0 4px',
      textAlign: 'center' as const
    },
    outline: {
      borderRadius: '50%',
      border: '1px solid',
      padding: '4px',
      display: 'inline-block',
      margin: '0 4px',
      textAlign: 'center' as const
    },
    rounded: {
      borderRadius: '50%',
      padding: '4px',
      display: 'inline-block',
      margin: '0 4px',
      textAlign: 'center' as const
    },
    gradient: {
      borderRadius: '4px',
      padding: '4px',
      display: 'inline-block',
      margin: '0 4px',
      textAlign: 'center' as const
    }
  };

  if (values.instagram) {
    const bgStyle = style === 'outline' ? 'background-color: transparent;' :
      style === 'gradient' ? `background: ${iconColors.instagram};` :
        `background-color: ${iconColors.instagram};`;
    const borderStyle = style === 'outline' ? `border-color: ${iconColors.instagram};` : '';

    socialLinks.push(`
      <a href="https://www.instagram.com/${values.instagram.replace('@', '')}" target="_blank" style="text-decoration: none;">
        <div style="${bgStyle} ${borderStyle} width: ${iconSize}; height: ${iconSize}; ${Object.entries(iconStyle[style]).map(([k, v]) => `${k}: ${v};`).join(' ')}">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" alt="Instagram" style="width: calc(${iconSize} - 8px); height: calc(${iconSize} - 8px);">
        </div>
      </a>
    `);
  }

  if (values.facebook) {
    const bgStyle = style === 'outline' ? 'background-color: transparent;' :
      style === 'gradient' ? `background: ${iconColors.facebook};` :
        `background-color: ${iconColors.facebook};`;
    const borderStyle = style === 'outline' ? `border-color: ${iconColors.facebook};` : '';

    socialLinks.push(`
      <a href="https://www.facebook.com/${values.facebook}" target="_blank" style="text-decoration: none;">
        <div style="${bgStyle} ${borderStyle} width: ${iconSize}; height: ${iconSize}; ${Object.entries(iconStyle[style]).map(([k, v]) => `${k}: ${v};`).join(' ')}">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png" alt="Facebook" style="width: calc(${iconSize} - 8px); height: calc(${iconSize} - 8px);">
        </div>
      </a>
    `);
  }

  if (values.linkedin) {
    const bgStyle = style === 'outline' ? 'background-color: transparent;' :
      style === 'gradient' ? `background: ${iconColors.linkedin};` :
        `background-color: ${iconColors.linkedin};`;
    const borderStyle = style === 'outline' ? `border-color: ${iconColors.linkedin};` : '';

    socialLinks.push(`
      <a href="https://www.linkedin.com/in/${values.linkedin}" target="_blank" style="text-decoration: none;">
        <div style="${bgStyle} ${borderStyle} width: ${iconSize}; height: ${iconSize}; ${Object.entries(iconStyle[style]).map(([k, v]) => `${k}: ${v};`).join(' ')}">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png" alt="LinkedIn" style="width: calc(${iconSize} - 8px); height: calc(${iconSize} - 8px);">
        </div>
      </a>
    `);
  }

  if (values.twitter) {
    const bgStyle = style === 'outline' ? 'background-color: transparent;' :
      style === 'gradient' ? `background: ${iconColors.twitter};` :
        `background-color: ${iconColors.twitter};`;
    const borderStyle = style === 'outline' ? `border-color: ${iconColors.twitter};` : '';

    socialLinks.push(`
      <a href="https://twitter.com/${values.twitter.replace('@', '')}" target="_blank" style="text-decoration: none;">
        <div style="${bgStyle} ${borderStyle} width: ${iconSize}; height: ${iconSize}; ${Object.entries(iconStyle[style]).map(([k, v]) => `${k}: ${v};`).join(' ')}">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png" alt="Twitter" style="width: calc(${iconSize} - 8px); height: calc(${iconSize} - 8px);">
        </div>
      </a>
    `);
  }

  return socialLinks.length > 0 ? `<div style="margin-top: 10px; display: flex;">${socialLinks.join('')}</div>` : '';
};

export const signatureTemplates: SignatureTemplate[] = [
  // Template 1: Clássico Horizontal
  {
    id: 'classic-horizontal',
    name: '1. Clássico Horizontal',
    description: 'Layout horizontal tradicional com foto à esquerda',
    thumbnail: '/templates/classic-horizontal.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);
      const borderStyle = getBorderStyle(values.borderStyle, values.primaryColor);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 600px; border-collapse: collapse;">
          <tr>
            ${values.showProfileImage && values.profileImage ? `
              <td style="vertical-align: top; padding-right: 15px; ${borderStyle}">
                <img src="${values.profileImage}" alt="${values.name}" style="width: 100px; height: 100px; border-radius: 50%;">
              </td>
            ` : ''}
            <td style="vertical-align: top;">
              <div style="font-size: ${fontSize.name}; font-weight: bold; color: ${values.primaryColor};">${values.name}</div>
              ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.secondaryColor}; margin-bottom: 5px;">${values.jobTitle}</div>` : ''}
              ${values.department ? `<div style="font-size: ${fontSize.job}; color: ${values.secondaryColor}; margin-bottom: 10px;">${values.department}</div>` : ''}
              <div style="height: 1px; background-color: #ddd; margin: 10px 0; width: 100%;"></div>
              ${values.phone ? `<div style="font-size: ${fontSize.text}; color: ${values.secondaryColor}; margin-bottom: 5px;">📱 ${values.phone}</div>` : ''}
              ${values.whatsapp ? `<div style="font-size: ${fontSize.text}; color: ${values.secondaryColor}; margin-bottom: 5px;">💬 WhatsApp: ${values.whatsapp}</div>` : ''}
              <div style="font-size: ${fontSize.text}; color: ${values.secondaryColor}; margin-bottom: 5px;">✉️ <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a></div>
              ${values.website ? `<div style="font-size: ${fontSize.text}; color: ${values.secondaryColor}; margin-bottom: 5px;">🌐 <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
              ${getSocialLinks(values)}
              ${values.showLogo && values.logoImage ? `
                <div style="margin-top: 10px;">
                  <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 50px;">
                </div>
              ` : ''}
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 2: Moderno com Cores
  {
    id: 'modern-colored',
    name: '2. Moderno com Cores',
    description: 'Design moderno com destaque em cores',
    thumbnail: '/templates/modern-colored.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);
      const borderStyle = getBorderStyle(values.borderStyle, values.primaryColor);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 600px; border-collapse: collapse;">
          <tr>
            ${values.showProfileImage && values.profileImage ? `
              <td style="vertical-align: middle; padding-right: 15px; ${borderStyle}">
                <img src="${values.profileImage}" alt="${values.name}" style="width: 90px; height: 90px; border-radius: 5px; border: 2px solid ${values.primaryColor};">
              </td>
            ` : ''}
            <td style="vertical-align: middle; ${values.showProfileImage ? 'padding-left: 15px;' : ''}">
              <div style="font-size: ${fontSize.name}; font-weight: bold; color: ${values.primaryColor};">${values.name}</div>
              ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.secondaryColor}; margin-bottom: 5px;">${values.jobTitle}</div>` : ''}
              ${values.company ? `<div style="font-size: ${fontSize.job}; color: ${values.secondaryColor}; margin-bottom: 8px;">${values.company}</div>` : ''}
              ${values.phone ? `<div style="font-size: ${fontSize.text}; color: ${values.secondaryColor}; margin-bottom: 3px;">📱 ${values.phone}</div>` : ''}
              ${values.email ? `<div style="font-size: ${fontSize.text}; color: ${values.secondaryColor}; margin-bottom: 8px;">✉️ <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a></div>` : ''}
              <div style="margin-top: 8px;">
                ${values.instagram ? `<a href="https://www.instagram.com/${values.instagram.replace('@', '')}" target="_blank" style="display: inline-block; margin-right: 8px; background-color: #e1306c; padding: 4px 8px; border-radius: 3px; text-decoration: none;"><span style="color: white; font-size: 11px;">Instagram</span></a>` : ''}
                ${values.facebook ? `<a href="https://www.facebook.com/${values.facebook}" target="_blank" style="display: inline-block; background-color: #4267B2; padding: 4px 8px; border-radius: 3px; text-decoration: none;"><span style="color: white; font-size: 11px;">Facebook</span></a>` : ''}
              </div>
              ${values.showLogo && values.logoImage ? `
                <div style="margin-top: 10px;">
                  <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 40px;">
                </div>
              ` : ''}
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 3: Minimalista
  {
    id: 'minimalist',
    name: '3. Minimalista',
    description: 'Design limpo e minimalista',
    thumbnail: '/templates/minimalist.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);
      const borderStyle = getBorderStyle(values.borderStyle, values.primaryColor);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 500px; border-collapse: collapse;">
          <tr>
            <td style="padding-bottom: 10px;">
              <div style="font-size: ${fontSize.name}; font-weight: 600; color: ${values.primaryColor};">${values.name}</div>
              ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.secondaryColor}; margin-bottom: 12px;">${values.jobTitle}</div>` : ''}
              <div style="width: 30px; height: 2px; background-color: ${values.primaryColor}; margin: 8px 0;"></div>
              <div style="font-size: ${fontSize.text}; color: ${values.secondaryColor}; margin: 5px 0;">
                ${values.phone ? `<span style="margin-right: 10px;">📱 ${values.phone}</span>` : ''}
                <span>✉️ <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a></span>
              </div>
              ${values.showSocialIcons ? `
                <div style="margin-top: 8px; font-size: ${fontSize.text};">
                  ${values.instagram ? `<a href="https://www.instagram.com/${values.instagram.replace('@', '')}" target="_blank" style="color: ${values.secondaryColor}; text-decoration: none; margin-right: 10px;">Instagram</a>` : ''}
                  ${values.facebook ? `<a href="https://www.facebook.com/${values.facebook}" target="_blank" style="color: ${values.secondaryColor}; text-decoration: none;">${values.facebook.includes('facebook.com') ? values.facebook.split('facebook.com/')[1] : values.facebook}</a>` : ''}
                </div>
              ` : ''}
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 4: Corporativo com Borda
  {
    id: 'corporate-bordered',
    name: '4. Corporativo com Borda',
    description: 'Design profissional com borda destacada',
    thumbnail: '/templates/corporate-bordered.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);
      const borderStyle = getBorderStyle(values.borderStyle, values.primaryColor);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 600px; border-collapse: collapse; border-left: 4px solid ${values.primaryColor}; padding-left: 15px;">
          <tr>
            <td style="padding: 15px;">
              <div style="font-size: ${fontSize.name}; font-weight: bold; color: ${values.primaryColor};">${values.name}</div>
              ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.secondaryColor}; margin-bottom: 5px;">${values.jobTitle}</div>` : ''}
              ${values.company ? `<div style="font-size: ${fontSize.job}; color: ${values.secondaryColor}; margin-bottom: 10px;">${values.company}</div>` : ''}
              <div style="margin-top: 10px;">
                ${values.phone ? `<div style="font-size: ${fontSize.text}; color: ${values.secondaryColor}; margin-bottom: 5px;">📞 ${values.phone}</div>` : ''}
                <div style="font-size: ${fontSize.text}; color: ${values.secondaryColor}; margin-bottom: 5px;">📧 <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a></div>
                ${values.website ? `<div style="font-size: ${fontSize.text}; color: ${values.secondaryColor}; margin-bottom: 5px;">🌐 <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
              </div>
              ${getSocialLinks(values, '20px')}
              ${values.showLogo && values.logoImage ? `
                <div style="margin-top: 15px;">
                  <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 45px;">
                </div>
              ` : ''}
            </td>
            ${values.showProfileImage && values.profileImage ? `
              <td style="vertical-align: top; padding-left: 15px;">
                <img src="${values.profileImage}" alt="${values.name}" style="width: 100px; height: 100px; border: 2px solid ${values.primaryColor};">
              </td>
            ` : ''}
          </tr>
        </table>
      `;
    }
  },

  // Template 5: Cartão de Visita
  {
    id: 'business-card',
    name: '5. Cartão de Visita',
    description: 'Layout inspirado em cartão de visita',
    thumbnail: '/templates/business-card.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);
      const borderStyle = getBorderStyle(values.borderStyle, values.primaryColor);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 500px; border-collapse: collapse; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px;">
          <tr>
            <td style="padding: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 80px; vertical-align: top;">
                      <img src="${values.profileImage}" alt="${values.name}" style="width: 70px; height: 70px; border-radius: 50%; border: 2px solid ${values.primaryColor};">
                    </td>
                  ` : ''}
                  <td style="vertical-align: top;">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: ${values.primaryColor};">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.secondaryColor}; margin-bottom: 5px;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: ${values.secondaryColor}; margin-bottom: 10px;">${values.company}</div>` : ''}
                  </td>
                </tr>
              </table>
              <div style="height: 1px; background-color: #ddd; margin: 15px 0;"></div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td>
                    ${values.phone ? `<div style="font-size: ${fontSize.text}; color: ${values.secondaryColor}; margin-bottom: 5px;">📱 ${values.phone}</div>` : ''}
                    <div style="font-size: ${fontSize.text}; color: ${values.secondaryColor}; margin-bottom: 5px;">✉️ <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a></div>
                    ${values.website ? `<div style="font-size: ${fontSize.text}; color: ${values.secondaryColor}; margin-bottom: 5px;">🌐 <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
                  </td>
                  ${values.showLogo && values.logoImage ? `
                    <td style="text-align: right; vertical-align: bottom;">
                      <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 40px;">
                    </td>
                  ` : ''}
                </tr>
              </table>
              ${getSocialLinks(values, '20px')}
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 6: Gradiente Moderno
  {
    id: 'modern-gradient',
    name: 'Gradiente Moderno',
    description: 'Design contemporâneo com gradiente de cores',
    thumbnail: '/templates/classic-horizontal.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 600px; border-collapse: collapse;">
          <tr>
            <td style="padding: 15px; background: linear-gradient(135deg, ${values.primaryColor} 0%, ${values.secondaryColor} 100%); border-radius: 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 100px; vertical-align: middle; padding-right: 15px;">
                      <img src="${values.profileImage}" alt="${values.name}" style="width: 90px; height: 90px; border-radius: 8px; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    </td>
                  ` : ''}
                  <td style="vertical-align: middle;">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: rgba(255,255,255,0.9); margin-bottom: 5px;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: rgba(255,255,255,0.9); margin-bottom: 8px;">${values.company}</div>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 15px; background-color: white; border-radius: 0 0 8px 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td>
                    ${values.phone ? `<div style="font-size: ${fontSize.text}; color: #555; margin-bottom: 5px;">📱 ${values.phone}</div>` : ''}
                    ${values.whatsapp ? `<div style="font-size: ${fontSize.text}; color: #555; margin-bottom: 5px;">💬 WhatsApp: ${values.whatsapp}</div>` : ''}
                    <div style="font-size: ${fontSize.text}; color: #555; margin-bottom: 5px;">✉️ <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a></div>
                    ${values.website ? `<div style="font-size: ${fontSize.text}; color: #555; margin-bottom: 5px;">🌐 <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
                    ${getModernSocialLinks(values, '28px', 'gradient')}
                  </td>
                  ${values.showLogo && values.logoImage ? `
                    <td style="text-align: right; vertical-align: bottom;">
                      <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 45px;">
                    </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 7: Minimalista Escuro
  {
    id: 'dark-minimalist',
    name: 'Minimalista Escuro',
    description: 'Design elegante com fundo escuro',
    thumbnail: '/templates/minimalist.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 500px; border-collapse: collapse; background-color: #222; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 90px; vertical-align: middle;">
                      <img src="${values.profileImage}" alt="${values.name}" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid ${values.primaryColor}; box-shadow: 0 0 10px rgba(0,0,0,0.3);">
                    </td>
                  ` : ''}
                  <td style="vertical-align: middle; ${values.showProfileImage && values.profileImage ? 'padding-left: 15px;' : ''}">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: white;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.primaryColor}; margin-bottom: 5px;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: #aaa; margin-bottom: 10px;">${values.company}</div>` : ''}
                  </td>
                </tr>
              </table>
              <div style="height: 1px; background-color: #444; margin: 15px 0;"></div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td>
                    ${values.phone ? `<div style="font-size: ${fontSize.text}; color: #ddd; margin-bottom: 5px;">📱 ${values.phone}</div>` : ''}
                    <div style="font-size: ${fontSize.text}; color: #ddd; margin-bottom: 5px;">✉️ <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a></div>
                    ${values.website ? `<div style="font-size: ${fontSize.text}; color: #ddd; margin-bottom: 5px;">🌐 <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
                    ${getModernSocialLinks(values, '24px', 'outline')}
                  </td>
                  ${values.showLogo && values.logoImage ? `
                    <td style="text-align: right; vertical-align: bottom;">
                      <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 40px;">
                    </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 8: Cartão Moderno
  {
    id: 'modern-card',
    name: 'Cartão Moderno',
    description: 'Design de cartão com sombras e bordas arredondadas',
    thumbnail: '/templates/business-card.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 550px; border-collapse: separate; border-spacing: 0; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 0;">
              <div style="height: 8px; background: linear-gradient(90deg, ${values.primaryColor}, ${values.secondaryColor});"></div>
            </td>
          </tr>
          <tr>
            <td style="padding: 25px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: top;">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: #333; margin-bottom: 5px;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.primaryColor}; margin-bottom: 3px;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: #666; margin-bottom: 15px;">${values.company}</div>` : ''}
                    
                    <div style="display: flex; flex-wrap: wrap; margin-bottom: 15px;">
                      ${values.phone ? `<div style="font-size: ${fontSize.text}; color: #666; margin-right: 15px; margin-bottom: 8px;">📱 ${values.phone}</div>` : ''}
                      <div style="font-size: ${fontSize.text}; color: #666; margin-right: 15px; margin-bottom: 8px;">✉️ <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a></div>
                      ${values.website ? `<div style="font-size: ${fontSize.text}; color: #666; margin-bottom: 8px;">🌐 <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
                    </div>
                    
                    ${getModernSocialLinks(values, '26px', 'rounded')}
                  </td>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 100px; vertical-align: top; text-align: right;">
                      <img src="${values.profileImage}" alt="${values.name}" style="width: 90px; height: 90px; border-radius: 8px; object-fit: cover;">
                    </td>
                  ` : ''}
                </tr>
              </table>
              ${values.showLogo && values.logoImage ? `
                <div style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 15px;">
                  <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 35px;">
                </div>
              ` : ''}
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 9: Profissional Moderno
  {
    id: 'modern-professional',
    name: 'Profissional Moderno',
    description: 'Layout profissional com design limpo e moderno',
    thumbnail: '/templates/corporate-bordered.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 600px; border-collapse: collapse;">
          <tr>
            <td style="padding-bottom: 15px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle;">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: ${values.primaryColor}; letter-spacing: 0.5px;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: #555; margin-bottom: 3px;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: #777; margin-bottom: 5px;">${values.company}</div>` : ''}
                  </td>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 80px; vertical-align: middle; text-align: right;">
                      <img src="${values.profileImage}" alt="${values.name}" style="width: 70px; height: 70px; border-radius: 50%; border: 3px solid ${values.primaryColor};">
                    </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <div style="height: 2px; background: linear-gradient(90deg, ${values.primaryColor}, transparent); margin-bottom: 15px;"></div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: top;">
                    <table style="border-collapse: collapse;">
                      ${values.phone ? `
                        <tr>
                          <td style="padding-right: 10px; padding-bottom: 8px; vertical-align: top;">
                            <span style="display: inline-block; width: 18px; height: 18px; background-color: ${values.primaryColor}; border-radius: 50%; text-align: center; line-height: 18px;">
                              <span style="color: white; font-size: 10px;">📱</span>
                            </span>
                          </td>
                          <td style="padding-bottom: 8px; font-size: ${fontSize.text}; color: #555;">${values.phone}</td>
                        </tr>
                      ` : ''}
                      <tr>
                        <td style="padding-right: 10px; padding-bottom: 8px; vertical-align: top;">
                          <span style="display: inline-block; width: 18px; height: 18px; background-color: ${values.primaryColor}; border-radius: 50%; text-align: center; line-height: 18px;">
                            <span style="color: white; font-size: 10px;">✉️</span>
                          </span>
                        </td>
                        <td style="padding-bottom: 8px; font-size: ${fontSize.text}; color: #555;">
                          <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a>
                        </td>
                      </tr>
                      ${values.website ? `
                        <tr>
                          <td style="padding-right: 10px; padding-bottom: 8px; vertical-align: top;">
                            <span style="display: inline-block; width: 18px; height: 18px; background-color: ${values.primaryColor}; border-radius: 50%; text-align: center; line-height: 18px;">
                              <span style="color: white; font-size: 10px;">🌐</span>
                            </span>
                          </td>
                          <td style="padding-bottom: 8px; font-size: ${fontSize.text}; color: #555;">
                            <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a>
                          </td>
                        </tr>
                      ` : ''}
                    </table>
                  </td>
                  ${values.showLogo && values.logoImage ? `
                    <td style="vertical-align: bottom; text-align: right;">
                      <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 45px;">
                    </td>
                  ` : ''}
                </tr>
              </table>
              ${getModernSocialLinks(values, '24px', 'filled')}
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 10: Criativo Colorido
  {
    id: 'creative-colorful',
    name: 'Criativo Colorido',
    description: 'Design criativo com elementos coloridos',
    thumbnail: '/templates/modern-colored.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 550px; border-collapse: collapse;">
          <tr>
            <td>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 110px; vertical-align: top;">
                      <div style="position: relative; width: 100px; height: 100px;">
                        <div style="position: absolute; top: -5px; left: -5px; width: 100px; height: 100px; background-color: ${values.secondaryColor}; border-radius: 12px; transform: rotate(-3deg);"></div>
                        <div style="position: absolute; top: 5px; left: 5px; width: 100px; height: 100px; background-color: ${values.primaryColor}; border-radius: 12px; transform: rotate(3deg);"></div>
                        <img src="${values.profileImage}" alt="${values.name}" style="position: absolute; top: 0; left: 0; width: 100px; height: 100px; border-radius: 12px; object-fit: cover;">
                      </div>
                    </td>
                  ` : ''}
                  <td style="vertical-align: top; ${values.showProfileImage && values.profileImage ? 'padding-left: 15px;' : ''}">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: ${values.primaryColor}; margin-bottom: 5px;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.secondaryColor}; margin-bottom: 3px;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: #666; margin-bottom: 10px;">${values.company}</div>` : ''}
                    
                    <div style="margin-top: 10px;">
                      <table style="border-collapse: collapse;">
                        ${values.phone ? `
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <div style="display: inline-block; padding: 4px 10px; background-color: ${values.primaryColor}; border-radius: 20px; margin-right: 5px;">
                                <span style="color: white; font-size: ${fontSize.text};">📱</span>
                              </div>
                              <span style="font-size: ${fontSize.text}; color: #555;">${values.phone}</span>
                            </td>
                          </tr>
                        ` : ''}
                        <tr>
                          <td style="padding-bottom: 8px;">
                            <div style="display: inline-block; padding: 4px 10px; background-color: ${values.primaryColor}; border-radius: 20px; margin-right: 5px;">
                              <span style="color: white; font-size: ${fontSize.text};">✉️</span>
                            </div>
                            <a href="mailto:${values.email}" style="font-size: ${fontSize.text}; color: ${values.primaryColor}; text-decoration: none;">${values.email}</a>
                          </td>
                        </tr>
                        ${values.website ? `
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <div style="display: inline-block; padding: 4px 10px; background-color: ${values.primaryColor}; border-radius: 20px; margin-right: 5px;">
                                <span style="color: white; font-size: ${fontSize.text};">🌐</span>
                              </div>
                              <a href="${values.website}" style="font-size: ${fontSize.text}; color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a>
                            </td>
                          </tr>
                        ` : ''}
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
              
              <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                ${getModernSocialLinks(values, '28px', 'rounded')}
                ${values.showLogo && values.logoImage ? `
                  <div style="text-align: right;">
                    <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 40px;">
                  </div>
                ` : ''}
              </div>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 11: Geométrico Moderno
  {
    id: 'geometric-modern',
    name: 'Geométrico Moderno',
    description: 'Design com elementos geométricos modernos',
    thumbnail: '/templates/minimalist.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 550px; border-collapse: collapse;">
          <tr>
            <td>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="width: 15px; vertical-align: top;">
                    <div style="width: 4px; height: 100%; background-color: ${values.primaryColor}; border-radius: 2px;"></div>
                  </td>
                  <td style="vertical-align: top; padding-left: 15px;">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: #333; margin-bottom: 5px;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.primaryColor}; margin-bottom: 3px;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: #666; margin-bottom: 10px;">${values.company}</div>` : ''}
                    
                    <table style="border-collapse: collapse; margin-top: 10px;">
                      <tr>
                        <td style="vertical-align: top;">
                          <table style="border-collapse: collapse;">
                            ${values.phone ? `
                              <tr>
                                <td style="padding-bottom: 8px;">
                                  <div style="display: inline-block; width: 8px; height: 8px; background-color: ${values.primaryColor}; transform: rotate(45deg); margin-right: 10px;"></div>
                                  <span style="font-size: ${fontSize.text}; color: #555;">${values.phone}</span>
                                </td>
                              </tr>
                            ` : ''}
                            <tr>
                              <td style="padding-bottom: 8px;">
                                <div style="display: inline-block; width: 8px; height: 8px; background-color: ${values.primaryColor}; transform: rotate(45deg); margin-right: 10px;"></div>
                                <a href="mailto:${values.email}" style="font-size: ${fontSize.text}; color: ${values.primaryColor}; text-decoration: none;">${values.email}</a>
                              </td>
                            </tr>
                            ${values.website ? `
                              <tr>
                                <td style="padding-bottom: 8px;">
                                  <div style="display: inline-block; width: 8px; height: 8px; background-color: ${values.primaryColor}; transform: rotate(45deg); margin-right: 10px;"></div>
                                  <a href="${values.website}" style="font-size: ${fontSize.text}; color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a>
                                </td>
                              </tr>
                            ` : ''}
                          </table>
                        </td>
                        ${values.showProfileImage && values.profileImage ? `
                          <td style="width: 100px; vertical-align: top; text-align: right;">
                            <div style="position: relative; width: 90px; height: 90px;">
                              <div style="position: absolute; top: 0; left: 0; width: 80px; height: 80px; border: 2px solid ${values.primaryColor}; border-radius: 8px; transform: rotate(3deg);"></div>
                              <img src="${values.profileImage}" alt="${values.name}" style="position: absolute; top: 5px; left: 5px; width: 80px; height: 80px; border-radius: 8px; object-fit: cover;">
                            </div>
                          </td>
                        ` : ''}
                      </tr>
                    </table>
                    
                    <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                      ${getModernSocialLinks(values, '24px', 'outline')}
                      ${values.showLogo && values.logoImage ? `
                        <div style="text-align: right;">
                          <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 35px;">
                        </div>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 12: Elegante Minimalista
  {
    id: 'elegant-minimalist',
    name: 'Elegante Minimalista',
    description: 'Design elegante e minimalista com tipografia refinada',
    thumbnail: '/templates/minimalist.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 500px; border-collapse: collapse;">
          <tr>
            <td style="padding-bottom: 15px;">
              <div style="font-size: ${fontSize.name}; font-weight: 300; color: #333; letter-spacing: 1px; text-transform: uppercase;">${values.name}</div>
              ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.primaryColor}; margin-top: 3px; letter-spacing: 0.5px;">${values.jobTitle}</div>` : ''}
            </td>
            ${values.showProfileImage && values.profileImage ? `
              <td style="width: 80px; vertical-align: top; text-align: right;">
                <img src="${values.profileImage}" alt="${values.name}" style="width: 70px; height: 70px; border-radius: 50%; filter: grayscale(100%);">
              </td>
            ` : ''}
          </tr>
          <tr>
            <td colspan="2">
              <div style="height: 1px; background-color: #eee; margin: 10px 0 15px;"></div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: top;">
                    <div style="font-size: ${fontSize.text}; color: #777; margin-bottom: 10px;">
                      ${values.phone ? `<span style="margin-right: 15px;">${values.phone}</span>` : ''}
                      <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a>
                    </div>
                    ${values.website ? `<div style="font-size: ${fontSize.text}; color: #777; margin-bottom: 10px;"><a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.text}; color: #777; margin-top: 5px;">${values.company}</div>` : ''}
                  </td>
                  ${values.showLogo && values.logoImage ? `
                    <td style="vertical-align: bottom; text-align: right;">
                      <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 30px; filter: grayscale(100%);">
                    </td>
                  ` : ''}
                </tr>
              </table>
              <div style="margin-top: 15px;">
                ${values.showSocialIcons ? `
                  <div style="font-size: ${fontSize.text}; color: #777;">
                    ${values.instagram ? `<a href="https://www.instagram.com/${values.instagram.replace('@', '')}" target="_blank" style="color: ${values.primaryColor}; text-decoration: none; margin-right: 10px;">Instagram</a>` : ''}
                    ${values.facebook ? `<a href="https://www.facebook.com/${values.facebook}" target="_blank" style="color: ${values.primaryColor}; text-decoration: none; margin-right: 10px;">Facebook</a>` : ''}
                    ${values.linkedin ? `<a href="https://www.linkedin.com/in/${values.linkedin}" target="_blank" style="color: ${values.primaryColor}; text-decoration: none; margin-right: 10px;">LinkedIn</a>` : ''}
                    ${values.twitter ? `<a href="https://twitter.com/${values.twitter.replace('@', '')}" target="_blank" style="color: ${values.primaryColor}; text-decoration: none;">Twitter</a>` : ''}
                  </div>
                ` : ''}
              </div>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 13: Tech Moderno
  {
    id: 'tech-modern',
    name: 'Tech Moderno',
    description: 'Design inspirado em tecnologia com elementos futuristas',
    thumbnail: '/templates/modern-colored.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 550px; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 0;">
              <div style="height: 5px; background: linear-gradient(90deg, ${values.primaryColor}, ${values.secondaryColor});"></div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 100px; vertical-align: top;">
                      <div style="width: 90px; height: 90px; position: relative; overflow: hidden; border-radius: 10px;">
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);"></div>
                        <img src="${values.profileImage}" alt="${values.name}" style="width: 100%; height: 100%; object-fit: cover;">
                      </div>
                    </td>
                  ` : ''}
                  <td style="vertical-align: top; ${values.showProfileImage ? 'padding-left: 20px;' : ''}">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: #333; margin-bottom: 5px;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.primaryColor}; margin-bottom: 3px;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: #666; margin-bottom: 10px;">${values.company}</div>` : ''}
                    
                    <div style="margin-top: 10px;">
                      <table style="border-collapse: collapse;">
                        ${values.phone ? `
                          <tr>
                            <td style="padding-right: 10px; padding-bottom: 8px;">
                              <div style="width: 24px; height: 24px; background-color: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 12px;">📱</span>
                              </div>
                            </td>
                            <td style="padding-bottom: 8px; font-size: ${fontSize.text}; color: #555;">${values.phone}</td>
                          </tr>
                        ` : ''}
                        <tr>
                          <td style="padding-right: 10px; padding-bottom: 8px;">
                            <div style="width: 24px; height: 24px; background-color: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                              <span style="font-size: 12px;">✉️</span>
                            </div>
                          </td>
                          <td style="padding-bottom: 8px; font-size: ${fontSize.text}; color: #555;">
                            <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a>
                          </td>
                        </tr>
                        ${values.website ? `
                          <tr>
                            <td style="padding-right: 10px; padding-bottom: 8px;">
                              <div style="width: 24px; height: 24px; background-color: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 12px;">🌐</span>
                              </div>
                            </td>
                            <td style="padding-bottom: 8px; font-size: ${fontSize.text}; color: #555;">
                              <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a>
                            </td>
                          </tr>
                        ` : ''}
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
              
              <div style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                ${getModernSocialLinks(values, '26px', 'filled')}
                ${values.showLogo && values.logoImage ? `
                  <div style="text-align: right;">
                    <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 40px;">
                  </div>
                ` : ''}
              </div>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 14: Cartão Empresarial
  {
    id: 'business-card-modern',
    name: 'Cartão Empresarial',
    description: 'Design inspirado em cartão de visita empresarial moderno',
    thumbnail: '/templates/business-card.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 500px; border-collapse: collapse; background-color: white; border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="width: 35%; background-color: ${values.primaryColor}; padding: 20px; vertical-align: middle;">
                    ${values.showProfileImage && values.profileImage ? `
                      <img src="${values.profileImage}" alt="${values.name}" style="width: 100%; max-width: 120px; border-radius: 6px; display: block; margin: 0 auto 15px;">
                    ` : ''}
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: white; text-align: center; margin-bottom: 5px;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: rgba(255,255,255,0.9); text-align: center;">${values.jobTitle}</div>` : ''}
                  </td>
                  <td style="width: 65%; padding: 20px; vertical-align: top;">
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: ${values.primaryColor}; margin-bottom: 15px; font-weight: bold;">${values.company}</div>` : ''}
                    
                    <table style="border-collapse: collapse; width: 100%;">
                      ${values.phone ? `
                        <tr>
                          <td style="padding-bottom: 10px;">
                            <table style="border-collapse: collapse;">
                              <tr>
                                <td style="vertical-align: top; padding-right: 10px; width: 20px;">
                                  <span style="color: ${values.primaryColor}; font-size: ${fontSize.text};">📱</span>
                                </td>
                                <td style="vertical-align: top;">
                                  <span style="font-size: ${fontSize.text}; color: #555;">${values.phone}</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      ` : ''}
                      <tr>
                        <td style="padding-bottom: 10px;">
                          <table style="border-collapse: collapse;">
                            <tr>
                              <td style="vertical-align: top; padding-right: 10px; width: 20px;">
                                <span style="color: ${values.primaryColor}; font-size: ${fontSize.text};">✉️</span>
                              </td>
                              <td style="vertical-align: top;">
                                <a href="mailto:${values.email}" style="font-size: ${fontSize.text}; color: ${values.primaryColor}; text-decoration: none;">${values.email}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${values.website ? `
                        <tr>
                          <td style="padding-bottom: 10px;">
                            <table style="border-collapse: collapse;">
                              <tr>
                                <td style="vertical-align: top; padding-right: 10px; width: 20px;">
                                  <span style="color: ${values.primaryColor}; font-size: ${fontSize.text};">🌐</span>
                                </td>
                                <td style="vertical-align: top;">
                                  <a href="${values.website}" style="font-size: ${fontSize.text}; color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      ` : ''}
                    </table>
                    
                    ${getModernSocialLinks(values, '24px', 'filled')}
                    
                    ${values.showLogo && values.logoImage ? `
                      <div style="margin-top: 15px; text-align: right;">
                        <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 35px;">
                      </div>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 15: Moderno Dividido
  {
    id: 'modern-split',
    name: 'Moderno Dividido',
    description: 'Design moderno com divisão vertical',
    thumbnail: '/templates/corporate-bordered.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 550px; border-collapse: collapse;">
          <tr>
            <td>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="width: 40%; background-color: ${values.primaryColor}; padding: 20px; vertical-align: top; border-radius: 8px 0 0 8px;">
                    ${values.showProfileImage && values.profileImage ? `
                      <div style="text-align: center; margin-bottom: 15px;">
                        <img src="${values.profileImage}" alt="${values.name}" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid white;">
                      </div>
                    ` : ''}
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: white; text-align: center; margin-bottom: 5px;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: rgba(255,255,255,0.9); text-align: center; margin-bottom: 3px;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: rgba(255,255,255,0.8); text-align: center; margin-bottom: 15px;">${values.company}</div>` : ''}
                    
                    ${getModernSocialLinks(values, '26px', 'outline')}
                  </td>
                  <td style="width: 60%; padding: 20px; vertical-align: top; background-color: #f9f9f9; border-radius: 0 8px 8px 0;">
                    <table style="width: 100%; border-collapse: collapse;">
                      ${values.phone ? `
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <table style="border-collapse: collapse;">
                              <tr>
                                <td style="vertical-align: middle; padding-right: 10px; width: 24px;">
                                  <div style="width: 24px; height: 24px; background-color: ${values.primaryColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: white; font-size: 12px;">📱</span>
                                  </div>
                                </td>
                                <td style="vertical-align: middle;">
                                  <span style="font-size: ${fontSize.text}; color: #555;">${values.phone}</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      ` : ''}
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <table style="border-collapse: collapse;">
                            <tr>
                              <td style="vertical-align: middle; padding-right: 10px; width: 24px;">
                                <div style="width: 24px; height: 24px; background-color: ${values.primaryColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                  <span style="color: white; font-size: 12px;">✉️</span>
                                </div>
                              </td>
                              <td style="vertical-align: middle;">
                                <a href="mailto:${values.email}" style="font-size: ${fontSize.text}; color: ${values.primaryColor}; text-decoration: none;">${values.email}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${values.website ? `
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <table style="border-collapse: collapse;">
                              <tr>
                                <td style="vertical-align: middle; padding-right: 10px; width: 24px;">
                                  <div style="width: 24px; height: 24px; background-color: ${values.primaryColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: white; font-size: 12px;">🌐</span>
                                  </div>
                                </td>
                                <td style="vertical-align: middle;">
                                  <a href="${values.website}" style="font-size: ${fontSize.text}; color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      ` : ''}
                    </table>
                    
                    ${values.showLogo && values.logoImage ? `
                      <div style="margin-top: 15px; text-align: right;">
                        <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 40px;">
                      </div>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 16: Assinatura Corporativa
  {
    id: 'corporate-signature',
    name: 'Assinatura Corporativa',
    description: 'Design profissional para ambiente corporativo',
    thumbnail: '/templates/corporate-bordered.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);
      const borderStyle = getBorderStyle(values.borderStyle, values.primaryColor);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 550px; border-collapse: collapse;">
          <tr>
            <td style="padding: 0;">
              <table style="width: 100%; border-collapse: collapse; border-left: 4px solid ${values.primaryColor};">
                <tr>
                  <td style="padding: 15px 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        ${values.showProfileImage && values.profileImage ? `
                          <td style="width: 90px; vertical-align: top;">
                            <img src="${values.profileImage}" alt="${values.name}" style="width: 80px; height: 80px; border-radius: 4px; border: 1px solid #eee;">
                          </td>
                        ` : ''}
                        <td style="vertical-align: top; ${values.showProfileImage && values.profileImage ? 'padding-left: 15px;' : ''}">
                          <div style="font-size: ${fontSize.name}; font-weight: bold; color: #333; margin-bottom: 5px;">${values.name}</div>
                          ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.primaryColor}; margin-bottom: 3px;">${values.jobTitle}</div>` : ''}
                          ${values.company ? `<div style="font-size: ${fontSize.job}; color: #666; margin-bottom: 10px;">${values.company}</div>` : ''}
                          
                          <table style="border-collapse: collapse; margin-top: 10px;">
                            ${values.phone ? `
                              <tr>
                                <td style="padding-bottom: 5px;">
                                  <table style="border-collapse: collapse;">
                                    <tr>
                                      <td style="vertical-align: middle; padding-right: 8px; width: 18px; color: ${values.primaryColor};">📱</td>
                                      <td style="vertical-align: middle; font-size: ${fontSize.text}; color: #555;">${values.phone}</td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            ` : ''}
                            <tr>
                              <td style="padding-bottom: 5px;">
                                <table style="border-collapse: collapse;">
                                  <tr>
                                    <td style="vertical-align: middle; padding-right: 8px; width: 18px; color: ${values.primaryColor};">✉️</td>
                                    <td style="vertical-align: middle; font-size: ${fontSize.text}; color: #555;">
                                      <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            ${values.website ? `
                              <tr>
                                <td style="padding-bottom: 5px;">
                                  <table style="border-collapse: collapse;">
                                    <tr>
                                      <td style="vertical-align: middle; padding-right: 8px; width: 18px; color: ${values.primaryColor};">🌐</td>
                                      <td style="vertical-align: middle; font-size: ${fontSize.text}; color: #555;">
                                        <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            ` : ''}
                          </table>
                        </td>
                        ${values.showLogo && values.logoImage ? `
                          <td style="width: 120px; vertical-align: top; text-align: right;">
                            <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="max-width: 100px; max-height: 60px;">
                          </td>
                        ` : ''}
                      </tr>
                    </table>
                    ${getModernSocialLinks(values, '24px', 'filled')}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 17: Assinatura Moderna com Foto
  {
    id: 'modern-photo',
    name: 'Moderna com Foto',
    description: 'Design moderno com destaque para foto',
    thumbnail: '/templates/classic-horizontal.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 550px; border-collapse: collapse;">
          <tr>
            <td>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 130px; vertical-align: top;">
                      <div style="position: relative; width: 120px; height: 120px; overflow: hidden; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <img src="${values.profileImage}" alt="${values.name}" style="width: 100%; height: 100%; object-fit: cover;">
                        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 30px; background: linear-gradient(transparent, rgba(0,0,0,0.7)); padding: 5px 0;">
                          <div style="font-size: 12px; color: white; text-align: center; text-shadow: 1px 1px 1px rgba(0,0,0,0.5);">${values.name.split(' ')[0]}</div>
                        </div>
                      </div>
                    </td>
                  ` : ''}
                  <td style="vertical-align: top; ${values.showProfileImage && values.profileImage ? 'padding-left: 15px;' : ''}">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: ${values.primaryColor}; margin-bottom: 5px;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: #555; margin-bottom: 3px;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: #777; margin-bottom: 10px;">${values.company}</div>` : ''}
                    
                    <div style="margin-top: 10px;">
                      <table style="border-collapse: collapse;">
                        ${values.phone ? `
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <span style="font-size: ${fontSize.text}; color: #555;">📱 ${values.phone}</span>
                            </td>
                          </tr>
                        ` : ''}
                        <tr>
                          <td style="padding-bottom: 8px;">
                            <span style="font-size: ${fontSize.text}; color: #555;">✉️ <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a></span>
                          </td>
                        </tr>
                        ${values.website ? `
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <span style="font-size: ${fontSize.text}; color: #555;">🌐 <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a></span>
                            </td>
                          </tr>
                        ` : ''}
                      </table>
                    </div>
                    
                    <div style="margin-top: 10px;">
                      ${getModernSocialLinks(values, '26px', 'rounded')}
                    </div>
                  </td>
                  ${values.showLogo && values.logoImage ? `
                    <td style="width: 100px; vertical-align: top; text-align: right;">
                      <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="max-width: 90px; max-height: 50px;">
                    </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 18: Assinatura Minimalista Moderna
  {
    id: 'modern-minimalist',
    name: 'Minimalista Moderna',
    description: 'Design minimalista com toques modernos',
    thumbnail: '/templates/minimalist.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 500px; border-collapse: collapse;">
          <tr>
            <td style="padding-bottom: 15px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle;">
                    <div style="font-size: ${fontSize.name}; font-weight: 300; color: #333; letter-spacing: 1px;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.primaryColor}; margin-top: 3px;">${values.jobTitle}</div>` : ''}
                  </td>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 60px; vertical-align: middle; text-align: right;">
                      <img src="${values.profileImage}" alt="${values.name}" style="width: 50px; height: 50px; border-radius: 50%;">
                    </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <div style="height: 1px; background-color: #eee; margin: 5px 0 15px;"></div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: top;">
                    <div style="font-size: ${fontSize.text}; color: #777;">
                      ${values.phone ? `<span style="margin-right: 15px;">${values.phone}</span>` : ''}
                      <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a>
                      ${values.website ? `<span style="margin: 0 10px;">•</span><a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a>` : ''}
                    </div>
                    ${values.company ? `<div style="font-size: ${fontSize.text}; color: #777; margin-top: 8px;">${values.company}</div>` : ''}
                  </td>
                  ${values.showLogo && values.logoImage ? `
                    <td style="vertical-align: bottom; text-align: right;">
                      <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="height: 30px;">
                    </td>
                  ` : ''}
                </tr>
              </table>
              <div style="margin-top: 15px;">
                ${getModernSocialLinks(values, '20px', 'outline')}
              </div>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 19: Assinatura Criativa
  {
    id: 'creative-signature',
    name: 'Assinatura Criativa',
    description: 'Design criativo com elementos visuais distintos',
    thumbnail: '/templates/modern-colored.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 550px; border-collapse: collapse;">
          <tr>
            <td style="padding: 0;">
              <div style="position: relative; background-color: ${values.primaryColor}; padding: 15px; border-radius: 8px 8px 0 0; overflow: hidden;">
                <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background-color: ${values.secondaryColor}; border-radius: 0 0 0 100px; opacity: 0.3;"></div>
                <div style="position: relative; z-index: 1;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      ${values.showProfileImage && values.profileImage ? `
                        <td style="width: 80px; vertical-align: middle;">
                          <img src="${values.profileImage}" alt="${values.name}" style="width: 70px; height: 70px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                        </td>
                      ` : ''}
                      <td style="vertical-align: middle; ${values.showProfileImage && values.profileImage ? 'padding-left: 15px;' : ''}">
                        <div style="font-size: ${fontSize.name}; font-weight: bold; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">${values.name}</div>
                        ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: rgba(255,255,255,0.9); margin-top: 3px;">${values.jobTitle}</div>` : ''}
                      </td>
                      ${values.showLogo && values.logoImage ? `
                        <td style="vertical-align: middle; text-align: right;">
                          <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="max-height: 40px; filter: brightness(0) invert(1);">
                        </td>
                      ` : ''}
                    </tr>
                  </table>
                </div>
              </div>
              
              <div style="background-color: white; padding: 15px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td>
                      ${values.company ? `<div style="font-size: ${fontSize.job}; color: #666; margin-bottom: 10px;">${values.company}</div>` : ''}
                      
                      <table style="border-collapse: collapse;">
                        ${values.phone ? `
                          <tr>
                            <td style="padding-right: 15px; padding-bottom: 8px;">
                              <table style="border-collapse: collapse;">
                                <tr>
                                  <td style="vertical-align: middle; padding-right: 8px;">
                                    <div style="width: 24px; height: 24px; background-color: ${values.primaryColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                      <span style="color: white; font-size: 12px;">📱</span>
                                    </div>
                                  </td>
                                  <td style="vertical-align: middle; font-size: ${fontSize.text}; color: #555;">${values.phone}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        ` : ''}
                        <tr>
                          <td style="padding-right: 15px; padding-bottom: 8px;">
                            <table style="border-collapse: collapse;">
                              <tr>
                                <td style="vertical-align: middle; padding-right: 8px;">
                                  <div style="width: 24px; height: 24px; background-color: ${values.primaryColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: white; font-size: 12px;">✉️</span>
                                  </div>
                                </td>
                                <td style="vertical-align: middle; font-size: ${fontSize.text}; color: #555;">
                                  <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        ${values.website ? `
                          <tr>
                            <td style="padding-right: 15px; padding-bottom: 8px;">
                              <table style="border-collapse: collapse;">
                                <tr>
                                  <td style="vertical-align: middle; padding-right: 8px;">
                                    <div style="width: 24px; height: 24px; background-color: ${values.primaryColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                      <span style="color: white; font-size: 12px;">🌐</span>
                                    </div>
                                  </td>
                                  <td style="vertical-align: middle; font-size: ${fontSize.text}; color: #555;">
                                    <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        ` : ''}
                      </table>
                      
                      <div style="margin-top: 10px;">
                        ${getModernSocialLinks(values, '26px', 'gradient')}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 20: Assinatura Moderna Horizontal
  {
    id: 'modern-horizontal',
    name: 'Moderna Horizontal',
    description: 'Layout horizontal com design moderno',
    thumbnail: '/templates/classic-horizontal.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 600px; border-collapse: collapse;">
          <tr>
            <td>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 100px; vertical-align: middle; padding-right: 20px;">
                      <img src="${values.profileImage}" alt="${values.name}" style="width: 90px; height: 90px; border-radius: 8px; object-fit: cover; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">
                    </td>
                  ` : ''}
                  <td style="vertical-align: middle;">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: ${values.primaryColor}; margin-bottom: 5px;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: #555; margin-bottom: 3px;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: #777; margin-bottom: 10px;">${values.company}</div>` : ''}
                  </td>
                  <td style="vertical-align: middle; padding-left: 20px; border-left: 1px solid #eee;">
                    <table style="border-collapse: collapse;">
                      ${values.phone ? `
                        <tr>
                          <td style="padding-bottom: 8px;">
                            <span style="font-size: ${fontSize.text}; color: #555;">📱 ${values.phone}</span>
                          </td>
                        </tr>
                      ` : ''}
                      <tr>
                        <td style="padding-bottom: 8px;">
                          <span style="font-size: ${fontSize.text}; color: #555;">✉️ <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a></span>
                        </td>
                      </tr>
                      ${values.website ? `
                        <tr>
                          <td style="padding-bottom: 8px;">
                            <span style="font-size: ${fontSize.text}; color: #555;">🌐 <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a></span>
                          </td>
                        </tr>
                      ` : ''}
                    </table>
                  </td>
                  ${values.showLogo && values.logoImage ? `
                    <td style="width: 100px; vertical-align: middle; text-align: right;">
                      <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="max-width: 90px; max-height: 50px;">
                    </td>
                  ` : ''}
                </tr>
              </table>
              <div style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 15px;">
                ${getModernSocialLinks(values, '24px', 'filled')}
              </div>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 21: Assinatura Moderna com Destaque
  {
    id: 'modern-highlight',
    name: 'Moderna com Destaque',
    description: 'Design moderno com elementos de destaque',
    thumbnail: '/templates/modern-colored.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 550px; border-collapse: collapse;">
          <tr>
            <td style="padding: 0;">
              <table style="width: 100%; border-collapse: collapse; background-color: #f9f9f9; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <tr>
                  <td style="padding: 0;">
                    <div style="height: 8px; background: linear-gradient(90deg, ${values.primaryColor}, ${values.secondaryColor});"></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        ${values.showProfileImage && values.profileImage ? `
                          <td style="width: 100px; vertical-align: top;">
                            <div style="width: 90px; height: 90px; border-radius: 8px; overflow: hidden; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">
                              <img src="${values.profileImage}" alt="${values.name}" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                          </td>
                        ` : ''}
                        <td style="vertical-align: top; ${values.showProfileImage && values.profileImage ? 'padding-left: 20px;' : ''}">
                          <div style="font-size: ${fontSize.name}; font-weight: bold; color: #333; margin-bottom: 5px;">${values.name}</div>
                          ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.primaryColor}; margin-bottom: 3px;">${values.jobTitle}</div>` : ''}
                          ${values.company ? `<div style="font-size: ${fontSize.job}; color: #666; margin-bottom: 10px;">${values.company}</div>` : ''}
                          
                          <div style="margin-top: 10px;">
                            <table style="border-collapse: collapse;">
                              ${values.phone ? `
                                <tr>
                                  <td style="padding-bottom: 8px;">
                                    <table style="border-collapse: collapse;">
                                      <tr>
                                        <td style="vertical-align: middle; padding-right: 8px; width: 22px;">
                                          <div style="width: 22px; height: 22px; background-color: ${values.primaryColor}; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                                            <span style="color: white; font-size: 12px;">📱</span>
                                          </div>
                                        </td>
                                        <td style="vertical-align: middle; font-size: ${fontSize.text}; color: #555;">${values.phone}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              ` : ''}
                              <tr>
                                <td style="padding-bottom: 8px;">
                                  <table style="border-collapse: collapse;">
                                    <tr>
                                      <td style="vertical-align: middle; padding-right: 8px; width: 22px;">
                                        <div style="width: 22px; height: 22px; background-color: ${values.primaryColor}; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                                          <span style="color: white; font-size: 12px;">✉️</span>
                                        </div>
                                      </td>
                                      <td style="vertical-align: middle; font-size: ${fontSize.text}; color: #555;">
                                        <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              ${values.website ? `
                                <tr>
                                  <td style="padding-bottom: 8px;">
                                    <table style="border-collapse: collapse;">
                                      <tr>
                                        <td style="vertical-align: middle; padding-right: 8px; width: 22px;">
                                          <div style="width: 22px; height: 22px; background-color: ${values.primaryColor}; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                                            <span style="color: white; font-size: 12px;">🌐</span>
                                          </div>
                                        </td>
                                        <td style="vertical-align: middle; font-size: ${fontSize.text}; color: #555;">
                                          <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              ` : ''}
                            </table>
                          </div>
                        </td>
                        ${values.showLogo && values.logoImage ? `
                          <td style="width: 100px; vertical-align: top; text-align: right;">
                            <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="max-width: 90px; max-height: 50px;">
                          </td>
                        ` : ''}
                      </tr>
                    </table>
                    
                    <div style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 15px;">
                      ${getModernSocialLinks(values, '24px', 'rounded')}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 22: Assinatura Moderna Simples
  {
    id: 'modern-simple',
    name: 'Moderna Simples',
    description: 'Design moderno com layout simples e elegante',
    thumbnail: '/templates/minimalist.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 500px; border-collapse: collapse;">
          <tr>
            <td>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: top;">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: ${values.primaryColor}; margin-bottom: 5px;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: #555; margin-bottom: 3px;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: #777; margin-bottom: 10px;">${values.company}</div>` : ''}
                    
                    <div style="height: 2px; width: 50px; background-color: ${values.primaryColor}; margin: 10px 0;"></div>
                    
                    <div style="margin-top: 10px;">
                      <table style="border-collapse: collapse;">
                        ${values.phone ? `
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <span style="font-size: ${fontSize.text}; color: #555;">${values.phone}</span>
                            </td>
                          </tr>
                        ` : ''}
                        <tr>
                          <td style="padding-bottom: 8px;">
                            <a href="mailto:${values.email}" style="font-size: ${fontSize.text}; color: ${values.primaryColor}; text-decoration: none;">${values.email}</a>
                          </td>
                        </tr>
                        ${values.website ? `
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <a href="${values.website}" style="font-size: ${fontSize.text}; color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a>
                            </td>
                          </tr>
                        ` : ''}
                      </table>
                    </div>
                    
                    <div style="margin-top: 10px;">
                      ${getModernSocialLinks(values, '22px', 'outline')}
                    </div>
                  </td>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 100px; vertical-align: top; text-align: right;">
                      <img src="${values.profileImage}" alt="${values.name}" style="width: 90px; height: 90px; border-radius: 50%; border: 2px solid ${values.primaryColor};">
                      ${values.showLogo && values.logoImage ? `
                        <div style="margin-top: 15px;">
                          <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="max-width: 90px; max-height: 40px;">
                        </div>
                      ` : ''}
                    </td>
                  ` : values.showLogo && values.logoImage ? `
                    <td style="width: 100px; vertical-align: top; text-align: right;">
                      <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="max-width: 90px; max-height: 50px;">
                    </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 23: Assinatura Moderna com Bordas
  {
    id: 'modern-bordered',
    name: 'Moderna com Bordas',
    description: 'Design moderno com bordas elegantes',
    thumbnail: '/templates/corporate-bordered.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);
      const borderStyle = getBorderStyle(values.borderStyle, values.primaryColor);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 550px; border-collapse: collapse; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 100px; vertical-align: top;">
                      <img src="${values.profileImage}" alt="${values.name}" style="width: 90px; height: 90px; border-radius: 8px; border: 1px solid #e0e0e0;">
                    </td>
                  ` : ''}
                  <td style="vertical-align: top; ${values.showProfileImage && values.profileImage ? 'padding-left: 20px;' : ''}">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: ${values.primaryColor}; margin-bottom: 5px;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: #555; margin-bottom: 3px;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: #777; margin-bottom: 10px;">${values.company}</div>` : ''}
                    
                    <div style="margin-top: 10px;">
                      <table style="border-collapse: collapse;">
                        ${values.phone ? `
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <span style="font-size: ${fontSize.text}; color: #555;">📱 ${values.phone}</span>
                            </td>
                          </tr>
                        ` : ''}
                        <tr>
                          <td style="padding-bottom: 8px;">
                            <span style="font-size: ${fontSize.text}; color: #555;">✉️ <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a></span>
                          </td>
                        </tr>
                        ${values.website ? `
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <span style="font-size: ${fontSize.text}; color: #555;">🌐 <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a></span>
                            </td>
                          </tr>
                        ` : ''}
                      </table>
                    </div>
                  </td>
                  ${values.showLogo && values.logoImage ? `
                    <td style="width: 100px; vertical-align: top; text-align: right;">
                      <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="max-width: 90px; max-height: 50px;">
                    </td>
                  ` : ''}
                </tr>
              </table>
              
              <div style="margin-top: 15px; border-top: 1px solid #e0e0e0; padding-top: 15px;">
                ${getModernSocialLinks(values, '24px', 'filled')}
              </div>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 24: Assinatura Moderna Compacta
  {
    id: 'modern-compact',
    name: 'Moderna Compacta',
    description: 'Design moderno com layout compacto',
    thumbnail: '/templates/minimalist.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 450px; border-collapse: collapse;">
          <tr>
            <td>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 70px; vertical-align: middle;">
                      <img src="${values.profileImage}" alt="${values.name}" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid ${values.primaryColor};">
                    </td>
                  ` : ''}
                  <td style="vertical-align: middle;">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: ${values.primaryColor};">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: #555;">${values.jobTitle}</div>` : ''}
                    ${values.company ? `<div style="font-size: ${fontSize.job}; color: #777;">${values.company}</div>` : ''}
                  </td>
                  ${values.showLogo && values.logoImage ? `
                    <td style="width: 70px; vertical-align: middle; text-align: right;">
                      <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="max-width: 60px; max-height: 40px;">
                    </td>
                  ` : ''}
                </tr>
              </table>
              
              <div style="margin-top: 10px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td>
                      <span style="font-size: ${fontSize.text}; color: #555;">
                        ${values.phone ? `📱 ${values.phone} &nbsp;|&nbsp; ` : ''}
                        ✉️ <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a>
                        ${values.website ? ` &nbsp;|&nbsp; 🌐 <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a>` : ''}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
              
              <div style="margin-top: 10px;">
                ${getModernSocialLinks(values, '20px', 'outline')}
              </div>
            </td>
          </tr>
        </table>
      `;
    }
  },

  // Template 25: Assinatura Moderna Elegante
  {
    id: 'modern-elegant',
    name: 'Moderna Elegante',
    description: 'Design moderno com estilo elegante',
    thumbnail: '/templates/classic-horizontal.svg',
    generateHTML: (values: SignatureFormValues): string => {
      const fontSize = getFontSize(values.fontSize);

      return `
        <table style="font-family: ${values.fontFamily}; max-width: 550px; border-collapse: collapse;">
          <tr>
            <td style="padding-bottom: 15px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle;">
                    <div style="font-size: ${fontSize.name}; font-weight: bold; color: #333; letter-spacing: 0.5px;">${values.name}</div>
                    ${values.jobTitle ? `<div style="font-size: ${fontSize.job}; color: ${values.primaryColor}; margin-top: 3px; letter-spacing: 0.3px;">${values.jobTitle}</div>` : ''}
                  </td>
                  ${values.showProfileImage && values.profileImage ? `
                    <td style="width: 70px; vertical-align: middle; text-align: right;">
                      <img src="${values.profileImage}" alt="${values.name}" style="width: 60px; height: 60px; border-radius: 30px 0 30px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <div style="height: 1px; background: linear-gradient(to right, ${values.primaryColor}, transparent); margin-bottom: 15px;"></div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: top;">
                    <table style="border-collapse: collapse;">
                      ${values.company ? `
                        <tr>
                          <td style="padding-bottom: 10px;">
                            <span style="font-size: ${fontSize.job}; color: #777;">${values.company}</span>
                          </td>
                        </tr>
                      ` : ''}
                      ${values.phone ? `
                        <tr>
                          <td style="padding-bottom: 5px;">
                            <span style="font-size: ${fontSize.text}; color: #555;">📱 ${values.phone}</span>
                          </td>
                        </tr>
                      ` : ''}
                      <tr>
                        <td style="padding-bottom: 5px;">
                          <span style="font-size: ${fontSize.text}; color: #555;">✉️ <a href="mailto:${values.email}" style="color: ${values.primaryColor}; text-decoration: none;">${values.email}</a></span>
                        </td>
                      </tr>
                      ${values.website ? `
                        <tr>
                          <td style="padding-bottom: 5px;">
                            <span style="font-size: ${fontSize.text}; color: #555;">🌐 <a href="${values.website}" style="color: ${values.primaryColor}; text-decoration: none;">${values.website.replace(/^https?:\/\//, '')}</a></span>
                          </td>
                        </tr>
                      ` : ''}
                    </table>
                  </td>
                  ${values.showLogo && values.logoImage ? `
                    <td style="width: 100px; vertical-align: bottom; text-align: right;">
                      <img src="${values.logoImage}" alt="${values.company || 'Logo'}" style="max-width: 90px; max-height: 50px;">
                    </td>
                  ` : ''}
                </tr>
              </table>
              <div style="margin-top: 15px;">
                ${getModernSocialLinks(values, '22px', 'gradient')}
              </div>
            </td>
          </tr>
        </table>
      `;
    }
  },
];