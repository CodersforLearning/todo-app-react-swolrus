import React, { useEffect } from "react";

export default function Title() {
    useEffect(() => {
       document.title = "Tasks | dwn.dev"
    }, []);
    return(
            <div>
                <h1>What didn't David do...</h1>
            </div>
    );
}
