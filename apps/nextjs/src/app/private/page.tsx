import { getCloudflareContext } from "@opennextjs/cloudflare";
import { hc } from "hono/client";
import type { AppType } from "@workers-binding-playground/private";

export const dynamic = "force-dynamic";

interface PrivateApiResponse {
  success: boolean;
  data: string;
  source: string;
}

export default async function PrivatePage() {
  try {
    // 時間計測の開始
    const privateApiStartTime = performance.now();

    // Cloudflare環境を取得
    const { env } = getCloudflareContext();

    // Service Bindingを使用してprivate APIを呼び出す
    const client = hc<AppType>("http://localhost:3002/", {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        console.log("path", input);
        // Service Bindingを使用してリクエストを送信
        return env.PRIVATE_API.fetch(input, init);
      },
    });

    // private APIを呼び出す
    const response = await client.private.$get();
    const data = await response.text();

    const privateApiEndTime = performance.now();
    const privateApiExecutionTime = privateApiEndTime - privateApiStartTime;

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Private API Demo</h1>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-xl mb-2">{data}</p>
          <p className="text-lg text-gray-700">
            実行時間:{" "}
            <span className="font-semibold text-blue-600">
              {privateApiExecutionTime.toFixed(2)} ms
            </span>
          </p>
          <p className="text-sm text-gray-500">
            ソース: private-api (Service Binding)
          </p>
        </div>
        <div className="mt-4">
          <a href="/" className="text-blue-500 hover:underline">
            ホームに戻る
          </a>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error calling private API:", error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Private API Demo</h1>
        <div className="bg-red-100 p-4 rounded-lg mb-4">
          <p className="text-xl mb-2 text-red-600">
            エラーが発生しました:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
        <div className="mt-4">
          <a href="/" className="text-blue-500 hover:underline">
            ホームに戻る
          </a>
        </div>
      </div>
    );
  }
}
