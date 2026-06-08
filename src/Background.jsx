import { useState } from "react";
import "./Background.css";

export default function Background() {
    const [bgColor, setBgColor] = useState("white");

    return (
        <div
            className="container1"
            style={{ backgroundColor: bgColor, minHeight: "100vh" }}
        >
            <div>
                <h1 className="introMsg">배경색을 변경하는 페이지.</h1>

                <div className="bgChange">
                    <button
                        className="w"
                        onClick={() => setBgColor("white")}
                    >
                        흰색
                    </button>

                    <button
                        className="p"
                        onClick={() => setBgColor("pink")}
                    >
                        핑크색
                    </button>

                    <button
                        className="b"
                        onClick={() => setBgColor("black")} 
                    >
                        검은색
                    </button>

                    <button
                        className="r"
                        onClick={() => setBgColor("red")}
                    >
                        빨간색
                    </button>
                </div>
            </div>
        </div>
    );
}