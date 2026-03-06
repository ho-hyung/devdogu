import { createMetadata } from '@/lib/metadata';
import DockerCheatsheetClient from './DockerCheatsheetClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/docker-cheatsheet';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/docker-cheatsheet',
  keywords: toolDict.metadata.keywords,
});

export default function DockerCheatsheetPage() {
  return (
    <ToolLayout toolId="docker-cheatsheet" faq={toolDict.faq}>
      <DockerCheatsheetClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
