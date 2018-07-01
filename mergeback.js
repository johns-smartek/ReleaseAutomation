// @ts-check

const axios = require("axios");
require('dotenv').config();
const { USER, PASS, ORGANIZATION, REPO } = process.env;


console.log()
const url = "https://api.github.com/repos/johns-smartek/node/pulls";
const getPulls = async (githubRepositoryBase, authorizationHash) => {
  const params = {
    method: 'get',
    url: `${githubRepositoryBase}/pulls`,
    authorization: authorizationHash,
  };

  try {
    const result = await axios(params);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getBasicAuthenticationHash = (user, pass) => Buffer.from(`Basic ${user}:${pass}`).toString('base64');
const buildGitHubAPIBaseUrl = (organization, repo) => `https://api.github.com/repos/${organization}/${repo}/pulls`;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  const result = await getPulls(
    buildGitHubAPIBaseUrl(ORGANIZATION, REPO),
    getBasicAuthenticationHash(USER, PASS));

    await sleep(5000)
    console.log(result);
}

demo();
