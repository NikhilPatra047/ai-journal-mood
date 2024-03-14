import { OpenAI } from "langchain/llms/openai"
import z from 'zod'
import { StructuredOutputParser } from "langchain/output_parsers"
import { PromptTemplate } from "langchain/prompts"
import { Document } from "langchain/document"
import { loadQARefineChain } from "langchain/chains"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { MemoryVectorStore } from "langchain/vectorstores/memory"

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),
    mood: z.string().describe('The mood of the person who wrote the journal entry.'),
    emoji: z.string().describe('Return an emoji describing the mood'),
    subject: z.string().describe('the subject of the journal entry. Ensure that it truly is a summary based on the journal entry and not some random hexadecimal value representing a color.'),
    summary: z.string().describe('Quick summary of the entire journal entry. Ensure that it truly is a summary based on the journal entry and not some random hexadecimal value representing a color.'),
    negative: z.boolean().describe('Is the journal entry negative?(i.e. does it contain negative emotions?).'),
    color: z.string().describe('a hexadecimal color code representing the mood of the person who wrote the journal entry. For example, #0101fe which is the hexadecimal color code for the color blue, represents happiness.'),
    textColor: z.string().describe('Produce a text color that goes along with the background. If the color as per the mood is dark, make the text color white, and if the color as per the mood is light, make the text color black.'),
  })
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template: `Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}`,
    inputVariables: ['entry'],
    partialVariables: { format_instructions }
  })

  const input = await prompt.format({
    entry: content, 
  })

  return input
}

export const analyse = async (content: string) => {
  const input = await getPrompt(content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const result = await model.invoke(input)

  try {
    return parser.parse(result)
    // The result is being parsed to get the output in the format mentioned above.
  } catch (error) {
    console.log(error)
  }
}

interface ENTRIES {
  id: string; 
  content: string; 
  createdAt: Date;
}

export const qa = async (question: string, entries: ENTRIES[]) => {
  const docs: Document<{ source: string; date: Date; }>[] = entries.map((entry: ENTRIES) => {
    return new Document({
      pageContent: entry.content,
      metadata: { source: entry.id, date: entry.createdAt },
    })
  })
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const chain = loadQARefineChain(model)
  // chain multiple LLM calls together
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}