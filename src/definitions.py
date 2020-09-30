import os
ROOT_SRC_DIR = os.path.dirname(os.path.abspath(__file__))


# change directory to point to log folder
os.chdir(os.getcwd()+os.sep+'/')
ROOT_LOG_DIR = os.path.join(os.getcwd(), 'logs')
ROOT_ENV_DIR = os.path.join(os.getcwd(), 'env')


# print(ROOT_SRC_DIR)
# print(ROOT_LOG_DIR)
# print(ROOT_ENV_DIR)
