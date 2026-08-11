// Academy curriculum helpers — the single place that knows how lessons are
// ordered, grouped and linked. Pages import from here rather than re-deriving
// ordering rules, so prev/next, the topic hubs and the index all agree.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Lesson = CollectionEntry<'academy'>;
export type Level = 'basic' | 'advanced' | 'expert';

export const LEVELS: Level[] = ['basic', 'advanced', 'expert'];
export const LEVEL_LABELS: Record<Level, string> = {
  basic: 'Basic',
  advanced: 'Advanced',
  expert: 'Expert',
};

export const thumbUrl = (youtubeId: string) => `/academy-thumbs/${youtubeId}.jpg`;
// Grid-card / search-result thumbnail — YouTube's own 480x360 "hqdefault" instead
// of the full maxresdefault pull. Same object-fit:cover crop, ~1/10th the bytes;
// the full-size thumbUrl stays reserved for the lesson page's own hero + og:image,
// which actually need the resolution. See DECISIONS #57.
export const thumbUrlSmall = (youtubeId: string) => `/academy-thumbs-sm/${youtubeId}.jpg`;
export const watchUrl = (youtubeId: string) => `https://www.youtube.com/watch?v=${youtubeId}`;

export function formatDuration(seconds: number): string {
  const m = Math.round(seconds / 60);
  return `${Math.max(1, m)} min`;
}

export function formatTimestamp(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/** All lessons, in curriculum order: topic order, then level, then `order`. */
export async function allLessons(): Promise<Lesson[]> {
  const [lessons, topics] = await Promise.all([getCollection('academy'), getCollection('academyTopics')]);
  const topicOrder = new Map(topics.map((t) => [t.id, t.data.order]));
  return lessons.sort((a, b) => {
    const ta = topicOrder.get(a.data.topic) ?? 99;
    const tb = topicOrder.get(b.data.topic) ?? 99;
    if (ta !== tb) return ta - tb;
    const la = LEVELS.indexOf(a.data.level) - LEVELS.indexOf(b.data.level);
    if (la !== 0) return la;
    return a.data.order - b.data.order;
  });
}

export async function lessonsByTopic(topicId: string): Promise<Lesson[]> {
  return (await allLessons()).filter((l) => l.data.topic === topicId);
}

/**
 * Prev/next within a topic. Deliberately scoped to the topic rather than the
 * whole curriculum — a reader finishing "What is RAG?" wants the next AI
 * Fundamentals lesson, not the first Claude one.
 */
export async function adjacent(lesson: Lesson): Promise<{ prev?: Lesson; next?: Lesson }> {
  const siblings = await lessonsByTopic(lesson.data.topic);
  const i = siblings.findIndex((l) => l.id === lesson.id);
  if (i === -1) return {};
  return { prev: siblings[i - 1], next: siblings[i + 1] };
}

/**
 * Up to `limit` lessons to show under a lesson. Same topic first (that's the
 * track the reader is on), topped up from elsewhere so the row is never short.
 */
export async function relatedLessons(lesson: Lesson, limit = 4): Promise<Lesson[]> {
  const all = await allLessons();
  const sameTopic = all.filter((l) => l.data.topic === lesson.data.topic && l.id !== lesson.id);
  const rest = all.filter((l) => l.data.topic !== lesson.data.topic);
  return [...sameTopic, ...rest].slice(0, limit);
}

/** The client-side search index — kept small: no transcripts, just what ranks. */
export async function searchIndex() {
  const lessons = await allLessons();
  return lessons.map((l) => ({
    slug: l.id,
    title: l.data.title,
    topic: l.data.topic,
    level: l.data.level,
    duration: l.data.duration,
    youtubeId: l.data.youtubeId,
    description: l.data.description,
  }));
}
