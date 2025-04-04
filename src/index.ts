import { createApp } from './app';

const PORT = 3000;

async function main() {
  const app = await createApp();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main().catch(err => {
  console.error('Failed to start the application:', err);
  process.exit(1);
});
