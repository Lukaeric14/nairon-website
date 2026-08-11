// Academy progress — localStorage only, no account required.
//
// Deliberately client-side: the value of "8 of 24 done" is that it costs the
// reader nothing to get. Anything requiring a login would kill the completion
// rate it's meant to encourage. Nothing here is load-bearing for SEO — every
// page renders complete without it.
const KEY = 'nairon.academy.progress.v1';

type Progress = { completed: string[]; last?: string };

function read(): Progress {
  if (typeof localStorage === 'undefined') return { completed: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { completed: [] };
    const parsed = JSON.parse(raw) as Progress;
    return { completed: Array.isArray(parsed.completed) ? parsed.completed : [], last: parsed.last };
  } catch {
    return { completed: [] };
  }
}

function write(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // Private mode / quota — progress is a nicety, never an error.
  }
}

export function getCompleted(): Set<string> {
  return new Set(read().completed);
}

export function isComplete(slug: string): boolean {
  return getCompleted().has(slug);
}

export function setComplete(slug: string, done: boolean) {
  const p = read();
  const set = new Set(p.completed);
  if (done) set.add(slug);
  else set.delete(slug);
  write({ ...p, completed: [...set] });
  document.dispatchEvent(new CustomEvent('academy:progress'));
}

export function setLastVisited(slug: string) {
  const p = read();
  write({ ...p, last: slug });
}

export function getLastVisited(): string | undefined {
  return read().last;
}
