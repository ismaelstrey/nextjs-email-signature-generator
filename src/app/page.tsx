'use client';

import { motion } from 'framer-motion';
import SignatureGenerator from '@/components/signature-generator';
import { ThemeToggle } from '@/components/theme-toggle';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container py-8 px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Gerador de Assinaturas de Email
            </h1>
            <p className="text-muted-foreground mt-2">
              Crie assinaturas profissionais e personalizadas para seus emails
            </p>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/seu-usuario/nextjs-email-signature-generator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <GitHubLogoIcon className="h-5 w-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <SignatureGenerator />
        </motion.div>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-16 pb-8"
        >
          <p>© {new Date().getFullYear()} Gerador de Assinaturas de Email. Todos os direitos reservados.</p>
        </motion.footer>
      </div>
    </main>
  );
}