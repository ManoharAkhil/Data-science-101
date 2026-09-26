// Single source of truth for every word and asset on the page.
// Edit copy here; components only render what this file provides.
//
// ASSETS: every `src: null` renders a labelled slot telling you exactly what
// original artwork belongs there. Drop files into /public/work/ and set `src`.

export const site = {
  name: 'Manohar Akhil',
  fullName: 'Manohar Akhil Chintalapati',
  role: 'Brand strategist',
  // Copied from the previous live site. Confirm this is the right inbox.
  email: 'ch.akhilmanohar1@gmail.com',
  // Internal dashboard figures stay private unless you flip this to true.
  showInternalMetrics: false,
}

export const nav = [
  { id: 'journey', label: 'Journey' },
  { id: 'work', label: 'Work' },
  { id: 'thinking', label: 'Thinking' },
]

export const hero = {
  eyebrow: 'Manohar Akhil, brand strategist',
  line1: 'Thinking made',
  line2: 'tangible.',
  sub: 'I connect what people feel with what a brand actually does.',
}

export const journey = [
  {
    years: '2017-2020',
    start: 2017,
    role: 'Freelance Content Consultant',
    anchor: 'Started with words.',
    thesis:
      'Blogs, product descriptions, social copy and web content for multiple clients. The first brand-template systems, built to keep tone consistent across platforms.',
  },
  {
    years: '2019-2020',
    start: 2019,
    role: 'Keystone Marketing, Market Research',
    anchor: 'Learned to read a market before writing to it.',
    thesis:
      'Market-share, pricing and competitive analysis. The research discipline that still underpins every brand-positioning decision since.',
  },
  {
    years: '2020-2022',
    start: 2020,
    role: 'enWEgor, Co-Founder',
    anchor: 'Built brands for other people, across industries that had nothing in common.',
    thesis:
      'Visual identity and digital footprint work across ed-tech, health, sustainable energy and IT, including scaling a client YouTube channel to 2M+ viewers.',
  },
  {
    years: '2022-2023',
    start: 2022,
    role: 'igebra.ai, Content Specialist',
    anchor: 'Learned to sell a product before it was easy to sell.',
    thesis:
      'Go-to-market content strategy for a B2B ed-tech launch, built on customer personas derived from real market-trend data.',
  },
  {
    years: '2023-2024',
    start: 2023,
    role: 'Vasavi Group, Digital Content Strategist',
    anchor: 'First time owning a team, not just a task.',
    thesis:
      'Led a seven-member content team across two residential projects. The work that earned Forbes India and national press coverage, and the bridge into real estate.',
  },
  {
    years: '2024-Present',
    start: 2024,
    role: 'Levonor',
    anchor: 'Started building the whole system.',
    thesis: null, // the finale changes register and flows into the work
  },
]

export const identity = {
  title: 'One brand.',
  titleEm: 'Four visual languages.',
  thesis:
    'A 744-unit gated community, a 45-home boutique project and a 40-acre villa community cannot share one visual voice without one of them feeling wrong.',
  decisions: [
    { k: 'Mood and references', q: 'What should the audience recognise or feel?' },
    { k: 'Typography and colour', q: 'What visual register fits the positioning?' },
    { k: 'Extensions', q: 'How does the expression hold across formats?' },
  ],
  projects: [
    {
      name: 'Egeira',
      assets: [
        { label: 'Egeira mood board', src: null },
        { label: 'Egeira type and palette', src: null },
        { label: 'Egeira brochure or site extension', src: null },
      ],
    },
    {
      name: 'NorthEast',
      assets: [
        { label: 'NorthEast mood board', src: null },
        { label: 'NorthEast type and palette', src: null },
        { label: 'NorthEast brochure or site extension', src: null },
      ],
    },
    {
      name: 'Sumangal',
      assets: [
        { label: 'Sumangal mood board', src: null },
        { label: 'Sumangal type and palette', src: null },
        { label: 'Sumangal brochure or site extension', src: null },
      ],
    },
    {
      name: 'Payanam',
      assets: [
        { label: 'Payanam mood board', src: null },
        { label: 'Payanam type and palette', src: null },
        { label: 'Payanam brochure or site extension', src: null },
      ],
    },
  ],
}

// Each case reads left to right: data -> insight -> move -> result.
export const cases = [
  {
    id: 'trust',
    kicker: 'Experience design',
    title: 'Trust you can walk through.',
    data: 'A new developer with no track record, and buyers who had already paid but would not see their home for a year.',
    insight:
      'Industry-standard mock units do not solve for trust. Buyers who have paid need to feel it, not be told it.',
    move: 'The Mock Floor Launch: a fully finished, ready-to-move-in floor across every unit typology, a year ahead of handover, exclusively for existing homebuyers. Paired with a dual-sided referral incentive that only works if the experience genuinely lands.',
    sequence: [
      'Sensory design across every arrival point',
      'A kids’ art activation that became the dedicated art wall in the tagline',
      'A referral mechanic that rewards both sides',
    ],
    stats: [
      { value: 900, suffix: '+', label: 'attendees across two days' },
      { value: 150, suffix: '+', label: 'testimonials' },
    ],
    resultPublic:
      'Referrals grew for five months after, and became the highest-converting channel in the funnel.',
    resultInternal:
      'Referrals grew for five months after, converting at 95.8%, the best-performing channel in the funnel.',
    assets: [{ label: 'Mock floor walkthrough photograph', src: null }],
  },
  {
    id: 'voices',
    kicker: 'Campaign strategy',
    title: 'One strategy. Two voices.',
    data: 'Two agency partners running creative on the same platforms, for the same audience pool.',
    insight: 'Same creative, same audience, two budgets: a real cannibalisation risk and wasted spend.',
    move: 'A six-axis segmentation strategy that split creative direction between the two on purpose.',
    axes: [
      'Offer-led / Lifestyle-led',
      'Testimonial / Render video',
      'Per sq.ft. / All-inclusive price',
    ],
    stats: [{ value: 6, suffix: '', label: 'axes of deliberate difference' }],
    resultPublic:
      'Measurably different conversion quality between the two approaches, reconciled against business objectives rather than vanity metrics.',
    assets: [
      { label: 'Register 01: offer-led creative', src: null },
      { label: 'Register 02: lifestyle creative', src: null },
    ],
  },
  {
    id: 'pipeline',
    kicker: 'Creative operations',
    title: 'From conversations to creative.',
    data: 'Manual testimonial collection and editing could not keep pace with ongoing ad demand.',
    insight: 'The bottleneck was the process, not the stories. Customers were already saying it.',
    move: 'A four-phase AI-assisted pipeline in English, Hindi and Telugu.',
    steps: ['Transcribe', 'Classify', 'Cut', 'Deliver'],
    stats: [{ value: 200, suffix: '+', label: 'testimonials deployed into ad creative' }],
    resultPublic: 'A manual bottleneck turned into a repeatable system.',
    assets: [],
  },
  {
    id: 'recall',
    kicker: 'Organic brand building',
    title: 'Recall on zero media spend.',
    data: 'A new developer brand has no organic recall to draw on.',
    insight: 'Consistency compounds. Presence in culture earns attention that ads rent.',
    move: 'Consistent organic ownership on Instagram, plus a co-branding partnership with Warangal Warriors as TG20 platinum sponsor.',
    stats: [
      { value: 2677, suffix: '', label: 'followers, before' },
      { value: 6702, suffix: '', label: 'followers, after' },
    ],
    resultPublic:
      'Separately, recall-driven channels (OOH and organic) generated real leads at near-zero acquisition cost.',
    assets: [],
  },
]

export const universe = {
  title: 'A brand is also what you',
  titleEm: 'walk through.',
  stops: [
    { k: 'Discover', items: 'Websites, social media, campaigns', line: 'An expectation begins.', asset: 'Campaign or website', src: null },
    { k: 'Explore', items: 'Brochures, sales collateral, stationery', line: 'The promise gains detail.', asset: 'Brochure spread', src: null },
    { k: 'Arrive', items: 'Signage, wayfinding, office spaces', line: 'The brand becomes physical.', asset: 'Signage or office space', src: null },
    { k: 'Experience', items: 'Experience centres, mock floor, events', line: 'People judge it for themselves.', asset: 'Experience centre', src: null },
    { k: 'Stay connected', items: 'Progress updates, emailers, WhatsApp flows', line: 'Consistency continues after the visit.', asset: 'Emailer or update', src: null },
  ],
  walkway: {
    title: 'The canopy walkway.',
    line: 'A documentation-heavy plan, translated into a space people walk through.',
    before: { label: 'Canopy walkway, in progress', src: null },
    after: { label: 'Canopy walkway, finished', src: null },
  },
}

export const insights = {
  title: 'Before the story,',
  titleEm: 'the listening.',
  line: 'The useful question is the one that changes the brief.',
  sources: [
    {
      k: 'Understand the person',
      q: 'Who is this for, and what matters to them?',
      a: 'Customer personas and the ideal client profile, built from market research, customer conversations and the context of the purchase.',
    },
    {
      k: 'Read the response',
      q: 'Which response actually matters to the business?',
      a: 'Lead and conversion quality read alongside campaign performance. Contrasting creative and A/B tests question the brief, not just rank the ads.',
    },
    {
      k: 'Listen to lived experience',
      q: 'What do customers say without being prompted?',
      a: 'Testimonials reveal the language people use about the product and the company, classified into stories that keep the customer’s perspective.',
    },
    {
      k: 'Understand the product decision',
      q: 'Why was it designed that way?',
      a: 'Conversations with engineers and product development reveal the effort behind a feature, and connect a design decision to the way someone lives.',
    },
  ],
}

export const stories = {
  title: 'Same insight.',
  titleEm: 'A different way in.',
  channels: [
    {
      k: 'Instagram',
      head: 'Make it relatable.',
      body: 'A product decision translated into a human story, carried through script, visual cues and the final reel.',
    },
    {
      k: 'Meta and Google',
      head: 'Give a reason to act.',
      body: 'Creative adapted for intent: offer-led or lifestyle-led, testimony or product imagery, with performance informing the next round.',
    },
    {
      k: 'Print and OOH',
      head: 'Respect the glance.',
      body: 'Quarterly campaign direction shaped by readability, placement and competitive visual scanning.',
    },
  ],
  render: {
    title: 'The render-removal decision.',
    insight:
      'Sophisticated visuals were losing to a 1.5 to 3 second attention window.',
    move: 'A quarterly brief system built from readability research and competitive scanning, ending in one instruction: remove every photographic render.',
    gens: [
      { k: 'Gen 1', label: 'Gen 1 OOH creative', src: null },
      { k: 'Gen 2', label: 'Gen 2 OOH creative', src: null },
      { k: 'Gen 3', label: 'Gen 3 OOH creative', src: null },
    ],
  },
  format: {
    title: 'Format is a message constraint,',
    titleEm: 'not a canvas.',
    modes: [
      {
        k: 'Median',
        spec: 'Portrait. Close range. Slow dwell.',
        usp: 'Functional reasons to care',
        tags: ['Parking', 'Kids', 'Work from home'],
        label: 'Median creative',
        src: null,
      },
      {
        k: 'Cantilever',
        spec: 'Landscape. Far range. Fast pass.',
        usp: 'Aspirational reasons to want',
        tags: ['Light', 'Views', 'Breeze'],
        label: 'Cantilever creative',
        src: null,
      },
    ],
  },
}

export const capabilities = [
  {
    group: 'Strategy',
    items: ['Brand positioning', 'ICP and personas', 'Market and competitive research', 'Creative segmentation'],
  },
  {
    group: 'Expression',
    items: ['Visual identity direction', 'Typography and colour systems', 'Brochures and collateral', 'OOH and print'],
  },
  {
    group: 'Experience and systems',
    items: ['Launch and event experience', 'Physical brand and wayfinding', 'Content systems', 'Performance creative for Meta and Google'],
  },
]
