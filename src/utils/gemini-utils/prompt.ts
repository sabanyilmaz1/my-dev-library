import { formatVideos } from "./formatVideo";
import { targetAudiences } from "./targetAudience";

export const promptIA = `
You will be provided with the **transcript of a YouTube video**, potentially including start and end timestamps for each word or sentence.

Your objective is to analyze this content to extract and synthesize a rich set of metadata to power a personal knowledge application.

**Your task is to analyze the content and generate a highly selective, structured summary including the following sections:**

1.  **Main Theme:** Identify and articulate the single central subject of the video in one concise sentence.
2.  **Key Points:** Extract a concise list of the **3 to 5 most critical** arguments and conclusions. Prioritize the central thesis and the main supporting evidence.
3.  **Detailed Summary:** Write a detailed summary of the entire video. This summary should consist of one or two well-structured paragraphs that synthesize the key points and follow the narrative flow of the video.
4.  **Tags:** Generate a list of the most relevant tags that categorize the video's core content.
5.  **Video Format:** Classify the video into ONE of the following formats: ${formatVideos
  .map((format) => format.labelEn)
  .join(", ")}.
6.  **Target Audience:** Determine the intended audience for the video. Choose ONE: ${targetAudiences
  .map((audience) => audience.labelEn)
  .join(", ")}.
7.  **Key Moments:** Identify the **5 to 7 truly pivotal** moments in the video (turning points, surprising revelations, powerful statements).
8.  **Keywords and Lexicon:** Compile a highly selective glossary of the **3 to 7 most essential** technical terms or concepts necessary to understand the video.
9.  **Key Questions Answered:** Identify and list the main questions the video explicitly or implicitly answers. This should act as a mini-FAQ for the video's content.
10. **Standout Quotes or Facts:** Identify the **2 most significant quotes** from the provided text by following these criteria in order of priority:
    a) **Conclusionary Statements:** Find sentences that summarize a key conclusion or the main message of the video.
    b) **Rhetorical & Definitive Language:** Look for sentences that are phrased as a powerful, definitive statement or that directly answer a rhetorical question.
    c) **Contrasting Ideas:** Find sentences that present a surprising contrast or paradox (often using words like "but", "however", "yet").
    Select the two best candidates based on this analysis. If only one truly significant quote is found, returning a list with a single item is acceptable. Each item in the list must include its timestamp.

**Please adhere to the following rules:**

* **Content Eligibility:** This analysis is designed for informational content (educational, documentary, analytical, etc.). If the provided text clearly belongs to a **music video, a gameplay video ('let's play'), or a reaction video**, the content is not suitable. In these specific cases, you must ignore all other instructions and return only an empty JSON object: **{}**.
* **Prioritize Significance over Quantity:** For "Key Points", "Key Moments", and "Lexicon", your main goal is to select the most important items, not to create long lists.
* **Crucially, all textual content within the final JSON output (values for themes, points, descriptions, definitions, etc.) must be written in French.**
* **Maintain a Neutral and Objective Tone:** All generated text should be written in a formal, encyclopedic style. Avoid conversational language or personal opinions.
* **Avoid Redundancy:** The 'detailed_summary' must be a fluid, well-written synthesis. It should not be a simple repetition or concatenation of the sentences from the 'key_points'.
* **Timestamp Integrity:** For each object within the **standout_quotes** list, only provide a 'timestamp' if it is explicitly available in the source transcript data. If not, the value for 'timestamp' must be 'null'.
* Your analysis must be based **solely** on the information present in the **provided text**.
* If a section cannot be relevantly filled, leave the corresponding key with an empty or null value.

**Output Format:**

The final output must be **only the JSON object itself, and nothing else.** It must be perfectly readable by a standard parser like 'json.loads()'. The structure and content must strictly follow this model:

{
  "main_theme": "Le thème central de la vidéo est l'exploration du paradoxe de Fermi et les hypothèses expliquant le silence apparent des civilisations extraterrestres.",
  "key_points": [
    "Le paradoxe de Fermi souligne la contradiction entre la haute probabilité de l'existence de civilisations extraterrestres et l'absence de preuves.",
    "L'hypothèse du 'Grand Filtre' suggère qu'une barrière quasi infranchissable empêche les civilisations d'atteindre un stade de communication interstellaire.",
    "D'autres solutions, comme l'hypothèse du 'zoo' ou la difficulté des voyages interstellaires, sont également envisagées."
  ],
  "detailed_summary": "Cette vidéo analyse en profondeur le célèbre paradoxe de Fermi : s'il existe des milliards de planètes potentiellement habitables dans notre galaxie, pourquoi n'avons-nous jamais détecté le moindre signe de vie intelligente ? L'auteur présente les bases du paradoxe avant d'explorer les pistes de réponse les plus connues. Une part importante est consacrée à la théorie du 'Grand Filtre', un obstacle hypothétique qui empêcherait l'émergence de civilisations avancées. D'autres théories sont aussi discutées, offrant un tour d'horizon complet sur ce mystère captivant de l'astronomie moderne.",
  "tags": [
    "#astronomie",
    "#paradoxe",
    "#fermi",
    "#exobiologie",
    "#science"
  ],
  "video_format": "Analyse" (In French),
  "target_audience": "Intermédiaire" (In French),
  "key_moments": [
    {
      "timestamp": "00:03:15",
      "description": "Formulation claire et concise du paradoxe de Fermi."
    },
    {
      "timestamp": "00:12:30",
      "description": "Explication détaillée du concept de 'Grand Filtre'."
    }
  ],
  "lexicon": [
    {
      "keyword": "Équation de Drake",
      "definition": "Une formule mathématique utilisée pour estimer le nombre potentiel de civilisations extraterrestres avec lesquelles nous pourrions communiquer."
    },
    {
      "keyword": "Sphère de Dyson",
      "definition": "Une mégastructure hypothétique qu'une civilisation très avancée pourrait construire autour d'une étoile pour en capter toute l'énergie."
    }
  ],
  "questions_answered": [
    "Qu'est-ce que le paradoxe de Fermi ?",
    "Qu'est-ce que la théorie du 'Grand Filtre' ?",
    "Y a-t-il d'autres explications au silence radio de l'univers ?"
  ],
  "standout_quotes": [
    {
      "timestamp": "00:18:45",
      "quote": "Soit nous sommes seuls dans l'univers, soit le silence que nous observons cache une vérité bien plus complexe, et peut-être plus inquiétante."
    },
    {
      "timestamp": "00:02:10",
      "quote": "L'absence de preuve n'est pas une preuve d'absence, mais elle invite à une profonde humilité."
    }
  ]
}

`;
