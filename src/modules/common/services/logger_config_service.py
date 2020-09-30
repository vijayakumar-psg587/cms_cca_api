import os
import sys
import logging
from src.modules.common.util.app_constants import APP_CONST
from src.definitions import ROOT_LOG_DIR


def get_custom_logger_config(logger_name, level):
    print(os.path.join(ROOT_LOG_DIR, '{}.info.log'.format((APP_CONST.get('COMMON')).get(
        'APP_NAME'))))
    logging.basicConfig(filename=os.path.join(ROOT_LOG_DIR, '{}.info.log'.format((APP_CONST.get('COMMON')).get(
        'APP_NAME'))), filemode='a', level=level, format='%(asctime)s :: %(levelname)s ::%(name)s :: %(filename)s '
        ':: %(funcName)s :: %(process)s ::%(message)s')
    print('logger name:', logger_name)
    return logging.getLogger(logger_name)


# get_custom_logger_config('test', logging.INFO)
