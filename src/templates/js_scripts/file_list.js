async function loadInitialDetails() {
    console.log('event on load');
    const response = await fetch('/cms-file/list', {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify({search_folder: 'fprs'})
    });
}

async function loadCMSFiles() {
   console.log('inside loadCMSfiles');
   try {
        const response = await fetch('/cms-files/get-cms-files', {
            method: 'GET'
        
        });
        if(response.status >= 302) {
            console.log('err:', await response.text());
        }
   }catch(err) {
       console.log('err while calling:', err);
   }
   
}

async function loadCompFiles() {
    console.log('inside loadCompFiles');
    try {
        const response = await fetch('/cms-files/get-comp-files', {
            method: 'GET',
            // headers: {
            //     'Content-type':'application/json'
            // },
            // body: JSON.stringify({search_folder: 'comp'})
        
        });
        if(response.status != 200) {
            console.log('tjuere is err', response)
        }
    } catch(err) {
        // TODO: display with swal
        console.log('err in reaching', err)
    }
    
}
