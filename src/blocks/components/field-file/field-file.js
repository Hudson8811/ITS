function fileFieldInit() {
    const fileFields = document.querySelectorAll('input[type="file"]');

    if(fileFields.length < 1) return

    const closeIconLayout = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M18 18L6 6" stroke="currentColor" stroke-linecap="square"/>
                            </svg>` 

    fileFields.forEach(field => {
        const fieldLabel = field.closest('.field-file[data-js="formField"]');
        const fileListContainer = fieldLabel.querySelector('[data-js="fieldFileList"]')
        const fileError = fieldLabel.querySelector('[data-js="fieldError"]')
        const fileMaxSize = parseInt(field.getAttribute("data-size"));
        let files = []

        field.addEventListener('change', function () {
            // Новый список файлов из инпута
            const selectedFiles = Array.from(field.files);
            // Объединяем с предыдущими (по имени)
            selectedFiles.forEach(file => {
                if (!files.some(f => f.name === file.name && f.size === file.size)) {
                    files.push(file);
                }
            });
            updateFileList();
        });

        function updateFileList() {
            // Очищаем список
            fileListContainer.innerHTML = '';
            let isInvalidType = false;
            let isInvalidSize = false;
            let validAccept= field.getAttribute('accept');
            let validParams = validAccept === null ? [] : validAccept.replace(/\s/g, '').split(',');

            if(files.length > 0) {
                for(let idx = 0; idx < files.length; idx++) {
                    const file = files[idx]
                    let currentFileType = file.type
                    let validExtentions = [];
                    let validTypes = [];
                    let validGroups = [];

                    isInvalidType = true;
                    isInvalidSize = true;
    
                    if(validParams.length > 0) {
                        //получаем список разрешённых расширений и проверяем загруженный файл на соответствие
                        validExtentions = validParams.filter(item => /^\..+/.test(item));
                        if(validExtentions.length > 0) {
                            let currentFileExtention = file.name.split('.');
                            currentFileExtention = '.' + currentFileExtention[currentFileExtention.length - 1];
                            
                            for(let i = 0; i < validExtentions.length; i++) {
                                if(validExtentions[i] == currentFileExtention) {
                                    
                                    isInvalidType = false;
                                    break
                                }
                            }
                        }
    
                        //получаем список разрешённых типов и проверяем загруженный файл на соответствие
                        validTypes = validParams.filter(item => /.+\/.+[^\*]$/.test(item));
                        if(validTypes.length > 0) {
                            for(let i = 0; i < validTypes.length; i++) {
                                if(validTypes[i] == currentFileType) {
                                    
                                    isInvalidType = false;
                                    break
                                }
                            }
                        }
    
                        //получаем список разрешённых групп и проверяем загруженный файл на соответствие
                        validGroups = validParams.filter(item => /\/\*$/.test(item));
    
                        if(validGroups.length > 0) {
                            for(let i = 0; i < validGroups.length; i++) {
                                let currentValidGroup = validGroups[i].replace(/\*$/, '');
                                if(currentFileType.startsWith(currentValidGroup)) {
                                    
                                    isInvalidType = false;
                                    break
                                }
                            }
                        }
    
    
                    } else {
                        isInvalidType = false;
                    }
    
                    //проверяем размер файла
                    if(!isNaN(fileMaxSize) && file.size > fileMaxSize) {
                        isInvalidSize = true
                    } else {
                        isInvalidSize = false
                    }
    
                    if(!isInvalidSize && !isInvalidType) {
                        const elem = document.createElement('span');
                        elem.classList.add('field-file__fakeinput')
                        elem.innerHTML = `<span>${file.name}</span>`;
        
                        const removeBtn = document.createElement('span');
                        removeBtn.innerHTML = closeIconLayout;
        
                        removeBtn.addEventListener('click', (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            files.splice(idx, 1);
                            updateFileList();
                            // Обновляем поле выбора файлов
                            updateFileInput();
                        });
        
                        elem.prepend(removeBtn);
                        fileListContainer.appendChild(elem);
                        fieldLabel.classList.remove('field--invalid');
                        fieldLabel.classList.add('field-file--full');
                        fileError.innerHTML = '';

                    } else {
                        files.splice(idx, 1);

                        if(files.length < 1) {
                            if(isInvalidType) {
                                fieldLabel.classList.add('field--invalid');
                                fileError.innerHTML = `Недопустимый тип файла. Можно прикрепить ${validParams.join(', ')}`;
                            } else if(isInvalidSize) {
                                fieldLabel.classList.add('field--invalid');
                                fileError.innerHTML = `Превышен максимальный размер файла`;
                            }
                        }

                        updateFileList();
                        updateFileInput();

                        break
                    }
    
    
                };
            } else {
                fieldLabel.classList.remove('field-file--full');
                
            }

        }

        function updateFileInput() {
            // Создаём новый FileList через DataTransfer (чтобы удалить из input)
            const dt = new DataTransfer();
            files.forEach(file => dt.items.add(file));
            field.files = dt.files;
        }

        /*field.addEventListener('change', () => {
            /*if(field.files.length > 0) {
                [...field.files].forEach(currentFile => {
                    let isInvalidType = true;
                    let validAccept= field.getAttribute('accept');
                    let currentFileType = currentFile.type
                    let validParams = validAccept === null ? [] : validAccept.replace(/\s/g, '').split(',');
    
                    let validExtentions = [];
                    let validTypes = [];
                    let validGroups = [];
    
                    if(validParams.length > 0) {
                        //получаем список разрешённых расширений и проверяем загруженный файл на соответствие
                        validExtentions = validParams.filter(item => /^\..+/.test(item));
                        if(validExtentions.length > 0) {
                            let currentFileExtention = currentFile.name.split('.');
                            currentFileExtention = '.' + currentFileExtention[currentFileExtention.length - 1];
                            
                            for(let i = 0; i < validExtentions.length; i++) {
                                if(validExtentions[i] == currentFileExtention) {
                                    
                                    isInvalidType = false;
                                    break
                                }
                            }
                        }
    
                        //получаем список разрешённых типов и проверяем загруженный файл на соответствие
                        validTypes = validParams.filter(item => /.+\/.+[^\*]$/.test(item));
                        if(validTypes.length > 0) {
                            for(let i = 0; i < validTypes.length; i++) {
                                if(validTypes[i] == currentFileType) {
                                    
                                    isInvalidType = false;
                                    break
                                }
                            }
                        }
    
                        //получаем список разрешённых групп и проверяем загруженный файл на соответствие
                        validGroups = validParams.filter(item => /\/\*$/.test(item));
    
                        if(validGroups.length > 0) {
                            for(let i = 0; i < validGroups.length; i++) {
                                let currentValidGroup = validGroups[i].replace(/\*$/, '');
                                if(currentFileType.startsWith(currentValidGroup)) {
                                   
                                    isInvalidType = false;
                                    break
                                }
                            }
                        }
    
    
                    } else {
                        isInvalidType = false;
                    }
    
                    //проверяем размер файла
                    if(!isNaN(fileMaxSize) && currentFile.size > fileMaxSize) {
                        field.value = '';
                        fieldLabel.classList.remove('field-file--full');
                        fieldLabel.classList.add('field--invalid');
                        fileName.innerHTML = fieldPlaceholder;
                        fileError.innerHTML = 'Файл превышает допустимый размер';
                    //проверяем тип файла
                    } else if(isInvalidType) {
                        field.value = '';
                        fieldLabel.classList.remove('field-file--full');
                        fieldLabel.classList.add('field--invalid');
                        fileName.innerHTML = fieldPlaceholder;
                        fileError.innerHTML = `Недопустимый тип файла. Можно прикрепить ${validParams.join(', ')}`;
                    }  else {
                        fieldLabel.classList.remove('field--invalid');
                        fieldLabel.classList.add('field-file--full');
                        fileName.innerHTML = currentFile.name;
                        fileError.innerHTML = '';
                    }
                })
            } else {
                fieldLabel.classList.remove('field-file--full')
                fileName.innerHTML = fieldPlaceholder;
            }
        })*/

        /*fullIcon.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            field.value = '';
            fieldLabel.classList.remove('field-file--full')
            fileName.innerHTML = fieldPlaceholder;
        })*/
    })
}