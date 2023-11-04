# Next Supabase Starter

A ChatGPT integrated Next.js + Supabase starter

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tanstack Query](https://tanstack.com/query)
- [TailwindCSS](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)
- [OpenAI Node API Library](https://www.npmjs.com/package/openai)
- [Vercel AI SDK](https://www.npmjs.com/package/ai)

## Setup

To setup environment variables, create `.env` file in project root first. Read [Next.js guide](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)

### Supabase

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` by following [Supabase instructions](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs) likes this:

```
NEXT_PUBLIC_SUPABASE_URL=<YOUR URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR KEY>
```

#### Local development

Follow the [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) instructions to start local Supabase server. Configuration for local server is stored at `/supabase/config.toml` file.

### OpenAI

Set `OPENAI_API_KEY` from [OpenAI developer console](https://platform.openai.com/account/api-keys) like this:

```
OPENAI_API_KEY=<YOUR KEY HERE>
```

## Installation

I personally recommend using [Bun](https://bun.sh/) as the bundler/package manager. To install Bun, run the following bash script:

```bash
curl -fsSL https://bun.sh/install | bash
```

Once Bun is successfully installed, you can use it just like any other package manager (e.g. npm or yarn):

```bash
bun install
```

## Run

```bash
bun dev
```

## License

MIT
