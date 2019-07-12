const Horseman = require('node-horseman');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const isImageUrl = require('is-image-url');
const request = require('request').defaults({ encoding: null });
const Project = require('../models/project');

const horseman = new Horseman();

const parseGitHub = async user => {
  if (!user) {
    throw new Error('empty user');
  }
  try {
    const repositoriesBody = await horseman
      .userAgent(
        'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0'
      )
      .viewport(1920, 1080)
      .open(`https://github.com/${user}?tab=repositories`)
      .waitForSelector('#user-repositories-list', { timeout: 10000 })
      .html('#user-repositories-list');

    const dom = new JSDOM(repositoriesBody);
    const document = dom.window.document;
    const projects = Array.from(document.querySelectorAll('ul > li'));
    const projectsInfo = [];
    const parsedProjects = [];

    for (const project of projects) {
      projectsInfo.push({
        projectName: project.querySelector('a').innerHTML.replace(/\s+/g, ''),
        projectLanguage: project.querySelector(
          'span[itemprop="programmingLanguage"]'
        ).innerHTML
      });
    }

    for (const projectInfo of projectsInfo) {
      const horsemanProject = new Horseman();

      const projectBody = await horsemanProject
        .userAgent(
          'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0'
        )
        .viewport(1920, 1080)
        .open(`https://github.com/${user}/${projectInfo.projectName}`)
        .waitForSelector('.file-wrap', { timeout: 100000 })
        .html('.file-wrap');

      const projectItem = {
        projectName: projectInfo.projectName,
        projectLanguage: projectInfo.projectLanguage,
        projectUrl: `https://github.com/${user}/${projectInfo.projectName}`
      };

      const dom = new JSDOM(projectBody);
      const document = dom.window.document;
      const readmeSelector = document.querySelector('a[title="README.md"]');
      const portfolioSelector = document.querySelector('a[title^="PORTFOLIO"]');

      if (
        portfolioSelector &&
        isImageUrl(`https://github.com/${portfolioSelector.href}`)
      ) {
        const imgPath = `https://raw.githubusercontent.com/${user}/${
          projectInfo.projectName
        }/master/PORTFOLIO.png`;
        projectItem.image = imgPath;
      }

      if (readmeSelector) {
        projectItem.readme = await new Promise((resolve, reject) => {
          request.get(
            `https://raw.githubusercontent.com/${user}/${
              projectInfo.projectName
            }/master/README.md`,
            (err, res, body) => {
              if (err) {
                return reject(err);
              }
              resolve(body.toString('utf8'));
            }
          );
        });
      }

      const project = new Project({
        ...projectItem,
        userId: '5d0757a890cf360ca9841ba2'
      });

      parsedProjects.push(project);
    }
    return parsedProjects;
  } catch (error) {
    console.log(error);
  }
};

module.exports = parseGitHub;
