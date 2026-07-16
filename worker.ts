import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai'; // 使用官方 OpenAI provider

export interface Env {
  CF_AIG_TOKEN: string; // Cloudflare API Token 或 Gateway 特定的 API Key
  ACCOUNT_ID: string;   // Cloudflare Account ID
  GATEWAY_ID: string;   // AI Gateway ID
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      // 1. 构建 Cloudflare AI Gateway 的 baseURL
      const gatewayBaseURL = `https://gateway.ai.cloudflare.com/v1/${env.ACCOUNT_ID}/${env.GATEWAY_ID}/openai`;

      // 2. 创建 OpenAI 实例，指向 Cloudflare AI Gateway
      // 注意：apiKey 应该是你在 Cloudflare Dashboard 中为 Gateway 设置的 API Token
      // 或者使用 Cloudflare 全局 API Key，但推荐使用受限的 Token
      const openai = createOpenAI({
        baseURL: gatewayBaseURL,
        apiKey: env.CF_AIG_TOKEN, 
      });

      // 3. 调用 generateText，使用标准模型名称（如 gpt-4o, gpt-3.5-turbo）
      // Cloudflare Gateway 会根据你的配置将此请求转发给 OpenAI
      const { text } = await generateText({
        model: openai('gpt-4o'), // 使用你希望在 Gateway 中调用的模型
        prompt: 'What is Cloudflare?',
      });

      return new Response(text, {
        headers: { 'content-type': 'text/plain' },
      });
    } catch (error) {
      console.error('Error generating text:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
