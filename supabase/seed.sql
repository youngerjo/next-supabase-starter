-- Add an example chat completion
insert into public.chat_completions(id, created_at, updated_at, model, temperature, presence_penalty, frequency_penalty, max_tokens, messages)
  values ('a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', '2023-11-04T08:12:04.000000+00:00', '2023-11-04T08:12:04.000000+00:00', 'gpt-3.5-turbo', 1.0, 0.0, 0.0, 128, '[{"content": "Hello, I am a bot.", "role": "assistant"}]'::jsonb);

