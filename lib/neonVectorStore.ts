import { neon } from "@neondatabase/serverless";

export interface DocumentChunk {
  id: string;
  content: string;
  metadata: {
    title?: string;
    url?: string;
    [key: string]: unknown;
  };
  similarity: number;
}

/**
 * Creates a serverless Neon vector store adapter for the RAG chatbot pipeline.
 * Queries Neon PostgreSQL with native pgvector cosine similarity.
 */
export function createNeonVectorStore(databaseUrl: string) {
  const sql = neon(databaseUrl);

  return async (
    embedding: number[],
    options: { matchCount: number; matchThreshold: number; question?: string }
  ): Promise<DocumentChunk[]> => {
    try {
      const vectorString = `[${embedding.join(",")}]`;
      const threshold = options.matchThreshold ?? 0.5;
      const count = options.matchCount ?? 8;

      const query = `
        SELECT 
          id, 
          content, 
          metadata, 
          1 - (embedding <=> $1::vector) AS similarity
        FROM documents
        WHERE 1 - (embedding <=> $1::vector) > $2
        ORDER BY embedding <=> $1::vector
        LIMIT $3;
      `;

      const rows = (await sql.query(query, [vectorString, threshold, count])) as Array<{
        id: string;
        content: string;
        metadata: Record<string, unknown>;
        similarity: number;
      }>;

      return rows.map((row) => ({
        id: String(row.id),
        content: String(row.content || ""),
        metadata: (row.metadata || {}) as Record<string, unknown>,
        similarity: Number(row.similarity || 0),
      }));
    } catch (error) {
      console.error("[Neon Vector Store Error]:", error);
      return [];
    }
  };
}
