import { InkStage } from "@/components/ink-stage";
import { TitleBlock } from "@/components/title-block";
import {
  About,
  Contact,
  Cover,
  Experience,
  Projects,
  Skills,
} from "@/components/sheets";
import { profile } from "@/content";

/** Base64 so the literal address is never in the served HTML. */
const ENCODED_EMAIL = Buffer.from(profile.email).toString("base64");

export default function Home() {
  return (
    <>
      <TitleBlock encodedEmail={ENCODED_EMAIL} />
      <InkStage>
        <main>
          <Cover />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </InkStage>
    </>
  );
}
