import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { authenticator } from '#app/modules/auth/auth.server';
import { cn } from '#app/utils/misc';
import { useTheme } from '#app/utils/hooks/use-theme.js';
import { siteConfig } from '#app/utils/constants/brand';
import { ROUTE_PATH as LOGIN_PATH } from '#app/routes/auth+/login';
import { buttonVariants } from '#app/components/ui/button';
import { ThemeSwitcherHome } from '#app/components/misc/theme-switcher';
import { Logo } from '#app/components/logo';
import ShadowPNG from '#public/images/shadow.png';

export const meta: MetaFunction = () => {
  return [{ title: `${siteConfig.siteTitle} - Starter Kit` }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const sessionUser = await authenticator.isAuthenticated(request);
  return json({ user: sessionUser } as const);
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();
  const theme = useTheme();

  return (
    <div className="relative flex h-full w-full flex-col bg-card">
      {/* Navigation */}
      <div className="sticky top-0 z-50 mx-auto flex w-full max-w-screen-lg items-center justify-between p-6 py-3">
        <Link to="/" prefetch="intent" className="flex h-10 items-center gap-1">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <Link to={LOGIN_PATH} className={buttonVariants({ size: 'sm' })}>
            {user ? 'Dashboard' : 'Get Started'}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="z-10 mx-auto flex w-full max-w-screen-lg flex-col gap-4 px-6">
        <div className="z-10 flex h-full w-full flex-col items-center justify-center gap-4 p-12 md:p-24">
          <h1 className="text-center text-6xl font-bold leading-tight text-primary md:text-7xl lg:leading-tight">
            Tests Generator
          </h1>
          <p className="max-w-screen-md text-center text-lg !leading-normal text-muted-foreground md:text-xl">
            <span className="font-medium text-primary">Create tests</span> quickly and in
            many variants.
          </p>
          <div className="mt-2 flex w-full items-center justify-center gap-2">
            <Link
              to={LOGIN_PATH}
              className={cn(buttonVariants({ size: 'sm' }), 'hidden sm:flex')}
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'hidden dark:bg-secondary dark:hover:opacity-80 sm:flex',
              )}
            >
              Explore possibilities
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <h2 className="text-center font-serif text-xl font-medium text-primary/60">
            Built for Teachers
          </h2>
        </div>
        <div className="relative z-10 flex flex-col border border-border backdrop-blur-sm lg:flex-row">
          <div className="flex w-full flex-col items-start justify-center gap-6 border-r border-primary/10 p-10 lg:w-[60%] lg:p-12">
            <p className="h-14 text-lg text-primary/60">
              <span className="font-semibold text-primary">Quick and easy.</span> Create
              your test in many variants.
            </p>
            <Link to={LOGIN_PATH} className={buttonVariants({ size: 'sm' })}>
              Get Started
            </Link>
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-6 p-10 lg:border-b-0 lg:p-12">
            <p className="h-14 text-lg text-primary/60">
              <span className="font-semibold text-primary">Many possibilities.</span>{' '}
              Generate multiple test variations by randomizing the order of questions and
              answers.
            </p>
            <Link
              to="/features"
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'hidden dark:bg-secondary dark:hover:opacity-80 sm:flex',
              )}
            >
              Explore possibilities
            </Link>
          </div>

          <div className="absolute left-0 top-0 z-10 flex flex-col items-center justify-center">
            <span className="absolute h-6 w-[1px] bg-primary/40" />
            <span className="absolute h-[1px] w-6 bg-primary/40" />
          </div>
          <div className="absolute bottom-0 right-0 z-10 flex flex-col items-center justify-center">
            <span className="absolute h-6 w-[1px] bg-primary/40" />
            <span className="absolute h-[1px] w-6 bg-primary/40" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="z-10 flex w-full flex-col items-center justify-center gap-8 py-6">
        <ThemeSwitcherHome />

        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <p className="flex items-center whitespace-nowrap text-center text-sm font-medium text-primary/60">
            Built by&nbsp;
            <a
              href="https://twitter.com/RemigiuszWasiak"
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-primary hover:text-primary hover:underline"
            >
              Remigiusz Wasiak
            </a>
          </p>
        </div>
      </footer>

      {/* Background */}
      <img
        src={ShadowPNG}
        alt="Hero"
        className={`fixed left-0 top-0 z-0 h-full w-full opacity-60 ${theme === 'dark' ? 'invert' : ''}`}
      />
      <div className="base-grid fixed h-screen w-screen opacity-40" />
      <div className="fixed bottom-0 h-screen w-screen bg-gradient-to-t from-[hsl(var(--card))] to-transparent" />
    </div>
  );
}
