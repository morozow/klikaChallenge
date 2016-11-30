import path from 'path';

class Constants {

  PATH_ROOT = path.resolve(path.join(__dirname));
  PATH_BUILD = path.join(this.PATH_ROOT, 'public');

  DIR_NAME_SOURCE = 'src';
  DIR_NAME_COMPONENTS = 'components';
  DIR_NAME_CORE_MODULES = 'common';
  DIR_NAME_CORE_DIST = 'dist';

  URL_PUBLIC = '/';
  DEVELOPMENT_PORT = '0420';
}

export const setting = new Constants();