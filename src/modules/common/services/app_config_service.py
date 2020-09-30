import os
import sys
from pipenv.vendor.dotenv import load_dotenv, find_dotenv
from src.definitions import ROOT_ENV_DIR, ROOT_LOG_DIR, ROOT_SRC_DIR


def app_load_env():
    load_dotenv(dotenv_path=os.path.join(ROOT_ENV_DIR, 'development/.env'))
