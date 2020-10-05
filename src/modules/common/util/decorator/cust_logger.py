import logging
import os
import sys
import time
from src.modules.common.services.logger_config_service import get_custom_logger_config
from functools import wraps


def custom_logger_time_wrapper(logger_name, level):

    def log_func_appender(original_func):
        """DOC String - Logger appender with basic config and path to existing messages"""
        @wraps(original_func)
        def wrapper_func(*args, **kwargs):
            cust_log = get_custom_logger_config(logger_name, level)
            try:
                t1 = time.time()
                print(logger_name, level)
                cust_log.info('Start function with args- {}'.format(args))
                if kwargs is not None and len(kwargs) > 1:
                    cust_log.info(
                        'Start function execution with special args - {}'.format(kwargs))
                result = original_func(*args, **kwargs)
                t2 = time.time() - t1
                print('tim:', t2)
                cust_log.info(
                    'Success - function execution completed in {}s'.format(t2))
                return result
            except Exception as execption_arg:
                cust_log.error('Failure - Error exeucting the function- {}'.format(execption_arg.__cause__),
                               exc_info=True)

        return wrapper_func
    return log_func_appender


# @custom_logger_time_wrapper(__file__, logging.INFO)
# def test_func():
#     cust_log = get_custom_logger_config(__file__, logging.INFO)
#     rel_path = os.getcwd()
#     cust_log.info('Path:{}:: File::{}:: test'.format(rel_path, __file__))
#     print(rel_path)


# test_func()
