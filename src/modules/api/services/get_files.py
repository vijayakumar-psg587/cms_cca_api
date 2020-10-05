import os
import sys
import logging
from src.modules.common.util.decorator.cust_logger import custom_logger_time_wrapper
from src.definitions import ROOT_UPLOAD_DIR, ROOT_SRC_DIR


@custom_logger_time_wrapper(__file__, logging.INFO)
def get_file_list(dir_name):
    print('inside fileList', dir_name, ROOT_UPLOAD_DIR)

    if(dir_name == 'fprs'):
        file_path = os.path.join(ROOT_UPLOAD_DIR, 'fprs')
    elif (dir_name == 'cms'):
        file_path = os.path.join(ROOT_UPLOAD_DIR, 'cms')
    else:
        file_path = os.path.join(ROOT_UPLOAD_DIR, 'comp')

    print(file_path)
    print(os.listdir(file_path))
    print('**********************************')

    # The comprehension part is displayed below
    # for (root, dirs, files) in os.walk(file_path):
    #     print('root:', root)
    #     for f in files:
    #         dict_of_files[f] = os.path.join(root, f)

    dict_of_files = {f: os.path.join(root, f)
                     for (root, dirs, files) in os.walk(file_path) for f in files}

    # print(dict_of_files)
    return dict_of_files


# get_file_list('fprs')
