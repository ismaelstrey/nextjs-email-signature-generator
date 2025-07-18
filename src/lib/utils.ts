import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Verifica se é um número de telefone brasileiro
  if (cleaned.length === 11) {
    // Formato: (XX) XXXXX-XXXX (celular)
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
  } else if (cleaned.length === 10) {
    // Formato: (XX) XXXX-XXXX (fixo)
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
  }
  
  // Retorna o número original se não corresponder aos formatos esperados
  return phone;
}

export function downloadHTML(html: string, filename: string = 'assinatura.html') {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Cria um arquivo HTML específico para importação no Gmail.
 * O Gmail tem requisitos específicos para importação de assinaturas.
 * Esta função cria um arquivo HTML que pode ser importado diretamente nas configurações do Gmail.
 */
export function downloadForGmail(html: string, filename: string = 'assinatura-gmail.html') {
  // Cria um HTML simplificado que o Gmail pode importar mais facilmente
  const gmailCompatibleHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Assinatura para Gmail</title>
</head>
<body>
  ${html}
</body>
</html>`;
  
  const blob = new Blob([gmailCompatibleHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    // Tenta usar a API moderna do Clipboard primeiro
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          console.error('Erro ao copiar usando Clipboard API:', err);
          // Se falhar, tenta o método alternativo
          fallbackCopyToClipboard();
        });
    } else {
      // Navegadores que não suportam a API Clipboard
      fallbackCopyToClipboard();
    }
    
    // Método alternativo usando execCommand
    function fallbackCopyToClipboard() {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        textarea.setAttribute('readonly', '');
        document.body.appendChild(textarea);
        
        // Seleciona o texto
        textarea.focus();
        textarea.select();
        
        // Executa o comando de cópia
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        
        if (successful) {
          resolve(true);
        } else {
          console.error('Falha ao copiar texto usando execCommand');
          resolve(false);
        }
      } catch (err) {
        console.error('Erro ao copiar texto:', err);
        resolve(false);
      }
    }
  });
}

/**
 * Prepara a assinatura HTML para o Gmail, que não aceita código HTML diretamente.
 * Esta função cria um elemento temporário, insere o HTML nele e copia o conteúdo
 * formatado para a área de transferência, pronto para ser colado no Gmail.
 * 
 * Usa uma combinação de técnicas para garantir compatibilidade com diferentes navegadores.
 */
export function prepareForGmail(html: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      // Cria um elemento temporário
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      tempDiv.setAttribute('contenteditable', 'true'); // Importante para o Firefox
      tempDiv.style.position = 'fixed';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);
      
      // Pequeno atraso para garantir que o DOM esteja pronto
      setTimeout(() => {
        try {
          // Seleciona o conteúdo
          tempDiv.focus();
          const range = document.createRange();
          range.selectNodeContents(tempDiv);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
          
          // Tenta usar a API moderna primeiro
          navigator.clipboard.writeText(tempDiv.innerHTML)
            .then(() => {
              document.body.removeChild(tempDiv);
              resolve(true);
            })
            .catch(() => {
              // Fallback para o método antigo
              const success = document.execCommand('copy');
              document.body.removeChild(tempDiv);
              resolve(success);
            });
        } catch (innerError) {
          console.error('Erro ao selecionar conteúdo:', innerError);
          document.body.removeChild(tempDiv);
          resolve(false);
        }
      }, 100);
    } catch (error) {
      console.error('Erro ao preparar para o Gmail:', error);
      resolve(false);
    }
  });
}