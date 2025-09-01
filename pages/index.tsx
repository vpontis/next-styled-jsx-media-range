import React, { useState } from "react";
import { usePolling } from "@/hooks/usePolling";

export default function CssTestPage() {
  const [compiledCss, setCompiledCss] = useState("");

  usePolling(
    () => {
      const styleElements = document.head.querySelectorAll("style");
      for (const styleElement of styleElements) {
        if (styleElement.textContent?.includes("css-test-page-id")) {
          console.log("Found style element with css-test-page-id:");
          console.log(styleElement.textContent);
          setCompiledCss(styleElement.textContent);
          break;
        }
      }
    },
    { seconds: 1 },
  );

  return (
    <>
      <div className="container">
        <div>
          .x
          <div>div.y should be blue</div>
        </div>

        <hr className="my-4" />

        <div className="media-query-test">
          Media query test - Red on mobile, Blue on desktop (max-width: 400px)
        </div>

        <hr className="my-4" />

        <h3 className="mb-2">Compiled CSS</h3>
        {compiledCss ? (
          <pre>{formatCss(compiledCss)}</pre>
        ) : (
          <p>Loading CSS...</p>
        )}
      </div>

      <style jsx>{`
        #css-test-page-id {
          color: red;
        }

        .x {
          :global(div) {
            :global(&.y) {
              background: blue;
            }
          }
        }

        .media-query-test {
          color: blue;
        }

        @media (max-width: 400px) {
          .media-query-test {
            color: red;
          }
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 1rem;
        }
      `}</style>
    </>
  );
}

function formatCss(css: string): string {
  if (!css) {
    return "";
  }

  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/}/g, "}\n")
    .replace(/;/g, ";\n")
    .replace(/{/g, " {\n  ")
    .replace(/\n/g, "\n  ")
    .replace(/\s+/g, " ")
    .replace(/\s*{\s*/g, " {\n  ")
    .replace(/\s*}\s*/g, "\n}\n")
    .replace(/;\s*/g, ";\n  ")
    .replace(/\n\s*\n/g, "\n")
    .trim();
}
