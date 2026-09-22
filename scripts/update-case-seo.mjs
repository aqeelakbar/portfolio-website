import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const cases = {
  'sproutfull': {
    title: 'Environmental Reporting UX Case Study | Aqeel Akbar',
    socialTitle: 'Turning environmental reporting into a decision-support tool',
    description: 'See how Aqeel Akbar helped turn Sproutfull’s environmental reporting into a decision-support tool across UX research, product design and frontend development.',
    alt: 'Sproutfull case study: turning environmental reporting into a decision-support tool'
  },
  'how-sure': {
    title: 'How Sure: AI Product Design Case Study | Aqeel Akbar',
    socialTitle: 'Helping people judge claims, not just get answers',
    description: 'See how Aqeel Akbar conceived, designed and built How Sure, an AI-assisted product that helps people inspect claims, evidence, uncertainty and reasoning.',
    alt: 'How Sure case study: helping people judge claims, not just get answers'
  },
  'adoption-tool': {
    title: 'Design System Adoption Tool Case Study | Aqeel Akbar',
    socialTitle: 'Turning design-system scoring into a product workflow',
    description: 'See how Aqeel Akbar designed and built a Philips scoring tool that cut design-system assessment time from two days to 48 minutes.',
    alt: 'Philips design-system adoption tool case study'
  },
  'design-system-a11y': {
    title: 'Design System Accessibility Case Study | Aqeel Akbar',
    socialTitle: 'Rebuilding trust in a design system',
    description: 'See how Aqeel Akbar aligned 110+ React components across Figma, Storybook and code, reducing accessibility issues and developer onboarding time.',
    alt: 'The Adecco Group design-system accessibility case study'
  },
  'digital-asset-repository': {
    title: 'Digital Asset Repository Case Study | Aqeel Akbar',
    socialTitle: 'Making approved assets easier to find and trust',
    description: 'See how Aqeel Akbar researched, designed and built a Philips asset repository that made search and download 94% faster while improving governance.',
    alt: 'Philips digital asset repository case study'
  },
  'prototyping-framework': {
    title: 'Prototyping Framework UX Case Study | Aqeel Akbar',
    socialTitle: 'Helping teams choose the right way to test an idea',
    description: 'See how Aqeel Akbar turned research and technical investigation into a prototyping framework that helped teams choose the right way to test ideas.',
    alt: 'The Adecco Group prototyping framework case study'
  }
};

const icons = `<link rel="icon" href="/favicon.ico?v=2" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=2">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2">`;

for (const [slug, meta] of Object.entries(cases)) {
  const file = join(root, 'work', slug, 'index.html');
  let html = await readFile(file, 'utf8');
  const url = `https://www.aqeelakbar.me/work/${slug}/`;
  const image = `https://www.aqeelakbar.me/assets/social/${slug}.png`;
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: meta.socialTitle,
    headline: meta.socialTitle,
    description: meta.description,
    url,
    image,
    mainEntityOfPage: url,
    author: {
      '@type': 'Person',
      name: 'Aqeel Akbar',
      url: 'https://www.aqeelakbar.me/'
    }
  });

  const metadata = `<meta name="description" content="${meta.description}">
<meta name="robots" content="index,follow,max-image-preview:large">
<title>${meta.title}</title>
${icons}
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Aqeel Akbar">
<meta property="og:locale" content="en_GB">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${meta.socialTitle}">
<meta property="og:description" content="${meta.description}">
<meta property="og:image" content="${image}">
<meta property="og:image:secure_url" content="${image}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${meta.alt}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${meta.socialTitle}">
<meta name="twitter:description" content="${meta.description}">
<meta name="twitter:image" content="${image}">
<meta name="twitter:image:alt" content="${meta.alt}">
<script type="application/ld+json">${jsonLd}</script>`;

  const currentMetadata = /<meta name="description"[\s\S]*?(?=<link rel="stylesheet")/;
  if (!currentMetadata.test(html)) throw new Error(`Metadata block not found in ${file}`);
  html = html.replace(currentMetadata, metadata);
  await writeFile(file, html);
}

for (const relativeFile of ['index.html', 'about/index.html', 'contact/index.html']) {
  const file = join(root, relativeFile);
  let html = await readFile(file, 'utf8');
  html = html.replace(/<link rel="icon"[^>]*data:image[^>]*>\n?/, '');
  if (!html.includes('href="/favicon.ico"')) {
    html = html.replace(/(<\/title>)/, `$1\n${icons}`);
  }
  await writeFile(file, html);
}
