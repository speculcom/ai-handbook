import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const repos = JSON.parse(fs.readFileSync(path.join(root, 'repos.json'), 'utf8')).repos;

const token = process.env.GITHUB_TOKEN || '';
const headers = {
  'User-Agent': 'specul-oss-snapshot',
  Accept: 'application/vnd.github+json',
  ...(token ? { Authorization: `Bearer ${token}` } : {})
};

const out = {};
for (const r of repos) {
  const full = `${r.owner}/${r.repo}`;
  try {
    const res = await fetch(`https://api.github.com/repos/${full}`, { headers });
    if (!res.ok) {
      console.error(`FAIL ${full} ${res.status}`);
      continue;
    }
    const x = await res.json();
    out[full] = {
      full_name: x.full_name,
      stars: x.stargazers_count,
      forks: x.forks_count,
      language: x.language,
      license: x.license ? x.license.spdx_id : null,
      archived: x.archived,
      pushed_at: x.pushed_at,
      url: x.html_url
    };
    console.log(`OK ${full} ${x.stargazers_count}`);
  } catch (err) {
    console.error(`FAIL ${full} ${err.message}`);
  }
}

const date = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(root, 'snapshots', `${date}.json`), JSON.stringify(out, null, 2) + '\n');
console.log(`saved ${Object.keys(out).length}/${repos.length} -> snapshots/${date}.json`);
