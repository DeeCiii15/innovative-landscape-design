import { redirect } from "next/navigation";
import { LOGIN_PATH } from "@/lib/siteConstants";

export default function LoginPage() {
  redirect(LOGIN_PATH);
}
