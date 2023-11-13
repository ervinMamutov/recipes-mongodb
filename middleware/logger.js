import chalk from 'chalk';

const logger = (req, res, next) => {
  const url = chalk.blue(req.url);
  const method = chalk.green(req.method);
  const status = chalk.yellow(req.status);
  console.log(`url: ${url} --- method: ${method} --- status: ${status}`);
  next();
};

export default logger;
