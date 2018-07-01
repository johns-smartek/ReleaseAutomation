const axios = require('axios');
require('dotenv').config();
const { USERNAME, PASS, ORGANIZATION, REPO } = process.env;


const doWebCall = async (params) => {
  try {
    const result = await axios(params);
    return result.data;
  } catch (error) {
    return error;
  }
}

const getPulls = async (githubRepositoryBase, authorizationHash) => {
  const params = {
    method: 'get',
    url: `${githubRepositoryBase}/pulls`,
    headers:{
      Authorization: authorizationHash,
      "Content-Type": "application/json"
    },
  };
  return await doWebCall(params);
};

const createPullRequests = async (githubRepositoryBase, authorizationHash, pullRequestParameters) => {
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorizationHash,
    },
    url: `${githubRepositoryBase}/pulls`,
    data: pullRequestParameters 
  };
  return await doWebCall(params);
};

/*
{
        "title": "My Pull Request",
        "body": "Please review and merge",
        "head": "canary-base",
        "base": "master"	
    }
*/

const getBasicAuthenticationHash = (user, pass) =>{
    const base64UserPass = Buffer.from(`${user}:${pass}`).toString('base64');
    return `Basic ${base64UserPass}`
  };
const buildGitHubAPIBaseUrl = (organization, repo) => `https://api.github.com/repos/${organization}/${repo}`;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function demo() {
  const result = await getPulls(
    buildGitHubAPIBaseUrl(ORGANIZATION, REPO),
    getBasicAuthenticationHash(USERNAME, PASS));

  await sleep(5000)
  console.log(result);
}

async function demo2() {
  const result = await createPullRequests(
    buildGitHubAPIBaseUrl(ORGANIZATION, REPO),
    getBasicAuthenticationHash(USERNAME, PASS),
    {
      "title": "My Pull Request",
      "body": "Please review and merge``` text here \n more text```",
      "head": "canary-base",
      "base": "master"
    }
  );

  await sleep(5000)
  console.log(result);
}


demo2();
