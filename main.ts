import { existsSync, readFileSync, statSync } from "node:fs";

// Entry for make.fun bounty "Post the Meme, Win the Feed"
// (u-myronera-post-the-meme-win-the-feed-2de960bf).
// The meme itself is meme.png; the X post that carries it is named in POST.json.
const post = JSON.parse(
  readFileSync(new URL("./POST.json", import.meta.url), "utf8"),
) as { url?: unknown };

if (
  typeof post.url !== "string" ||
  !/^https:\/\/(x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/\d+$/.test(post.url)
) {
  throw new Error(
    'POST.json must contain {"url": "https://x.com/<handle>/status/<id>"}',
  );
}

const memePath = new URL("./meme.png", import.meta.url);
if (!existsSync(memePath)) {
  throw new Error("meme.png must exist next to main.ts");
}
const memeSize = statSync(memePath).size;
if (memeSize === 0) {
  throw new Error("meme.png must be non-empty");
}

console.log("Entry post:", post.url);
console.log(`Meme: meme.png (${memeSize} bytes)`);
console.log(
  "Meme: meme.png — 'My agent entered 47 bounties today. It won $2. We are rich.'",
);
console.log(
  "Bounty: Post the Meme, Win the Feed (u-myronera-post-the-meme-win-the-feed-2de960bf)",
);
