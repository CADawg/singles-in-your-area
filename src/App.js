import './App.scss';
import './App2.scss';
import {useState} from "react";

function App() {
  let [uploaded, setUploaded] = useState(false);
  let [secondPage, setSecondPage] = useState(false);

  return (
    <div className="App">
        <div id={"uploader"} className={"uploader"} style={{display: secondPage ? "none" : "block"}}>
            <h1>Find Hot Singles in your Area</h1>

            <input type="file" id="file-upload" onChange={event => getUploadedFile(event, setUploaded)} name="fileUpload" accept="image/*" />

            <p>Upload a photo of yourself so we can match you with hot singles in your area.</p>
            <label htmlFor="file-upload" id="file-drag" style={{pointerEvents: uploaded ? "none" : "auto"}}>
                <img id="file-image" src="#" alt="Preview" className="hidden" />
                    <div id="start">
                        <div>{uploaded ? "File Uploaded" : "Select a file or drag here"}</div>
                        <div id="notimage" className="hidden">Please select an image</div>
                        <span id="file-upload-btn" style={{display: uploaded ? "none" : "inline-block"}} className="btn btn-primary">Select a file</span>
                    </div>
            </label>

            <p>Privacy: This image is only used in your browser and is not uploaded to any server. <a target={"_blank"} rel={"noopener noreferrer"} href={"https://git.dbuidl.com/Snaddyvitch-Dispenser/singles-in-your-area"}>You can check the code to verify this!</a></p>
            <button style={{marginLeft: "0"}} onClick={event => onFindHotSingles(event, setSecondPage)} className={"btn"} disabled={!uploaded}>Find Hot Singles!</button>
        </div>
        <div id={"result"} style={{display: secondPage ? "block" : "none"}}>
            <h1 className={"hot-single"}>We've found <strong>1</strong> hot single in your area...</h1>
            <div className={"card"}>
                <img id={"cutie"} alt={"You"} />
                <div className={"card-bottom"}>
                    <p className={"large"}><strong>You</strong></p>
                    <p className={"location"}><strong>0</strong> Miles Away</p>
                </div>
            </div>
        </div>
    </div>
  );
}

function onFindHotSingles(event, setSecondPage) {
    event.preventDefault(); event.stopPropagation();

    setSecondPage(true);
}

function getUploadedFile(evt, setUploaded) {
    const tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
        const fr = new FileReader();
        fr.onload = function () {
            document.getElementById("cutie").src = fr.result;
        }
        fr.readAsDataURL(files[0]);

        setUploaded(true);
    }

    // Not supported
    else {
        // fallback -- perhaps submit the input to an iframe and temporarily store
        // them on the server until the user's session ends.
        setUploaded(false);
    }
}

export default App;
