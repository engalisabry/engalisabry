import fs from 'fs';
import fetch from 'node-fetch';

async function fetchLatestGists() {
  try {
    // Fetch latest gists from the GitHub API
    const response = await fetch('https://api.github.com/users/ali-sabry/gists');
    const gists = await response.json();

    // Get the latest two gists
    const latestTwo = gists.slice(0, 2);

    // Prepare markdown content for the latest gists, wrapped in a table
    const markdownContent = `
<table style="border: none;">
  <tr style="border: none;">
    ${latestTwo.map(gist => `
      <td align="center" style="border: none;">
        <div>
          <a href="https://gist.github.com/${gist.owner.login}/${gist.id}">
            <img src="https://github-readme-stats.vercel.app/api/gist?id=${gist.id}" alt="${gist.description}" />
          </a>
        </div>
      </td>
    `.trim()).join('')}
  </tr>
</table>
`;

    // Write this content to the latest-gists.md file
    fs.writeFileSync('latest-gists.md', markdownContent, 'utf8');
  } catch (error) {
    console.error('Failed to fetch or render latest gists', error);
  }
}

fetchLatestGists();
