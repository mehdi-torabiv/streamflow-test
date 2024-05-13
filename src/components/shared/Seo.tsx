import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface SeoProps {
  title?: string;
  titleTemplate?: string;
  description?: string;
}

/**
 * Component that sets the SEO metadata for the page.
 *
 * @param {SeoProps} param
 * @param {string} param.title
 * @param {string} param.titleTemplate
 * @param {string} param.description
 * @returns {JSX.Element}
 */
function Seo({
  title = 'Streamflow',
  titleTemplate = 'Streamflow',
  description = 'Streamflow is a decentralized streaming platform built on Solana blockchain.',
}: SeoProps): JSX.Element {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {titleTemplate} | {title}
        </title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
}

export default Seo;
