import { styles } from './utils'

import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { DataCard } from 'design-systems/Molecules/Cards/DataCard'
import { GuideCard } from 'design-systems/Molecules/Cards/GuideCard'
import { Layout } from 'design-systems/Organisms/Layout'
import { FAQS, GUIDES } from 'appConfig'
import { CLUBRARE_SOCIAL_LINKS, openLink } from 'utils'

export const SupportPageTemplate: React.FC = () => {
  return (
    <Layout>
      <div className={styles.banner}>
        <Typography className="typography-h3 md:typography-h2" size="h3" variant="regular">
          SUPPORT
        </Typography>
        <Typography className="typography-body md:typography-paragraph" size="body" variant="regular">
          Search our FAQs or ask our community
        </Typography>
        {/* 
        <Button variant="solid" color="neon" disabled>
          SUBMIT TICKET
        </Button>
        */}
      </div>
      <div className={styles.content}>
        <Typography
          className="typography-h4 md:typography-h3 mb-4 text-left md:text-center"
          size="h4"
          variant="regular"
        >
          GUIDES
        </Typography>
        <div className="ga mb-5xl grid grid-cols-1 gap-2xl md:grid-cols-3">
          {GUIDES.map((guide, index) => (
            <GuideCard href={guide.href} key={`guide-card-${index}`} title={guide.title} />
          ))}
        </div>
        <Typography
          className="typography-h4 md:typography-h3 mb-4 text-left md:text-center"
          size="h4"
          variant="regular"
        >
          FAQS
        </Typography>
        <div className="mx-auto flex max-w-1000 flex-col justify-center gap-xl">
          {FAQS.map((faq, index) => (
            <DataCard headerClassName="px-xl text-left" key={`faq-section-${index}`} label={faq.title}>
              <div className="px-lg py-sm">
                {faq.contents.map(content => (
                  <Typography key={content} size="lg" variant="condensed">
                    {content}
                  </Typography>
                ))}
              </div>
            </DataCard>
          ))}
          <div className="flex items-center justify-center">
            <Button color="primary" variant="outlined" onClick={() => openLink(CLUBRARE_SOCIAL_LINKS.faq)}>
              More
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Typography className="md:typography-h4 typography-subtitle text-center font-black">{`Can't find what you're looking for?`}</Typography>
        <div className="flex flex-col gap-4 md:flex-row">
          <Button
            className="!bg-neutral-700 uppercase !text-neutral-100"
            color="primary"
            variant="solid"
            onClick={() => openLink(CLUBRARE_SOCIAL_LINKS.discord)}
          >
            ASK THE COMMUNITY
          </Button>
          <Button
            className="!bg-neutral-700 uppercase !text-neutral-100"
            color="primary"
            variant="solid"
            onClick={() => openLink(CLUBRARE_SOCIAL_LINKS.email)}
          >
            EMAIL US
          </Button>
        </div>
        {/* 
        <Button variant="solid" color="neon" disabled>
          SUBMIT A TICKET
        </Button>
        */}
      </div>
    </Layout>
  )
}
