

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
                  fileLabelEl.innerHTML='Choose file';
        
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
                  fileLabelEl.innerHTML='Choose file';
        
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
    ev.stopPropagation();
    ev.preventDefault();
    console.log('coming into onlcikc event:', swal);
    const planIdEl = document.getElementById('planIdInput');
    const fprsFileEl = document.getElementById('fprsFileInput')
    const cmsFileEl = document.getElementById('cmsFileInput')
    
    console.log('sss',planIdEl.value, isNaN(parseInt(planIdEl.value)))
    if(!planIdEl.value || planIdEl.value === null) {
        planIdEl.setCustomValidity('Plan number should not be empty')
    } else if(planIdEl.value && isNaN(parseInt(planIdEl.value))) {
        console.log('comong');
        planIdEl.setCustomValidity('PlanId Should be a number');
       
    } else {
        planIdEl.setCustomValidity('')
        
    }
    
}

function alertSuccessClick(ev) {
    
    console.log('coming inside alert success click')
}