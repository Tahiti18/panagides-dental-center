# Content gaps — confirm with the clinic before launch

- **Opening hours.** The clinic website says Mon–Thu 9:00–19:00, Fri 9:00–16:00. Google shows a lunch break (Tuesday 9:00–13:30 and 15:00–19:00). The site shows the website hours; confirm the real schedule.
- **Before/after cases.** The owner has approval to publish the clinic's Facebook close-ups (e.g. "Restoration of worn-out dentition: aesthetics and function in harmony"). Facebook needs a login, so the images could not be downloaded here. Add them to `public/img/cases/` and list them in `src/data/cases.ts`; the homepage results section appears automatically.
- **Portrait.** The only portrait is 357 × 357 px. A larger original would sharpen the doctor sections.
- **Google reviews.** The 8 review texts and their 5-star ratings come from the July 2026 build; confirm they are still live. The review count is not shown (not visible when signed out).
- **Dr Hadjicosti** is named once in a testimonial on the clinic website; role unknown, so not shown.
- **Greek spelling** of the doctor's name (Άδωνις Παναγίδης) and Greek copy: check with the clinic.
- **Blog.** The 19 posts are imported as the clinic published them. Some read as copied from other sites (the whitening myths post names "Discover Dental"; the wisdom-teeth post quotes US statistics). Consider rewriting or removing those.
- **Appointment form** uses Netlify Forms. Form detection must be enabled in Netlify (Project configuration → Forms) and notifications sent to the clinic's email; until then the form shows an error that points to the phone and WhatsApp.
- **3D X-ray.** The clinic's implant article says implants are planned from "a 3D X-ray"; where it is taken is not stated, so the site does not say it is in-house.
