import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

export default function Fabric() {
  const { editor, onReady } = useFabricJSEditor();

  const onAddCircle = () => {
    editor.addCircle();
  };
  const onAddRectangle = () => {
    editor.addRectangle();
  };

  const onAddLine = () => {
    editor.addLine();
  };
  const  onAddText= () => {
    editor.addText("Text");
  };

  return (
    <div className="Paint">
      <div className="btn">
        <button onClick={onAddCircle}>Circle</button>
        <button onClick={onAddRectangle}>Rectangle</button>
        <button onClick={onAddLine}>Line</button>
        <button onClick={onAddText}>Text</button>
      </div>
      <FabricJSCanvas className="sample-canvas" onReady={onReady}  />
    </div>
  );
}