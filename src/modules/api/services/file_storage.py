import datetime
import os
import sys
import logging
from src.modules.common.services.logger_config_service import get_custom_logger_config
from src.modules.common.util.decorator.cust_logger import custom_logger_time_wrapper
from src.definitions import ROOT_UPLOAD_DIR
from werkzeug.datastructures import FileStorage


@custom_logger_time_wrapper(__file__, logging.INFO)
def save_file_to_disk(folder_type, fileStorageData: FileStorage):
    print('Inside save file service', fileStorageData.filename)
    cust_log = get_custom_logger_config(__file__, logging.INFO)
    cust_log.info('Inside save file service')
    fprsFolder = os.path.join(ROOT_UPLOAD_DIR, 'fprs')
    cmsFolder = os.path.join(ROOT_UPLOAD_DIR, 'cms')
    try:
        if(folder_type == 'fprsFile'):
            print('save to fprs folder', ROOT_UPLOAD_DIR, fprsFolder)
            print('file d', os.path.join(
                fprsFolder, fileStorageData.filename))
            fileStorageData.save(os.path.join(
                fprsFolder, fileStorageData.filename))
        else:
            print('save to csm folder', cmsFolder)
            fileStorageData.save(os.path.join(
                cmsFolder, fileStorageData.filename))
    except Exception as exp_arg:
        print('Error in saving file to Disk - {}'.format(exp_arg))

    return
