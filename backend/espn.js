const puppeteer = require('puppeteer');

class EspnFFL {
    async getLeagues(username, password) {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto('https://fantasy.espn.com/football/team');
        await page.waitFor(1000);
        const frame = page.frames().find(frame => frame.name() === 'disneyid-iframe');
        await frame.type('.field-username-email input[type="email"]', username);
        await frame.type('.field-password input[type="password"]', password);
        await frame.click('button[aria-label="Log In"]');
        await page.waitFor(2000);
        await page.goto('https://www.espn.com/fantasy/football/');
        await page.waitFor(2000);

        const leagues = await page.$$eval('#favfeed-items .favfeed_item[data-league-abbrev="ffl"]', items => {
            return items.map(item => {
                const header = item.querySelector('a.fav-header');

                return {
                    id: (new URL(header.href)).searchParams.get('leagueId'),
                    leagueName: header.querySelector('.fav-header-titles h2').textContent,
                    teamName: header.querySelector('.fav-header-titles h1').textContent,
                };
            });
        });

        const leaguesFull = [];

        for (const league of leagues) {
            await page.waitFor(2000);
            await page.goto(`http://fantasy.espn.com/football/tools/leaguemembers?leagueId=${league.id}`, {waitUntil: 'domcontentloaded'});
            await page.waitFor(2000);
            const teams = await page.$$eval('span.teamName', names => { return names.map(name => name.textContent) });
            leaguesFull.push({
                id: league.id,
                leagueName: league.leagueName,
                teamName: league.teamName,
                teams: teams,
            });
        }

        await browser.close();

        return leaguesFull;
    }
}

module.exports = EspnFFL;
