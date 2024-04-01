import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const animateParentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getText() {
      const response = await fetch(
        "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/726562"
      )
        .then((response) => response.text())
        .then((res) => res);

      setLoading(false);
      setText(response);
    }
    getText();
  }, []);

  useEffect(() => {
    async function animateText() {
      const textElement = animateParentRef?.current;
      if (textElement) {
        let i = 0;
        const interval = setInterval(() => {
          if (text && i < text?.length) {
            textElement.textContent += text?.charAt(i);
            i++;
          } else {
            clearInterval(interval);
          }
        }, 500);
      }
    }

    if (text) animateText();
  }, [text]);

  return (
    <>
      <Head>
        <title>Ramp Demo</title>
      </Head>
      <main>
        {loading && <p>loading...</p>}
        <p ref={animateParentRef}></p>
      </main>
    </>
  );
}
