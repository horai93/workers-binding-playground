import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

export default async function Home() {
  const HONO_APP = getCloudflareContext().env.HONO_APP;

  // 時間計測の開始
  const startTime = performance.now();
  const now = await HONO_APP.now();
  const endTime = performance.now();

  // 実行時間の計算（ミリ秒）
  const executionTime = endTime - startTime;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">RPC call demo</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <p className="text-2xl mb-2">{now.toISOString()}</p>
        <p className="text-lg text-gray-700">
          実行時間:{" "}
          <span className="font-semibold text-blue-600">
            {executionTime.toFixed(2)} ms
          </span>
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">デモページ</h2>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            <a href="/private" className="text-blue-500 hover:underline">
              Private API デモ
            </a>
            <span className="ml-2 text-gray-600">
              - Service Bindingを使用してprivate APIを呼び出す
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
