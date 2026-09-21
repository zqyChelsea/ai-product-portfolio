import Editor from "./components/Editor";
import { pageMetadata } from "./metadata";
export const metadata = pageMetadata("zh-cn", "readme");
export default function Home() {
  return <Editor locale="zh-cn" file="readme" />;
}
