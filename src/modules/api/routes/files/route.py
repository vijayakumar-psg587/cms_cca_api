from flask import render_template, request, jsonify, redirect, url_for, Response, send_file
from flask.blueprints import Blueprint
import logging
from src.modules.common.util.decorator.cust_logger import custom_logger_time_wrapper
from src.modules.api.services.file_storage import save_file_to_disk
from src.modules.api.services.get_files import get_file_list

filesRoute = Blueprint('filesRoute', __name__)


@filesRoute.route('/cms-file/upload', methods=['GET'])
@custom_logger_time_wrapper(__file__, logging.INFO)
def upload_template():
    return render_template('upload.html', uploadFileFlag=True)


@filesRoute.route('/cms-file/save', methods=['POST'])
@custom_logger_time_wrapper(__file__, logging.INFO)
def save_file():
    print('coming in save file', request.dict_storage_class.__str__)
    print('second line', request.__dict__.items())
    # print('third line', next(request.files.items()))
    print('ff', request.files)
    fileToSave = next(request.files.items())
    print('fileTosave', fileToSave)
    # print('f', next(request.values.items()))
    # Call method to save the file
    print('file name:{}'.format(fileToSave[0]))
    print('secin name:{}'.format(type(fileToSave[1])))
    save_file_to_disk(fileToSave[0],  fileToSave[1])
    return Response(
        "The response body goes here",
        status=200,
    )


@filesRoute.route('/cms-file/list', methods=['GET', 'POST'])
@custom_logger_time_wrapper(__file__, logging.INFO)
def list_files():
    # get the list based on input directory -by default it should load fprs files
    if request.method == 'POST':
        body = request.json
        print(body['search_folder'])
    return render_template('file_list.html', fileListFlag=True)


@filesRoute.route('/cms-file/dir-list', methods=['POST'])
@custom_logger_time_wrapper(__file__, logging.INFO)
def list_files_from_dir():
    print(request.json)
    file_list_dict = get_file_list('fprs')
    print(file_list_dict)
    return 'test'


@filesRoute.route('/cms-file/download', methods=['POST'])
@custom_logger_time_wrapper(__file__, logging.INFO)
def download_file():
    print('fileNameIndex and fileNameFolder', request.json)
    file_list_dict = get_file_list(request.json['search_folder'])
    file_path = file_list_dict[request.json['file_name']]
    print(file_path)
    return send_file(file_path, as_attachment=True, attachment_filename=request.json['file_name'])
