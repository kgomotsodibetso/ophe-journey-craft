DROP POLICY "Published packages are public" ON public.tour_packages;
CREATE POLICY "Published packages are public" ON public.tour_packages FOR SELECT USING (published = true);
CREATE POLICY "Admins read all packages" ON public.tour_packages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Open dates are public" ON public.tour_dates;
CREATE POLICY "Open dates are public" ON public.tour_dates FOR SELECT USING (is_open = true);
CREATE POLICY "Admins read all dates" ON public.tour_dates FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Approved testimonials are public" ON public.testimonials;
CREATE POLICY "Approved testimonials are public" ON public.testimonials FOR SELECT USING (approved = true);
CREATE POLICY "Admins read all testimonials" ON public.testimonials FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Published posts are public" ON public.blog_posts;
CREATE POLICY "Published posts are public" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admins read all posts" ON public.blog_posts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;