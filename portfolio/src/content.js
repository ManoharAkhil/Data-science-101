// Every word and image on the page lives here.
// Sources: Manohar_Resume_Portfolio_Build_Record.md (verified data bank,
// locked resume), the Levonor creatives in Drive, and the mock-floor reel.
// House rule: no em or en dashes anywhere.

const w = (f) => `./work/${f}`

export const site = {
  name: 'Manohar Akhil',
  fullName: 'Manohar Akhil Chintalapati',
  role: 'Brand Manager',
  city: 'Hyderabad',
  email: 'ch.akhilmanohar1@gmail.com',
  linkedin: null, // add the profile URL to show it in the footer
}

export const nav = [
  { id: 'journey', label: 'Journey' },
  { id: 'work', label: 'Work' },
  { id: 'thinking', label: 'Thinking' },
]

export const hero = {
  eyebrow: 'Manohar Akhil Chintalapati. Brand Manager, Hyderabad.',
  line1: 'I design for the',
  line2: 'three seconds',
  line3: 'someone actually gives you.',
  sub: 'Seven years across market research, content and brand. Now building the whole system for a residential developer: identity, campaigns, and the spaces people walk through.',
  lCaption: 'Every tile is a homebuyer from the mock floor launch.',
}

// Flip cards. Front: the claim. Back: the proof.
export const proof = [
  {
    value: '151%',
    label: 'Instagram growth',
    detail: '2,677 to 6,718 followers in 21 months, organic content plus one sponsorship.',
  },
  {
    value: '72%',
    label: 'Referral lift',
    detail: 'Referral leads rose from 8.5 to 14.6 a month in the five months after the mock floor launch.',
  },
  {
    value: '200+',
    label: 'Customer voices',
    detail: 'Testimonials captured on camera and cut into ad creative, in English, Hindi and Telugu.',
  },
  {
    value: 'No. 1',
    label: 'Converting channel',
    detail: 'Customer referrals became the best-converting channel in the entire funnel.',
  },
]

// Type weight escalates with each era: Light for the first chapter,
// Bold for the last. The weight is the story.
export const journey = [
  { years: '2017-2020', org: 'Freelance', role: 'Content Consultant', weight: 300,
    anchor: 'Started with words.',
    thesis: 'Blogs, product descriptions, social and web copy for many clients, and the first brand templates to keep tone consistent.' },
  { years: '2019-2020', org: 'Keystone Marketing', role: 'Associate, Market Research', weight: 300,
    anchor: 'Learned to read a market before writing to it.',
    thesis: 'Market share, average selling price and addressable market analysis. The research habit behind every positioning call since.' },
  { years: '2020-2022', org: 'enWEgor', role: 'Co-Founder', weight: 400,
    anchor: 'Built brands for other people.',
    thesis: 'Identity, websites and design systems across ed-tech, health, sustainable energy and IT, including a client YouTube channel scaled to 2M+ viewers.' },
  { years: '2022-2023', org: 'igebra.ai', role: 'Content Specialist', weight: 400,
    anchor: 'Learned to sell a product before it was easy to sell.',
    thesis: 'Go-to-market content for a B2B ed-tech launch, built on personas drawn from market-trend data.' },
  { years: '2023-2024', org: 'Vasavi Group', role: 'Digital Content Strategist', weight: 500,
    anchor: 'First time owning a team, not just a task.',
    thesis: 'A seven-member content team across two residential projects, and press coverage that reached Forbes India.' },
  { years: '2024-now', org: 'Levonor Lifespaces', role: 'Brand Manager', weight: 700,
    anchor: 'Started building the whole system.',
    thesis: null },
]

export const identity = {
  title: 'One identity,',
  titleEm: 'many surfaces.',
  line: 'Egeira, the flagship. The same brand has to hold on a 40 ft unipole, a canopy panel, an ad end card and a floor number sign.',
  logo: { dark: w('egeira-logo-white.png'), light: w('egeira-logo-black.png') },
  swatches: [
    { hex: '#00A493', name: 'Egeira teal', from: 'The notch in the logo' },
    { hex: '#EE7140', name: 'Sunrise', from: 'OOH, May 2026' },
    { hex: '#5DBE94', name: 'Mint', from: 'OOH, March 2025' },
    { hex: '#49B0A0', name: 'Sea green', from: 'Canopy walkway' },
    { hex: '#1A9173', name: 'Show floor', from: 'Ad end card' },
    { hex: '#4A5A6D', name: 'Dusk', from: 'OOH, February 2026' },
  ],
  surfaces: [
    { src: w('ooh-unipole-top.webp'), label: 'Unipole, 40 x 40 ft', ratio: '1 / 1' },
    { src: w('canopy-print.webp'), label: 'Canopy panels, print spec', ratio: '16 / 9' },
    { src: w('canopy-graphics.webp'), label: 'Canopy graphics, print and plot', ratio: '16 / 9' },
    { src: w('ad-ad-show-floor.webp'), label: 'Ad end card', ratio: '16 / 9' },
  ],
  others: 'The same method shaped NorthEast, Sumangal and Payanam: one visual voice per project, set by its scale and its buyer.',
}

export const mockFloor = {
  kicker: 'Case study',
  title: 'Home is only',
  titleEm: 'months away.',
  date: 'Mock floor launch, 6 and 7 December 2025',
  steps: [
    { k: 'The data', body: 'A new developer with no track record. Buyers who had already paid, and would not see their home for a year.' },
    { k: 'The insight', body: 'Trust cannot be told. It has to be walked through. So the launch line became: why make do with a teaser, when you can get the full picture?' },
    { k: 'The move', body: 'A fully finished floor across every unit type, a year before handover, opened only to existing homebuyers. Sensory branding, a kids art activation, wayfinding, a canopy walkway, an 85 m site wrap, and a two-sided referral reward.' },
    { k: 'The result', body: '900+ people across two days. 150+ testimonials on the day. Referral leads up about 72% over the next five months.' },
  ],
  walk: [
    { src: w('reel-lobby.webp'), k: 'Arrive', line: 'The lobby, dressed for the day.' },
    { src: w('reel-preview-easel.webp'), k: 'The preview', line: 'Invitation art at the door.' },
    { src: w('reel-wayfinding.webp'), k: 'Find your way', line: 'Unit signage, live before handover.' },
    { src: w('reel-art-wall.webp'), k: 'The art wall', line: 'The feature buyers talked about most.' },
    { src: w('reel-kids-art.webp'), k: 'Every moment matters', line: 'Kids painted while parents toured.' },
    { src: w('reel-corridor-generations.webp'), k: 'Private corridors', line: 'Built for every generation.' },
  ],
  voices: [
    { src: w('reel-quote-art-wall.webp'), quote: 'Art wall is something that is very unique.' },
    { src: w('reel-quote-not-seen.webp'), quote: 'I haven’t seen in any of the projects.' },
    { src: w('reel-quote-home-makers.webp'), quote: 'Levonor team is actually home makers.' },
  ],
  cta: { src: w('ad-ad-show-floor.webp'), label: 'The campaign that followed: experience the show floor.' },
}

export const voices = {
  title: '200+ voices.',
  titleEm: 'One letter.',
  line: 'Every testimonial went through the same four steps, then back out as ads. The Levonor L, filled with the people who said it.',
  steps: ['Transcribe', 'Classify', 'Cut', 'Deliver'],
  langs: 'English, Hindi, Telugu',
  consent: 'A written consent framework for commercial use came first.',
}

export const formats = {
  title: 'Five formats. One campaign.',
  titleEm: 'Zero renders.',
  line: 'A driver passing a cantilever gets between 1.5 and 3 seconds. Someone waiting at a median gets more. The message is sized to the moment, not the other way round.',
  // widths and heights in feet, so the lineup can be drawn to true scale
  boards: [
    { src: w('ooh-cantilever.webp'), name: 'Cantilever', ft: [40, 15], read: 'Far range, fast pass' },
    { src: w('ooh-unipole-top.webp'), name: 'Top unipole', ft: [40, 40], read: 'Seen from the flyover' },
    { src: w('ooh-unipole-bottom.webp'), name: 'Bottom unipole', ft: [30, 20], read: 'A different ask: skip the wait' },
    { src: w('ooh-median-4x5.webp'), name: 'Median', ft: [4, 5], read: 'Close range, slow dwell' },
    { src: w('ooh-median-3x5.webp'), name: 'Median', ft: [3, 5], read: 'Close range, slow dwell' },
  ],
  evolution: [
    { src: w('gen-2025-03.webp'), when: 'March 2025', what: 'A question, one line of proof.' },
    { src: w('gen-2026-02.webp'), when: 'February 2026', what: 'Show flat, show floor. Dark, direct.' },
    { src: w('gen-2026-05.webp'), when: 'May 2026', what: 'One promise, sized for every board.' },
  ],
}

export const insights = {
  title: 'Before the story,',
  titleEm: 'the listening.',
  line: 'The useful question is the one that changes the brief.',
  sources: [
    { k: 'The person', q: 'Who is this for, and what matters to them?' },
    { k: 'The response', q: 'Which leads were worth having? Contrasting creative and A/B tests question the brief, not just rank the ads.' },
    { k: 'The customer', q: 'What do people say without being prompted?' },
    { k: 'The engineer', q: 'Why was it built that way?' },
  ],
  pairs: [
    { fact: 'Higher ceilings, by design.', story: 'Experience the luxury of high ceilings.', src: w('ad-ad-high-ceilings.webp') },
    { fact: 'No two front doors face each other.', story: 'See up close how we’ve brought privacy to shared spaces.', src: w('ad-ad-privacy.webp') },
    { fact: 'An art wall, designed into the corridor.', story: '“Art wall is something that is very unique.” A homebuyer, unprompted.', src: w('reel-art-wall.webp') },
  ],
}

export const cases = [
  {
    k: 'Two voices',
    title: 'One project, two agencies, opposite creative on purpose.',
    body: 'Offer-led against lifestyle-led, testimonial against render video, per sq.ft. against all-inclusive pricing, and three more axes. Split on purpose, so the two agencies were never chasing the same buyer with the same ad.',
    tag: 'Six-axis segmentation',
  },
  {
    k: 'Organic reach',
    title: '10.5M views in nine months.',
    body: '5.1M accounts reached and 3,440 net new followers. About three quarters of that growth landed in June 2026, when the Warangal Warriors sponsorship met a paid push.',
    tag: 'Instagram',
  },
  {
    k: 'Staying in touch',
    title: 'The year between booking and handover.',
    body: 'Progress-update and demand-draft emailers, survey forms and WhatsApp flows, now standing assets the company sends without asking.',
    tag: 'Client communication',
  },
]

export const tour = {
  title: 'A brand is also what you',
  titleEm: 'walk through.',
  stops: [
    { k: 'Discover', src: w('egeira-towers.webp'), line: 'The first impression is a skyline.' },
    { k: 'Explore', src: w('canopy-messaging.webp'), line: 'The canopy says the specifics: 7 homes per floor, 75,000+ sq. ft. of amenities.' },
    { k: 'Arrive', src: w('reel-lobby.webp'), line: 'The lobby becomes the brand.' },
    { k: 'Find your way', src: w('reel-wayfinding.webp'), line: 'A 225-step customer journey, briefed sign by sign.' },
    { k: 'Experience', src: w('reel-art-wall.webp'), line: 'People judge it for themselves.' },
    { k: 'Stay', src: w('ad-ad-show-floor.webp'), line: 'The invitation keeps going after the visit.' },
  ],
  walkway: { src: w('canopy-full-view.webp'), label: 'Canopy walkway, full run, as briefed to the fabricator.' },
}

export const skills = [
  { group: 'Brand and strategy', items: ['Brand visual identity', 'Positioning', 'Creative direction', 'Customer experience design'] },
  { group: 'Management', items: ['Cross-functional leadership', 'Agency management', 'Vendor management', 'Stakeholder alignment'] },
  { group: 'Operations', items: ['Content production pipelines', 'Campaign segmentation', 'Event design', 'Referral programmes'] },
  { group: 'Analytics and tools', items: ['Campaign performance', 'Primary and secondary research', 'AI-assisted creative workflows', 'CRM coordination'] },
]

export const atlas = w('l-atlas.webp') // 4 x 4 grid of people; replace with the montage stills
