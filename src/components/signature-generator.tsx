'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Copy, Download, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { signatureFormSchema, SignatureFormValues } from '@/types/signature';
import { signatureTemplates } from '@/templates/signature-templates';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { copyToClipboard, downloadHTML, downloadForGmail, formatPhoneNumber, prepareForGmail } from '@/lib/utils';

export default function SignatureGenerator() {
  const [activeTemplate, setActiveTemplate] = useState(signatureTemplates[0]);
  const [livePreviewHTML, setLivePreviewHTML] = useState('');
  const [previewMode, setPreviewMode] = useState(true);
  const [generatedHTML, setGeneratedHTML] = useState('');
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignatureFormValues>({
    resolver: zodResolver(signatureFormSchema),
    defaultValues: {
      name: '',
      jobTitle: '',
      department: '',
      company: '',
      email: '',
      phone: '',
      whatsapp: '',
      website: '',
      instagram: '',
      facebook: '',
      linkedin: '',
      twitter: '',
      showProfileImage: true,
      showLogo: false,
      showSocialIcons: true,
      primaryColor: '#0f766e',
      secondaryColor: '#334155',
      fontFamily: 'Arial, sans-serif',
      fontSize: 'medium',
      borderStyle: 'solid',
    },
  });

  const watchedValues = watch();

  // Atualiza a pré-visualização em tempo real quando os valores do formulário ou o template mudam
  useEffect(() => {
    try {
      if (watchedValues.name) {
        const html = activeTemplate.generateHTML(watchedValues);
        setLivePreviewHTML(html);
      }
    } catch (error) {
      // Ignora erros durante a pré-visualização em tempo real
      // Isso pode acontecer quando campos obrigatórios ainda não foram preenchidos
      console.log('Erro na pré-visualização:', error);
    }
  }, [watchedValues, activeTemplate]);

  // Função para lidar com o upload de imagem de perfil
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setValue('profileImage', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para lidar com o upload de logo
  const handleLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setValue('logoImage', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para lidar com URL da imagem de perfil
  const handleProfileImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      setValue('profileImage', url);
    }
  };

  // Função para lidar com URL da logo
  const handleLogoImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      setValue('logoImage', url);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setValue('phone', formattedPhone);
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setValue('whatsapp', formattedPhone);
  };

  // Função para gerar a assinatura
  const handleGenerateSignature = (data: SignatureFormValues) => {
    console.log("Função handleGenerateSignature executada", data);
    try {
      console.log("Gerando HTML da assinatura...");
      const html = activeTemplate.generateHTML(data);
      console.log("HTML gerado com sucesso:", html.substring(0, 50) + "...");

      console.log("Atualizando estado com o HTML gerado");
      setGeneratedHTML(html);

      console.log("Exibindo toast de sucesso");
      toast({
        title: 'Assinatura gerada com sucesso!',
        description: 'Agora você pode copiar ou baixar sua assinatura.',
      });

      console.log("Retornando HTML gerado");
      return html;
    } catch (error) {
      console.error("Erro em handleGenerateSignature:", error);
      toast({
        title: 'Erro ao gerar assinatura',
        description: 'Ocorreu um erro ao gerar sua assinatura. Tente novamente.',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Função para copiar a assinatura para o email
  const handleCopyToEmail = (data: SignatureFormValues) => {
    console.log("Função handleCopyToEmail executada", data);
    try {
      // Gerar o HTML diretamente usando activeTemplate em vez de chamar handleGenerateSignature
      // para evitar possíveis problemas de retorno
      console.log("Gerando HTML diretamente...");
      let html;
      try {
        html = activeTemplate.generateHTML(data);
        console.log("HTML gerado diretamente:", html ? html.substring(0, 50) + "..." : "Falha");

        // Atualizar o estado com o HTML gerado
        setGeneratedHTML(html);
      } catch (htmlError) {
        console.error("Erro ao gerar HTML diretamente:", htmlError);
        toast({
          title: 'Erro ao gerar assinatura',
          description: 'Ocorreu um erro ao gerar sua assinatura. Tente novamente.',
          variant: 'destructive',
        });
        return;
      }

      if (html) {
        console.log("Tentando copiar para clipboard...");
        copyToClipboard(html)
          .then((success) => {
            console.log("Resultado da cópia:", success ? "Sucesso" : "Falha");
            if (success) {
              console.log("Copiado para o clipboard com sucesso");
              toast({
                title: 'Assinatura de email gerada!',
                description: 'A assinatura foi copiada para a área de transferência e está pronta para ser colada no seu cliente de email.',
              });
            } else {
              console.error("Falha ao copiar para o clipboard");
              toast({
                title: 'Erro ao copiar para o clipboard',
                description: 'Não foi possível copiar a assinatura. Tente novamente.',
                variant: 'destructive',
              });
            }
          })
          .catch((error) => {
            console.error("Erro ao copiar para o clipboard:", error);
            toast({
              title: 'Erro ao copiar para o clipboard',
              description: 'Ocorreu um erro ao copiar a assinatura. Tente novamente.',
              variant: 'destructive',
            });
          });
      }
    } catch (error) {
      console.error("Erro em handleCopyToEmail:", error);
      toast({
        title: 'Erro ao processar assinatura',
        description: 'Ocorreu um erro ao processar a assinatura. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  // Função para copiar a assinatura para o Gmail
  const handleCopyToGmail = (data: SignatureFormValues) => {
    const html = handleGenerateSignature(data);
    if (html) {
      prepareForGmail(html).then((success) => {
        if (success) {
          toast({
            title: 'Assinatura pronta para o Gmail!',
            description: 'A assinatura foi formatada e copiada. Cole-a diretamente nas configurações do Gmail.',
          });
        } else {
          toast({
            title: 'Erro ao preparar para o Gmail',
            description: 'Não foi possível preparar a assinatura para o Gmail. Tente novamente.',
            variant: 'destructive',
          });
        }
      });
    }
  };

  // Função para baixar a assinatura para o Gmail
  const handleDownloadForGmail = (data: SignatureFormValues) => {
    console.log("gerar email")
    const html = handleGenerateSignature(data);
    if (html) {
      downloadForGmail(html);
      toast({
        title: 'Arquivo para Gmail gerado!',
        description: 'Baixe o arquivo HTML e importe-o nas configurações do Gmail.',
      });
    }
  };

  const onSubmit = handleGenerateSignature;

  const handleCopyHTML = () => {
    copyToClipboard(generatedHTML);
    toast({
      title: 'HTML copiado!',
      description: 'O código HTML da assinatura foi copiado para a área de transferência.',
    });
  };

  const handleDownloadHTML = () => {
    downloadHTML(generatedHTML, `assinatura-${watchedValues.name.toLowerCase().replace(/\s+/g, '-')}`);
    toast({
      title: 'Download iniciado!',
      description: 'O arquivo HTML da assinatura está sendo baixado.',
    });
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Formulário */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 bg-card rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-primary">Personalize sua assinatura</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Seleção de modelo */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Escolha um modelo</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {signatureTemplates.map((template, key) => (
                  <div
                    key={template.id}
                    onClick={() => setActiveTemplate(template)}
                    className={`cursor-pointer rounded-lg border-2 p-2 transition-all ${activeTemplate.id === template.id ? 'border-primary' : 'border-border hover:border-primary/50'}`}
                  >
                    <div className="aspect-video bg-muted rounded flex items-center justify-center mb-2 overflow-hidden">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-bold">{key}</p>
                    <p className="text-sm font-bold">{template.name}</p>
                    <p className="text-xs text-center">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Informações pessoais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações pessoais</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome completo *</label>
                  <input
                    type="text"
                    {...register('name')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Seu nome completo"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Cargo</label>
                  <input
                    type="text"
                    {...register('jobTitle')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Seu cargo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Departamento</label>
                  <input
                    type="text"
                    {...register('department')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Seu departamento"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Empresa</label>
                  <input
                    type="text"
                    {...register('company')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Nome da empresa"
                  />
                </div>
              </div>
            </div>

            {/* Informações de contato */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações de contato</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">E-mail *</label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="seu.email@exemplo.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Telefone</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    onChange={handlePhoneChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">WhatsApp</label>
                  <input
                    type="tel"
                    {...register('whatsapp')}
                    onChange={handleWhatsappChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Website</label>
                  <input
                    type="url"
                    {...register('website')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://seusite.com"
                  />
                </div>
              </div>
            </div>

            {/* Redes sociais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Redes sociais</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Instagram</label>
                  <input
                    type="text"
                    {...register('instagram')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="@seuusuario"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Facebook</label>
                  <input
                    type="text"
                    {...register('facebook')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="seuusuario"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn</label>
                  <input
                    type="text"
                    {...register('linkedin')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="seuusuario"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Twitter</label>
                  <input
                    type="text"
                    {...register('twitter')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="@seuusuario"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showSocialIcons"
                  {...register('showSocialIcons')}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="showSocialIcons" className="text-sm">Mostrar ícones de redes sociais</label>
              </div>
            </div>

            {/* Imagens */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Imagens</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="showProfileImage"
                      {...register('showProfileImage')}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="showProfileImage" className="text-sm font-medium">Foto de perfil</label>
                  </div>

                  {watchedValues.showProfileImage && (
                    <div className="mt-2 space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Upload de arquivo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageChange}
                          className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary file:text-white
                            hover:file:bg-primary/80"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Ou URL da imagem</label>
                        <input
                          type="url"
                          placeholder="https://exemplo.com/imagem.jpg"
                          onChange={handleProfileImageUrl}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      {watchedValues.profileImage && (
                        <div className="mt-2">
                          <img
                            src={watchedValues.profileImage}
                            alt="Foto de perfil"
                            className="w-20 h-20 object-cover rounded-full border-2 border-primary"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="showLogo"
                      {...register('showLogo')}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="showLogo" className="text-sm font-medium">Logo da empresa</label>
                  </div>

                  {watchedValues.showLogo && (
                    <div className="mt-2 space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Upload de arquivo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoImageChange}
                          className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary file:text-white
                            hover:file:bg-primary/80"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Ou URL da imagem</label>
                        <input
                          type="url"
                          placeholder="https://exemplo.com/logo.png"
                          onChange={handleLogoImageUrl}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      {watchedValues.logoImage && (
                        <div className="mt-2">
                          <img
                            src={watchedValues.logoImage}
                            alt="Logo da empresa"
                            className="h-12 object-contain"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Estilo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Estilo</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Cor primária</label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      value={watchedValues.primaryColor}
                      onChange={(e) => setValue('primaryColor', e.target.value)}
                      className="w-10 h-10 rounded-md border-0 p-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      {...register('primaryColor')}
                      className="ml-2 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Cor secundária</label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      value={watchedValues.secondaryColor}
                      onChange={(e) => setValue('secondaryColor', e.target.value)}
                      className="w-10 h-10 rounded-md border-0 p-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      {...register('secondaryColor')}
                      className="ml-2 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Fonte</label>
                  <select
                    {...register('fontFamily')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Helvetica Neue', Helvetica, Arial, sans-serif">Helvetica</option>
                    <option value="'Times New Roman', Times, serif">Times New Roman</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="'Courier New', Courier, monospace">Courier New</option>
                    <option value="Verdana, Geneva, sans-serif">Verdana</option>
                    <option value="Tahoma, Geneva, sans-serif">Tahoma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tamanho da fonte</label>
                  <select
                    {...register('fontSize')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="small">Pequeno</option>
                    <option value="medium">Médio</option>
                    <option value="large">Grande</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Estilo da borda</label>
                  <select
                    {...register('borderStyle')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="none">Sem borda</option>
                    <option value="solid">Sólida</option>
                    <option value="dashed">Tracejada</option>
                    <option value="dotted">Pontilhada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="pt-4 flex flex-wrap gap-2">
              <Button
                type="button"
                className="w-full md:w-auto flex items-center justify-center gap-2"
                onClick={() => handleSubmit(handleGenerateSignature)()}
              >
                <RefreshCw className="h-4 w-4" />
                Gerar assinatura
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full md:w-auto flex items-center justify-center gap-2"
                onClick={() => handleSubmit(handleCopyToEmail)()}
              >
                <Copy className="h-4 w-4" />
                Gerar e copiar para email
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="w-full md:w-auto flex items-center justify-center gap-2"
                onClick={() => handleSubmit(handleCopyToGmail)()}
              >
                <Copy className="h-4 w-4" />
                Copiar para Gmail
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="w-full md:w-auto flex items-center justify-center gap-2"
                onClick={() => handleSubmit(handleDownloadForGmail)()}
              >
                <Download className="h-4 w-4" />
                Baixar para Gmail
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Pré-visualização */}
        <motion.div
          variants={itemVariants}
          className={`lg:col-span-5 bg-card rounded-xl shadow-lg p-6 flex flex-col ${previewMode && 'fixed top-40 right-40'}`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">Pré-visualização</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2"
            >
              {previewMode ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Ver HTML
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Ver assinatura
                </>
              )}
            </Button>
          </div>

          <div className="flex-grow bg-background rounded-lg border p-4 overflow-auto">
            {(generatedHTML || (livePreviewHTML && watchedValues.name)) ? (
              previewMode ? (
                <div className="signature-preview" dangerouslySetInnerHTML={{ __html: generatedHTML || livePreviewHTML }} />
              ) : (
                <div className="relative">
                  <pre className="text-xs whitespace-pre-wrap overflow-x-auto">{generatedHTML || livePreviewHTML}</pre>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => copyToClipboard(generatedHTML || livePreviewHTML).then(() => {
                      toast({
                        title: 'Texto copiado!',
                        description: 'O código HTML foi copiado para a área de transferência.',
                      });
                    })}
                    className="absolute top-2 right-2 flex items-center gap-1 opacity-80 hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    Copiar
                  </Button>
                </div>
              )
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                <p>Preencha o formulário para visualizar a assinatura em tempo real.</p>
              </div>
            )}
          </div>

          {generatedHTML && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyHTML}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copiar HTML
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadHTML}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Baixar HTML
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}