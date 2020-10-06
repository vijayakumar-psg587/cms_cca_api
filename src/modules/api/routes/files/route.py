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

# this is the way to load the html via python, another way is to use the js to load


@filesRoute.route('/cms-file/list', methods=['GET', 'POST'])
# @custom_logger_time_wrapper(__file__, logging.INFO)
def list_files():
    file_list_cms_dict = {}
    file_list_comp_dict = {}
    fileDistFlag = False
    fileDistCOMPFlag = False
    fileDistCMSFlag = False
    if request.method == 'GET':
        file_list_dict = get_file_list('fprs')
        if len(file_list_dict) > 0:
            return render_template('file_list.html', fileDistFlag=True, fileDistCMSFlag=False, fileDistCOMPFlag=False, file_list_dict=file_list_dict)
        else:
            return render_template('file_list.html', fileDistFlag=False, fileDistCMSFlag=False, fileDistCOMPFlag=False, file_list_dict=file_list_dict)
    else:
        search_folder = request.json['search_folder']
        print('folder to be searched:', search_folder)

        if search_folder == 'fprs':
            file_list_dict = get_file_list(search_folder)
            if len(file_list_dict) > 0:
                return render_template('file_list.html', fileDistFlag=True, fileDistCMSFlag=False, fileDistCOMPFlag=False, file_list_dict=file_list_dict)
            else:
                return render_template('file_list.html', fileDistFlag=False, fileDistCMSFlag=False, fileDistCOMPFlag=False, file_list_dict=file_list_dict)
        # elif search_folder == 'cms':
        #     file_list_cms_dict = get_file_list(search_folder)
        #     print('inside cms:', file_list_cms_dict)
        #     print('all flags: {} {} {}:'.format(fileDistFlag,
        #                                         fileDistCMSFlag, fileDistCOMPFlag))
        #     if len(file_list_cms_dict) > 0:
        #         return render_template('file_list.html', fileDistFlag=False, fileDistCMSFlag=True, fileDistCOMPFlag=False, file_list_cms_dict=file_list_cms_dict)
        #     else:
        #         return render_template('file_list.html', fileDistFlag=False, fileDistCMSFlag=False, fileDistCOMPFlag=False, file_list_cms_dict=file_list_cms_dict)
        # else:
        #     file_list_comp_dict = get_file_list(search_folder)
        #     if len(file_list_comp_dict) > 0:
        #         return render_template('file_list.html', fileDistCompFlag=True, fileDistFlag=False, fileDistCMSFlag=False, file_list_comp_dict=file_list_comp_dict)
        #     else:
        #         return render_template('file_list.html', fileDistCompFlag=False, fileDistFlag=False, fileDistCMSFlag=False, file_list_comp_dict=file_list_comp_dict)

                # The call from js comes here , on receiving a successful reponse, then  it is redirected to file_list.html page
                #  in the UI itself. so make sure to set the necessary details in js as well before loading the page


@ filesRoute.route('/cms-files/get-cms-files', methods=['GET'])
# @ custom_logger_time_wrapper(__file__, logging.INFO)
def get_cms_file_list():
    file_list_cms_dict = get_file_list('cms')
    print('file_list_cms_dict', file_list_cms_dict)
    return redirect(url_for('filesRoute.get_files_from_dir', fileDistFlag=False, fileDistCMSFlag=True, fileDistCOMPFlag=False))


@ filesRoute.route('/cms-files/get-comp-files', methods=['GET'])
# @ custom_logger_time_wrapper(__file__, logging.INFO)
def get_comp_file_list():
    file_list_comp_dict = get_file_list('comp')
    return redirect(url_for('filesRoute.get_files_from_dir', fileDistFlag=False, fileDistCMSFlag=False, fileDistCOMPFlag=True))


@ filesRoute.route('/cms-file/display-files/<fileDistFlag>/<fileDistCMSFlag>/<fileDistCOMPFlag>')
# @ custom_logger_time_wrapper(__file__, logging.INFO)
def get_files_from_dir(fileDistFlag, fileDistCMSFlag, fileDistCOMPFlag):
    file_list_dict = {}
    print('printing all flags', fileDistCMSFlag,
          fileDistCOMPFlag, fileDistFlag)
    print('fileDistCMSFlag and (not fileDistCOMPFlag) and (not fileDistFlag) - {} {} {}'.format(
          fileDistCMSFlag, (str(fileDistCOMPFlag) == 'False'), (str(fileDistFlag))))
    if str(fileDistCMSFlag) == 'True' and str(fileDistCOMPFlag) == 'False' and str(fileDistFlag) == 'False':
        search_folder = 'cms'
        file_list_dict = get_file_list(search_folder)
        print('fie list dict:', file_list_dict)
        return render_template('file_list.html', fileDistCMSFlag=True, file_list_cms_dict=file_list_dict)
    elif str(fileDistCOMPFlag) == 'True' and str(fileDistCMSFlag) == 'False' and str(fileDistFlag) == 'False':
        search_folder = 'comp'
        file_list_dict = get_file_list(search_folder)
        return render_template('file_list.html', fileDistCOMPFlag=True, file_list_comp_dict=file_list_dict)
    else:
        search_folder = 'fprs'
        file_list_dict = get_file_list(search_folder)
        return render_template('file_list.html', fileDistFlag=True, file_list_dict=file_list_dict)


@ filesRoute.route('/cms-file/file_list', methods=['GET'])
@ custom_logger_time_wrapper(__file__, logging.INFO)
def file_list():

    file_list_dict = get_file_list('fprs')
    print(file_list_dict)
    # Call the script to do the file comparison and generate a new one
    return Response("Success", status=200)


@ filesRoute.route('/cms-file/download', methods=['POST'])
@ custom_logger_time_wrapper(__file__, logging.INFO)
def download_file():
    print('fileNameIndex and fileNameFolder', request.json)
    file_list_dict = get_file_list(request.json['search_folder'])
    file_path = file_list_dict[request.json['file_name']]
    print(file_path)
    return send_file(file_path, as_attachment=True, attachment_filename=request.json['file_name'])
