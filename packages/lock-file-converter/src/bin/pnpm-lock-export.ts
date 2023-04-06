import { ArgumentParser } from 'argparse';
import { createBase64SiteLockFile, createPortfolioSiteLockFile } from '..';
import { description, version } from '../../package.json';

(async () => {
  const parser = new ArgumentParser({ description });
  parser.add_argument('-v', '--version', { action: 'version', version });
  parser.add_argument('--project', {
    choices: ['portfolio', 'base64'],
    default: 'portfolio',
  });
  const args = parser.parse_args();

  switch (args['project']) {
    case 'portfolio': {
      await createPortfolioSiteLockFile();
      break;
    }
    case 'base64': {
      await createBase64SiteLockFile();
      break;
    }
    default: {
      throw new Error(`Invalid project: ${args['project']}`);
    }
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
