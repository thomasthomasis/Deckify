import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const FAKE_USERS = [
  { email: 'alex.rivera@example.com', username: 'alexrivera', display_name: 'Alex Rivera', bio: 'Med student grinding through anatomy' },
  { email: 'sophie.chen@example.com', username: 'sophiechen', display_name: 'Sophie Chen', bio: 'Language learner • Spanish & Japanese' },
  { email: 'james.okafor@example.com', username: 'jamesokafor', display_name: 'James Okafor', bio: 'CS grad student, love algorithms' },
  { email: 'maya.patel@example.com', username: 'mayapatel', display_name: 'Maya Patel', bio: 'Bar exam prep • coffee addict' },
  { email: 'luca.martini@example.com', username: 'lucamartini', display_name: 'Luca Martini', bio: 'History nerd & trivia champion' },
  { email: 'priya.nair@example.com', username: 'priyanair', display_name: 'Priya Nair', bio: 'Biochem PhD candidate' },
  { email: 'tom.walsh@example.com', username: 'tomwalsh', display_name: 'Tom Walsh', bio: 'Self-taught dev learning one card at a time' },
  { email: 'chloe.dubois@example.com', username: 'chloedubois', display_name: 'Chloe Dubois', bio: 'French teacher, ESL enthusiast' },
  { email: 'hassan.ali@example.com', username: 'hassanali', display_name: 'Hassan Ali', bio: 'Finance student | CFA prep mode' },
  { email: 'nina.scott@example.com', username: 'ninascott', display_name: 'Nina Scott', bio: 'Biology teacher building decks for my class' },
];

const DECK_DATA = [
  {
    title: 'JavaScript Fundamentals',
    description: 'Core JS concepts every developer should know',
    category: 'programming',
    cards: [
      { front: 'What is a closure?', back: 'A function that retains access to its outer scope even after the outer function has returned.' },
      { front: 'What does `typeof null` return?', back: '"object" — this is a well-known bug in JavaScript that has been kept for backwards compatibility.' },
      { front: 'What is event delegation?', back: 'Attaching a single event listener to a parent element to handle events from its children, using event bubbling.' },
      { front: 'What is the difference between `==` and `===`?', back: '`==` performs type coercion before comparing; `===` compares value and type strictly without coercion.' },
      { front: 'What is a Promise?', back: 'An object representing the eventual completion or failure of an asynchronous operation, with `.then()`, `.catch()`, and `.finally()` methods.' },
      { front: 'What is the event loop?', back: 'A mechanism that allows JavaScript to perform non-blocking operations by offloading operations to the browser/Node and executing callbacks when the call stack is empty.' },
      { front: 'What does `Array.prototype.reduce` do?', back: 'Executes a reducer function on each element of the array, accumulating a single output value.' },
      { front: 'What is hoisting?', back: 'JavaScript\'s behaviour of moving variable and function declarations to the top of their scope before code execution.' },
      { front: 'What is the difference between `let`, `const`, and `var`?', back: '`var` is function-scoped and hoisted; `let` and `const` are block-scoped. `const` cannot be reassigned after declaration.' },
      { front: 'What is `async/await`?', back: 'Syntactic sugar over Promises that allows writing asynchronous code in a synchronous style.' },
      { front: 'What is the spread operator?', back: 'The `...` syntax that expands an iterable (array, object) into individual elements.' },
      { front: 'What is a higher-order function?', back: 'A function that takes another function as an argument or returns a function as its result.' },
    ],
  },
  {
    title: 'Spanish Vocabulary — Beginner',
    description: 'Essential Spanish words for everyday conversation',
    category: 'languages',
    cards: [
      { front: 'Hello / Hi', back: 'Hola' },
      { front: 'Thank you', back: 'Gracias' },
      { front: 'Please', back: 'Por favor' },
      { front: 'Where is the bathroom?', back: '¿Dónde está el baño?' },
      { front: 'I don\'t understand', back: 'No entiendo' },
      { front: 'How much does it cost?', back: '¿Cuánto cuesta?' },
      { front: 'Good morning', back: 'Buenos días' },
      { front: 'Good night', back: 'Buenas noches' },
      { front: 'My name is...', back: 'Me llamo...' },
      { front: 'I would like...', back: 'Quisiera...' },
      { front: 'Do you speak English?', back: '¿Habla inglés?' },
      { front: 'I\'m lost', back: 'Estoy perdido/a' },
    ],
  },
  {
    title: 'Human Anatomy — Bones',
    description: 'The 206 bones of the human body',
    category: 'science',
    cards: [
      { front: 'How many bones are in the adult human body?', back: '206 bones' },
      { front: 'What is the longest bone in the body?', back: 'The femur (thigh bone)' },
      { front: 'What is the smallest bone in the body?', back: 'The stapes (stirrup bone) in the middle ear' },
      { front: 'What are the bones of the skull collectively called?', back: 'The cranium (8 bones) plus the facial bones (14 bones)' },
      { front: 'What is the sternum?', back: 'The breastbone — a flat bone in the centre of the chest that connects the ribs via cartilage' },
      { front: 'What bones make up the shoulder girdle?', back: 'The clavicle (collarbone) and the scapula (shoulder blade)' },
      { front: 'What is the patella?', back: 'The kneecap — a sesamoid bone embedded in the quadriceps tendon' },
      { front: 'How many vertebrae does the spine have?', back: '33 vertebrae: 7 cervical, 12 thoracic, 5 lumbar, 5 sacral (fused), 4 coccygeal (fused)' },
      { front: 'What are the carpals?', back: 'The 8 small bones of the wrist: scaphoid, lunate, triquetrum, pisiform, trapezium, trapezoid, capitate, hamate' },
      { front: 'What is the difference between compact and spongy bone?', back: 'Compact bone is dense outer layer; spongy (cancellous) bone is porous inner layer containing bone marrow' },
    ],
  },
  {
    title: 'World History — Key Events',
    description: 'Major turning points in world history',
    category: 'history',
    cards: [
      { front: 'When did World War I begin?', back: '28 July 1914, triggered by the assassination of Archduke Franz Ferdinand' },
      { front: 'What was the Magna Carta?', back: 'A 1215 charter signed by King John of England limiting royal power and establishing certain legal rights' },
      { front: 'When did the Berlin Wall fall?', back: '9 November 1989' },
      { front: 'What was the Renaissance?', back: 'A cultural and intellectual movement in Europe from the 14th–17th centuries marking a transition from the Middle Ages to modernity' },
      { front: 'What caused the French Revolution?', back: 'A combination of financial crisis, social inequality, food shortages, and Enlightenment ideas; began in 1789' },
      { front: 'What was the Cold War?', back: 'A period of geopolitical tension between the USA and USSR (1947–1991) characterised by proxy wars, an arms race, and ideological rivalry' },
      { front: 'Who was Genghis Khan?', back: 'Founder and ruler of the Mongol Empire (1206–1227), which became the largest contiguous land empire in history' },
      { front: 'What was the significance of the Gutenberg printing press?', back: 'Invented ~1440, it enabled mass production of books, accelerating the spread of literacy, the Reformation, and the Scientific Revolution' },
      { front: 'When did the Roman Empire fall?', back: '476 AD — the Western Roman Empire fell when Romulus Augustulus was deposed by Odoacer' },
      { front: 'What was the Marshall Plan?', back: 'A US programme (1948–1952) providing ~$13 billion in economic aid to rebuild Western European economies after WWII' },
    ],
  },
  {
    title: 'React Hooks Cheatsheet',
    description: 'Quick reference for all major React hooks',
    category: 'programming',
    cards: [
      { front: 'What does `useState` return?', back: 'An array with two elements: the current state value and a setter function: `const [state, setState] = useState(initialValue)`' },
      { front: 'When does `useEffect` run?', back: 'After every render by default. With a dependency array, only when those values change. With an empty array `[]`, only once after mount.' },
      { front: 'What is `useRef` used for?', back: 'Storing a mutable value that persists across renders without causing re-renders, and accessing DOM elements directly.' },
      { front: 'What is `useCallback`?', back: 'Memoises a function so it only changes if its dependencies change. Useful to avoid unnecessary re-renders of child components.' },
      { front: 'What is `useMemo`?', back: 'Memoises the result of an expensive computation, recomputing only when dependencies change.' },
      { front: 'What is `useContext`?', back: 'Subscribes a component to a React context, consuming the value provided by the nearest `Context.Provider` above it in the tree.' },
      { front: 'What is `useReducer`?', back: 'An alternative to `useState` for complex state logic. Takes a reducer function and initial state, returns `[state, dispatch]`.' },
      { front: 'What is the cleanup function in `useEffect`?', back: 'A function returned from the effect that runs before the component unmounts or before the effect re-runs, used to cancel subscriptions or timers.' },
      { front: 'What is `useLayoutEffect`?', back: 'Like `useEffect` but fires synchronously after all DOM mutations. Used for measuring DOM elements before the browser paints.' },
      { front: 'What is `useId`?', back: 'Generates a unique stable ID that is consistent between server and client renders, useful for accessibility attributes.' },
    ],
  },
  {
    title: 'Finance & Economics Basics',
    description: 'Core concepts for financial literacy',
    category: 'business',
    cards: [
      { front: 'What is compound interest?', back: 'Interest calculated on both the initial principal and the accumulated interest, causing exponential growth over time.' },
      { front: 'What is GDP?', back: 'Gross Domestic Product — the total monetary value of all goods and services produced within a country in a specific period.' },
      { front: 'What is inflation?', back: 'The rate at which the general level of prices for goods and services rises, reducing purchasing power over time.' },
      { front: 'What is a bull market?', back: 'A market condition where prices are rising or are expected to rise, typically defined as a 20%+ gain from recent lows.' },
      { front: 'What is diversification?', back: 'Spreading investments across different assets to reduce risk — the idea that a portfolio of varied assets will yield higher returns with lower risk.' },
      { front: 'What is a P/E ratio?', back: 'Price-to-Earnings ratio — the price of a stock divided by its earnings per share, used to value a company relative to its earnings.' },
      { front: 'What is opportunity cost?', back: 'The value of the next-best alternative forgone when making a decision — the cost of what you give up.' },
      { front: 'What is quantitative easing?', back: 'A monetary policy where a central bank buys securities to inject money into the economy, lowering interest rates and increasing money supply.' },
      { front: 'What is a bond?', back: 'A fixed-income debt instrument where an investor lends money to an entity (government or corporation) for a defined period at a fixed interest rate.' },
      { front: 'What is the difference between a stock and a bond?', back: 'Stocks represent ownership in a company with variable returns; bonds are loans to a company/government with fixed interest payments.' },
    ],
  },
  {
    title: 'Biology — Cell Structure',
    description: 'Understanding the building blocks of life',
    category: 'science',
    cards: [
      { front: 'What is the function of mitochondria?', back: 'Often called the "powerhouse of the cell", mitochondria produce ATP through cellular respiration.' },
      { front: 'What is the difference between prokaryotic and eukaryotic cells?', back: 'Prokaryotes lack a membrane-bound nucleus and organelles (bacteria); eukaryotes have a nucleus and complex organelles (plants, animals, fungi).' },
      { front: 'What does the endoplasmic reticulum do?', back: 'Rough ER synthesises and processes proteins (has ribosomes); smooth ER synthesises lipids and detoxifies chemicals.' },
      { front: 'What is the Golgi apparatus?', back: 'Modifies, packages, and ships proteins and lipids from the ER to their final destinations inside or outside the cell.' },
      { front: 'What is the role of ribosomes?', back: 'Synthesise proteins by translating mRNA sequences into amino acid chains.' },
      { front: 'What is osmosis?', back: 'The passive movement of water molecules through a semi-permeable membrane from a region of lower solute concentration to higher solute concentration.' },
      { front: 'What is the cell membrane made of?', back: 'A phospholipid bilayer with embedded proteins, cholesterol, and carbohydrates — forming the fluid mosaic model.' },
      { front: 'What is ATP?', back: 'Adenosine Triphosphate — the primary energy currency of cells, providing energy for most cellular processes when hydrolysed to ADP.' },
      { front: 'What is the nucleus?', back: 'The membrane-bound organelle that contains the cell\'s genetic material (DNA) and controls cell activities by regulating gene expression.' },
      { front: 'What is mitosis?', back: 'Cell division producing two genetically identical daughter cells with the same chromosome number as the parent cell. Used for growth and repair.' },
    ],
  },
  {
    title: 'French for Beginners',
    description: 'Essential French phrases and vocabulary',
    category: 'languages',
    cards: [
      { front: 'Good morning / Good afternoon', back: 'Bonjour' },
      { front: 'Good evening', back: 'Bonsoir' },
      { front: 'How are you? (formal)', back: 'Comment allez-vous?' },
      { front: 'My name is...', back: 'Je m\'appelle...' },
      { front: 'Where is...?', back: 'Où est...?' },
      { front: 'I would like a coffee, please.', back: 'Je voudrais un café, s\'il vous plaît.' },
      { front: 'How much is it?', back: 'C\'est combien?' },
      { front: 'I don\'t speak French well.', back: 'Je ne parle pas bien français.' },
      { front: 'Can you repeat that, please?', back: 'Pouvez-vous répéter, s\'il vous plaît?' },
      { front: 'Excuse me / I\'m sorry', back: 'Excusez-moi / Pardon' },
      { front: 'The bill, please.', back: 'L\'addition, s\'il vous plaît.' },
      { front: 'I\'m looking for...', back: 'Je cherche...' },
    ],
  },
];

const CATEGORIES = [
  { name: 'Programming', slug: 'programming' },
  { name: 'Languages', slug: 'languages' },
  { name: 'Science', slug: 'science' },
  { name: 'History', slug: 'history' },
  { name: 'Business', slug: 'business' },
  { name: 'Mathematics', slug: 'mathematics' },
  { name: 'Arts', slug: 'arts' },
  { name: 'Health', slug: 'health' },
];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - randomBetween(0, daysAgo));
  return d.toISOString();
}

async function seed() {
  console.log('Seeding Deckify database...\n');

  // 1. Seed categories
  console.log('Inserting categories...');
  const { error: catError } = await supabase
    .from('categories')
    .upsert(CATEGORIES, { onConflict: 'slug' });
  if (catError) console.warn('Categories:', catError.message);

  const { data: categories } = await supabase.from('categories').select('id, slug');
  const categoryMap = Object.fromEntries((categories ?? []).map((c) => [c.slug, c.id]));

  // 2. Create auth users + profiles
  const createdUsers: { id: string; email: string }[] = [];

  const { data: existingUsers } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  const existingByEmail = Object.fromEntries((existingUsers?.users ?? []).map((u) => [u.email, u.id]));

  for (const user of FAKE_USERS) {
    if (existingByEmail[user.email]) {
      console.log(`User ${user.email} already exists, reusing.`);
      createdUsers.push({ id: existingByEmail[user.email], email: user.email });
      continue;
    }

    console.log(`Creating user ${user.email}...`);
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: 'Deckify123!',
      email_confirm: true,
    });

    if (error) {
      console.warn(`  Failed to create ${user.email}:`, JSON.stringify(error));
      continue;
    }

    if (data.user) createdUsers.push({ id: data.user.id, email: user.email });
  }

  // 3. Insert profiles
  console.log('\nInserting profiles...');
  for (let i = 0; i < createdUsers.length; i++) {
    const authUser = createdUsers[i];
    const userData = FAKE_USERS[i];

    await supabase.from('profiles').upsert({
      id: authUser.id,
      username: userData.username,
      display_name: userData.display_name,
      bio: userData.bio,
      onboarding_complete: true,
      created_at: randomDate(180),
      updated_at: randomDate(30),
    }, { onConflict: 'id' });

    await supabase.from('user_stats').upsert({
      user_id: authUser.id,
      xp: randomBetween(100, 8000),
      level: randomBetween(1, 16),
      current_streak: randomBetween(0, 30),
      longest_streak: randomBetween(5, 60),
      total_cards_reviewed: randomBetween(50, 2000),
      ai_credits: randomBetween(0, 10),
      last_activity_date: new Date(Date.now() - randomBetween(0, 7) * 86400000).toISOString().split('T')[0],
    }, { onConflict: 'user_id' });

    await supabase.from('user_settings').upsert({
      user_id: authUser.id,
      daily_goal: randomBetween(5, 50),
      reminders_enabled: Math.random() > 0.3,
      timezone: 'UTC',
    }, { onConflict: 'user_id' });
  }

  // 4. Insert decks + cards
  console.log('\nInserting decks and cards...');
  const allDeckIds: string[] = [];

  for (let i = 0; i < createdUsers.length; i++) {
    const authUser = createdUsers[i];
    const deckCount = randomBetween(1, 3);
    const shuffled = [...DECK_DATA].sort(() => Math.random() - 0.5).slice(0, deckCount);

    for (const deckTemplate of shuffled) {
      const { data: deck, error: deckError } = await supabase
        .from('decks')
        .insert({
          user_id: authUser.id,
          title: deckTemplate.title,
          description: deckTemplate.description,
          is_public: true,
          source: 'manual',
          save_count: randomBetween(2, 120),
          study_count: randomBetween(5, 500),
          view_count: randomBetween(10, 1000),
          category_id: categoryMap[deckTemplate.category] ?? null,
          created_at: randomDate(120),
          updated_at: randomDate(30),
        })
        .select('id')
        .single();

      if (deckError || !deck) {
        console.warn('  Deck error:', deckError?.message);
        continue;
      }

      allDeckIds.push(deck.id);

      const cards = deckTemplate.cards.map((card) => ({
        deck_id: deck.id,
        front: card.front,
        back: card.back,
        created_at: randomDate(120),
      }));

      const { error: cardsError } = await supabase.from('cards').insert(cards);
      if (cardsError) console.warn('  Cards error:', cardsError.message);

      console.log(`  Created deck "${deckTemplate.title}" with ${cards.length} cards`);
    }
  }

  // 5. Saved decks — each user saves a few random decks from others
  console.log('\nCreating saved deck relationships...');
  for (const authUser of createdUsers) {
    const toSave = [...allDeckIds].sort(() => Math.random() - 0.5).slice(0, randomBetween(2, 5));
    for (const deckId of toSave) {
      await supabase.from('saved_decks').upsert({
        user_id: authUser.id,
        deck_id: deckId,
        created_at: randomDate(60),
      }, { onConflict: 'user_id,deck_id' });
    }
  }

  // 6. Study sessions
  console.log('Creating study sessions...');
  for (const authUser of createdUsers) {
    const sessionCount = randomBetween(3, 15);
    const sessions = Array.from({ length: sessionCount }, () => ({
      user_id: authUser.id,
      cards_reviewed: randomBetween(5, 40),
      xp_earned: randomBetween(10, 100),
      created_at: randomDate(60),
    }));
    await supabase.from('study_sessions').insert(sessions);
  }

  console.log('\nSeed complete!');
  console.log(`Created ${createdUsers.length} users, ${allDeckIds.length} decks`);
}

seed().catch(console.error);
