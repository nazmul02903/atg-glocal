import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class Editor extends Component {
  constructor(props) {
    super(props.defaultValue);

    this.state = { editorHtml: "", mountedEditor: false };
    this.quillRef = null;
    this.reactQuillRef = null;
    this.handleChange = this.handleChange.bind(this);

    this.attachQuillRefs = this.attachQuillRefs.bind(this);
  }

  componentDidMount() {
    this.attachQuillRefs();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs() {
    // Ensure React-Quill reference is available:
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    // Skip if Quill reference is defined:
    if (this.quillRef != null) return;

    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) this.quillRef = quillRef;
  }

  handleChange(html) {
    this.setState({ editorHtml: html });

    let notEmpty = this.quillRef.getText();
    if (notEmpty.length > 1) {
      if (this.props.field.onChange) {
        this.props.field.onChange(html);
      }
    } else {
      if (this.props.field.onChange) {
        this.props.field.onChange("");
      }
    }
  }

  render() {
    return (
      <div>
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          theme={"snow"}
          onChange={this.handleChange}
          modules={Editor.modules}
          formats={Editor.formats}
          defaultValue={this.state.editorHtml}
        />
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {};
Editor.modules.toolbar = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote"], // blocks
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }], // lists
  // [{ script: "sub" }, { script: "super" }], // superscript/subscript
  // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  // [{ direction: "rtl" }], // text direction
  // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  // [{ header: [1, 2, 3, 4, 5, 6, false] }], // header dropdown
  // [{ color: [] }, { background: [] }], // dropdown with defaults
  // [{ font: [] }], // font family
  // [{ align: [] }], // text align
  ["clean"], // remove formatting
];

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  //"font",
  // "background",
  //"color",
  // "code",
  //"size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  // "indent",
  // "script",
  // "align",
  // "direction",
  // "link",
  // "image",
  // "code-block",
  // "formula",
  // "video",
];

export default Editor;
