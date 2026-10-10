# VEMR website

A lightweight Minecraft survival homepage for **Vemr.net**. All assets are included. No build process, packages, paid fonts, analytics, or external image services are needed.

## Configure the server

The supplied Discord invite is `https://discord.gg/JpyDFredx`. The supported Minecraft version range is **26.2 and up**. Java uses `169.150.134.208`. Bedrock uses `169.150.134.208` with port `25565`. These are owner-provided settings; network connectivity has not been tested.

Edit `site-config.js` with your actual Java address, Java version, Bedrock address/port (if supported), and Discord invitation. Leave unsupported editions blank. The site does not show an unconfirmed server address or claim to measure live server status.

Open `index.html` to see the design locally. Address copying works on HTTPS or localhost; a manual-copy message appears when clipboard access is unavailable.

## GitHub → Vercel

1. Create a GitHub repository named `vemr-website` (private is fine).
2. Upload **the contents** of this folder to the repository root. `index.html` must be at the root, alongside `vercel.json`, `app.js`, `styles.css`, `site-config.js`, and the `assets` folder.
3. In Vercel, choose **Add New → Project**, connect GitHub, and import that repository.
4. Choose **Other** for the framework preset. Keep the root directory at the repository root. No build or install command is needed. Leave Output Directory at its default for a static root site; if overridden, use `.`.
5. Deploy, then inspect the generated HTTPS `.vercel.app` address.
6. Future commits to the production branch are automatically deployed by the GitHub integration.

## Connect Vemr.net

Your DNS provider is **Cloudflare**. Keep your Cloudflare nameservers. Add Vercel's recommended records in Cloudflare's **DNS → Records** screen. Start the website records in **DNS only** mode so Vercel can validate them directly. Keep Minecraft hostname records in DNS only mode as well; the ordinary Cloudflare web proxy does not carry Minecraft traffic. Keep unrelated existing records.

1. Open the Vercel project's **Settings → Domains** and add `vemr.net` and optionally `www.vemr.net`.
2. Vercel will display the specific DNS records your project needs. Use those exact values rather than copying a generic IP from an old tutorial.
3. In your domain's DNS provider, set the apex (`@`) A record to Vercel's recommended address. For `www`, set the CNAME to the project-specific target shown by Vercel.
4. Preserve existing mail, TXT, Minecraft, and other unrelated records. Review conflicting apex A/AAAA records before changing them. Nameserver migration is not necessary when your existing provider can edit DNS records.
5. Return to Vercel to verify DNS and HTTPS.

### Website and Minecraft on the same domain

If players currently connect using `vemr.net`, changing its A record to Vercel can disrupt the game connection. Confirm the current DNS and actual game server address first. A straightforward setup is `vemr.net` for the website and `play.vemr.net` for the game server, with `play` pointing to the actual Minecraft host. Some Java setups can use an SRV record to preserve a shorter connection address, but this depends on your host and port and should be configured after those are known. Bedrock support also depends on its actual connection settings.

Vercel hosts the website. Your Minecraft server stays with its game host.

## Files

- `index.html`: content, navigation, FAQ, and join dialog
- `styles.css`: responsive dark green visual design
- `site-config.js`: server and Discord settings
- `app.js`: copy buttons and configured edition details
- `assets/world.svg`: original block landscape illustration
- `assets/favicon.svg`: VEMR icon
- `vercel.json`: URL behavior and security headers
- `robots.txt`, `sitemap.xml`: search indexing metadata

## Validation

JavaScript syntax and local asset/link references are checked before delivery. Browser layout verification and actual Vercel/DNS deployment must be confirmed separately.

Official references:
- https://vercel.com/docs/git/vercel-for-github
- https://vercel.com/docs/domains/set-up-custom-domain
