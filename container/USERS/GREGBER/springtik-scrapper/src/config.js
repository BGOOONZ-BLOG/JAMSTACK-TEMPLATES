import path from 'path';
import convict from 'convict';

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  database: {
    uri: {
      doc: 'The database uri',
      format: String
    }
  }
});

const env = config.get('env');
config.loadFile(path.join(__dirname, `../config/${env}.json`));
config.validate();

export default config;
