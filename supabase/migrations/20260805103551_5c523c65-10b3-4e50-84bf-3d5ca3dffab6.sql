CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Tour packages
CREATE TABLE public.tour_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  summary text NOT NULL,
  description text NOT NULL,
  inclusions text[] NOT NULL DEFAULT '{}',
  price_cents integer NOT NULL,
  deposit_cents integer NOT NULL,
  image_url text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tour_packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tour_packages TO authenticated;
GRANT ALL ON public.tour_packages TO service_role;
ALTER TABLE public.tour_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published packages are public" ON public.tour_packages FOR SELECT USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage packages" ON public.tour_packages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER tour_packages_updated BEFORE UPDATE ON public.tour_packages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.tour_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid NOT NULL REFERENCES public.tour_packages(id) ON DELETE CASCADE,
  departure_date date NOT NULL,
  seats_available integer NOT NULL DEFAULT 7,
  is_open boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tour_dates TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tour_dates TO authenticated;
GRANT ALL ON public.tour_dates TO service_role;
ALTER TABLE public.tour_dates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Open dates are public" ON public.tour_dates FOR SELECT USING (is_open = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage dates" ON public.tour_dates FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Bookings (POPIA: personal data never publicly readable)
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT ('OPHE-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6))),
  service_type text NOT NULL,
  tour_package_id uuid REFERENCES public.tour_packages(id) ON DELETE SET NULL,
  tour_date_id uuid REFERENCES public.tour_dates(id) ON DELETE SET NULL,
  travel_date date,
  travel_time text,
  pickup_location text NOT NULL,
  dropoff_location text NOT NULL,
  passengers integer NOT NULL DEFAULT 1,
  luggage_notes text,
  special_requests text,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text NOT NULL,
  quoted_cents integer,
  deposit_cents integer,
  payment_status text NOT NULL DEFAULT 'awaiting_deposit',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.bookings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can request a booking" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read bookings" ON public.bookings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update bookings" ON public.bookings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete bookings" ON public.bookings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER bookings_updated BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Testimonials
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text,
  rating integer NOT NULL DEFAULT 5,
  message text NOT NULL,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved testimonials are public" ON public.testimonials FOR SELECT USING (approved = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can submit a testimonial" ON public.testimonials FOR INSERT WITH CHECK (approved = false);
CREATE POLICY "Admins moderate testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Contact messages
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  handled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a message" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Blog posts
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL,
  body text NOT NULL,
  published boolean NOT NULL DEFAULT true,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published posts are public" ON public.blog_posts FOR SELECT USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage posts" ON public.blog_posts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER blog_posts_updated BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed data
INSERT INTO public.tour_packages (slug, title, summary, description, inclusions, price_cents, deposit_cents)
VALUES (
  'sun-city-valley-of-the-waves',
  'Day Trip to Sun City — Valley of the Waves',
  'Relax, splash and unwind at Sun City''s famous Valley of the Waves. The perfect day getaway.',
  'Leave the driving to us. We collect you in Johannesburg, get you to Sun City in comfort, and bring you home safely at the end of the day. Great vibes, safe travel and unforgettable memories.',
  ARRAY['Return transport Johannesburg to Sun City', 'Entrance to Valley of the Waves', 'Food & drinks at own cost', 'Great vibes, safe travel and unforgettable memories'],
  135000,
  67500
);

INSERT INTO public.tour_dates (package_id, departure_date)
SELECT id, d::date FROM public.tour_packages, (VALUES ('2026-09-19'), ('2026-10-03')) AS v(d)
WHERE slug = 'sun-city-valley-of-the-waves';

INSERT INTO public.blog_posts (slug, title, excerpt, body) VALUES
('how-much-does-an-airport-shuttle-cost-in-gauteng',
 'How Much Does an Airport Shuttle Cost in Gauteng?',
 'A plain-English look at what goes into the price of an airport transfer in Johannesburg and Pretoria.',
 '[PLACEHOLDER DRAFT — to be reviewed and expanded]

Airport shuttle pricing in Gauteng usually comes down to four things: distance, time of day, number of passengers, and luggage. A short hop from Sandton to OR Tambo costs far less than a Pretoria East pickup at 4am.

What affects the price
- Distance and traffic on the route
- Early morning or late night pickups
- Number of passengers and bags
- Waiting time if a flight is delayed

Why a fixed quote beats metered rides
With OPHE you get one agreed price up front. No surge, no surprises, and your driver tracks your flight so you are collected when you actually land.

Ready for a quote? Send us your route on WhatsApp and we will come back to you the same day.'),
('best-day-trips-from-johannesburg',
 'Best Day Trips from Johannesburg',
 'Five easy escapes within driving distance of Joburg — and how to do them without the stress of driving.',
 '[PLACEHOLDER DRAFT — to be reviewed and expanded]

1. Sun City and Valley of the Waves — the classic splash-and-relax day out.
2. The Cradle of Humankind — caves, history and a great lunch stop.
3. Hartbeespoort Dam — the cableway, markets and mountain views.
4. Magaliesburg — slow roads, farm stalls and country air.
5. Pretoria — Union Buildings, jacarandas and museums.

Doing it with a private shuttle means no designated driver, no parking, and everyone arrives together.'),
('why-book-a-private-shuttle-for-your-next-event',
 'Why Book a Private Shuttle for Your Next Event',
 'Matric dances, weddings, birthdays and welcome-home airport pickups — why the ride matters as much as the event.',
 '[PLACEHOLDER DRAFT — to be reviewed and expanded]

The arrival is part of the celebration. A clean, comfortable vehicle with a professional driver turns a lift into a moment — champagne on board, flowers on the seat, photos before you walk in.

Good reasons to book private transport
- Everyone travels together and arrives on time
- No one has to stay sober to drive
- Safe, door-to-door travel late at night
- Room for outfits, gifts and luggage

Tell us what you are celebrating and we will set the vehicle up for it.');