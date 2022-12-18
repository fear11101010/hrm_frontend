import {useRef, useState} from "react";

function FileDropZone({onFileSelect, multiple}) {
    const [isDragActive, setIsDragActive] = useState(false);
    const inputRef = useRef();
    const onFileChange = (e) => {
        const files = e.target.files;
        console.log(files)
        if (onFileSelect) {
            onFileSelect(files)
        }
    }
    const openFileBrowser = (e) => {
        e.preventDefault();
        e.stopPropagation();
        inputRef.current.click()
    }
    const onDropFile = e => {
        e.preventDefault();
        const files = [];
        console.log('drop file')
        if (e.dataTransfer.items) {
            [...e.dataTransfer.items].forEach(item => {
                if (item.kind === 'file') {
                    files.push(item.getAsFile())
                }
            })
        } else {
            [...e.dataTransfer.files].forEach(file => {
                files.push(file)
            })
        }
        console.log(files)
        setIsDragActive(false);
        if (onFileSelect) {
            onFileSelect(files)
        }
    }
    const onDragOver = e => {
        e.preventDefault();
        console.log('drag over')
    }
    const onDragEnter = e => {
        e.preventDefault();
        console.log('drag enter')
        setIsDragActive(true);
    }
    const onDragLeave = e => {
        e.preventDefault();
        console.log('drag end')
        setIsDragActive(false);
    }
    const onDragEnd = e => {
        e.preventDefault();
    }
    return (
        <div className='dropzone dropzone-multiple dz-clickable'
             onDrop={onDropFile}
             onDragOver={onDragOver}
             onDragEnter={onDragEnter}
             onDragEnd={onDragEnd}
             onDragLeave={onDragLeave}
             onDragExit={onDragEnd}
             onDragStart={onDragEnd}
             onDrag={onDragEnd}
        >
            <div className="fallback">
                <div className="custom-file">
                    <input className='form-control' type="file" style={{display: "none"}} ref={inputRef}
                           onChange={onFileChange} id='customFileUploadMultiple' multiple={multiple}/>
                    <label className="form-label"
                           htmlFor="customFileUploadMultiple" style={{display: "none"}}>Choose file</label>
                </div>
            </div>

            <div className="dz-default dz-message" style={{zIndex:0}}>
                {isDragActive ? <p>Drop the files here ...</p> : (
                    <button className="dz-button" onClick={openFileBrowser} type="button">Drop files here to
                        upload <br/>or <br/>click to open file browser
                    </button>
                )}
            </div>
        </div>
    )
}

export default FileDropZone;