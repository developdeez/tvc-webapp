const pupHelper = require("./puppeteerhelper");

const fetchDetails = async url => {
  try {
    console.log(`Crawling from ${url}...`);
    const result = {};
    const browser = await pupHelper.launchBrowser();
    const page = await pupHelper.launchPage(browser);
    await page.goto(url, { timeout: 0, waitUntil: "load" });
    await page.waitForSelector('div[aria-label][role="group"]');
    const tagText = await pupHelper.getAttr(
      'div[aria-label][role="group"]',
      "aria-label",
      page
    );

    const repliesRegEx = /\d+(?=\s*replies)/gi;
    const retweetsRegEx = /\d+(?=\s*retweets)/gi;
    const likesRegEx = /\d+(?=\s*likes)/gi;

    result.url = url;
    if (repliesRegEx.test(tagText))
      result.comments = tagText.match(repliesRegEx)[0].trim();
    if (retweetsRegEx.test(tagText))
      result.retweets = tagText.match(retweetsRegEx)[0].trim();
    if (likesRegEx.test(tagText))
      result.likes = tagText.match(likesRegEx)[0].trim();

    await page.waitForSelector("span[data-testid='viewCount'] > span", {
      timeout: 60000
    });
    const viewsStr = await pupHelper.getTxt(
      "span[data-testid='viewCount'] > span",
      page
    );
    result.views = viewsStr.replace("views", "").trim();
    await page.close();
    await browser.close();
    return result;
  } catch (error) {
    console.log(`fetchDetails [${url}] Error: ${error.message}`);
    return error;
  }
};

module.exports = {
  fetchDetails
};
