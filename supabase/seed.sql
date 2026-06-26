-- Deckify seed data
-- Run with: supabase db execute --file supabase/seed.sql

-- Make handle_new_user resilient so it doesn't fail if profile doesn't exist yet
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  BEGIN
    INSERT INTO user_stats (user_id, xp, level, current_streak, ai_credits, total_cards_reviewed)
    VALUES (NEW.id, 0, 1, 0, 3, 0)
    ON CONFLICT (user_id) DO NOTHING;
  EXCEPTION WHEN foreign_key_violation THEN
    NULL;
  END;

  BEGIN
    INSERT INTO user_settings (user_id, daily_goal, reminders_enabled)
    VALUES (NEW.id, 10, true)
    ON CONFLICT (user_id) DO NOTHING;
  EXCEPTION WHEN foreign_key_violation THEN
    NULL;
  END;

  RETURN NEW;
END;
$$;

-- Categories
INSERT INTO public.categories (id, name, slug) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Programming',  'programming'),
  ('a1000000-0000-0000-0000-000000000002', 'Languages',    'languages'),
  ('a1000000-0000-0000-0000-000000000003', 'Science',      'science'),
  ('a1000000-0000-0000-0000-000000000004', 'History',      'history'),
  ('a1000000-0000-0000-0000-000000000005', 'Business',     'business'),
  ('a1000000-0000-0000-0000-000000000006', 'Mathematics',  'mathematics'),
  ('a1000000-0000-0000-0000-000000000007', 'Arts',         'arts'),
  ('a1000000-0000-0000-0000-000000000008', 'Health',       'health')
ON CONFLICT (slug) DO NOTHING;

-- Auth users (fake accounts, bypasses RLS as postgres)
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  role, aud, raw_app_meta_data, raw_user_meta_data
) VALUES
  ('b1000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'alex.rivera@example.com',  crypt('Deckify123!', gen_salt('bf')), now(), now() - interval '120 days', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}'),
  ('b1000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'sophie.chen@example.com',  crypt('Deckify123!', gen_salt('bf')), now(), now() - interval '90 days',  now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}'),
  ('b1000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'james.okafor@example.com', crypt('Deckify123!', gen_salt('bf')), now(), now() - interval '80 days',  now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}'),
  ('b1000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'maya.patel@example.com',   crypt('Deckify123!', gen_salt('bf')), now(), now() - interval '60 days',  now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}'),
  ('b1000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000000', 'luca.martini@example.com', crypt('Deckify123!', gen_salt('bf')), now(), now() - interval '50 days',  now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}'),
  ('b1000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000000', 'priya.nair@example.com',   crypt('Deckify123!', gen_salt('bf')), now(), now() - interval '45 days',  now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}'),
  ('b1000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000000', 'tom.walsh@example.com',    crypt('Deckify123!', gen_salt('bf')), now(), now() - interval '30 days',  now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}'),
  ('b1000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000000', 'chloe.dubois@example.com', crypt('Deckify123!', gen_salt('bf')), now(), now() - interval '25 days',  now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}'),
  ('b1000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000000', 'hassan.ali@example.com',   crypt('Deckify123!', gen_salt('bf')), now(), now() - interval '20 days',  now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}'),
  ('b1000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000000', 'nina.scott@example.com',   crypt('Deckify123!', gen_salt('bf')), now(), now() - interval '10 days',  now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}')
ON CONFLICT (id) DO NOTHING;

-- Profiles
INSERT INTO public.profiles (id, username, display_name, bio, onboarding_complete, created_at, updated_at) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'alexrivera',  'Alex Rivera',  'Med student grinding through anatomy',          true, now() - interval '120 days', now() - interval '2 days'),
  ('b1000000-0000-0000-0000-000000000002', 'sophiechen',  'Sophie Chen',  'Language learner • Spanish & Japanese',         true, now() - interval '90 days',  now() - interval '1 day'),
  ('b1000000-0000-0000-0000-000000000003', 'jamesokafor', 'James Okafor', 'CS grad student, love algorithms',              true, now() - interval '80 days',  now() - interval '3 days'),
  ('b1000000-0000-0000-0000-000000000004', 'mayapatel',   'Maya Patel',   'Bar exam prep • coffee addict',                 true, now() - interval '60 days',  now() - interval '5 days'),
  ('b1000000-0000-0000-0000-000000000005', 'lucamartini', 'Luca Martini', 'History nerd & trivia champion',                true, now() - interval '50 days',  now() - interval '1 day'),
  ('b1000000-0000-0000-0000-000000000006', 'priyanair',   'Priya Nair',   'Biochem PhD candidate',                         true, now() - interval '45 days',  now() - interval '4 days'),
  ('b1000000-0000-0000-0000-000000000007', 'tomwalsh',    'Tom Walsh',    'Self-taught dev learning one card at a time',   true, now() - interval '30 days',  now() - interval '2 days'),
  ('b1000000-0000-0000-0000-000000000008', 'chloedubois', 'Chloe Dubois', 'French teacher, ESL enthusiast',                true, now() - interval '25 days',  now() - interval '1 day'),
  ('b1000000-0000-0000-0000-000000000009', 'hassanali',   'Hassan Ali',   'Finance student | CFA prep mode',               true, now() - interval '20 days',  now() - interval '6 days'),
  ('b1000000-0000-0000-0000-000000000010', 'ninascott',   'Nina Scott',   'Biology teacher building decks for my class',   true, now() - interval '10 days',  now() - interval '1 day')
ON CONFLICT (id) DO NOTHING;

-- User stats
INSERT INTO public.user_stats (user_id, xp, level, current_streak, longest_streak, total_cards_reviewed, ai_credits, last_activity_date) VALUES
  ('b1000000-0000-0000-0000-000000000001', 4200, 9,  12, 30, 840,  2, current_date),
  ('b1000000-0000-0000-0000-000000000002', 7800, 16, 25, 55, 1560, 0, current_date - 1),
  ('b1000000-0000-0000-0000-000000000003', 3100, 7,  8,  20, 620,  5, current_date),
  ('b1000000-0000-0000-0000-000000000004', 5500, 12, 18, 40, 1100, 1, current_date - 2),
  ('b1000000-0000-0000-0000-000000000005', 2200, 5,  3,  15, 440,  3, current_date - 1),
  ('b1000000-0000-0000-0000-000000000006', 6600, 14, 21, 50, 1320, 0, current_date),
  ('b1000000-0000-0000-0000-000000000007', 1800, 4,  5,  10, 360,  7, current_date - 3),
  ('b1000000-0000-0000-0000-000000000008', 3900, 8,  14, 28, 780,  2, current_date),
  ('b1000000-0000-0000-0000-000000000009', 5100, 11, 9,  35, 1020, 4, current_date - 1),
  ('b1000000-0000-0000-0000-000000000010', 8200, 17, 30, 60, 1640, 1, current_date)
ON CONFLICT (user_id) DO NOTHING;

-- User settings
INSERT INTO public.user_settings (user_id, daily_goal, reminders_enabled, timezone) VALUES
  ('b1000000-0000-0000-0000-000000000001', 20, true,  'America/New_York'),
  ('b1000000-0000-0000-0000-000000000002', 30, true,  'America/Los_Angeles'),
  ('b1000000-0000-0000-0000-000000000003', 25, false, 'America/Chicago'),
  ('b1000000-0000-0000-0000-000000000004', 40, true,  'America/New_York'),
  ('b1000000-0000-0000-0000-000000000005', 15, true,  'Europe/Rome'),
  ('b1000000-0000-0000-0000-000000000006', 35, false, 'Asia/Kolkata'),
  ('b1000000-0000-0000-0000-000000000007', 10, true,  'Europe/London'),
  ('b1000000-0000-0000-0000-000000000008', 20, true,  'Europe/Paris'),
  ('b1000000-0000-0000-0000-000000000009', 30, true,  'Asia/Dubai'),
  ('b1000000-0000-0000-0000-000000000010', 50, false, 'America/Chicago')
ON CONFLICT (user_id) DO NOTHING;

-- Decks (category_id looked up by slug to avoid hardcoded UUID mismatches)
INSERT INTO public.decks (id, user_id, title, description, is_public, source, save_count, study_count, view_count, category_id, created_at, updated_at) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Human Anatomy — Bones',         'The 206 bones of the human body',                    true, 'manual', 87,  320, 640,  (SELECT id FROM public.categories WHERE slug = 'science'),     now() - interval '100 days', now() - interval '5 days'),
  ('c1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'Biology — Cell Structure',      'Understanding the building blocks of life',           true, 'manual', 62,  210, 430,  (SELECT id FROM public.categories WHERE slug = 'science'),     now() - interval '90 days',  now() - interval '3 days'),
  ('c1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000002', 'Spanish Vocabulary — Beginner', 'Essential Spanish words for everyday conversation',   true, 'manual', 134, 540, 1080, (SELECT id FROM public.categories WHERE slug = 'languages'),   now() - interval '80 days',  now() - interval '1 day'),
  ('c1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000002', 'French for Beginners',          'Essential French phrases and vocabulary',             true, 'manual', 98,  380, 760,  (SELECT id FROM public.categories WHERE slug = 'languages'),   now() - interval '70 days',  now() - interval '2 days'),
  ('c1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000003', 'JavaScript Fundamentals',       'Core JS concepts every developer should know',       true, 'manual', 210, 820, 1640, (SELECT id FROM public.categories WHERE slug = 'programming'), now() - interval '75 days',  now() - interval '1 day'),
  ('c1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000003', 'React Hooks Cheatsheet',        'Quick reference for all major React hooks',          true, 'manual', 175, 690, 1380, (SELECT id FROM public.categories WHERE slug = 'programming'), now() - interval '60 days',  now() - interval '4 days'),
  ('c1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000004', 'Finance & Economics Basics',    'Core concepts for financial literacy',                true, 'manual', 143, 560, 1120, (SELECT id FROM public.categories WHERE slug = 'business'),    now() - interval '55 days',  now() - interval '2 days'),
  ('c1000000-0000-0000-0000-000000000008', 'b1000000-0000-0000-0000-000000000005', 'World History — Key Events',    'Major turning points in world history',              true, 'manual', 119, 470, 940,  (SELECT id FROM public.categories WHERE slug = 'history'),     now() - interval '45 days',  now() - interval '3 days'),
  ('c1000000-0000-0000-0000-000000000009', 'b1000000-0000-0000-0000-000000000006', 'Organic Chemistry Basics',      'Essential orgo reactions and mechanisms',            true, 'manual', 76,  290, 580,  (SELECT id FROM public.categories WHERE slug = 'science'),     now() - interval '40 days',  now() - interval '6 days'),
  ('c1000000-0000-0000-0000-000000000010', 'b1000000-0000-0000-0000-000000000007', 'Python for Beginners',          'Python syntax and core concepts',                   true, 'manual', 188, 750, 1500, (SELECT id FROM public.categories WHERE slug = 'programming'), now() - interval '28 days',  now() - interval '1 day'),
  ('c1000000-0000-0000-0000-000000000011', 'b1000000-0000-0000-0000-000000000008', 'English Grammar Essentials',    'Grammar rules every writer should know',             true, 'manual', 92,  360, 720,  (SELECT id FROM public.categories WHERE slug = 'languages'),   now() - interval '22 days',  now() - interval '2 days'),
  ('c1000000-0000-0000-0000-000000000012', 'b1000000-0000-0000-0000-000000000009', 'CFA Level 1 — Key Concepts',    'Must-know formulas and definitions for the CFA exam',true, 'manual', 104, 410, 820,  (SELECT id FROM public.categories WHERE slug = 'business'),    now() - interval '18 days',  now() - interval '1 day')
ON CONFLICT (id) DO NOTHING;

-- Cards
INSERT INTO public.cards (deck_id, front, back) VALUES
  -- Human Anatomy — Bones
  ('c1000000-0000-0000-0000-000000000001', 'How many bones are in the adult human body?', '206 bones'),
  ('c1000000-0000-0000-0000-000000000001', 'What is the longest bone in the body?', 'The femur (thigh bone)'),
  ('c1000000-0000-0000-0000-000000000001', 'What is the smallest bone in the body?', 'The stapes (stirrup bone) in the middle ear'),
  ('c1000000-0000-0000-0000-000000000001', 'What is the sternum?', 'The breastbone — a flat bone in the centre of the chest that connects the ribs via cartilage'),
  ('c1000000-0000-0000-0000-000000000001', 'What bones make up the shoulder girdle?', 'The clavicle (collarbone) and the scapula (shoulder blade)'),
  ('c1000000-0000-0000-0000-000000000001', 'What is the patella?', 'The kneecap — a sesamoid bone embedded in the quadriceps tendon'),
  ('c1000000-0000-0000-0000-000000000001', 'How many vertebrae does the spine have?', '33 vertebrae: 7 cervical, 12 thoracic, 5 lumbar, 5 sacral (fused), 4 coccygeal (fused)'),
  ('c1000000-0000-0000-0000-000000000001', 'What are the carpals?', 'The 8 small bones of the wrist'),
  ('c1000000-0000-0000-0000-000000000001', 'What is the difference between compact and spongy bone?', 'Compact bone is the dense outer layer; spongy bone is the porous inner layer containing bone marrow'),
  ('c1000000-0000-0000-0000-000000000001', 'What is the periosteum?', 'The dense fibrous membrane covering the outer surface of bones, containing blood vessels and nerves'),

  -- Biology — Cell Structure
  ('c1000000-0000-0000-0000-000000000002', 'What is the function of mitochondria?', 'Produce ATP through cellular respiration — the powerhouse of the cell'),
  ('c1000000-0000-0000-0000-000000000002', 'What is the difference between prokaryotic and eukaryotic cells?', 'Prokaryotes lack a membrane-bound nucleus; eukaryotes have a nucleus and complex organelles'),
  ('c1000000-0000-0000-0000-000000000002', 'What does the endoplasmic reticulum do?', 'Rough ER synthesises proteins; smooth ER synthesises lipids and detoxifies chemicals'),
  ('c1000000-0000-0000-0000-000000000002', 'What is the Golgi apparatus?', 'Modifies, packages, and ships proteins and lipids to their final destinations'),
  ('c1000000-0000-0000-0000-000000000002', 'What is osmosis?', 'Passive movement of water through a semi-permeable membrane from low to high solute concentration'),
  ('c1000000-0000-0000-0000-000000000002', 'What is the cell membrane made of?', 'A phospholipid bilayer with embedded proteins, cholesterol, and carbohydrates'),
  ('c1000000-0000-0000-0000-000000000002', 'What is ATP?', 'Adenosine Triphosphate — the primary energy currency of cells'),
  ('c1000000-0000-0000-0000-000000000002', 'What is mitosis?', 'Cell division producing two genetically identical daughter cells'),
  ('c1000000-0000-0000-0000-000000000002', 'What is the role of ribosomes?', 'Synthesise proteins by translating mRNA sequences into amino acid chains'),
  ('c1000000-0000-0000-0000-000000000002', 'What is the nucleus?', 'Membrane-bound organelle containing the cell''s DNA and controlling gene expression'),

  -- Spanish Vocabulary
  ('c1000000-0000-0000-0000-000000000003', 'Hello / Hi', 'Hola'),
  ('c1000000-0000-0000-0000-000000000003', 'Thank you', 'Gracias'),
  ('c1000000-0000-0000-0000-000000000003', 'Please', 'Por favor'),
  ('c1000000-0000-0000-0000-000000000003', 'Where is the bathroom?', '¿Dónde está el baño?'),
  ('c1000000-0000-0000-0000-000000000003', 'I don''t understand', 'No entiendo'),
  ('c1000000-0000-0000-0000-000000000003', 'How much does it cost?', '¿Cuánto cuesta?'),
  ('c1000000-0000-0000-0000-000000000003', 'Good morning', 'Buenos días'),
  ('c1000000-0000-0000-0000-000000000003', 'Good night', 'Buenas noches'),
  ('c1000000-0000-0000-0000-000000000003', 'My name is...', 'Me llamo...'),
  ('c1000000-0000-0000-0000-000000000003', 'Do you speak English?', '¿Habla inglés?'),

  -- French for Beginners
  ('c1000000-0000-0000-0000-000000000004', 'Good morning / Good afternoon', 'Bonjour'),
  ('c1000000-0000-0000-0000-000000000004', 'Good evening', 'Bonsoir'),
  ('c1000000-0000-0000-0000-000000000004', 'How are you? (formal)', 'Comment allez-vous?'),
  ('c1000000-0000-0000-0000-000000000004', 'My name is...', 'Je m''appelle...'),
  ('c1000000-0000-0000-0000-000000000004', 'Where is...?', 'Où est...?'),
  ('c1000000-0000-0000-0000-000000000004', 'How much is it?', 'C''est combien?'),
  ('c1000000-0000-0000-0000-000000000004', 'I don''t speak French well.', 'Je ne parle pas bien français.'),
  ('c1000000-0000-0000-0000-000000000004', 'The bill, please.', 'L''addition, s''il vous plaît.'),
  ('c1000000-0000-0000-0000-000000000004', 'Excuse me / I''m sorry', 'Excusez-moi / Pardon'),
  ('c1000000-0000-0000-0000-000000000004', 'Can you repeat that, please?', 'Pouvez-vous répéter, s''il vous plaît?'),

  -- JavaScript Fundamentals
  ('c1000000-0000-0000-0000-000000000005', 'What is a closure?', 'A function that retains access to its outer scope even after the outer function has returned'),
  ('c1000000-0000-0000-0000-000000000005', 'What does `typeof null` return?', '"object" — a well-known bug kept for backwards compatibility'),
  ('c1000000-0000-0000-0000-000000000005', 'What is event delegation?', 'Attaching a single event listener to a parent element to handle events from its children via bubbling'),
  ('c1000000-0000-0000-0000-000000000005', 'What is the difference between == and ===?', '== performs type coercion; === compares value and type strictly'),
  ('c1000000-0000-0000-0000-000000000005', 'What is a Promise?', 'An object representing the eventual completion or failure of an async operation'),
  ('c1000000-0000-0000-0000-000000000005', 'What is the event loop?', 'A mechanism allowing JS to perform non-blocking operations by offloading work and executing callbacks when the call stack is empty'),
  ('c1000000-0000-0000-0000-000000000005', 'What is hoisting?', 'JavaScript''s behaviour of moving variable and function declarations to the top of their scope before execution'),
  ('c1000000-0000-0000-0000-000000000005', 'What is async/await?', 'Syntactic sugar over Promises for writing async code in a synchronous style'),
  ('c1000000-0000-0000-0000-000000000005', 'What is a higher-order function?', 'A function that takes another function as an argument or returns a function as its result'),
  ('c1000000-0000-0000-0000-000000000005', 'What is the spread operator?', 'The ... syntax that expands an iterable into individual elements'),

  -- React Hooks
  ('c1000000-0000-0000-0000-000000000006', 'What does useState return?', 'An array with the current state value and a setter function'),
  ('c1000000-0000-0000-0000-000000000006', 'When does useEffect run?', 'After every render by default; with deps array only when deps change; with [] only once on mount'),
  ('c1000000-0000-0000-0000-000000000006', 'What is useRef used for?', 'Storing a mutable value that persists across renders without causing re-renders, and accessing DOM elements'),
  ('c1000000-0000-0000-0000-000000000006', 'What is useCallback?', 'Memoises a function so it only changes if its dependencies change'),
  ('c1000000-0000-0000-0000-000000000006', 'What is useMemo?', 'Memoises the result of an expensive computation, recomputing only when dependencies change'),
  ('c1000000-0000-0000-0000-000000000006', 'What is useContext?', 'Subscribes a component to a React context, consuming the nearest Provider value above it in the tree'),
  ('c1000000-0000-0000-0000-000000000006', 'What is useReducer?', 'An alternative to useState for complex state logic — takes a reducer and initial state, returns [state, dispatch]'),
  ('c1000000-0000-0000-0000-000000000006', 'What is the cleanup function in useEffect?', 'A function returned from the effect that runs before unmount or before the effect re-runs'),
  ('c1000000-0000-0000-0000-000000000006', 'What is useLayoutEffect?', 'Like useEffect but fires synchronously after all DOM mutations, before the browser paints'),
  ('c1000000-0000-0000-0000-000000000006', 'What is useId?', 'Generates a unique stable ID consistent between server and client renders'),

  -- Finance & Economics
  ('c1000000-0000-0000-0000-000000000007', 'What is compound interest?', 'Interest calculated on both the principal and accumulated interest, causing exponential growth'),
  ('c1000000-0000-0000-0000-000000000007', 'What is GDP?', 'Gross Domestic Product — the total monetary value of all goods and services produced within a country in a period'),
  ('c1000000-0000-0000-0000-000000000007', 'What is inflation?', 'The rate at which the general level of prices rises, reducing purchasing power over time'),
  ('c1000000-0000-0000-0000-000000000007', 'What is a bull market?', 'A market condition where prices are rising or expected to rise, typically defined as a 20%+ gain from recent lows'),
  ('c1000000-0000-0000-0000-000000000007', 'What is diversification?', 'Spreading investments across assets to reduce risk'),
  ('c1000000-0000-0000-0000-000000000007', 'What is a P/E ratio?', 'Price-to-Earnings ratio — stock price divided by earnings per share, used to value a company'),
  ('c1000000-0000-0000-0000-000000000007', 'What is opportunity cost?', 'The value of the next-best alternative forgone when making a decision'),
  ('c1000000-0000-0000-0000-000000000007', 'What is quantitative easing?', 'A monetary policy where a central bank buys securities to inject money into the economy'),
  ('c1000000-0000-0000-0000-000000000007', 'What is a bond?', 'A fixed-income instrument where an investor lends money to an entity for a fixed period at a fixed interest rate'),
  ('c1000000-0000-0000-0000-000000000007', 'What is the difference between a stock and a bond?', 'Stocks represent ownership with variable returns; bonds are loans with fixed interest payments'),

  -- World History
  ('c1000000-0000-0000-0000-000000000008', 'When did World War I begin?', '28 July 1914, triggered by the assassination of Archduke Franz Ferdinand'),
  ('c1000000-0000-0000-0000-000000000008', 'What was the Magna Carta?', 'A 1215 charter limiting royal power and establishing certain legal rights in England'),
  ('c1000000-0000-0000-0000-000000000008', 'When did the Berlin Wall fall?', '9 November 1989'),
  ('c1000000-0000-0000-0000-000000000008', 'What was the Renaissance?', 'A cultural and intellectual movement in Europe from the 14th–17th centuries'),
  ('c1000000-0000-0000-0000-000000000008', 'What caused the French Revolution?', 'Financial crisis, social inequality, food shortages, and Enlightenment ideas; began in 1789'),
  ('c1000000-0000-0000-0000-000000000008', 'What was the Cold War?', 'Geopolitical tension between the USA and USSR (1947–1991) marked by proxy wars and an arms race'),
  ('c1000000-0000-0000-0000-000000000008', 'Who was Genghis Khan?', 'Founder of the Mongol Empire (1206–1227), the largest contiguous land empire in history'),
  ('c1000000-0000-0000-0000-000000000008', 'When did the Roman Empire fall?', '476 AD — when Romulus Augustulus was deposed by Odoacer'),
  ('c1000000-0000-0000-0000-000000000008', 'What was the Marshall Plan?', 'A US programme (1948–1952) providing ~$13 billion to rebuild Western European economies after WWII'),
  ('c1000000-0000-0000-0000-000000000008', 'What was the significance of the Gutenberg printing press?', 'Invented ~1440, it enabled mass production of books, accelerating literacy and the Reformation'),

  -- Organic Chemistry
  ('c1000000-0000-0000-0000-000000000009', 'What is an SN2 reaction?', 'A bimolecular nucleophilic substitution — backside attack, inversion of configuration, one step'),
  ('c1000000-0000-0000-0000-000000000009', 'What is an SN1 reaction?', 'A unimolecular nucleophilic substitution — forms a carbocation intermediate, racemisation'),
  ('c1000000-0000-0000-0000-000000000009', 'What is Markovnikov''s rule?', 'In addition reactions, the hydrogen adds to the carbon with more hydrogens (the H goes where the Hs are)'),
  ('c1000000-0000-0000-0000-000000000009', 'What is a nucleophile?', 'An electron-rich species that donates electrons to an electrophile, attacking electron-poor centres'),
  ('c1000000-0000-0000-0000-000000000009', 'What is an electrophile?', 'An electron-poor species that accepts electrons from a nucleophile'),
  ('c1000000-0000-0000-0000-000000000009', 'What is chirality?', 'A molecule is chiral if it is non-superimposable on its mirror image — typically due to a carbon with 4 different substituents'),
  ('c1000000-0000-0000-0000-000000000009', 'What is a carbonyl group?', 'A C=O functional group found in aldehydes, ketones, carboxylic acids, esters, and amides'),
  ('c1000000-0000-0000-0000-000000000009', 'What is resonance?', 'The delocalisation of electrons across multiple bonds, represented by multiple resonance structures'),
  ('c1000000-0000-0000-0000-000000000009', 'What is aromaticity?', 'A property of cyclic, planar, fully conjugated molecules with 4n+2 π electrons (Hückel''s rule)'),
  ('c1000000-0000-0000-0000-000000000009', 'What is an ester?', 'An organic compound formed by reacting a carboxylic acid with an alcohol, with general formula RCOOR'''),

  -- Python for Beginners
  ('c1000000-0000-0000-0000-000000000010', 'What is a list comprehension?', 'A concise way to create lists: [expression for item in iterable if condition]'),
  ('c1000000-0000-0000-0000-000000000010', 'What is the difference between a list and a tuple?', 'Lists are mutable (changeable); tuples are immutable (cannot be changed after creation)'),
  ('c1000000-0000-0000-0000-000000000010', 'What does len() do?', 'Returns the number of items in an object (string, list, dict, etc.)'),
  ('c1000000-0000-0000-0000-000000000010', 'What is a dictionary in Python?', 'A key-value data structure: {key: value}. Keys must be unique and immutable'),
  ('c1000000-0000-0000-0000-000000000010', 'What does range() return?', 'A sequence of numbers, commonly used in for loops: range(start, stop, step)'),
  ('c1000000-0000-0000-0000-000000000010', 'What is a decorator?', 'A function that wraps another function to extend its behaviour without modifying it — uses @syntax'),
  ('c1000000-0000-0000-0000-000000000010', 'What is the difference between == and is?', '== checks value equality; is checks identity (same object in memory)'),
  ('c1000000-0000-0000-0000-000000000010', 'What is a lambda function?', 'An anonymous, single-expression function: lambda args: expression'),
  ('c1000000-0000-0000-0000-000000000010', 'What is *args in Python?', 'Allows a function to accept any number of positional arguments as a tuple'),
  ('c1000000-0000-0000-0000-000000000010', 'What is **kwargs?', 'Allows a function to accept any number of keyword arguments as a dictionary'),

  -- English Grammar
  ('c1000000-0000-0000-0000-000000000011', 'What is a dangling modifier?', 'A phrase or clause that is not clearly connected to the word it modifies, causing ambiguity'),
  ('c1000000-0000-0000-0000-000000000011', 'When do you use "who" vs "whom"?', 'Use "who" as a subject; use "whom" as an object. Tip: if you can replace with "him", use "whom"'),
  ('c1000000-0000-0000-0000-000000000011', 'What is the Oxford comma?', 'The comma placed before "and" or "or" in a list of three or more items'),
  ('c1000000-0000-0000-0000-000000000011', 'What is the difference between "its" and "it''s"?', '"its" is possessive; "it''s" is a contraction of "it is" or "it has"'),
  ('c1000000-0000-0000-0000-000000000011', 'What is a subordinate clause?', 'A clause that cannot stand alone as a sentence — it depends on a main clause'),
  ('c1000000-0000-0000-0000-000000000011', 'What is the difference between active and passive voice?', 'Active: subject performs the action. Passive: subject receives the action'),
  ('c1000000-0000-0000-0000-000000000011', 'What is a gerund?', 'A verb form ending in -ing that functions as a noun (e.g. "Swimming is fun")'),
  ('c1000000-0000-0000-0000-000000000011', 'What is a split infinitive?', 'Placing an adverb between "to" and the verb (e.g. "to boldly go") — acceptable in modern English'),
  ('c1000000-0000-0000-0000-000000000011', 'What is the subjunctive mood?', 'Used to express wishes, hypotheticals, or demands: "I wish I were taller", "I suggest he leave"'),
  ('c1000000-0000-0000-0000-000000000011', 'What is a semicolon used for?', 'Joining two independent clauses that are closely related, without a conjunction'),

  -- CFA Level 1
  ('c1000000-0000-0000-0000-000000000012', 'What is the time value of money?', 'A dollar today is worth more than a dollar in the future due to its earning potential'),
  ('c1000000-0000-0000-0000-000000000012', 'What is the Sharpe ratio?', '(Portfolio return − Risk-free rate) / Portfolio standard deviation — measures risk-adjusted return'),
  ('c1000000-0000-0000-0000-000000000012', 'What is beta?', 'A measure of a security''s volatility relative to the overall market. Beta > 1 means more volatile than market'),
  ('c1000000-0000-0000-0000-000000000012', 'What is WACC?', 'Weighted Average Cost of Capital — the average rate a company pays to finance its assets, weighted by proportion of debt and equity'),
  ('c1000000-0000-0000-0000-000000000012', 'What is the efficient market hypothesis?', 'The theory that asset prices fully reflect all available information, making it impossible to consistently beat the market'),
  ('c1000000-0000-0000-0000-000000000012', 'What is duration?', 'A measure of a bond''s sensitivity to interest rate changes — the weighted average time to receive cash flows'),
  ('c1000000-0000-0000-0000-000000000012', 'What is the difference between systematic and unsystematic risk?', 'Systematic risk affects the whole market and cannot be diversified away; unsystematic risk is specific to a company and can be diversified'),
  ('c1000000-0000-0000-0000-000000000012', 'What is free cash flow?', 'Cash generated by a business after accounting for capital expenditures — available to distribute to investors'),
  ('c1000000-0000-0000-0000-000000000012', 'What is the Capital Asset Pricing Model (CAPM)?', 'Expected return = Risk-free rate + Beta × (Market return − Risk-free rate)'),
  ('c1000000-0000-0000-0000-000000000012', 'What is a derivative?', 'A financial instrument whose value is derived from an underlying asset such as stocks, bonds, or commodities');

-- Saved decks (cross-user saves)
INSERT INTO public.saved_decks (user_id, deck_id) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000005'),
  ('b1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000007'),
  ('b1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001'),
  ('b1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000005'),
  ('b1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000003'),
  ('b1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000007'),
  ('b1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000005'),
  ('b1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000006'),
  ('b1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000008'),
  ('b1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000010'),
  ('b1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000002'),
  ('b1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000009'),
  ('b1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000005'),
  ('b1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000006'),
  ('b1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000003'),
  ('b1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000004'),
  ('b1000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000007'),
  ('b1000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000012'),
  ('b1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000001'),
  ('b1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000002')
ON CONFLICT (user_id, deck_id) DO NOTHING;

-- Study sessions
INSERT INTO public.study_sessions (user_id, cards_reviewed, xp_earned, created_at) VALUES
  ('b1000000-0000-0000-0000-000000000001', 20, 40,  now() - interval '1 day'),
  ('b1000000-0000-0000-0000-000000000001', 15, 30,  now() - interval '3 days'),
  ('b1000000-0000-0000-0000-000000000001', 30, 60,  now() - interval '7 days'),
  ('b1000000-0000-0000-0000-000000000002', 25, 50,  now() - interval '1 day'),
  ('b1000000-0000-0000-0000-000000000002', 40, 80,  now() - interval '2 days'),
  ('b1000000-0000-0000-0000-000000000003', 18, 36,  now() - interval '2 days'),
  ('b1000000-0000-0000-0000-000000000003', 22, 44,  now() - interval '5 days'),
  ('b1000000-0000-0000-0000-000000000004', 35, 70,  now() - interval '1 day'),
  ('b1000000-0000-0000-0000-000000000005', 12, 24,  now() - interval '4 days'),
  ('b1000000-0000-0000-0000-000000000006', 28, 56,  now() - interval '1 day'),
  ('b1000000-0000-0000-0000-000000000006', 32, 64,  now() - interval '3 days'),
  ('b1000000-0000-0000-0000-000000000007', 10, 20,  now() - interval '6 days'),
  ('b1000000-0000-0000-0000-000000000008', 20, 40,  now() - interval '2 days'),
  ('b1000000-0000-0000-0000-000000000009', 24, 48,  now() - interval '1 day'),
  ('b1000000-0000-0000-0000-000000000010', 45, 90,  now() - interval '1 day'),
  ('b1000000-0000-0000-0000-000000000010', 38, 76,  now() - interval '2 days');

