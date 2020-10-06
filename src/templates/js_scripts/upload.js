

// use Upload event to upload to disk
function fileEvent(ev) {
    const targetId = ev.target.id;
    const fileVal = ev.target.files[0];
    let fileLabelEl;
    if(targetId === 'fprsFileInput') {
        fileLabelEl = document.getElementById('fprsFileInputLabel');
    } else {
        fileLabelEl = document.getElementById('cmsFileInputLabel');
    }
    fileLabelEl.innerHTML = fileVal.name
}

function uploadFprsFileEvent(ev) {
    
    let fileVal;
    let fileEl;
    let fileLabelEl;
    const formData  = new FormData();
    // if(targetId === 'fprsFileInputButton') {
        fileEl = document.getElementById('fprsFileInput');
        fileLabelEl = document.getElementById('fprsFileInputLabel');
        fileVal = fileEl.files[0];
        formData.append('fprsFile', fileVal, fileVal.name);
    // } else {
    //     fileEl = document.getElementById('cmsFileInput');
    //     fileLabelEl = document.getElementById('cmsFileInputLabel');
    //     fileVal = fileEl.files[0];
    //     formData.append('cmsFile', fileVal, fileVal.name);
    // }
     
    console.log(fileVal);
    
    fetch('/cms-file/save', {method: 'POST',
      credentials: 'include',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: formData 
    }).then(success => {
        if(success.status <= 302) {
            swal({
                title: 'Submitted the files',
                text: '',
                icon: 'success',
                button: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true,
                  },
            }).then(val => {
                  console.log('Ok is clicked', fileLabelEl);
                  // clear all the values
                //   fileLabelEl.innerHTML='Choose file';
        
            })
        } else {
            //  only in case of network failues or failure to reach the endpoint, this will be called
            // not based on the response status
            swal({
                title: 'Error in submitting the files',
                text: '',
                icon: 'error',
                button: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true,
                  },
            })
        }
    }).catch(failure => {
        console.log('Failed to save the files')
        swal({
            title: 'Error in submitting the files',
            text: '',
            icon: 'error',
            button: {
                text: "OK",
                value: true,
                visible: true,
                className: "",
                closeModal: true,
              },
        })
    });
    
}


function uploadCMSFileEvent(event) {

    let fileVal;
    let fileEl;
    let fileLabelEl;
    const formData  = new FormData();
   
        fileEl = document.getElementById('cmsFileInput');
        fileLabelEl = document.getElementById('cmsFileInputLabel');
        fileVal = fileEl.files[0];
        formData.append('cmsFile', fileVal, fileVal.name);
    
     
    console.log(fileVal);
    
    fetch('/cms-file/save', {method: 'POST',
      credentials: 'include',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: formData 
    }).then(success => {
        if(success.status <= 302) {
            swal({
                title: 'Submitted the files',
                text: '',
                icon: 'success',
                button: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true,
                  },
            }).then(val => {
                  console.log('Ok is clicked', fileLabelEl);
                  // clear all the values
                //   fileLabelEl.innerHTML='Choose file';
        
            })
        } else {
            //  only in case of network failues or failure to reach the endpoint, this will be called
            // not based on the response status
            swal({
                title: 'Error in submitting the files',
                text: '',
                icon: 'error',
                button: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true,
                  },
            })
        }
    }).catch(failure => {
        console.log('Failed to save the files')
        swal({
            title: 'Error in submitting the files',
            text: '',
            icon: 'error',
            button: {
                text: "OK",
                value: true,
                visible: true,
                className: "",
                closeModal: true,
              },
        })
    });
    
    
}

// use submit event to trigger the file_comparison , calling the script, so submit to a route
// that inturns call the script

function generateClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    console.log('coming into onlcikc event:', swal);
    const planIdEl = document.getElementById('planIdInput');
    const fprsFileEl = document.getElementById('fprsFileInput')
    const cmsFileEl = document.getElementById('cmsFileInput');

    const planIdErrEl = document.getElementsByClassName('planIdErrorClass')[0];
    const fprsFileErrEl = document.getElementsByClassName('fprsFileErrClass')[0];
    const cmsFileErrEl = document.getElementsByClassName('cmsFileErrClass')[0];
    
    console.log('fprsFileErrEl err el:', fprsFileErrEl);
    console.log('cmsFileErrEl err el:', cmsFileErrEl);
    
    let planIdErrMessage = '';
    let fprsFileErrMessage = '';
    let cmsFileErrMessage = '';
    console.log('sss',planIdEl.value, isNaN(parseInt(planIdEl.value)))
    // check planId
    if(!planIdEl.value || planIdEl.value === null) {
       planIdErrMessage = 'Plan number should not be empty';
    } else if(planIdEl.value && isNaN(parseInt(planIdEl.value))) {
        
        planIdErrMessage = 'PlanId Should be a number';
       
    } 

    // check fprs
    if(!fprsFileEl.value || fprsFileEl.value === null) {
        fprsFileErrMessage = 'Upload an fprs File. It cannot be empty'
    }

    // check cms
    if(!cmsFileEl.value || cmsFileEl.value === null) {
        cmsFileErrMessage = 'Upload a cms file. It cannot be empty'
    }


    if(planIdErrMessage.length > 0) {
        console.log('err in planId', planIdErrMessage);
        planIdErrEl.innerHTML = planIdErrMessage;
        planIdErrEl.style.display = 'block';
        planIdErrEl.style.color = 'red';
        planIdErrEl.style.margin = '0 auto';
        // make sure to highlight the border in red
        planIdEl.classList.add('input_error');
    } else if(planIdErrMessage === ''){
        planIdErrEl.innerHTML = '';
        planIdEl.classList.remove('input_error');
    }


    if(fprsFileErrMessage.length > 0) {
        fprsFileErrEl.innerHTML = fprsFileErrMessage;
        fprsFileErrEl.style.display = 'block';
        fprsFileErrEl.style.color = 'red';
        fprsFileErrEl.style.margin = '0 auto';

        fprsFileEl.classList.add('input_error');
    } else if(fprsFileErrMessage === '') {
        fprsFileErrEl.innerHTML = '';
        fprsFileEl.classList.remove('input_error');
    }

    if(cmsFileErrMessage.length > 0) {
        cmsFileErrEl.innerHTML = cmsFileErrMessage;
        cmsFileErrEl.style.display = 'block';
        cmsFileErrEl.style.color = 'red';
        cmsFileErrEl.style.margin = '0 auto';

        cmsFileEl.classList.add('input_error');
    } else if(cmsFileErrMessage === '') {
        cmsFileErrEl.innerHTML = '';
        cmsFileEl.classList.remove('input_error');
    }
    
    console.log('before callong tje fetch api');
    // After validation, if form valid, pass on the data to file-list using fetch
    fetch('/cms-file/file_list', {
        method: 'GET',
        headers: {
            'Content-type':'application/json'
        }
    }).then(data => {
       
        if(data.status >= 302) {
            console.log('definitely an err - disply err using swAL', data);
            swal({
                title: 'Error in sending the formdata. Please contact developer',
                text: '',
                icon: 'error',
                button: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true,
                  },
            })
        } else {
            // no error success - so just propagate 
            // clear all values
            planIdEl.value = '';
            cmsFileEl.value = '';
            fprsFileEl.value = '';
            cmsFileLabelEl = document.getElementById('cmsFileInputLabel');
            fprsFileLabelEl = document.getElementById('fprsFileInputLabel');

            cmsFileLabelEl.innerHTML = 'Choose a file';
            fprsFileLabelEl.innerHTML = 'Choose a file';
            
        }
    }).then(resp => {
        const redirect_url = window.location.origin+'/cms-file/list';
        window.location.href = redirect_url;
    }).catch(err => {
        // throw the err respise from route.py
        console.log('Error in processing while file comparison', err);
        swal({
            title: 'Error in processing the files and comparing. Please contact developer',
            text: '',
            icon: 'error',
            button: {
                text: "OK",
                value: true,
                visible: true,
                className: "",
                closeModal: true,
              },
        })
    })

}

function alertSuccessClick(ev) {
    
    console.log('coming inside alert success click')
}