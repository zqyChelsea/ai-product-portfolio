import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve("out");
const base = "/ai-product-portfolio";
const locales = ["zh-cn", "zh-hk", "en"];
const files = [
  "about",
  "resume",
  "contact",
  "recruiting-agent",
  "gptutor",
  "academic-advisor",
  "crawler-research",
  "meituan",
  "vivacity",
  "coxana",
];
const pages = [
  join(root, "index.html"),
  ...locales.flatMap((locale) => [
    join(root, locale, "index.html"),
    ...files.map((file) => join(root, locale, "files", file, "index.html")),
  ]),
];
let links = 0;
for (const page of pages) {
  assert(existsSync(page), `Missing static route: ${page}`);
  const html = readFileSync(page, "utf8");
  assert(html.includes("<h1"), `Missing page heading: ${page}`);
  for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const url = match[1].split(/[?#]/)[0];
    if (!url.startsWith("/")) continue;
    assert(
      url.startsWith(`${base}/`),
      `Missing GitHub Pages base path: ${url}`,
    );
    const relative = decodeURI(url.slice(base.length));
    const local = join(root, relative);
    assert(existsSync(local), `Broken link: ${url} in ${page}`);
    if (statSync(local).isDirectory())
      assert(existsSync(join(local, "index.html")), `No index for ${url}`);
    links++;
  }
}
const scan = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? scan(join(directory, entry.name))
      : [join(directory, entry.name)],
  );
// Keep private system URLs out of published links. Do not record client identifiers here.
const publicHosts = new Set([
  "github.com",
  "www.linkedin.com",
  "doi.org",
  "zqychelsea.github.io",
]);
for (const page of pages) {
  for (const match of readFileSync(page, "utf8").matchAll(
    /href="(https?:[^"\s]+)"/g,
  )) {
    assert(
      publicHosts.has(new URL(match[1]).hostname),
      `Unreviewed external link in ${page}`,
    );
  }
}
for (const path of scan(root)) {
  assert(
    !/^\/(art|projects|resume)\//.test(path.slice(root.length)),
    `Legacy download or asset remains: ${path}`,
  );
}
assert(
  readFileSync(pages[0], "utf8").includes("你好，我是张沁烨。"),
  "Default entry must be simplified Chinese",
);
for (const locale of locales) {
  const home = readFileSync(join(root, locale, "index.html"), "utf8");
  assert(
    !home.includes('class="intro-name">River'),
    `Homepage name suffix remains: ${locale}`,
  );
  const contact = readFileSync(
    join(root, locale, "files/contact/index.html"),
    "utf8",
  );
  for (const href of [
    "mailto:zqy.river@gmail.com",
    "tel:+85263144816",
    "tel:+8618252616365",
  ]) {
    assert(
      contact.includes(`href="${href}"`),
      `Missing contact action: ${locale}`,
    );
  }
  const resume = readFileSync(
    join(root, locale, "files/resume/index.html"),
    "utf8",
  );
  assert(
    resume.includes("mailto:zqy.river@gmail.com"),
    `Outdated résumé email: ${locale}`,
  );
}
console.log(
  `PASS: ${pages.length} static content pages, ${links} local links/assets, default Chinese, and public-link allowlist.`,
);
