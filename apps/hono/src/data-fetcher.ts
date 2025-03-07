import { WorkerEntrypoint } from "cloudflare:workers";

export class DataFetcher extends WorkerEntrypoint {
  async fetch() {
    return new Response("Hello from Hono");
  }

  async now(): Promise<Date> {
    const now = new Date();

    console.debug(`DataFetcher now: ${now.toISOString()}`);
    return now;
  }
}
